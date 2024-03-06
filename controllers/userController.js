const db = require('../models')
const becrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const { loginValidation, signupValidation } = require('../validation')




// get the model 
const User = db.users

// user signing up
const userSignup = async (req, res) => {
    const salt = await becrypt.genSalt(10)
    const enCryptedPswd = await becrypt.hash(req.body.password, salt)

    // validate the use data
    const { error } = signupValidation(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    // checking if user email already exist or not
    const emailExist = await User.findOne({ where: { email: req.body.email } })
    if (emailExist) return res.status(400).send({ auth: false, message: 'Email already exist' })

    let userInfo = {
        email: req.body.email,
        username: req.body.username,
        password: enCryptedPswd,
    }
    const user = await User.create(userInfo)

    try {
        const savedUser = await user.save()
        res.status(200).send(savedUser)
        console.log('savedUser', savedUser)
    } catch (error) {
        res.status(400).send({
            status: 'request failed',
            message: error
        })
    }
}


// user login
const userLogin = async (req, res) => {
    // let token = req.cookies.auth;
    // lets validate the user data for login
    const { error } = loginValidation & (req.body)
    if (error) return res.status(404).send(error.details[0].message)

    // checking the user email
    const userExist = await User.findOne({ where: { email: req.body.email } })
    if (!userExist) return res.status(404).send({ isAuth: false, message: 'Invalid Email' })

    // checking user password
    const userHasValidePass = await becrypt.compare(req.body.password, userExist.password)
    if (!userHasValidePass) return res.status(200).send({ isAuth: false, message: 'user does not have a valid password' })

    // creating a token for the user
    const token = JWT.sign({ id: userExist.id }, process.env.TOKEN_SECRET)

    res.header('Authorization', token).send({ token: token, id: userExist.id, username: userExist.username, isAuth: true, })
}

// user profile
const userProfile = async (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.username

    })
};

// user logout
const userlogout = async (req, res, next) => {
    
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.send({ message: 'User is successfully logout' })
            }
        });
    } else {
        res.end()
    }
};



// getting users
const getAllUsers = async (req, res) => {
    let users = await User.findAll({})
    res.status(200).send(users)
}
// getting user
const getOneUser = async (req, res) => {
    let id = req.params.id
    let user = await User.findOne({ where: { id: id } })
    res.status(200).send(user)
}

// Deleting user
const deletingOneUser = async (req, res) => {
    let id = req.params.id
    const user = await User.destroy({ where: { id: id } })
    res.status(200).send({ message: `user with ${id} is successfully deleted` })
}








module.exports = {
    userSignup,
    getAllUsers,
    getOneUser,
    deletingOneUser,
    userLogin,
    userlogout,
    userProfile
}

