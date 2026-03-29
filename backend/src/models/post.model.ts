import mongoose from "mongoose";

interface IPost extends mongoose.Document {
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  author: mongoose.Types.ObjectId;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    tags: {
      type: [String],  
      default: [],
    },      
    published: {
      type: Boolean,
      default: false,   
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",      
      required: true,
      index: true,      
    },
    readingTime: {
      type: Number,
      default: 1,       
    },
  },
  {
    timestamps: true,
});

postSchema.pre("save", function () {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
});

// When someone loads the blog feed, we sort by newest first
postSchema.index({ published: 1, createdAt: -1 });

export const Post = mongoose.model<IPost>("Post", postSchema);
