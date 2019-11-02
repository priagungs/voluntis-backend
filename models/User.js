const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    avatar: String,
    phone: String,
    address: String,
    email: {
        type: String,
        unique: true
    },
    password: String
},
{ 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
