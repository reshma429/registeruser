const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    fullName: {
        type: String,
    
    },
    age: {
        type: String,
        
    },
    sex: {
        type: String,
    
    },
    mobile: {
        type: String,
    
    },
    address: {
        type: String,

    },
    govtId: {
        type: String,
        
    },
    guardian:{
        type: String,
        

    },
    nationality:{
        type: String,
        

    }
});

const User = mongoose.model('User', ReactFormDataSchema);
module.exports = User;