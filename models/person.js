const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// pre-save hook to hash password
personSchema.pre('save', async function () {
    if (!this.isModified('password')) return; // do nothing if the password is not modified

    try {
        // generate salt 
        const salt = await bcrypt.genSalt(10);

        // hash the password
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err; // Mongoose will catch this error automatically
    }
});



personSchema.methods.isValidPassword = async function (enteredPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};

// comparision password ka aese hoga pehle actual password lekar salt extract karega fir us salt se entered password ko hash karega aur dono hashed password ko compare karega 

// create and export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;