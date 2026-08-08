const pool = require("../config/db");
const fs = require("fs");
const path = require("path");


// Get all blogs
exports.getBlogs = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM blogs ORDER BY id DESC"
        );

        res.json(result.rows);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};


// Get single blog
exports.getBlogBySlug = async (req,res)=>{


    try{


        const { slug } = req.params;


        const result = await pool.query(

            "SELECT * FROM blogs WHERE slug=$1",

            [slug]

        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Blog not found"
            });

        }


        res.json(result.rows[0]);



    }catch(error){


        console.log(error);


        res.status(500).json({
            message:"Server error"
        });


    }


};


// Create Blog
exports.createBlog = async(req,res)=>{


    try{


        const {
            title,
            slug,
            excerpt,
            content,
            category,
            tags
        } = req.body;

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : null;


        const result = await pool.query(

            `INSERT INTO blogs
            (
            title,
            slug,
            excerpt,
            content,
            image,
            category,
            tags
            )

            VALUES($1,$2,$3,$4,$5,$6,$7)

            RETURNING *`,

            [
                title,
                slug,
                excerpt,
                content,
                image,
                category,
                tags
            ]

        );



        res.status(201).json(result.rows[0]);



    }catch(error){


        console.log(error);


        res.status(500).json({
            message:"Could not create blog"
        });


    }


};


// Update Blog
exports.updateBlog = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            slug,
            excerpt,
            content,
            category,
            tags

        } = req.body;

        // Get current blog
        const oldBlog = await pool.query(
            "SELECT * FROM blogs WHERE id=$1",
            [id]
        );


        if (oldBlog.rows.length === 0) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }


        let image = oldBlog.rows[0].image;


        // New image uploaded
        if (req.file) {

            // Delete old image if it exists
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


        const result = await pool.query(

            `UPDATE blogs
             SET
                title=$1,
                slug=$2,
                excerpt=$3,
                content=$4,
                image=$5,
                category=$6,
                tags=$7
             WHERE id=$8
             RETURNING *`,

            [
                title,
                slug,
                excerpt,
                content,
                image,
                category,
                tags,
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


// Delete Blog
exports.deleteBlog = async(req,res)=>{

    try{

        const { id } = req.params;


        // Get blog first
        const blog = await pool.query(

            "SELECT * FROM blogs WHERE id=$1",

            [id]

        );


        if(blog.rows.length === 0){

            return res.status(404).json({

                message:"Blog not found"

            });

        }



        const image = blog.rows[0].image;



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

            "DELETE FROM blogs WHERE id=$1",

            [id]

        );



        res.json({

            message:"Blog deleted successfully"

        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Delete failed"

        });


    }


};