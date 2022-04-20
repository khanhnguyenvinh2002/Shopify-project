const router = require("express").Router();
const Inventory = require("../models/Inventory");

//CREAT INVENTORY
router.post("/", async (req, res) => {
    const newInventory = new Inventory(req.body);
    try {
        const savedInventory = await newInventory.save();
        res.status(200).json(savedInventory);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//UPDATE INVENTORY
router.put("/:id", async (req, res) => {
    //find inventory
    try {
        const inventory = await Inventory.findById(req.params.id);
        const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedInventory);
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    //find inventory
    try {
        const inventory = await Inventory.findById(req.params.id);

        await inventory.delete()
        res.status(200).json("Inventory has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET INVENTORY BY ID
router.get("/:id", async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        res.status(200).json(inventory);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL INVENTORIES
router.get("/", async (req, res) => {
    const manufacturer = req.query.manufacturer;
    try {
        let inventories;
        if (manufacturer) {
            inventories = await Inventory.find({ manufacturer })
        } else {
            inventories = await Inventory.find()
        }
        res.status(200).json(inventories);
    }
    catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;