const jwt = require("jsonwebtoken");


function protect(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;


        // Check if Authorization header exists

        if (!authHeader) {

            return res.status(401).json({

                message: "Authentication required"

            });

        }


        // Expected format:
        // Bearer TOKEN

        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                message: "Invalid authorization format"

            });

        }


        const token = parts[1];


        // Verify JWT

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        // Attach admin information
        // to the request

        req.admin = decoded;


        next();


    } catch (error) {

        console.log(
            "Authentication error:",
            error.message
        );


        return res.status(401).json({

            message: "Invalid or expired token"

        });

    }

}


module.exports = protect;