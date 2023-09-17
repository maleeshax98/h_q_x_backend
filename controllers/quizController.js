const mongoose = require("mongoose")
const Quiz = require("../models/quizModel")
const User = require("../models/userModel")


const getAllQuizes = async (req, res) => {
    try {
        const quizes = await Quiz.find({}).sort({createdAt: -1})
        return res.status(200).json(quizes)
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: "Somthing went wrong"})
    }
}

const userType = async (req, res) => {
    try{
        const { id } = req.user

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Somthing went wrong'})
        }
        const user = await User.findOne({ _id: id })
        if(user.role === "user"){
            return res.status(403).json({error: "Somthing went wrong"})
        }
        if(user.role === "admin"){
            const userDetails = {
                id: user._id
            }
            return res.status(201).json({user: userDetails})
        } 
        return res.status(400).json({error: "Somthing went wrong"})
        
    } catch(err){
        console.log(err)
        return res.status(400).json({error: "Somthing went wrong"})
    }
}

const addQuiz = async (req, res) => {
    try{
        const { id } = req.user

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Somthing went wrong'})
        }
        const user = await User.findOne({ _id: id })

        if(user.role != "admin"){
            return res.status(400).json({error: "Somthing went wrong"})
        } 

        const { a1, a2, a3, a4, correct, q } = req.body
        const answers = [a1, a2, a3, a4]
        const data = {
            question: q,
            answers: answers,
            correctAnswer: Number(correct)
        }
        const quiz = await Quiz.create(data)

        return res.status(201).json(quiz)

    } catch(err){
        console.log(err)
        return res.status(400).json({error: "Somthing went wrong"})
    }
}


const getSingleQuiz = async (req, res) => {

    try{
        const { id } = req.params


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Somthing went wrong'})
        }
        
        // const quiz = await Quiz.findOne({ _id: id})
        const quiz2 = await Quiz.findOne({ _id: id}).populate({path: "faild", select:['userName', "_id"]}).populate({path: "correct", select:['userName', "_id"]})
        return res.status(201).json(quiz2)

    } catch(err){
        console.log(err)
        return res.status(400).json({error: "Somthing went wrong"})
    }
}

const updateQuiz = async (req, res) => {
    // direct request handle please

    const { id, } = req.user
    const {  docId, correctAnswer, answer  } = req.body
    
    let state = ''
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Somthing went wrong'})
    }

    if(!mongoose.Types.ObjectId.isValid(docId)){
        return res.status(404).json({error: 'Somthing went wrong'})
    }

    const user = await User.find({ _id: id })

    if(!user){
        return res.status(400).json({error: "Somthing went wrong"})
    }
    console.log(correctAnswer, answer)
    if(correctAnswer === answer){
        state = "won"
    }else{
        state = "fail"
    }

    try{
        if(state == "won"){
            const quiz = await Quiz.findOneAndUpdate(
                { _id: docId }, // Filter for the document you want to update
                { $addToSet: { correct: id } }, // Update operation
                { new: true } // Option to return the updated document
            )
            console.log(quiz)
            const userWins = await User.findOne({_id: id}).select("wins")
            // const newValue
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $set: { wins: userWins.wins + 1 } },
                { new: true },
            )

            return res.status(201).json(quiz)

        } else if(state == "fail"){
            const quiz = await Quiz.findOneAndUpdate(
                { _id: docId }, // Filter for the document you want to update
                { $addToSet: { faild: id } }, // Update operation
                { new: true } // Option to return the updated document
            )
            console.log(quiz)
            return res.status(201).json(quiz)
        } else {
            return res.status(400).json({error: "Somthing went wrong"})
        }
    } catch(err){
        return res.status(400).json({error: "Somthing went wrong"})
    }

}


const getLeaderBoard = async (req, res) => {
    try{
        const users = await User.find({ }).sort({ wins: -1 }).select("userName wins")
        return res.status(200).json({ users })
    } catch(err){
        return res.status(400).json({error: "Somthing went wrong"})

    }
}

module.exports = { getAllQuizes, userType, addQuiz, getSingleQuiz, updateQuiz, getLeaderBoard }