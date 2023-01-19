const {
    findEmail,
    insertUser,
} = require ('../model/users')

const bcrypt = require('bcrypt')
const {v4 : uuidv4} = require('uuid')

const userController = {
    register : async (req, res) => {
        try {
            const {fullname, email, password} = req.body;
            const {rowCount} = await findEmail(email);
            if(rowCount){
                res.json({
                    message : `Email already exists`
                })
            }

            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password,salt)
            const id = uuidv4();
            let data = {
                id,
                fullname,
                email,
                password : passwordHash,
                role : 'user',
            }

            console.log(data);

        }catch (e){
            console.log(e);
        }
    },
    login : "",
    refreshToken : "",
    profile : "",
}

module.exports = userController;
