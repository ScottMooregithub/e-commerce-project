const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      as: "products",
    },
  }).then((dbUserData) => res.json(dbUserData));
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  }).then((dbResData) => {
    if (!dbResData) {
      res.json({ message: "Data not found" });
      return;
    }
    res.json(dbResData);
  });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  }).then((dbResData) => res.json(dbResData));
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((dbUpdatedData) => res.json(dbUpdatedData));
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbResData) => {
    if (!dbResData) {
      res.json({ message: "Data not found" });
      return;
    }
    res.json({ message: "Successfully deleted" });
  });
});

module.exports = router;
