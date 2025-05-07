const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/poster', express.static('poster'));
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'earist_hris',
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'poster/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

app.post('/api/posts', upload.single('banner'), (req, res) => {
  const { title, content } = req.body;
  const banner = req.file.filename;

  db.query(
    'INSERT INTO poster (title, content, banner) VALUES (?, ?, ?)',
    [title, content, banner],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Post created successfully' });
    }
  );
});

app.get('/api/posts', (_, res) => {
  db.query('SELECT * FROM poster ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

const storageForPoster = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const uploadsForPoster = multer({ storage: storageForPoster });

app.post('/api/poster', uploadsForPoster.single('banner'), (req, res) => {
  const { title, content } = req.body;
  const banner = req.file.filename;

  db.query(
    'INSERT INTO poster (title, content, banner) VALUES (?, ?, ?)',
    [title, content, banner],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Post created successfully' });
    }
  );
});

app.get('/api/poster', (_, res) => {
  db.query('SELECT * FROM poster ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});
app.listen(5000, () => console.log('Server running on port 5000'));
