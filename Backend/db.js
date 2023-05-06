
const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/userdata', { useNewUrlParser: true })
    .then(()=> console.log("connected successfully"))
    .catch((err)=>{console.log(err);});
}



module.exports = connectToMongo;
