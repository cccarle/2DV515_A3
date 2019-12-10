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

  return pagesWithTheWord.filter(
    (value, index, self) => self.map(x => x.url).indexOf(value.url) == index
  )
}

const getDocumentLocation = (words, allPages) => {
  let wordArray = words.split(' ')
  let pagesWithTheWord = []

  allPages.forEach(page => {
    var isFound = false

    wordArray.forEach(word => {
      var score = 0

      let wordId = wordToID(word) // get wordID

      for (let [i, value] of page.words.entries()) {
        if (wordId == value) {
          score += i + 1
          page.doc = score
          pagesWithTheWord.push(page)

          isFound = true
          break
        } else {
          page.doc = 10000
        }
      }
    })
  })

  normalizeSmallIsBetter(allPages, getMinValue(allPages))

  return allPages.filter(
    (value, index, self) => self.map(x => x.url).indexOf(value.url) == index
  )
}

/* 
Returns the max value of the scores.
*/

const getMaxValue = pagesWithTheWord => {
  return Math.max(...pagesWithTheWord.map(page => page.score))
}

/* 
Returns the min value of the scores.
*/

const getMinValue = pagesWithTheWord => {
  return Math.min(...pagesWithTheWord.map(page => page.doc))
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalize = (pagesWithTheWord, max) => {
  pagesWithTheWord.map(page => (page.normalizedScore = page.score / max))
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalizeSmallIsBetter = (pagesWithTheWord, min) => {
  pagesWithTheWord.map(page => (page.doc = min / page.doc))
}

module.exports = {
  getAllPagesThatIncludeWord,
  wordToID,
  getDocumentLocation
}
