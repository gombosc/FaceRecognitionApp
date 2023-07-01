const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;

    // Check if email or password field are empty
    if (!email || !password){
        return res.status(400).json("Incorrect Form Submission")
    }

    db.select('email', 'hash').from('app_login')
        .where('email', '=', email)
        .then(data =>{
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                return db.select('*').from('app_users')
                .where('email', '=', email)
                .then(user=>{
                    res.json(user[0])
                })
                .catch(err => res.status(400).json("Unable to get User"))
            }else{
                res.status(400).json("Wrong Credentials!")
            }
        })
    .catch(err => res.status(400).json('Wrong Credentials'))
    }

    module.exports = {
        handleSignIn: handleSignIn
}