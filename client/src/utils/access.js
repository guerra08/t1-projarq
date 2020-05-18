/**
 * Returns boolean.
 * @param {string} type The user account type (admins, students, professors)
 */
export function checkAccess(type){
    if(localStorage.getItem("userType") === type && localStorage.getItem("userId")){
        return true;
    }
    return false
}

/**
 * Updates the localStorage
 * @param {Object} data. Attributes: userId, userType, name 
 */
export function updateLocalStorage(data){
    if(data){
        localStorage.setItem('userId', `${data.userId}`)
        localStorage.setItem('userType', `${data.userType}`)
        localStorage.setItem('name', `${data.name}`)
    }
}

/**
 * Cleans the localStorage. Used for logout.
 */
export function cleanLocalStorage(){
    localStorage.removeItem('userId')
    localStorage.removeItem('userType')
    localStorage.removeItem('name')
}