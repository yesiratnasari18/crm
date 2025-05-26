import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    
    next();
    // Verifikasi token
    // jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    //     if (err) {
    //         return res.status(403).json({ message: 'Invalid or expired token.' });
    //     }
        
        // Jika token valid, lanjutkan ke route berikutnya
    //     req.user = decoded;  // Menyimpan decoded token di request object
    // });
};

export default verifyToken;
