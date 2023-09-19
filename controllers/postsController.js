const mongoose = require("mongoose")
const Post = require("../models/postModel")
const User = require("../models/userModel")

const makePost = async (req, res) => {

    try{
        const { id } = req.user

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Somthing went wrong'})
        }
        const user = await User.findOne({ _id: id })

        if(user.role != "admin"){
            return res.status(400).json({error: "Somthing went wrong"})
        } 

        const {  caption, img  } = req.body

        const post = Post.create({ caption, img})

        return res.status(201).json(post)

    } catch (err) {
        console.log(err)
        return res.status(400).json({error: "Somthing went wrong"})

    }

}

const getAll = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1})
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: "Somthing went wrong"})
    }
}

module.exports = { makePost, getAll }