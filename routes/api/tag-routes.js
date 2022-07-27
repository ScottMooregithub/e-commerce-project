const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: {
      model: Product,
      as: "products",
    },
  }).then((dbTagData) => res.json(dbTagData));
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      as: "products",
    },
  }).then((dbTagData) => {
    if (!dbTagData) {
      res.json({ message: "Data not found" });
      return;
    }
    res.json(dbTagData);
  });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((dbResData) => res.json(dbResData));
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((dbUpdatedData) => res.json(dbUpdatedData));
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
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
