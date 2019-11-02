const mongoose = require('mongoose');

const AccidentPointSchema = mongoose.Schema({
    accidents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accident',
    }],
    lon: Number,
    lat: Number
},
{ 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
    }
});

const AccidentPoint = mongoose.model('AccidentPoint', AccidentPointSchema);

module.exports = AccidentPoint;