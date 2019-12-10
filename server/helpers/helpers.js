let id = 0
let index = {}

/* 
Creates unique ID for every word.
*/

const wordToID = word => {
  if (index[word] != null) {
    return index[word]
  } else {
    index[word] = ++id
    return id
  }
}

/* 
Returns an array with objects for every page.
*/

const createObjectsOfEveryPage = (allPages, wordQuerys) => {
  const results = []

  allPages.map(page =>
    results.push({
      url: page.url,
      totalScore: 0,
      wsScore: getWordFrequencyScore(wordQuerys, page),
      docScore: getDocumentLocation(wordQuerys, page)
    })
  )

  return results
}

/* 
Returns frequencyScore for a page and also keep an counter of how many time a word occurs.
Iterate through the words queries.
*/

const getWordFrequencyScore = (words, page) => {
  let wsScore = 0

  words.forEach(word => {
    page.words.forEach(pageWord => {
      if (word === pageWord) {
        wsScore += 1
      }
    })
  })

  return wsScore
}

/* 
Returns document location score for a page.
Iterate through the words queries.
*/

const getDocumentLocation = (words, page) => {
  let docScore = 0
  words.forEach(word => {
    let wordIndex = page.words.indexOf(word) // find index
    if (wordIndex !== -1) {
      docScore += wordIndex + 1
    } else {
      docScore += 100000
    }
  })
  return docScore
}

/* 
Returns the max value of the word frequency scores.
*/

const getMaxValue = results => {
  return Math.max(...results.map(page => page.wsScore), 0.00001)
}

/* 
Returns the min value of the document location scores.
*/

const getMinValue = results => {
  return Math.min(...results.map(page => page.docScore))
}

/* 
Normalize the word frequency scores for every pages.
Dividing it by the max value & updating the wsScore of the array.
*/

const normalizeWordFrequencyScore = results => {
  let max = getMaxValue(results)

  results.forEach(page => {
    page.wsScore = page.wsScore / max
  })
}

/* 
Normalize the document location scores for every pages.
Dividing it by the min value of the scores with the document location scores.
*/

const normalizeDocumentLocation = results => {
  let min = getMinValue(results)

  results.forEach(page => {
    page.docScore = min / page.docScore
  })
}

/* 
 Calculate the score for C-grade.
 score = word_frequency + 0.8 * document_location
 Updating the array with a totalScore
*/

const calculateWordFrequencyMultiplyDocLocation = results => {
  results.forEach(score => {
    score.totalScore = score.wsScore + score.docScore * 0.8
    score.docScore = score.docScore * 0.8
  })
}

/* 
Keeping count of matching results.
If word is found on page wsScore is added. If 0 no words was found.
Updating the count of the array to the count.
*/

const getCountOfMatchingResults = results => {
  let count = 0

  results.map(page => {
    if (page.wsScore != 0) {
      count++
    }
  })

  results.count = count
}

module.exports = {
  createObjectsOfEveryPage,
  wordToID,
  normalizeWordFrequencyScore,
  getMaxValue,
  normalizeDocumentLocation,
  calculateWordFrequencyMultiplyDocLocation,
  getWordFrequencyScore,
  getCountOfMatchingResults
}
