module.exports = {
  dbURI: 'mongodb://127.0.0.1:27017/express_minin',
  dbOptions: {
    user: 'root',
    pass: 'mogaba',
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
};
