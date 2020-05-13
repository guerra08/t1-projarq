module.exports = {
    createCourse(courseData){
        return {
            name: courseData.name,
            building: courseData.building
        }
    }
}