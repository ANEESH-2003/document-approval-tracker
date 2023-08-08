const cloudinary = require("cloudinary").v2;
const documentModel = require("../model/documentModel");
const usersModel = require("../model/usersModel");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
  hide_sensitive: true,
});

const result = (data, allU) => {
  return data.map((item) => {
    const current = allU.find(
      (it) => it._id.toString() === item.current.toString(),
    );
    const owner = allU.find(
      (it) => it._id.toString() === item.owner.toString(),
    );
    const past = item.past.map((p) =>
      allU.find((item) => item._id.toString() === p._id.toString()),
    );
    const url = item.url.map((ur) => ({
      doc: ur.doc,
      _id: ur._id,
      timestamp: ur.timestamp,
      ...allU.find((item) => item._id.toString() === ur._id.toString()),
    }));
    const eligible = allU.filter(
      (it) =>
        it._id.toString() !== item.current._id.toString() &&
        it._id.toString() !== item.owner._id.toString() &&
        !item.past.find((it1) => it1._id.toString() === it._id.toString()) &&
        it.position !== "None" &&
        it.position !== "Super Admin" &&
        it.position !== "Admin",
    );

    return {
      _id: item._id,
      timestamp: item.timestamp,
      department: item.department,
      status: item.status,
      title: item.title,
      description: item.description,
      url,
      past,
      current,
      owner,
      eligible: [ { name: 'None', _id: '-1', department: null }, ...eligible ],
    };
  });
};

module.exports = {
  upload: async (req, res) => {
    const current = req.body.current || "";
    const department = req.body.department || "";
    const title = req.body.title || "";
    const desc = req.body.desc || "";

    if (req.position !== "None") {
      res.json({
        message: "error",
        errors: "You are not allowed to make a request",
      });
    } else if (current === "") {
      res.json({
        message: "error",
        data: { current: "This filed cannot be empty " },
      });
    } else if (department === "") {
      res.json({
        message: "error",
        data: { department: "This filed cannot be empty " },
      });
    } else if (title.length <= 0 || title.length >= 251) {
      res.json({
        message: "error",
        data: { title: "Title should be between 1 to 250 characters in size" },
      });
    } else if (desc.length <= 0 || desc.length >= 2501) {
      res.json({
        message: "error",
        data: {
          desc: "Description should be between 1 to 2500 characters in size",
        },
      });
    } else {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const newDoc = new documentModel({
          current,
          department,
          url: [
            { doc: result.secure_url, timestamp: Date.now(), _id: req.userId },
          ],
          title,
          description: desc,
          owner: req.userId,
        });

        newDoc.save().then((result1) => {
          res.json({
            message: "success",
            data: result1._id,
          });
        });
      } catch (e) {
        console.log(`[server]: Error uploading the document \n[server]: ${e}`);
        res.json({ message: "Error uploading the document ", errors: e });
      }
    }

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(`[server]: Unable to delete the temporary files`);
      }
    });
  },

  approve: async (req, res) => {
    const nextId = req.body.next || "";
    const id = req.body.id || "";
    let status = req.body.accepted || "In progress";

    if (nextId !== req.userId) {
      status = "In progress";
    }

    try {
      if (nextId === "" && status === "In progress") {
        res.json({
          message: "error",
          data: { next: "This field cannot be empty" },
        });
      } else if (id === "") {
        res.json({
          message: "error",
          data: { id: "This field cannot be empty" },
        });
      } else if (
        req.position !== "DHoD" &&
        req.position !== "HoD" &&
        req.position !== "Clark"
      ) {
        res.json({
          message: "error",
          errors: "You are not allowed to approve the request",
        });
      } else {
        let url = "";

        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          url = result.secure_url;
        }

        const nextUser = await usersModel.findOne({ _id: nextId });

        if (
          nextUser.position === "DHoD" ||
          nextUser.position === "HoD" ||
          nextUser.position === "Clark"
        ) {
          documentModel
            .findOne({ _id: id })
            .then((data) => {
              if (data.status === "Rejected" || data.status === "Accepted") {
                res.json({
                  message: "error",
                  errors: `This request has already been ${data.status}`,
                });
              } else if (data.current.toString() === req.userId) {
                let update = {
                  $push: {
                    past: req.userId,
                  },
                  status,
                  current: nextId,
                };

                if (url !== "") {
                  update = {
                    ...update,
                    $push: {
                      ...update.$push,
                      url: {
                        doc: url,
                        timestamp: Date.now(),
                        _id: req.userId,
                      },
                    },
                  };
                }

                documentModel
                  .updateOne({ _id: id }, update)
                  .then((result) => {
                    res.json({ message: "Success", data: update });
                  })
                  .catch((err) => {
                    console.log(
                      `[server]: Error uploading the document \n[server]: ${err}`,
                    );
                    res.json({
                      message: "error ",
                      errors: err,
                    });
                  });
              } else {
                res.json({
                  message: "error",
                  errors: "You are not allowed to approve the request 1",
                });
              }
            })
            .catch((err) => {
              console.log(
                `[server]: Error uploading the document \n[server]: ${err}`,
              );
              res.json({
                message: "error",
                errors: err,
              });
            });
        } else {
          res.json({
            message: "error",
            errors: "Cannot pass the request to this user",
          });
        }
      }
    } catch (e) {
      console.log(`[server]: Error uploading the document \n[server]: ${e}`);
      res.json({ message: "error", errors: e });
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
    const allU = await usersModel
      .find({})
      .then((data) =>
        data.map((it) => ({
          _id: it._id,
          name: it.name,
          email: it.email,
          phone: it.phone,
          position: it.position,
          department: it.department,
        })),
      )
      .catch((err) => {
        console.log(
          `[server]: Unable to fetch the documents. \n[server]: ${err}`,
        );
        res.json({
          message: "error",
          errors: "Unable to fetch the documents.",
        });
      });

    if (req.position === "None") {
      documentModel
        .find({ owner: req.userId })
        .then((data) => {
          res.json({ message: "success", data: result(data, allU) });
        })
        .catch((err) => {
          console.log(
            `[server]: Unable to fetch the documents. \n[server]: ${err}`,
          );
          res.json({
            message: "error",
            errors: "Unable to fetch the documents.",
          });
        });
    } else {
      documentModel
        .find({
          $or: [
            {
              current: req.userId,
            },
            {
              past: {
                $in: [req.userId],
              },
            },
          ],
        })
        .then(async (data) => {
          res.json({
            message: "success",
            data: result(data, allU),
          });
        });
    }
  },
};
