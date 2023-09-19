const express = require("express")
const router = express.Router()
const { makePost, getAll } = require("../controllers/postsController")
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// POST post
router.post("/", makePost)
// GET post
router.get("/", getAll)




module.exports = router