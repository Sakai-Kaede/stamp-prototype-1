const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

const PORT = 5000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(PORT, () => console.log('サーバ起動中🚀'));