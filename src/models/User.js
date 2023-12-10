import mongoose from "mongoose";

// const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        password: String,
        role: {
            type: String,
            default: "user"
        }
    }, { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema)