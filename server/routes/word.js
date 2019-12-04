const errors = require(`restify-errors`)
const { getResultsForSearchedWord } = require('../controllers/wordController')

module.exports = server => {
  server.post(`/word`, async (req, res, next) => {
    try {
      let searchedWord = req.body.word
      let searchResult = await getResultsForSearchedWord(searchedWord)

      res.json(200, {
        wordID: searchResult.wordId,
        numberOfPages: searchResult.pagesThatIncludeWord.length,
        pagesThatIncludeWord: searchResult.pagesThatIncludeWord
      })
      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })
}
