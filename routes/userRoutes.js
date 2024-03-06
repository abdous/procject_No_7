const userController = require('../controllers/userController.js')
const verifyToken = require('./verifyToken.js')

const router = require('express').Router()

router.post('/signup', userController.userSignup)
router.get('/allUser', verifyToken, userController.getAllUsers)
router.post('/login', userController.userLogin)
router.get('/profile', verifyToken, userController.userProfile)
router.get('/logout', verifyToken, userController.userlogout)

router.get('/:id', verifyToken, userController.getOneUser)
router.delete('/:id', verifyToken, userController.deletingOneUser)


module.exports = router