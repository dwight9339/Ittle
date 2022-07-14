const { randomBytes } = require("crypto");

const generateSlug = () => {
  require('crypto').randomBytes(30, (err, buf) => {
    if (err) throw err;
    return buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
  });
}

console.log(generateSlug());