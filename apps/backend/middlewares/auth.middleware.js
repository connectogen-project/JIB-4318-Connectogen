const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided, authorization denied' });
//     }
//
//     try {
//         // Replace 'your_jwt_secret' with your real JWT secret
//         const decoded = jwt.verify(token, process.env.JWT_TOKEN);
//         req.user = decoded; // Attach the decoded payload (e.g. user _id, email) to req.user
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };
//
// module.exports = authMiddleware;

function authMiddleware(req, res, next) {
    console.log("Auth Middleware: req.cookies", req.cookies); // Debug output
    console.log("Request Cookies Header:", req.headers.cookie);
    console.log("Parsed Cookies:", req.cookies);
    const token = req.cookies && req.cookies.jwt;
    if (!token) {
        return res.status(401).json({message: "No token provided, authorization denied"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        return next();

    } catch (err) {
        return res.status(401).json({message: "Token not valid"});
    }
}

module.exports = authMiddleware;
