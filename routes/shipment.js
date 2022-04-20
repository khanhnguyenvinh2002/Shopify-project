const router = require("express").Router();
const Shipment = require("../models/Shipment");
const Inventory = require("../models/Inventory");
const db = require('../app');

async function updateInventory(list) {

    for (const e of list) {
        let item = await Inventory.findOneAndUpdate({
            _id: e._id,
            count: { $gte: e.count }
        }
            , {
                $inc: {
                    count: - e.count
                }
            }, { useFindAndModify: false })

        if (item == null || item.count < e.count) {

            throw `not enough items for item: ${e.title}, item count: ${item.count}, new count: ${e.count}`;
        }

        item = await Inventory.findOne({
            _id: e._id,
            count: { $gte: 0 }
        });

        if (item == null) {
            throw "error occured during process, please try again"
        }
    }
}
//CREATE SHIPMENT
router.post("/", async (req, res) => {
    let item = await Shipment.findOne({title: req.body.title});
    console.log(item)
    if(item != null){
        res.status(500).json("err");
        return;
    }
    console.log("still in")
    req.body.inventories = JSON.parse(req.body.inventories)
    const newShipment = new Shipment(req.body);
    console.log(req.body)
    const session = await db.startSession();
    try {
        session.startTransaction();
        const listInventory = newShipment.inventories;
        await updateInventory(listInventory);
        const savedShipment = await newShipment.save();

        await session.commitTransaction();
        res.status(200).json(savedShipment)

    }
    catch (err) {
        await session.abortTransaction();
        res.status(500).json(err);
    }
})
//UPDATE SHIPMENT STATUS
router.put("/:id", async (req, res) => {
    //find shipment
    try {
        const shipment = await Shipment.findById(req.params.id);

        const updatedShipment = await Shipment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { useFindAndModify: false });
        res.status(200).json(updatedShipment);
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    //find shipment
    try {
        const shipment = await Shipment.findById(req.params.id);

        await shipment.delete()
        res.status(200).json("Shipment has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET SHIPMENT BY ID
router.get("/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        res.status(200).json(shipment);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL SHIPMENTS
router.get("/", async (req, res) => {
    const status = req.query.status;
    try {
        let shipments;
        if (status) {
            shipments = await Shipment.find({ status })
        } else {
            shipments = await Shipment.find()
        }
        res.status(200).json(shipments);
    }
    catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;