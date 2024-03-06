const db = require('../models')




// get the model 
const Post = db.posts

// get all post 
const getAllPostFromUser = async (req, res) => {
    let posts = await Post.findAll({})
    res.status(200).send(posts)
}

// getting user
const getOnePostFromUser = async (req, res) => {
    let id = req.params.id
    let post = await Post.findOne({ where: { id: id } })
    res.status(200).send(post)
}

// creating a coments
const addpost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host')

    let post = {
        description: req.body.description,
        imageUrl: req.file ? url + '/images/' + req.file?.filename : null,
        userId: req.user.id,
        username: req.body.username
    }
    const userPost = await Post.create(post)

    try {
        const savedUserPost = await userPost.save()
        res.status(200).send(savedUserPost)
    } catch (error) {
        res.status(400).send({
            status: 'failed to post a comment',
            message: error
        })
    }
}





// Deleting post 
const deletingOnePost = async (req, res) => {
    let id = req.params.id

    await Post.destroy({ where: { id: id } })
    res.status(200).send({ message: `Post with id ${id} is successfully deleted` })
}

module.exports = {
    addpost,
    getAllPostFromUser,
    getOnePostFromUser,
    deletingOnePost,
}