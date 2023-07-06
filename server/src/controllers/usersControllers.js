const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const checkForErrors = async function (reqBody) {
  const password = reqBody['password'];
  const confirmPassword = reqBody['confirmPassword'];

  let errors = {};
  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === '') {
      errors = {...errors, [field]: 'This field is required.'};
    }

    if (field === 'email' && !validateEmail(reqBody[field])) {
      errors = {...errors, [field]: 'Not a valid email. '};
    }
    if (field === 'password' && password !== '' && password.length < 6) {
      errors = {...errors, [field]: 'Password is too short. '};
    }
    if (field === 'confirmPassword' && confirmPassword !== password) {
      errors = {...errors, [field]: 'Passwords does not match. '};
    }

    if (field === 'position' && reqBody['position'] !== 'None' && reqBody['position'] !== 'Admin' && reqBody['position'] !== 'DHoD' && reqBody['position'] !== 'HoD') {
      errors = {...errors, [field]: 'Enter a valid position. '};
    }
  }

  return errors;
}

module.exports = {
  register: async (req, res) => {
    const name = req.body.name || '';
    const phone = req.body.phone || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirmPassword || '';
    const position = req.body.position || 'None';
    const department = req.body.department || 'None';
    const reqBody = {name, phone, email, password, confirmPassword, position, department};

    let errors = await checkForErrors(reqBody);
    if (Object.keys(errors).length > 0) {
      res.json({message: 'Incorrect inputs. ', errors});
    } else {
      const newUser = new usersModel({
        name,
        phone,
        email,
        password,
        position,
        department
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          res.json({ message: 'something went wrong. ', errors: err });
          console.log(`[server]: Unable to register \n[server]: ${err}`);
          return err;
        } else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              return err;
            } else {
              newUser.password = hash;
              newUser.save().then(() => {
                res.json({message: 'success. '});
              }).catch((err) => {
                console.log(`[server]: Unable to register \n[server]: ${err}`);
                res.json({ message: 'something went wrong. ', errors: err });
              });
            }
          });
        }
      });
    }
  },

  authenticate: async (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    let errors = {};

    if (email === '') {
      errors = {...errors, email: 'This is required field. '};
    }
    if (password === '') {
      errors = {...errors, password: 'This is required field. '};
    }

    if (Object.keys(errors).length > 0) {
      res.json({ errors });
    } else {
      usersModel.findOne({ email }).then((userInfo) => {
        if (userInfo) {
          bcrypt.compare(password, userInfo.password, (err, isMatch) => {
            if (err) {
              console.log(`[server]: Unable to log the user in. \n[server]: ${err}`);
              return err;
            }
            if (isMatch) {
              const token = jwt.sign({
                userId: userInfo._id,
                name: userInfo.name,
                position: userInfo.position,
              }, process.env.JWT_KEY, {expiresIn: '1h'});
              res.json({ message: 'User signed in successfully. ', data: { token } });
            } else {
              res.json({ invalidCredentials: 'Incorrect Password. '});
            }
          });
        } else {
          res.json({ invalidCredentials: 'Incorrect email. ' });
        }
      }).catch((err) => {
        console.log(`[server]: Unable to register \n[server]: ${err}`);
        res.json({ message: 'something went wrong. ', errors: err });
      });
    }
  },

  isAuthenticated: async (req, res, next) => {
    if (!req.headers['authorization']) {
      res.status(403).json({error: "No token provided. "});
    } else {
      const authorizationHeader = req.headers['authorization'];
      const authorizationToken = authorizationHeader.split(' ')[1];

      if (authorizationToken) {
        jwt.verify(authorizationToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            console.log(`[server]: Unable to verify the user \n[server]: ${err}`);
            res.status(401).json({ message: 'Error', errors: "Failed to authenticate. "});
          } else {
            req.name = decoded.name;
            req.position = decoded.position;
            req.userId = decoded.userId;
            next();
          }
        });
      } else {
        res.status(403).json({ message: 'Error', errors: "No token provided. "});
      }
    }
  },
};