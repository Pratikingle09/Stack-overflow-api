const express = require('express')
const router = express.Router()
const {postAnswer,deleteAnswer} = require('../controllers/Answers')
const auth = require('../middlewares/auth')


router.patch('/post/:id',auth,postAnswer)     // we are not using post because we are not adding new data to db but just updating already present field in the db
router.patch('/delete/:id', auth,deleteAnswer)  


module.exports=router