const Team = require('../models/Team')
const knex = require('../database/knex')

const getDetailedTeams = async () => {
    try {
        const teamsData = await knex.raw(`select t.id as id, t.name as name from teams t`)
        if (!teamsData || teamsData.length === 0) {
            return null;
        }
        let complete = []
        for (const item of teamsData) {
            const [dbData] = ((await knex.raw('select count(*) as ratings, (sum(tr.working) +  sum(tr.process) + sum(tr.team_formation) + sum(tr.pitch) + sum(tr.innovation)) as value from teams_ratings tr where tr.team = ?', [item.id])))
            complete.push(
                {
                    id: item.id,
                    name: item.name,
                    participants: ((await knex.raw('select s.name from teams_students ts, students s where ts.team = ? and ts.student = s.id', [item.id]))),
                    score: (dbData.value === null) ? '-' : dbData.value,
                    ratings: dbData.ratings,
                    hasMinRatings: dbData.ratings >= 3
                }
            )
        }
        return complete;
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    async create(req, res) {
        try {
            const team = Team.createTeam(req.body)
            const [id] = await knex('teams').insert(team)
            return res.json({ "id": id })
        } catch (e) {
            return res.send(e)
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id
            const op = await knex('teams').where('id', id).delete()
            if (!op) {
                return res.sendStatus(204)
            }
            return res.sendStatus(200)
        } catch (e) {
            return res.send(e)
        }
    },

    async index(req, res) {
        try {
            const teams = await knex('teams').select('*')
            return res.json(teams)
        } catch (e) {
            return res.send(e)
        }
    },

    async details(req, res) {
        try {
            const id = req.params.id
            const team = await knex('teams').where('id', id).first()
            if (!team) {
                return res.sendStatus(404)
            }
            return res.json(team)
        } catch (e) {
            return res.send(e)
        }
    },

    async indexComplete(req, res) {
        try {
            const { filterScore } = req.query;
            const data = await getDetailedTeams()
            if (filterScore === 'desc' && data) {
                data.sort(function (a, b) {
                    if (a.score < b.score) {
                        return 1;
                    }
                    if (a.score > b.score) {
                        return -1;
                    }
                    return 0;
                });
            }
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }
}