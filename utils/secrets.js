const fs = require('fs');

exports.setSecrets = () => {
    const config = require('../config');
    process.env.MONGOURI = config.mongodb.uri;
};
