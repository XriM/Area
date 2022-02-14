const axios = require('axios')

axios.get('https://icanhazip.com')
  .then(response => {
    console.log(response.data)
    const ip = response.data
    module.exports = { ip }
  })
  .catch(error => {
    console.log(error)
  })
