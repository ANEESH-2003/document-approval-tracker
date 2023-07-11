const usersControllers = require("./usersControllers");

module.exports = {
  addNewUser: async (req, res) => {
    if (req.position === 'Admin') {
      const name = req.body.name || "";
      const phone = req.body.phone || '';
      const email = req.body.email || '';
      const password = req.body.password || '';
      const confirmPassword = req.body.confirmPassword || '';
      const position = req.body.position || '';
      const department = req.department;
      const reqBody = {name, phone, email, password, confirmPassword, position, department};

      if (position === 'Admin') {
        res.json({message: 'Error', errors: 'There can only be one admin in this department '});
      } else {
        let errors = usersControllers.checkForErrors(req.body);

        if (Object.keys(errors).length > 0) {
          res.json({message: 'Error', errors});
        } else {
          usersControllers.signIn(reqBody, res);
        }
      }
    } else {
      res.json({message: 'Error', errors: 'You are not allowed to perform this action'});
    }
  },

  addNewDepartment: async (req, res) => {
    if (req.position === 'Super Admin') {
      const name = req.body.name || "";
      const phone = req.body.phone || '';
      const email = req.body.email || '';
      const password = req.body.password || '';
      const confirmPassword = req.body.confirmPassword || '';
      const position = 'Admin';
      const department = req.body.department || "";
      const reqBody = {name, phone, email, password, confirmPassword, position, department};

      let errors = usersControllers.checkForErrors(req.body);

      if (Object.keys(errors).length > 0) {
        res.json({message: 'Error', errors});
      } else {
        usersControllers.signIn(reqBody, res);
      }
    } else {
      res.json({message: 'Error', errors: 'You are not allowed to perform this action'});
    }
  },
};