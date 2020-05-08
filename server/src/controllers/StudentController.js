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
        const id = req.params.id
        const op = await knex('students').where('id', id).delete()
        if(!op){
            return res.sendStatus(204)
        }
        return res.sendStatus(200)
    },

    async index(req, res){
        const students = await knex('students').select('*')
        return res.json(students)
    }
}