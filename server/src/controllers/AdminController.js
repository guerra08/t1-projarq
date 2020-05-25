const knex = require('../database/knex')

module.exports = {
    async addStudentsFromFile(req, res){
        try{
            const students = req.body;
            if(students.length <= 0){
                return res.sendStatus(400)
            }
            const op = await knex('students').insert(students)
            if(!op){
                return res.sendStatus(400)
            }
            return res.sendStatus(201)
        }catch (e) {
            console.log(e)
            return res.sendStatus(400)
        }
    }
}