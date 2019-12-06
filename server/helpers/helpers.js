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

const getAllPagesThatIncludeWord = (words, allPages) => {
  let pagesWithTheWord = []
  let wordArray = words.split(' ')

  allPages.forEach(page => {
    var score = 0

    wordArray.forEach(word => {
      let wordId = wordToID(word) // get wordID

      page.words.forEach(wordInPage => {
        if (wordId === wordInPage) {
          score += 1
          page.score = score
          pagesWithTheWord.push(page)
        }
      })
    })
  })

  normalize(pagesWithTheWord, getMaxValue(pagesWithTheWord))

  return pagesWithTheWord
    .map(page => {
      return { url: page.url, score: page.normalizedScore }
    })
    .filter(
      (value, index, self) => self.map(x => x.url).indexOf(value.url) == index
    )
}

const getDocumentLocation = (words, allPages) => {
  let wordArray = words.split(' ')

  allPages.forEach(page => {
    var isFound = false

    wordArray.forEach(word => {
      var score = 0

      let wordId = wordToID(word) // get wordID

      for (let [i, value] of page.words.entries()) {
        if (wordId == value) {
          score += i + 1
          page.doc = score
          isFound = true
          break
        }

        if (!isFound) {
          page.doc = 10000
        }
      }
    })
  })

  normalizeSmallIsBetter(allPages, getMinValue(allPages))

  console.log(
    allPages
      .map(page => {
        return { url: page.url, doc: page.doc }
      })
      .filter(
        (value, index, self) => self.map(x => x.url).indexOf(value.url) == index
      )
      .sort((a, b) => parseFloat(b.doc) - parseFloat(a.doc))
      .slice(0, 5)
  )
}

/* 
Returns the max value of the scores.
*/

const getMaxValue = pagesWithTheWord => {
  return Math.max(...pagesWithTheWord.map(page => page.score), 00001)
}

/* 
Returns the min value of the scores.
*/

const getMinValue = pagesWithTheWord => {
  return Math.min(...pagesWithTheWord.map(page => page.doc), 00001)
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalize = (pagesWithTheWord, max) => {
  pagesWithTheWord.map(
    page => (page.normalizedScore = (page.score / max).toFixed(2))
  )
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalizeSmallIsBetter = (pagesWithTheWord, min) => {
  pagesWithTheWord.map(page => (page.doc = min / page.doc))
}

const roundUp = (num, precision) => {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}

module.exports = {
  getAllPagesThatIncludeWord,
  wordToID,
  getDocumentLocation
}
