const mongoose = require("mongoose")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {})
}

const signUp = async (req, res) => {
    const { email, password, userName } = req.body

    try{

        const user = await User.signup(email, userName, password)

        // create a token
        const token = createToken(user._id)
        const uId = user._id
        const wins = user.wins
        res.status(200).json({email, userName, token, uId, wins})
    } catch(err) {
        res.status(400).json({error: err.message})
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    try{

        const user = await User.login(email, password)
        // create a token
        const token = createToken(user._id)
        const userName = user.userName
        const uId = user._id
        const wins = user.wins

        res.status(200).json({email, userName, token, uId, wins})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}



module.exports = { signUp, login }