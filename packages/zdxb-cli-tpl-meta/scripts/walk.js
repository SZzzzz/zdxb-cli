const fs = require('fs');
const path = require('path');

module.exports = function walk(dir, cb) {
  fs.readdirSync(dir).forEach((file) => {
    const pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      walk(pathname, cb);
    } else {
      cb(pathname);
    }
  });
};
