const express = require('express')
const { celebrate, Joi, errors, Segments } = require('celebrate');
const StudentController = require('./controllers/StudentController')
const TeamController = require('./controllers/TeamController')
const CourseController = require('./controllers/CourseController')
const ProfessorController = require('./controllers/ProfessorController')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello, world!')
})

//Student routes
router.get('/students', StudentController.index)
router.get('/students/:ïd', StudentController.details)
router.post('/students', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        course: Joi.number().required(),
    })
}), StudentController.create)
router.delete('/students/:id', StudentController.delete)

//Professor routes
router.get('/professors', ProfessorController.index)
router.get('/professors/:id', ProfessorController.details)
router.post('professors', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required()
    })
}), ProfessorController.create)
router.delete('/professors/:id', ProfessorController.delete)

//Team routes
router.get('/teams', TeamController.index)
router.get('/teams/:id', TeamController.details)
router.post('/teams', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), TeamController.create)
router.delete('/teams/:id', TeamController.delete)

//Course routes
router.get('/courses', CourseController.index)
router.get('/courses/:id', CourseController.details)
router.post('/courses', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        building: Joi.number().required()
    })
}), CourseController.create)
router.delete('/teams/:id', CourseController.delete)

router.use(errors())

module.exports = router