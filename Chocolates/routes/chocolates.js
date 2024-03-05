import express from "express";
const router = express.Router();

const chocolateList = [
  { id: 1, name: "Dark chocolate", description: "Rich dark chocolate", brand: "Lindor", price: 2.99, weight: 100 },
  { id: 2, name: "Milk chocolate", description: "Creamy milk chocolate", brand: "Milka", price: 1.50, weight: 120 },
  { id: 3, name: "White chocolate", description: "Sweet white chocolate", brand: "Lidl", price: 1.00, weight: 200 },
];

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/chocolates", (req, res) => {
  res.render("chocolates", { chocolateList });
});

router.get("/newchocolate", (req, res) => {
  res.render("newChocolate");
});

router.post("/chocolates", (req, res) => {
  const { name, description, brand, price, weight } = req.body;
  const newChocolate = { 
    id: chocolateList.length + 1, 
    name, 
    description, 
    brand, 
    price: Number(price), 
    weight: Number(weight) 
  };
  chocolateList.push(newChocolate);
  res.redirect("/chocolates");
});

router.put("/chocolates/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = chocolateList.findIndex(c => c.id === id);
  if (index !== -1) {
    const updatedInfo = { 
      ...chocolateList[index], 
      ...req.body, 
      price: Number(req.body.price), 
      weight: Number(req.body.weight)
    };
    chocolateList[index] = updatedInfo;
    res.json(chocolateList[index]);
  } else {
    res.status(404).send("Chocolate not found");
  }
});

router.delete("/chocolates/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = chocolateList.findIndex(c => c.id === id);
  if (index !== -1) {
    chocolateList.splice(index, 1);
    res.send("Chocolate has been removed");
  } else {
    res.status(404).send("Chocolate not found");
  }
});

export default router;