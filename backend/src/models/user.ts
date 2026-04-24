import mongoose from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
  email: string;
  passwordHash?: string;
  role: "user" | "editor" | "admin";
  isVerified: boolean;
  tokenVersion: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, select: false }, // never returned by default
    role: { type: String, enum: ["user", "editor", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    tokenVersion: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  },
);

//never store plain passwords, always store a hash
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.passwordHash ?? "");
}

const User = mongoose.model<IUser, UserModel>("User", UserSchema);

export default User;
