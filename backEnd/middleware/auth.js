const jwt = require('jsonwebtoken');
const JWT_SECRET = "jbu$fPhG&472GyuMg3+#PhG&472Gy" //random string

const auth = (req, res, next) => {
    //get token from header
    const token = req.header('Authorization')?.replce('Bearer','');

    if(!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    try {
        //verify token
        const decoded = jwt.verify(JWT_SECRET);
        // Attach user info to the req object
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
};

module.exports = auth;