const commentController = require('../controllers/commentController.js')
const verifyToken = require('./verifyToken.js')


const router = require('express').Router()


// the differents routes
router.post('/addComment/:postId', verifyToken, commentController.addComment)
router.get('/getAllComment/:postId', verifyToken, commentController.getAllComment)
router.delete('/:id', verifyToken, commentController.deleteComment)


module.exports = router