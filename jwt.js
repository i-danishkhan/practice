const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // first check if the token is provided in the request headers
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({ error: 'No authorization header provided' });
    }

    // extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// function to generate a JWT token for a user
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = {jwtAuthMiddleware, generateToken};