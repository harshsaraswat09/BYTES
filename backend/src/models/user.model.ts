import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
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
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  console.log("pre save hook running...");
  console.log("password modified?", this.isModified("password"));

  if (!this.isModified("password")) return;

  console.log("hashing password...");
  this.password = await bcrypt.hash(this.password, 12);
  console.log("hashed:", this.password);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  console.log("comparing passwords..."); // ADD THIS
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log("match result:", result); // ADD THIS
  return result;
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export const User = mongoose.model<IUser>("User", userSchema);