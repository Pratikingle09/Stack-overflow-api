const express = require('express')
const router = express.Router()
const auth = require('../models/auth')
const Questions = require('../models/Questions')
const mongoose = require('mongoose')
const {AskQuestion,getAllquestions,deleteQuestion,voteQuestion} = require('../controllers/Questions')
const Auth = require('../middlewares/auth')


router.post("/Ask", Auth , AskQuestion)
router.get('/get', getAllquestions)
router.delete('/delete/:id', Auth,deleteQuestion)
router.patch('/vote/:id',Auth,voteQuestion)


module.exports=router