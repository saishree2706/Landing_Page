import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    userID: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

export default mongoose.model('User', userSchema);
