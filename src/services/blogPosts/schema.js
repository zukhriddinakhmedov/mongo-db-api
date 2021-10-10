import mongoose from "mongoose"

const { Schema, model } = mongoose

const blogPostSchema = new Schema(
    {
        category: { type: String, required: true },
        title: { type: String, required: true },
        cover: { type: String, data: Buffer },
        readTime: {
            value: { type: Number },
            unit: { type: String },
        },
        author: {
            name: { type: String, required: true },
            avatar: { type: String, required: true },
        },
        content: { type: String, required: true }
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically 
    }
)

export default model("blogPost", blogPostSchema)