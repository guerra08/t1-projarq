module.exports = {
    createStudent(studentData){
        return {
            name: studentData.name,
            code: studentData.code,
            email: studentData.email,
            phone: studentData.phone,
            course: studentData.course
        }
    }
}