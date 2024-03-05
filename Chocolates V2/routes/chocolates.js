import express from "express";
import Chocolate from "../models/chocolates.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/chocolates", (req, res) => {
  Chocolate.find()
    .then(chocolateList => res.render("chocolates", { chocolateList }))
    .catch(err => console.error(err));
});

router.get("/chocolates/new", (req, res) => {
  res.render("form", { chocolate: null });
});

router.get("/chocolates/edit/:id", (req, res) => {
  Chocolate.findById(req.params.id)
    .then(chocolate => res.render("form", { chocolate }))
    .catch(err => console.error(err));
});

router.post("/chocolates", (req, res) => {
  const { name, description, brand, price, weight } = req.body;
  const chocolate = new Chocolate({ name, description, brand, price, weight });
  
  chocolate.save()
    .then(() => res.redirect("/api/chocolates"))
    .catch(err => console.error(err));
});

router.post("/chocolates/:id?", (req, res) => {
  const { name, description, brand, price, weight } = req.body;
  const id = req.params.id;

  if (id) {

    Chocolate.findByIdAndUpdate(id, { name, description, brand, price, weight }, { new: true })
      .then(() => res.redirect("/api/chocolates"))
      .catch(err => console.error(err));
  } else {

    Chocolate.create({ name, description, brand, price, weight })
      .then(() => res.redirect("/api/chocolates"))
      .catch(err => console.error(err));
  }
});

router.post("/chocolates/delete/:id", (req, res) => {
  Chocolate.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/api/chocolates"))
    .catch(err => console.error(err));
});

export default router;