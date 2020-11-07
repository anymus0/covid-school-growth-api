const fetch = require('node-fetch')

class Fetchy {
  // GET request
  static async Get (url) {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.log('GET request error:')
      console.error(error)
    }
  }
}

module.exports = Fetchy
