const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:[true, 'Full Name is required'],
        trim: true,
    },

    email:{
        type: String,
        required:[true, 'email is required'],
        unique: true,
    },

    phoneNumber:{
        type: Number,
        required:[true, 'phoneNumber is required'],
        unique: true,
    },

    dob:{
        type: Date,
        required:[true, 'dob is required'],
    },

    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female', 'other'],
      },

    ticketId:{
        type: String,
        required:[true, 'ticketId is required'],
        unique: true,
    },
    

})

const User = mongoose.models['ticketusers'] || mongoose.model('ticketusers', userSchema);

module.exports = User