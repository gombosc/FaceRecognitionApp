const handleProfile = (req, res) =>{
    const {id} = req.params;
    db.select("*").from("app_users").where({id})
    .then(user=>
        {
            if(user.length){
                res.json(user[0])
        }
        else{
            res.status(400).json("No User found!");
        }
    })
}

module.exports = {
    handleProfile: handleProfile
}