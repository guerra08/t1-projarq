const Professor = require('../models/Professor')
const knex = require('../database/knex')

module.exports = {
    async create(req, res){
        try {
            const professor = Professor.createProfessor(req.body)
            const [id] = await knex('professors').insert(professor)
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
            const professors = await knex('professors').select('*')
            return res.json(professors)
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
    },

    async login(req, res){
        try{
            const {code} = req.body
            const professor = await knex('professors').where('code', code).first()
            if(!professor){
                return res.sendStatus(404)
            }
            return res.json(professor)
        }catch (e) {
            return res.send(e)
        }
    },

    async evaluateTeam(req, res){
        try{
            const row = req.body
            const inserted = await knex('teams_ratings').insert(row)
            if(!inserted){
                return res.sendStatus(400)
            }
            return res.sendStatus(201)
        }catch (e) {
            return res.send(e)
        }
    }
}