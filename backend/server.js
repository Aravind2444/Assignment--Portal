
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
        const studentName = req.body.studentName;
        cb(null, studentName + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('assignment'), (req, res) => {
    res.send('File uploaded successfully.');
});

const fs = require('fs');

app.get('/assignments', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).send('Unable to retrieve assignments.');
        }
        res.json(files);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
