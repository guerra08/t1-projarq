const Team = require('../models/Team')
const knex = require('../database/knex')

module.exports = {
    async create(req, res){
        try {
            const team = Team.createTeam(req.body)
            const [id] = await knex('teams').insert(team)
            console.log(id)
            return res.json({"id": id})
        }catch (e) {
            return res.send(e)
        }
    },

    async delete(req, res){
        try{
            const id =  req.param.id
            const op = await knex('teams').where('id', id).delete()
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
            const teams = await knex('teams').select('*')
            return res.json(teams)
        }catch (e) {
            return res.send(e)
        }
    }
}