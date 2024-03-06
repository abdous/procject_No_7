const postController = require('../controllers/userPostController.js')
const verifyToken = require('./verifyToken.js')
const multer = require('../routes/multer-config')

const router = require('express').Router()


// the differents routes
router.post('/addPost', verifyToken, multer, postController.addpost)
router.get('/getAllPost', postController.getAllPostFromUser)

router.get('/:id', postController.getOnePostFromUser)
router.delete('/:id', verifyToken, postController.deletingOnePost)

// router.put('/:id', verifyToken, postController.upDatePost)


module.exports = router