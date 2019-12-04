/* 
Returns all pages URL that contains the searched word.
*/

const getAllPagesThatIncludeWord = (word, allPages) => {
  let pagesWithTheWord = []

  allPages.forEach(page => {
    page.words.forEach(wordInPage => {
      if (word == wordInPage) {
        pagesWithTheWord.push(page)
      }
    })
  })

  return pagesWithTheWord.map(page => page.url)
}

module.exports = {
  getAllPagesThatIncludeWord
}
