const connectToMongo = require('./db');
const express = require("express");
const cors = require('cors');
const newUser = require('./models/User');
const User = require('./models/User');

connectToMongo();

const app = express()

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {

    res.send('Hello world')
})



app.post('/insert', async (req, res) => {
    const FullName = req.body.fullName
    const Age = req.body.Age
    const Sex = req.body.Sex
    const Mobile = req.body.Mobile
    const Address = req.body.Address
    const GovtId = req.body.GovtId
    const Guardian = req.body.guardian
    const Nationality = req.body.Nationality

    const formData = new newUser({
        fullName: FullName,
        age: Age,
        sex: Sex,
        mobile: Mobile,
        address: Address,
        govtId: GovtId,
        guardian: Guardian,
        nationality: Nationality
    })

    try {
        await formData.save();
        res.send("inserted data..")
    } catch (err) {
        console.log(err)
    }
});


app.get('/get', (req, res) => {
    User.find().then((err, result) => {
        if (err) {
            res.send(err)
        } else
            res.send(result)

    })
})


const port = 4000

app.listen(port, () => {
    console.log(`on port ${port}!!!`)
})


