const multer = require("multer");
const path = require("path");


// Storage settings
const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, "uploads/");

    },


    filename: function(req, file, cb){

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});


// File filter
const fileFilter = (req, file, cb)=>{


    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"
    ];


    if(allowedTypes.includes(file.mimetype)){

        cb(null, true);

    }else{

        cb(
            new Error("Only image files allowed"),
            false
        );

    }


};



const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});


module.exports = upload;