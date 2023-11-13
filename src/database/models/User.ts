import mongoose, { Document, Schema, mongo } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    password: string;
    email: string;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
