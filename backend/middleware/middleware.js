const jwt = require("jsonwebtoken");

//authenticates users with token
function authJWT(req, res, next) {
    const token = req.cookies.token;
    console.log("Token: ", token);
    if(!token) {
        return res.json({ message: "Access denied. Token is missing", status: "unauthorized" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log("Decoded user:", req.user);
        next();
    } catch (error) {
        return res.json({ message: "Error with token", status: "error"});
    }
}

//authorises users based on the role: admin, client, provider
function authorize(allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;
        console.log(`User role: ${userRole}`);
        if(!allowedRoles.includes(userRole)){
            return res.json({ message: "Unauthorized access", status: "unauthorized" });
        }
        next();
    }
    
}

module.exports = {
    authJWT,
    authorize
};