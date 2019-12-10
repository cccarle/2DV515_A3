const { getAllWordsIDsInPages } = require('../helpers/readData')
const {
  getAllPagesThatIncludeWord,
  getDocumentLocation,
  wordToID
} = require('../helpers/helpers')

/* 
Returns pages that include the search word, with score and wordID.
Returns in an ascending order and onlu top 5
*/

const getResultsForSearchedWord = async words => {
  const results = []
  const allPages = await getAllWordsIDsInPages() // get all pages with IDs instead of words
  const wordQuerys = words.split(' ').map(word => wordToID(word)) // convert search words to IDs

  allPages.map(page =>
    results.push({
      url: page.url,
      totalScore: 0,
      wsNormalized: 0,
      docNormalized: 0
    })
  )

  console.log(results)

  // let numberOfResults = await getAllPagesThatIncludeWord(words, allPages).length

  // let pagesThatIncludeWord = getAllPagesThatIncludeWord(words, allPages)

  // let getDocumentLocationScore = getDocumentLocation(words, allPages)

  // let arr = pagesThatIncludeWord.concat(getDocumentLocationScore)

  return { pagesThatIncludeWord, numberOfResults }
}

module.exports = {
  getResultsForSearchedWord
}

// 0.77
