const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const mustacheExpress = require('mustache-express');

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authenticate = (req, res, next) => {
  if ((req.query.username === "username") && (req.query.password === "password")) {
    next()
  } else {
    res.redirect('/login')
  }
}

app.get("/login", (req, res) => {
  console.log("logging in")
  res.send("Login")
})

app.use(authenticate)
app.get("/", (req, res) => {
  console.log("Home")
  res.render('/');
});

app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
