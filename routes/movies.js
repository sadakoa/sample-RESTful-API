import express from 'express';
// ルートを定義する時に仕様
const router = express.Router();

// モデルを呼び出すときは大文字にする
import Movie from '../models/movie';

// ユーザーが /api/moviesにGETリクエストを送信すると、その応答に応じる必要がある
// ここはそのルートを作成するスニペット

// router.routeは1つまたは複数のHTTP同士を設定するために使用できる単一のルートインスタンスを返す
router.route('/movies').get((req, res) => {
  // 全てのムービーを習得
  // コールバックとしてerrとmoviesを渡す
  Movie.find((err, movies) => {
    // もし見つからなかったらエラーを返す
    if (err) {
      return res.send(err);
    }
    // 見つかったらjson形式で返す
    res.json(movies);
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// ユーザーが /api/moviesにPOSTリクエストを送信する時、APIにデーターベースに新しいムービを作成する
// JSON文字列はリクエストボディとして送信する必要があるので、同じルートを使う

router.route('/movies').post((req, res) => {
  // Movieのリクエストボディに新規作成する変数を定義
  // 新しいインスタンスを作成する
  const movie = new Movie(req.body);

  // DBにセーブ、エラーが起きたらエラーを返す
  movie.save((err) => {
    if (err) {
      return res.send(err);
    }
    // 成功したら下記を返す
    res.send({ message: 'Movie Added' });
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// ユーザーが /api/movies/:idにPUTリクエストを送信した時(PUTはアップデート)

// idとPUTメソッドを用いる
router.route('/movies/:id').put((req, res) => {
  // IDのURLに渡されたムービーを見つけるためにfindOneとreq.params.idを使う
  // アンダースコアを付ける (例) _id:
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.send(err);
    }

    // 映画のインスタンスを作成したらreq.bodyに渡されたJSONにもとづいて更新する
    for (prop in req.body) {
      movie[prop] = req.body[prop];
    }

    // アップデート、エラーが起きたらエラーを返す
    movie.save((err) => {
      if (err) {
        return res.send(err);
      }
      // 成功したらかきを返す
      res.json({ message: 'Movie updated!' });
    });
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝


// ユーザーが /api/movies/:idにGETリクエストを送信した時
router.route('/movies/:id').get((req, res) => {
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.send(err);
    }
    // jsonでmovieを返す
    res.json(movie);
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// ユーザーが /api/movies/:idにDELETEリクエストを送信した時

router.route('/movies/:id').delete((req, res) => {
  // removeメソッドを用いる
  Movie.remove({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.send(err);
    }

    // 成功したら下記を返す
    res.json({ message: 'Successfully deleted' });
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// ミドルウェアとしてアプリ内で利用できるようにルートインスタンスをexport擦る
module.exports = router;
