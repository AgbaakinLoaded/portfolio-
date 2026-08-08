const pool = require("../config/db");
const fs = require("fs");
const path = require("path");



// Get all projects

exports.getProjects = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM projects ORDER BY id DESC"
        );


        res.json(result.rows);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};



// Create project

exports.createProject = async (req, res) => {

    try {

        const {
            title,
            slug,
            category,
            description,
            overview,
            demo,
            github,
            tools
        } = req.body;



        const image = req.file
            ? `/uploads/${req.file.filename}`
            : null;



        const projectTools = tools
            ? JSON.parse(tools)
            : [];



        const result = await pool.query(

            `INSERT INTO projects
            (
                title,
                slug,
                category,
                description,
                overview,
                image,
                demo,
                github,
                tools
            )

            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)

            RETURNING *`,

            [

                title,

                slug,

                category,

                description,

                overview,

                image,

                demo,

                github,

                projectTools

            ]

        );


        res.status(201).json(result.rows[0]);


    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Could not create project"

        });


    }

};

// Update project



exports.updateProject = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            slug,
            category,
            description,
            overview,
            demo,
            github,
            tools
        } = req.body;


        // Get existing project
        const existing = await pool.query(
            "SELECT image FROM projects WHERE id=$1",
            [id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        let image = existing.rows[0].image;

        // If a new image was uploaded
        if (req.file) {

            // Delete old image (if it exists)
            if (image) {

                const oldImagePath = path.join(
                    __dirname,
                    "..",
                    image
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

            }

            image = `/uploads/${req.file.filename}`;
        }


        const projectTools = tools
            ? JSON.parse(tools)
            : [];


        const result = await pool.query(

            `UPDATE projects
             SET
                title=$1,
                slug=$2,
                category=$3,
                description=$4,
                overview=$5,
                image=$6,
                demo=$7,
                github=$8,
                tools=$9
             WHERE id=$10
             RETURNING *`,

            [
                title,
                slug,
                category,
                description,
                overview,
                image,
                demo,
                github,
                projectTools,
                id
            ]

        );

        res.json(result.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Update failed"
        });

    }

};

// Delete project

exports.deleteProject = async (req, res) => {

    try {

        const { id } = req.params;


        // Get project image first
        const project = await pool.query(
            "SELECT image FROM projects WHERE id=$1",
            [id]
        );


        if(project.rows.length === 0){

            return res.status(404).json({

                message:"Project not found"

            });

        }



        const image = project.rows[0].image;



        // Delete image file
        if(image){

            const imagePath = path.join(
                __dirname,
                "..",
                image
            );


            if(fs.existsSync(imagePath)){

                fs.unlinkSync(imagePath);

            }

        }




        // Delete database record
        await pool.query(
            "DELETE FROM projects WHERE id=$1",
            [id]
        );



        res.json({

            message:"Project deleted successfully"

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Delete failed"

        });


    }

};
exports.getProjectBySlug = async (req, res) => {

    try {

        const { slug } = req.params;

        const result = await pool.query(
            "SELECT * FROM projects WHERE slug = $1",
            [slug]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};