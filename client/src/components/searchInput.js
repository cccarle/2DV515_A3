import React from 'react'
import { useGlobal, actions } from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      width: '100%'
    }
  }
}))

export default function BasicTextFields() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const handleChange = event => {
    let word = event.target.value.toLowerCase()
    globalActions.setSearchWord(word)
  }

  const trySearchWord = () => {
    globalActions.postWordToAPI(globalState.searchWord)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        label="Search word"
        variant="outlined"
      />

      <Button onClick={trySearchWord} variant="outlined">
        Search
      </Button>
    </form>
  )
}
