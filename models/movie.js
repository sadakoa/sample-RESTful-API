import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// スキーマ新規作成、定義
const movieSchema = new Schema({
  title: String,
  releaseYear: String,
  director: String,
  genre: String
});

// movieSchemaをModel : Movieとしてexport
module.exports = mongoose.model('Movie', movieSchema);
