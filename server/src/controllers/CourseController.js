const Course = require('../models/Course')
const knex = require('../database/knex')

module.exports = {
    async create(req, res){
        try {
            const course = Course.createCourse(req.body)
            const [id] = await knex('courses').insert(course)
            return res.json({"id": id})
        }catch (e) {
            return res.send(e)
        }
    },

    async delete(req, res){
        try{
            const id = req.params.id
            const op = await knex('courses').where('id', id).delete()
            if(!op){
                return res.sendStatus(204)
            }
            return res.sendStatus(200)
        }catch (e) {
            return res.send(e)
        }
    },

    async index(req, res){
        try{
            const courses = await knex('courses').select('*')
            return res.json(courses)
        }catch (e) {
            return res.send(e)
        }

    }
}