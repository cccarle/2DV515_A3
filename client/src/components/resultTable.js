import React from 'react'
import { useGlobal, actions } from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    width: '100%',
    overflowX: 'auto',
    minWidth: 300
  },
  table: {
    minWidth: 300
  },
  numberOfPages: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: theme.spacing(2)
  }
}))

export default function ResultTable() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const renderResult = () => {
    if (
      globalState.searchResult.pagesThatIncludeWord != undefined &&
      globalState.searchResult.pagesThatIncludeWord.length != 0
    ) {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Link</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Content</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">PageRank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {globalState.searchResult.pagesThatIncludeWord.map(page => (
                <TableRow key={page.url}>
                  <TableCell component="th" scope="row">
                    {page.url.slice(19)}
                  </TableCell>
                  <TableCell align="right">{page.score}</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )
    }
  }

  const renderPageResults = () => {
    if (globalState.searchResult.numberOfPages) {
      return (
        <Typography variant="overline">
          Found: {globalState.searchResult.numberOfPages} results
        </Typography>
      )
    }
  }

  const ifNoResult = () => {
    if (
      globalState.searchResult.pagesThatIncludeWord != undefined &&
      globalState.searchResult.pagesThatIncludeWord.length == 0
    ) {
      return (
        <Typography variant="overline">
          no results for the word: <b>{globalState.searchWord}</b>
        </Typography>
      )
    }
  }

  return (
    <div>
      <div className={classes.numberOfPages}> {renderPageResults()}</div>
      {ifNoResult()}
      {renderResult()}
    </div>
  )
}
