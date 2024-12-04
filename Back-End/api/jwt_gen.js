const jwt = require('jsonwebtoken');
const { assign } = require('nodemailer/lib/shared');
let dotenv = require('dotenv').config();
const refresh_key = dotenv.parsed.refresh_key;
const access_key = dotenv.parsed.access_key
exports.create_JWT = (data)=>{
    const {email} = data;
    const refresh_token = jwt.sign({ email }, refresh_key, { expiresIn: '12h' });
    const access_token = jwt.sign({ email }, access_key, { expiresIn: '10m' });
    return {"refresh_token":refresh_token,"access_token":access_token}
}

exports.refresh_JWT = async (refresh_token)=>{
    const decoded = await jwt.verify(refresh_token, refresh_key);
    if(!decoded){
        return false;
    }
    else {
        const email = decoded.email;
        const access_token =  jwt.sign({ email }, access_key, { expiresIn: '10m' });
        return {"access_token":access_token};
    }
}