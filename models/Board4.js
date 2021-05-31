const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
//--legacy-peer-deps

const BoardSchema = new mongoose.Schema({
    idx:{
        type : Number,
        require:true
    },
    rsvTme:{
        type : Date,
        require : true
    },
    content : {
        type : String,
        require:true
    },
    important:{
        type : Boolean,
        require : true
    },
    imgaesUri:{
        type : String,
        require : false
    },
    userIp:{
        type:String,
        require:false
    }
}, {timestamps:true});

BoardSchema.plugin(autoIncrement, {id:'board_seq4', inc_field: 'idx'});

const Board4 = mongoose.model('board4', BoardSchema);



module.exports = {Board4};