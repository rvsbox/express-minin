module.exports = {
  dbURI: 'mongodb://127.0.0.1:27017/express_minin',
  dbOptions: {
    user: 'root',
    pass: 'password',
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  dbAll: 'mongodb://root:password@127.0.0.1:27017/express_minin?authSource=admin'
};
