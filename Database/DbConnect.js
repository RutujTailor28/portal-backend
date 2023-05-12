const mongoose = require('mongoose');
const _ = require('lodash');

const connectDb = async () => {
  try {
    if (_.isEmpty(process.env.mongoURI)) {
      console.log('Require configuration for connecting mongo server');
      process.exit(1);
    }

    await mongoose.connect(process.env.mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    console.log('database connected successfully.');
  } catch (err) {
    console.log('problem to connect mongo server', err);
    process.exit(1);
  }
};

module.exports = connectDb;
