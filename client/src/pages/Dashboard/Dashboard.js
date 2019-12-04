import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SearchInput from '../../components/searchInput'
import ResultTable from '../../components/resultTable'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 40
  }
}))

function Dashboard() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography className={classes.heading} variant="overline">
          Search Engine
        </Typography>
        <SearchInput />
        <ResultTable />
      </Container>
    </React.Fragment>
  )
}

export default Dashboard
