const express = require('express')
const router = express.Router()
const { signup , login } = require('../controllers/auth')
const { getAllUsers,updateProfile } = require('../controllers/users')
const auth = require('../middlewares/auth')


router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',auth,updateProfile)

module.exports=router