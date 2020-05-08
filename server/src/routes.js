const express = require('express')
const { celebrate, Joi, errors, Segments } = require('celebrate');
const StudentController = require('./controllers/StudentController')
const TeamController = require('./controllers/TeamController')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello, world!')
})

//Student routes
router.get('/students', StudentController.index)
router.post('/students', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required()
    })
}), StudentController.create)
router.delete('/students/:id', StudentController.delete)

//Team routes
router.get('/teams', TeamController.index)
router.post('/teams', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), TeamController.create)
router.delete('/teams/:id', TeamController.delete)

router.use(errors())

module.exports = router