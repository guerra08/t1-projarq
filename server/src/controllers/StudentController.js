const Student = require('../models/Student')
const knex = require('../database/knex')

module.exports = {
    async create(req, res){
        try {
            const student = Student.createStudent(req.body)
            const [id] = await knex('students').insert(student)
            return res.json({"id": id})
        }catch (e) {
            return res.send(e)
        }
    },

    async delete(req, res){
        try {
            const id = req.params.id
            const op = await knex('students').where('id', id).delete()
            if (!op) {
                return res.sendStatus(204)
            }
            return res.sendStatus(200)
        }catch (e) {
            return res.send(e)
        }
    },

    async index(req, res){
        try{
            const students = await knex('students').select('*')
            return res.json(students)
        } catch (e) {
            return res.send(e)
        }
    },

    async details(req, res){
        try{
            const id = req.params.id
            const student = await knex('students').where('id', id).first()
            if(!student){
                return res.sendStatus(404)
            }
            return res.json(student)
        }catch (e) {
            return res.send(e)
        }
    }
}