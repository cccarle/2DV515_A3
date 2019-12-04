const errors = require(`restify-errors`)
const { getAllWordsIDsInPages, getWordID } = require('../helpers/readData')
const { getAllPagesThatIncludeWord } = require('../helpers/helpers')

module.exports = server => {
  server.get(`/:word`, async (req, res, next) => {
    try {
      const allPages = await getAllWordsIDsInPages()
      const searchedWord = req.params.word
      let wordId = getWordID(searchedWord)
      let pagesThatIncludeWord = await getAllPagesThatIncludeWord(
        wordId,
        allPages
      )

      res.json(200, {
        wordID: wordId,
        numberOfPages: pagesThatIncludeWord.length,
        pagesThatIncludeWord: pagesThatIncludeWord
          .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
          .slice(0, 5)
      })
      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })
}
