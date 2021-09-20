require('dotenv').config()
const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(express.json())
const users = []


//Routes
app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {

        //Produce salt to ensure hashes for identical passwords are unique
        //Added security to prevent access to multiple accounts
        //Setup asynchronous call to ensure values ready at assignment

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name,
            password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    
    //Authenticate User

    const user = users.find(user => user.name == req.body.name)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try {
        //Remove salt from stored password, hash passed in password & compare both 
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }


    //Authorize and manage session access via JSON Web Tokens (JWTs)
    

})

// app.post('/login', (req, res) => {
//     //Authenticate user
//     const username = req.body.username
//     const user = {name: username}
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken: accessToken})
// })

app.listen(3000)