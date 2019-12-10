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
Returns all pages URL that contains the searched word. 
And returns how many times the word occurs in the page
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

const getDocumentLocation = (words, page) => {
  let docScore = 0
  words.forEach(word => {
    let wordIndex = page.words.indexOf(word)
    if (wordIndex !== -1) {
      docScore += wordIndex + 1
    } else {
      docScore += 100000
    }
    console.log(docScore)
  })
  return docScore
}

/* 
Returns the max value of the scores.
*/

const getMaxValue = results => {
  return Math.max(...results.map(page => page.wsScore), 0.00001)
}

/* 
Returns the min value of the scores.
*/

const getMinValue = results => {
  return Math.min(...results.map(page => page.docScore))
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalize = results => {
  let max = getMaxValue(results)

  results.forEach(page => {
    page.wsScore = page.wsScore / max
  })
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalizeSmallIsBetter = results => {
  let min = getMinValue(results)

  results.forEach(page => {
    page.docScore = min / page.docScore
  })
}

module.exports = {
  getWordFrequencyScore,
  wordToID,
  getDocumentLocation,
  normalize,
  getMaxValue,
  normalizeSmallIsBetter
}
