var express = require("express");
var router = express.Router();
var foodDB = require("../database/foodDB");
var dietDB = require("../database/dietDB");
var userDB = require("../database/userDB");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  next();
});

/* Food Information Related Below */

router.get("/get_food_list/:user", function (req, res) {
  // Send foodList data to front end

  foodDB.retrieveAll(req.params.user, (foodList) => {
    res.status(200).json(foodList);
  });
});

router.post("/delete_food", async function (req, res) {
  // Send foodList data to front end
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  foodDB.delete(user, foodName);
  res.status(200);
});

router.post("/create_food", async function (req, res) {
  // Send foodList data to front end
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  const calorieOunce = await req.body.calorieOunce;
  foodDB.create(user, foodName, calorieOunce);
  res.status(200);
});

/* Diet Plan Related Below */

router.get("/get_diet_plan/:user", function (req, res) {
  dietDB.retrieveAll(req.params.user, (dietPlan) => {
    res.status(200).json(dietPlan);
  });
});

router.post("/delete_diet_item", async function (req, res) {
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  dietDB.delete(user, foodName);
  res.status(200);
});

router.post("/create_diet_item", async function (req, res) {
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  const calorieOunce = await req.body.calorieOunce;
  dietDB.create(user, foodName, calorieOunce);
  res.status(200);
});

/* Login and Registration Related Below */
router.post("/create_user", async function (req, res) {
  const userName = await req.body.userName;
  const password = await req.body.password;
  userDB.create(userName, password);
  res.status(200);
});

router.post("/login", async function (req, res) {
  const userName = await req.body.userName;
  const password = await req.body.password;
  await userDB.login(userName, password).then((result) => {
    if (result) {
      console.log("Logged In!");
      res.status(200).json({ flag: true });
    } else {
      console.log("Failed to login!");
      res.status(200).json({ flag: false });
    }
  });
});

module.exports = router;