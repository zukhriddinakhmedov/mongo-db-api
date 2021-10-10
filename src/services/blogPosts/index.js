import express from "express"
import createHttpError from "http-errors"
import BlogPostModel from "./schema.js"

const blogPost = express.Router()

blogPost.get("/", async (req, res, next) => {
    try {
        const blogPosts = await BlogPostModel.find()

        res.send(blogPosts)
    } catch (error) {
        next(error)
    }
})
blogPost.get("/:blogPostId", async (req, res, next) => {
    try {
        const blogPostId = req.params.blogPostId

        const blogPost = await BlogPostModel.findById(blogPostId) // similar to findOne, but findOne expects to receive a query as a parameter
        if (blogPost) {
            res.send(blogPost)
        } else {
            next(createHttpError(404, `Post with id ${blogPostId} not found`))
        }
    } catch (error) {
        next(error)
    }
})
blogPost.post("/", async (req, res, next) => {
    try {
        console.log("Hi there")
        const newBlogPost = new BlogPostModel(req.body) //here happens validation of the req.body, if it is not ok Mongoose will
        // throw a "ValidationError"
        const { _id } = await newBlogPost.save() // this is where the interaction with the db/collection happens

        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})
blogPost.put("/", async (req, res, next) => {
    try {
        const blogPostId = req.params.blogPostId
        const modifiedBlogPost = await BlogPostModel.findByIdAndUpdate(blogPostId, req.body, {
            new: true, // returns the modified post
        })

        if (modifiedBlogPost) {
            res.send(modifiedBlogPost)
        } else {
            next(createHttpError(404, `User with id ${blogPostId} is not found `))
        }
    } catch (error) {
        next(error)
    }
})
blogPost.delete("/", async (req, res, next) => {
    try {
        const blogPostId = req.params.blogPostId

        const deletedBlogPost = await BlogPostModel.findByIdAndDelete(blogPostId)

        if (deletedBlogPost) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Post with ${blogPostId} is not found`))
        }
    } catch (error) {
        next(error)
    }
})


export default blogPost