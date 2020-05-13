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
            const students = await knex('students')
                .select(['students.id', 'students.name', 'students.code', 'students.email', 'students.phone',
                    'courses.id as course_id', 'courses.name as course_name', 'courses.building as course_building'])
                .join('courses', 'courses.id', 'students.course')
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
    },

    async addStudentsToTeam(req, res){
        try{
            const {teamId, students} = req.body
            const rows = students.map((student) => {
                return {'student': student, 'team': teamId}
            })
            const op = await knex('teams_students').insert(rows)
            if(!op){
                return res.sendStatus(400)
            }
            return res.json({"team_id": teamId})
        }catch (e) {
            return res.send(e)
        }
    }
}