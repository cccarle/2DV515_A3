const { getAllWordsIDsInPages } = require('../helpers/readData')
const {
  getAllPagesThatIncludeWord,
  getDocumentLocation
} = require('../helpers/helpers')

/* 
Returns pages that include the search word, with score and wordID.
Returns in an ascending order and onlu top 5
*/

const getResultsForSearchedWord = async words => {
  const allPages = await getAllWordsIDsInPages()

  let numberOfResults = await getAllPagesThatIncludeWord(words, allPages).length

  let pagesThatIncludeWord = await getAllPagesThatIncludeWord(words, allPages)
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    .slice(0, 5)

  let a = getDocumentLocation(words, allPages)

  return { pagesThatIncludeWord, numberOfResults }
}

module.exports = {
  getResultsForSearchedWord
}
