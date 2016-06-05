/* eslint-disable no-console */

// default module
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import movies from './routes/movies';
const app = express();

// mongoose経由でMongoDBに接続する
// 理想はconfigファイルからDBの詳細を取得する
const dbName = 'movieDB';
const connectionString = 'mongodb://localhost:27017/' + dbName;

// 接続
mongoose.connect(connectionString);

// body-parserを使うための設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ルートミドルウェアが/apiにマップされる等にuseで渡す
// そのためAPIのURLは下記のようになる
  // /api/movies
  // /api/movies/:id
app.use('/api', movies);

// --------------------------------------------------------------------

// port number
app.set('port', 3000);

app.listen(app.get('port'), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('listen:', app.get('port'));
  }
});

module.exports = app;
