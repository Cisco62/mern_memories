import jwt  from "jsonwebtoken";

const auth = async (req, res, next) => {

    try {
        //Checking if the user toke is valid to carry out some operations
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        //Checking if token belongs to the current
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;

            //Checking if it's a google token
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //sub is google's name for a specific id that differentiates every single google user  
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;