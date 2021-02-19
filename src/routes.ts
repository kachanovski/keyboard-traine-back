import * as express from 'express';

const addCard = require('./Controllers/Cards/addCard')

const getCards = require('./Controllers/Cards/getCards')
const deleteCard = require('./Controllers/Cards/deleteCard')
const updateCard = require('./Controllers/Cards/updateCard')
//
//const login = require('./Controllers/Auth/login')
const register = require('./Controllers/Auth/register')
const logOut = require('./Controllers/Auth/logOut')
const {getMe} = require('./Controllers/Auth/getMe')

const multer = require("multer");
const addQuizQuestion = require('./Controllers/Quiz/addQuestion')
const getQuizQuestion = require('./Controllers/Quiz/getQuestions')
const storage = require('./Middleware/upload')
const {fileFilter} = require("./Middleware/upload")

const upload = multer({storage, fileFilter});

const addResult = require('./Controllers/Results/addResult')
const getResults = require('./Controllers/Results/getResults')

const getUserResults = require('./Controllers/Results/getUserResults')

const updateProfilePhoto = require('./Controllers/Profile/updateProfilePhoto')

const getUsers = require('./Controllers/Users/getUsers')
const deleteUser = require('./Controllers/Users/deleteUser')
const updateUser = require('./Controllers/Users/updateUser')


const router = express.Router();
//cards
router.post('/card', addCard)
router.get('/card', getCards)
router.delete('/card', deleteCard)
router.put('/card', updateCard)

//auth
router.post('/login',  require('./Controllers/Auth/login'))
router.get('/auth', getMe)
router.post('/register', register)
router.delete('/logout', logOut)

// quiz
router.post('/quiz', upload.single('quizImgQuestion'), addQuizQuestion)
router.get('/quiz', getQuizQuestion)

//results
router.post('/result', addResult)
router.get('/result', getResults)

router.get('/my-result', getUserResults)

//profile
router.post('/user/photo',  updateProfilePhoto)
//users
router.get('/users', getUsers)
router.delete('/users', deleteUser)
router.put('/users', updateUser)

module.exports = router
