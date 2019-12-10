const { getAllWordsIDsInPages } = require('../helpers/readData')
const {
  createObjectsOfEveryPage,
  wordToID,
  normalizeWordFrequencyScore,
  normalizeDocumentLocation,
  calculateWordFrequencyMultiplyDocLocation,
  getCountOfMatchingResults
} = require('../helpers/helpers')

/* 
Returns pages that include the search word, with
- url,
- Document Location Score,
- Word Frequency Score
- Score = TotalScore, C-grade ranking
- Count = Total Pages matching the word
- Returns in an ascending order and only top 5
*/

const getResultsForSearchedWord = async words => {
  const allPages = await getAllWordsIDsInPages() // get all pages with IDs instead of words
  const wordQuerys = words.split(' ').map(word => wordToID(word)) // convert search words to IDs
  const results = createObjectsOfEveryPage(allPages, wordQuerys) // array of page objects

  normalizeWordFrequencyScore(results)
  normalizeDocumentLocation(results)
  calculateWordFrequencyMultiplyDocLocation(results)
  getCountOfMatchingResults(results)

  let matchingCountResults = results.count
  let totalScores = results
    .map(page => {
      return {
        url: page.url,
        doc: page.docScore.toFixed(2),
        score: page.totalScore.toFixed(2),
        wsScore: page.wsScore.toFixed(2)
      }
    })
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score)) // sort by highest score
    .slice(0, 5)

  return { totalScores, matchingCountResults }
}

module.exports = {
  getResultsForSearchedWord
}
