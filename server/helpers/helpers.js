let id = 0
let word = {}

/* 
Creates unique ID for every word.
*/

const getWordID = mapWord => {
  if (word[mapWord]) {
    return word[mapWord]
  } else {
    word[mapWord] = id++
    return id
  }
}

/* 
Returns all pages URL that contains the searched word. 
And returns how many times the word occurs in the page
*/

const getAllPagesThatIncludeWord = (word, allPages) => {
  let pagesWithTheWord = []

  allPages.forEach(page => {
    let score = 0.0

    page.words.forEach(wordInPage => {
      if (word == wordInPage) {
        score += 1
        page.score = score
        pagesWithTheWord.push(page)
      }
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

/* 
Returns the max value of the scores.
*/

const getMaxValue = pagesWithTheWord => {
  return Math.max(...pagesWithTheWord.map(page => page.score))
}

/* 
Normalize the score for every pages score by dividing it by the max value of the scores.
*/

const normalize = (pagesWithTheWord, max) => {
  pagesWithTheWord.map(
    page => (page.normalizedScore = (page.score / max).toFixed(2))
  )
}

module.exports = {
  getAllPagesThatIncludeWord,
  getWordID
}
