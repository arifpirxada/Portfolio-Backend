const express = require("express");
const app = express();
port = process.env.PORT || 3000;
require("dotenv").config();
require("./dbcon");
const sendNewMail = require("./mail.js")
const contact = require("./models/contact");
const cors = require("cors")

const spotifyRouter = require("./spotify/index.js")

app.use(express.json());
app.use(cors({
  origin: "https://arifpirxada.netlify.app",
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/read-contact", async (req, res) => {
  try {
    const contactData = await contact.find().sort({_id: -1});
    res.status(200).send(contactData);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.post("/add-contact", async (req, res) => {
  try {
    const contactData = new contact({
      name: req.body.name,
      email: req.body.email,
      social: req.body.social,
      phone: req.body.phone,
      message: req.body.message,
      read: 0,
    });
    await contactData.save();
    sendNewMail(req.body.name, req.body.email, req.body.social, req.body.phone, req.body.message).catch(console.error);
    res.status(201).json({ message: "Insertion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.patch("/update-contact", async (req, res) => {
  try {
    await contact.updateMany({ read: 0 }, { $set: { read: 1 } });
    res.status(200).send({ message: "Updation successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.delete("/delete-contact", async (req, res) => {
  try {
    await contact.findByIdAndDelete({ _id: req.body.id });
    res.status(200).send({ message: "Deletion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.use(spotifyRouter);

app.listen(port, () => {
  console.log(`Listening...; Port: ${port}`);
});
