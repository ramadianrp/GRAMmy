const bcrypt = require('bcrypt');

function hashPass(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash
}

function comparePass(password, hashPass){
    const compare = bcrypt.compareSync(password, hashPass);
    return compare
}

module.exports = {
  hashPass,
  comparePass
}