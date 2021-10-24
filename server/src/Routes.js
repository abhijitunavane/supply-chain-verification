import express from "express";
import ManufacturerModel from "./models/ManufacturerModel.js";
import bcrypt from "bcrypt";
const router = express.Router();

// Add Manufacturer
router.post("/addManufacturer", async (req, res) => {
  const reqbody = req.body;

  await ManufacturerModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.send("User exists!");
      } else {
        // Hashed The entered Password by user
        const hashedPassword = bcrypt.hashSync(reqbody.password, 10);
        reqbody.password = hashedPassword;

        // Create model of that user
        const newUser = new ManufacturerModel(reqbody);

        // Save the user to the database
        newUser
          .save()
          .then(res.send(`User Added Successfully!`)) // Response
          .catch((err) => {
            res.send(`Error: ${err}`);
          });
      }
    })
    .catch((err) => res.send(err));
});

// Get Manfacturers
router.get("/getManufacturers", async (req, res) => {
  await ManufacturerModel.find()
    .then((users) => {
      if (users.length) {
        res.send(`Users : ${users}`);
      } else {
        res.send(`No Users Found!`);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

// Get Manfacturer by username /email
router.post("/getManufacturer", async (req, res) => {
  // As in this case email is unique so find user by email
  await ManufacturerModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            email: user.email
          });
        } else {
          res.send(`User exists, but password is incorrect try again!`);
        }
      }
      // Response
      else res.send("User Not Found!"); // user Not found response
    })
    .catch((err) => {
      res.send(err);
    });
});

// Find manufacture by email send response
router.post("/getManufacturerByEmail", async (req, res) => {
  // As in this case email is unique so find user by email
  await ManufacturerModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
          res.send({
            status: "User Found",
            user:{
            name: user.name,
            company_name: user.company_name,
            email: user.email,
          }});
        } 
      // Response
      else res.send("User Not Found!"); // user Not found response
    })
    .catch((err) => {
      res.send(err);
    });
});

// findAndUpdate Manufacturer by email
router.post("/updateManufacturer", async (req, res) => {
  const update = {
    name: req.body.name,
    company_name: req.body.company_name,
  };

  await ManufacturerModel.findOneAndUpdate(
    { email: req.body.email },
    update,
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.send({
          status: "User Updated",
          user: {
            name: user.name,
            company_name: user.company_name,
          },
        });
      } else {
        res.send({ status: "User Not Found" });
      }
    })
    .catch((err) => res.send(err));
});



export default router;
