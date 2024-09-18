const jwt = require("jsonwebtoken");

//authenticates users with token
function authJWT(req, res, next) {
    const token = req.cookies.token;
    console.log(token);
    if(!token) {
        throw new Error("Access denied. Token is missing");
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        throw new Error("Error with token");
    }
}

//authorises users based on the role: admin, client, provider
function authorize(userRole) {
    return (req, res, next) => {
        const allowedRole = req.user.role;
        if(allowedRole.includes(userRole)){
            return next();
        } else {
            throw new Error("Unauthorized");
        }
    }
    
}

module.exports = {
    authJWT,
    authorize
};