const jwt = require('jsonwebtoken');
let dotenv = require('dotenv').config();
const jwtkey= dotenv.parsed.access_key;
function verifyToken(token, next) {
if (!token) return false;
try {
   const decoded = jwt.verify(token, jwtkey);
      if(decoded){return true}
      else{return false}
 } catch (error) {
   console.log(error)
   return {error:error};
 }
 };

module.exports = verifyToken;