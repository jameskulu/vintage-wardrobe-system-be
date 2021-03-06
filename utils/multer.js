const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})

const fileFilter = function (req, file, next) {
    if (!file) {
        console.log('yoo')
        next()
    }

    console.log('hello')

    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        next(null, true)
    } else {
        next({ msg: 'File type not supported' }, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

module.exports = upload
