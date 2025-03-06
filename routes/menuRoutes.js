const express = require("express");
const router = express.Router();
const menuItem = require("./../models/menu");
const menu = require("./../models/menu");

// post method for items
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// get method of menu items
router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("data fetched..");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await menuItem.find({ taste: tasteType });
      console.log("response fetched...");
      res.status(300).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put('/:id', async(req, res) => {
try {
  const menuId = req.params.id;
  const updatedMenu = req.body;

  const response = await menu.findByIdAndUpdate(menuId, updatedMenu, {
    new: true,
    runValidators: true,
  });
  
  if (!response) {
    return res.status(404).json({ error: "item not found" });
  }

  console.log('item updated..')
  res.status(200).json(response);
} catch (err) {
  console.log(err);
  res.status(500).json({ error: "internal server error" });
}
})


router.delete('/:id',async (req,res) => {
  try {
    const menuId = req.params.id


    if (!response) {
      return res.status(404).json({ error: "item not found" });
    }

    console.log('item deleted...')
    res.status(200).json(response);
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
})

module.exports = router;
