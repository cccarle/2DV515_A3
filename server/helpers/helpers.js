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
    let score = 0

    page.words.forEach(wordInPage => {
      if (word == wordInPage) {
        score++
        page.score = score
        pagesWithTheWord.push(page)
      }
    })
  })

  return pagesWithTheWord
    .map(page => {
      return { url: page.url, score: page.score }
    })
    .filter(
      (value, index, self) => self.map(x => x.url).indexOf(value.url) == index
    )
}

module.exports = {
  getAllPagesThatIncludeWord,
  getWordID
}
