const express = require('express');
const taskController = require('../controller/controller')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const verifyAuthToken = require('../midlewares/verifyAuthToken');



router.get("/",verifyAuthToken, taskController.findAllTasks);
router.post("/",verifyAuthToken, taskController.create);
router.get("/:id",verifyAuthToken, taskController.findOne);
router.patch("/:id",verifyAuthToken, taskController.updateTask);
router.delete("/:id",verifyAuthToken, taskController.delete);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == "image/svg+xml") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.single('image'),verifyAuthToken, (req, res) => {
     let  imgPath = `/uploads/${req.file.filename}`;
    try {
        return res.status(201).json({
            message: 'File uploded successfully',
            imgPath: imgPath
        });
    } catch (error) {
        console.error(error);
    }
});



module.exports = router;