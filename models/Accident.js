const mongoose = require('mongoose');

const AccidentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    lon: Number,
    lat: Number,
    description: String,
    picture: String,
},
{ 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
    }
});

const Accident = mongoose.model('Accident', AccidentSchema);

module.exports = Accident;
