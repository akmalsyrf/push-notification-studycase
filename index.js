const express = require("express");
const webpush = require("web-push");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = "BGNn4HU-PvugfnTdLSm0QHMsvpKlYpoReahPZtOAuuG0lt3azHJHV7HQL9Tdf8MxTfRmG0Ytk166tY-US-pPNHc";
const privateVapidKey = "ISR8OcjMKLNLH9L0h_QnRpFqaG6BHkMe2IS6ZsoCIso";

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

//subscribe route
app.post("/subscribe", (req, res) => {
  console.log(req.body);
  const subscription = req.body;
  res.status(201).json({});
  //send push notification
  const payload = JSON.stringify({ title: "Push Test" });
  webpush.sendNotification(subscription, payload).catch((err) => console.error(err));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
