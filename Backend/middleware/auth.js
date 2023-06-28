const jwt = require('jsonwebtoken');
const sToken = process.env.TOKEN;

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const readToken = jwt.verify(token, sToken);
        const userId = readToken.userId;
        req.auth = {userId : userId};
        next();
    }
    catch(error){res.status(401).json({error})};
}