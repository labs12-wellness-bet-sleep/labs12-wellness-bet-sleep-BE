const bcrypt = require("bcryptjs");
const users = require("../data/users/usersDB.js");

function createHashedPassword(user){
    let {username, password} = user; 
    const hashedPassword = bcrypt.hashSync(password, 12);

    user = {... user, password: hashedPassword};
    return user; 
}

function checkPassword(user) {
    let {username, password} = user; 
    
    users.login(user)
    .then( retrievedUser => {
        
        if(bcrypt.compareSync(retrievedUser.password, password)){


        }; 
    
    })
    .catch(() => {

        
    })
}