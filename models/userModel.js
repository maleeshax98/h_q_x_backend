const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    userName: {
        type: String
    },
    password: {
        required: true,
        type: String
    },
    wins: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        immutable: true,
        default: "user"
    }
})


userSchema.statics.signup = async function(email, userName, password) {
    
    if(!email.trim() || !userName.trim() || !password.trim()){
        throw Error('All fields must be filled')    
    }

    if(!validator.isEmail(email)){
        throw Error('Email not valid')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const user = await this.create({email, userName, password: hashed})

    return user

}

userSchema.statics.login = async function(email, password){
    if(!email.trim() || !password.trim()){
        throw Error('All fields must be filled')    
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model("User", userSchema)