const express = require('express');
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();

const PORT = 5000;

app.use(fileUpload());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'image-uploader',
});

app.get('/', (req, res) => {
  res.render('home');

  pool.getConnection((err, connection) => {
    if(err) throw err;

    console.log('MySQLと接続中・・・🌳');
  });
});

app.post('/', (req, res) => {
  const imageFile = req.files.imageFile;
  const uploadPath = __dirname + '/upload/' + imageFile.name;

  imageFile.mv(uploadPath, function(err) {
    if(err) return res.status(500).send(err);
    res.send('画像をアップロードしました');
  })
});

app.listen(PORT, () => console.log('サーバ起動中🚀'));