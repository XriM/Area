const axios = require('axios');

axios.get('https://icanhazip.com')
  .then(response => {
    console.log(response.data);
    let ip = response.data;
    module.exports = { ip };
    })
  .catch(error => {
    console.log(error);
});