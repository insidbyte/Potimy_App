const express = require('express');
var cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8888;

app.use(express.static(__dirname)).use(cors());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.resolve('./views/profile.html'));
});

app.get("/callback", (req, res) => {
  res.render('callback', {code: req.query.code});
});

app.get("/search", (req, res) => {
  res.sendFile(path.resolve("./views/search_song.html"));
});

app.listen(PORT, () => {
  console.log("Front-End attivo su: http://127.0.0.1:" + PORT );
});
