import React, { useState } from 'react'
import useGlobalHook from 'use-global-hook'
import { fetchSearchResultForWord } from '../actions'

const initialState = {
  searchWord: '',
  searchResult: []
}

export const actions = {
  setSearchWord: async (store, word) => {
    store.setState({ searchWord: word })
  },
  postWordToAPI: async (store, word) => {
    let result = await fetchSearchResultForWord(word)
    store.setState({ searchResult: result })
  }
}

export const useGlobal = useGlobalHook(React, initialState, actions)

export const GlobalContext = React.createContext()

const Store = ({ children }) => {
  const [globalState, globalActions] = useState([])
  return (
    <GlobalContext.Provider value={[globalState, globalActions]}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Store
