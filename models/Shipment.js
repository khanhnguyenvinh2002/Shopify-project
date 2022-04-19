const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    }, 
    desc:{
        type:String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    inventories:{
        type: Array,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Shipment", ShipmentSchema);