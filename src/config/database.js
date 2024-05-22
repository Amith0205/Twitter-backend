const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost:27017/twitter_Dev');
}
``
module.exports = connect;