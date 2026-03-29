import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// This tells TypeScript exactly what a User object looks like
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [21, "Name cannot exceed 21"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // NEVER returned in queries by default
    },
  },
  { timestamps: true },
);


userSchema.pre("save", async function (){

    if (!this.isModified("password"))

    this.password = await bcrypt.hash(this.password, 12);
    
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;   
  return obj;
};


export const User = mongoose.model<IUser>("User", userSchema);