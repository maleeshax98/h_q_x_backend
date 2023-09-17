const express = require("express")
const router = express.Router()
const {getAllQuizes, userType, addQuiz, getSingleQuiz, updateQuiz, getLeaderBoard} = require("../controllers/quizController")

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// GET all quizes
router.get("/", getAllQuizes)

// Get leaderbaord
router.get('/leaderboard', getLeaderBoard)

// CHECK user type
router.get("/userType", userType)

// GET a single data
router.get('/:id', getSingleQuiz)

// POST quiz
router.post("/", addQuiz)

// UPDATE correct and incorrect answers
router.post('/update', updateQuiz)



module.exports = router