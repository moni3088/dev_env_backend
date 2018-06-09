import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
    let token = req.headers['x-access-token'];
    if(token){
        //verifies secret and checks token
        jwt.verify(token, 'WhoMovedMyKeys', (err, decoded)=>{
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        })
    }else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
