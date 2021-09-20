require('dotenv').config()
const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(express.json())
const users = []

//Create tailored schedule for each administration staff member
const schedule = [
    {
        name: "Susan",
        message: "You are responsible for recording attendances in Mr. Jones' class this week"
    },
    {
        name: "Fred",
        message: "You are responsible for recording attendances in Ms. Smith's class this week"
    }
]

//Routes

app.get('/schedule', authenticateToken, (req, res) => {
    res.json(schedule.filter(sched => sched.name == req.user.name))
})

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
            //Authorize and manage session access via JSON Web Tokens (JWTs)
            //Associate token with a user and sign it for security purposes 
            const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({access_token: access_token}) 
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
})

function authenticateToken(req, res, next) {
    //Once access token is generated, retrieve it from headers
    //Of form: BEARER TOKEN
    //Therefore split by space and retrieve second element for only TOKEN to authenticate
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    //Verify that retrieved token matches the one created at initial login
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        //Once verified, move on from middleware to executing rest of GET request
        //Find matched user and pass into request body for later use
        req.user = user
        next()
    })

}

// app.post('/login', (req, res) => {
//     //Authenticate user
//     const username = req.body.username
//     const user = {name: username}
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken: accessToken})
// })

app.listen(3000)