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
        const id =  req.param.id
        const op = await knex('teams').where('id', id).delete()
        if(!op){
            return res.sendStatus(204)
        }
        return res.sendStatus(200)
    },

    async index(req, res){
        const teams = await knex('teams').select('*')
        return res.json(teams)
    }
}