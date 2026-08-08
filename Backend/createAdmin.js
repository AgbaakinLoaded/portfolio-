const pool = require("./config/db");
const bcrypt = require("bcrypt");


async function createAdmin(){

    try {

        const email = "akindeleemmanuel39@gmail.com";
        const password = "pppaaasssswwwooorrrddd";


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        await pool.query(

            `INSERT INTO admins(email, password)
             VALUES($1,$2)`,

            [
                email,
                hashedPassword
            ]

        );


        console.log("Admin created successfully 🚀");


        process.exit();


    } catch(error){

        console.log(error);

        process.exit(1);

    }

}


createAdmin();