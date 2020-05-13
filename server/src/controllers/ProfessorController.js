const Professor = require('../models/Professor')
const knex = require('../database/knex')

module.exports = {
    async create(req, res){
        try {
            const student = Professor.createProfessor(req.body)
            const [id] = await knex('professors').insert(student)
            return res.json({"id": id})
        }catch (e) {
            return res.send(e)
        }
    },

    async delete(req, res){
        try {
            const id = req.params.id
            const op = await knex('professors').where('id', id).delete()
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
            const students = await knex('professors').select('*')
            return res.json(students)
        } catch (e) {
            return res.send(e)
        }
    },

    async details(req, res){
        try{
            const id = req.params.id
            const student = await knex('professors').where('id', id).first()
            if(!student){
                return res.sendStatus(404)
            }
            return res.json(student)
        }catch (e) {
            return res.send(e)
        }
    }
}