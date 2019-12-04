const errors = require(`restify-errors`)

module.exports = server => {
  server.post(`/`, async (req, res, next) => {
    try {
      res.json(200, {
        message: 'Root of API'
      })
      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })
}
