console.log(`${__filename}:1`);

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    saltRounds: 10,
    hash: p => bcrypt.hash(p, saltRounds),
    compare: (p, hash) => bcrypt.compare(p, hash)
};