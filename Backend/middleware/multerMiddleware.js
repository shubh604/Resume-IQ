const multer = require("multer");

const storage = multer.diskStorage({

    destination : function(req,file,cb)
    {
        cb(null,"./uploads")
    },

    filename : function(req,file,cb)
    {
        cb(null, `${Date.now()}-${file.originalname}`)
    }

});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") 
    {
        cb(null, true)
    }
    else 
    {
        cb(new Error("Only PDF files are allowed"), false)
    }
}

const upload = multer({

    storage : storage,
    limits : {fileSize : 5*1024*1024},
    fileFilter : fileFilter

});

module.exports = upload;