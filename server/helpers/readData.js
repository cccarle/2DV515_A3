const fs = require('fs')
const path_to_programming_words = './data/Words/Programming'
const path_to_games_word = './data/Words/Games'
const { getWordID } = require('./helpers')

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

const getAllWordsIDsInPages = async () => {
  let programmingWords = readFile(path_to_programming_words)
  let gamesWord = readFile(path_to_games_word)

  return programmingWords.concat(gamesWord)
}

module.exports = {
  getAllWordsIDsInPages,
  getWordID
}
