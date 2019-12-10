import variabels from '../config/variables'
const axios = require('axios')

export const fetchSearchResultForWord = async word => {
  let params = new URLSearchParams()
  params.append('word', word)

  return await axios
    .post(`${variabels.url}/word`, params)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      return 'Something went wrong on POST for search word:  ' + error
    })
}
