const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Admin Login

exports.loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Find admin
        const result = await pool.query(
            "SELECT * FROM admins WHERE email=$1",
            [email]
        );


        if(result.rows.length === 0){

            return res.status(401).json({
                message:"Invalid email or password"
            });

        }



        const admin = result.rows[0];



        // Check password

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );


        if(!isMatch){

            return res.status(401).json({
                message:"Invalid email or password"
            });

        }




        // Create token

        const token = jwt.sign(

            {
                id: admin.id,
                email: admin.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );




        res.json({

            message:"Login successful",

            token

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Login failed"

        });


    }



};

// Verify logged-in admin

exports.verifyAdmin = async (req, res) => {

    res.json({
        authenticated: true,
        admin: req.admin
    });

};