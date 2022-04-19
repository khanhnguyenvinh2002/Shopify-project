const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    }, 
    desc:{
        type:String,
        required: true
    },
    count:{
        type: Number,
        required: true
    },
    manufacturer:{
        type: String,
        required: true,
    },
    categories:{
        type:Array,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Inventory", InventorySchema);