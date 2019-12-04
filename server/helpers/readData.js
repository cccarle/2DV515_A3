const fs = require('fs')
const path_to_programming_words = './data/Words/Programming'
const path_to_games_word = './data/Words/Games'
const { getWordID } = require('./helpers')

/* 
Read every link and for every word create word ID
*/

const readFile = path => {
  return fs.readdirSync(path).map(link => ({
    url: `wikipedia.org/wiki/${link}`,
    words: fs
      .readFileSync(path + `/${link}`, 'utf-8')
      .replace(/[()]/g, '')
      .split(' ')
      .map(word => getWordID(word))
  }))
}

/* 
Merge both files into one array to get all pages word IDs.
*/

const getAllWordsIDsInPages = async () => {
  let programmingWords = readFile(path_to_programming_words)
  let gamesWord = readFile(path_to_games_word)

  return programmingWords.concat(gamesWord)
}

module.exports = {
  getAllWordsIDsInPages,
  getWordID
}
