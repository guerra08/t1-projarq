module.exports = {
    createTeam(teamData){
        return {
            name: teamData.name,
            created_by: teamData.created_by
        }
    }
}