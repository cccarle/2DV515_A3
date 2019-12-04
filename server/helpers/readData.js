const fs = require('fs')
const path_to_programming_words = './data/Words/Programming'
const path_to_games_word = './data/Words/Games'

let id = 0
let word = {}

const getWordID = mapWord => {
  if (word[mapWord]) {
    return word[mapWord]
  } else {
    word[mapWord] = id++
    return id
  }
}

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
  return await readFile(path_to_programming_words).concat(
    readFile(path_to_games_word)
  )
}

module.exports = {
  getAllWordsIDsInPages,
  getWordID
}
