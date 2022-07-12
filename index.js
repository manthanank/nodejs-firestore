const express = require("express");
const cors = require("cors");
const User = require("./config");
const {
  validationResult,
  matchedData,
  check
} = require("express-validator");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  res.send(list);
});

const userCreationValidator = [
  //check("email").isEmail().isEmpty().withMessage("Email is required"),
  check("leadTime").isEmpty().withMessage("Lead time is required"),
  //already exists
  check("email").custom(async (value, {
    req
  }) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    const user = list.find((user) => user.email === value);
    if (user) {
      throw new Error("User already exists");
    }
  })
]


app.post("/create", userCreationValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  const {
    leadTitle,
    contactName,
    leadSource,
    companyName,
    product,
    countryCode,
    email,
    assignToTeamName,
    assignToUserEmail,
    note,
    address,
    city,
    state,
    region,
    postalCode,
    countryName,
    Age,
    Salary
  } = req.body;
  const user = await User.add({
    leadTitle,
    contactName,
    leadSource,
    companyName,
    product,
    countryCode,
    email,
    assignToTeamName,
    assignToUserEmail,
    note,
    address,
    city,
    state,
    region,
    postalCode,
    countryName,
    Age,
    Salary
  });
  res.send(user);
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({
    msg: "Updated"
  });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({
    msg: "Deleted"
  });
});
app.listen(4000, () => console.log("Server started at port 4000"));