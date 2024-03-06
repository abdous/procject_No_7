
const db = require('../models')

// get the model 
const Comment = db.comments

// user signing up
const addComment = async (req, res) => {
    let comment = {
        description: req.body.description,
        userId: req.user.id,
        postId: req.params.postId
    }
    const userComment = await Comment.create(comment)

    try {
        const savedComment = await userComment.save()
        res.status(200).send(savedComment)
    } catch (error) {
        res.status(400).send({
            status: 'failed to post a comment',
            message: error
        })
    }
}

// delete comment
const deleteComment = async (req, res) => {
    const comment = await Comment.destroy({ where: { id: req.params.id } })
    res.status(200).send({ message: `comment with ${req.body.id} is successfully deleted` })
}

// get all post 
const getAllComment = async (req, res) => {
    let comments = await Comment.findAll({where: { postId: req.params.postId } })
    res.status(200).send(comments)
}

module.exports = {
    addComment,
    deleteComment,
    getAllComment
}

