module.exports = {
    createProfessor(professorData){
        return {
            name: professorData.name,
            code: professorData.code,
            email: professorData.email,
            phone: professorData.phone
        }
    }
}