const cloudinary = require("cloudinary").v2;
const documentModel = require("../model/documentModel");
const usersModel = require("../model/usersModel");
const fs = require("fs");
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
  hide_sensitive: true
});

module.exports = {
  upload: async (req, res) => {
    const current = req.body.current || '';
    const department = req.body.department || '';
    const title = req.body.title || '';
    const desc = req.body.desc || '';

    if (req.position !== 'None') {
      res.json({message: 'Error', errors: 'You are not allowed to make a request'});
    } else if (current === '') {
      res.json({message: 'Error', data: {current: 'This filed cannot be empty '}});
    } else if (department === '') {
      res.json({message: 'Error', data: {department: 'This filed cannot be empty '}});
    } else if (title.length <= 0 || title.length >= 251) {
      res.json({message: 'Error', data: {title: 'Title should be between 1 to 250 characters in size'}});
    } else if (desc.length <= 0 || desc.length >= 2501) {
      res.json({
        message: 'Error',
        data: {
          desc: 'Description should be between 1 to 2500 characters in size'
        }
      });
    } else {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const newDoc = new documentModel({
          current,
          department,
          url: [{doc: result.secure_url, timestamp: Date.now(), _id: req.userId}],
          title,
          description: desc,
          owner: req.userId
        });

        newDoc.save().then((result1) => {
          res.json({message: "Document uploaded successfully", data: result1._id});
        });
      } catch (e) {
        console.log(`[server]: Error uploading the document \n[server]: ${e}`);
        res.json({message: "Error uploading the document ", errors: e});
      }
    }

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(`[server]: Unable to delete the temporary files`);
      }
    });
  },

  approve: async (req, res) => {
    const nextId = req.body.next || '';
    const id = req.body.id || '';
    const status = req.body.accepted || 'In progress';

    try {
      if (nextId === '' && status === 'In progress') {
        res.json({message: 'Error', data: {next: 'This field cannot be empty'}});
      } else if (id === '') {
        res.json({message: 'Error', data: {id: 'This field cannot be empty'}});
      } else if (req.position !== 'DHoD' && req.position !== 'HoD' && req.position !== 'Clark') {
        res.json({message: 'Error', errors: 'You are not allowed to approve the request'});
      } else {
        let url = '';

        console.log(`[server]: ${req.file}`);

        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          url = result.secure_url;
        }

        const nextUser = await usersModel.findOne({_id: nextId});

        if (nextUser.position === 'DHoD' || nextUser.position === 'HoD' || nextUser.position === 'Clark') {
          documentModel.findOne({_id: id}).then((data) => {
            if (data.status === 'Rejected' || data.status === 'Accepted') {
              res.json({message: 'Error', errors: `This request has already been ${data.status}`});
            } else if (data.current.toString() === req.userId) {
              let update = {
                $push: {
                  past: req.userId
                },
                status,
                current: nextId,
              }

              if (url !== '') {
                update = {
                  ...update,
                  $push: {
                    ...update.$push,
                    url: {
                      doc: url,
                      timestamp: Date.now(),
                      _id: req.userId,
                    }
                  }
                };
              }

              documentModel.updateOne({_id: id}, update).then((result) => {
                res.json({message: 'Success', data: update});
              }).catch((err) => {
                console.log(`[server]: Error uploading the document \n[server]: ${err}`);
                res.json({message: "Error uploading the document ", errors: err});
              });
            } else {
              res.json({message: 'Error', errors: 'You are not allowed to approve the request 1'});
            }
          }).catch((err) => {
            console.log(`[server]: Error uploading the document \n[server]: ${err}`);
            res.json({message: "Error uploading the document ", errors: err});
          });
        } else {
          res.json({message: 'Error', errors: 'Cannot pass the request to this user'});
        }
      }
    } catch (e) {
      console.log(`[server]: Error uploading the document \n[server]: ${e}`);
      res.json({message: "Error uploading the document ", errors: e});
    }

    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(`[server]: Unable to delete the temporary files`);
        }
      });
    }
  },

  myDocs: async (req, res) => {
    if (req.position === 'None') {
      documentModel.find({owner: req.userId}).then((data) => {
        res.json({message: "success", data});
      }).catch((err) => {
        console.log(`[server]: Unable to fetch the documents. \n[server]: ${err}`);
        res.json({message: 'Error', errors: "Unable to fetch the documents."});
      });
    } else {
      documentModel.find({
        $or: [
          {
            current: req.userId,
          },
          {
            past: {
              $in: [req.userId],
            }
          }
        ]
      }).then((data) => res.json({message: 'success', data})).catch((err) => {
        console.log(`[server]: Unable to fetch the documents. \n[server]: ${err}`);
        res.json({message: 'Error', errors: "Unable to fetch the documents."});
      })
    }
  }
};