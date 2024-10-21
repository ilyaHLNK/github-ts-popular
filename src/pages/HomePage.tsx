import { RepoList } from '../components/RepoList'
import Typography from '@mui/material/Typography'
import { Grid2, Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { ThemeToggle } from '../components/ThemeToggle'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    transition: 'color 0.3s ease',
  },
}))

interface Props {
  toggle: () => void
  isDarkMode: boolean
}

export const HomePage = ({ toggle, isDarkMode }: Props) => {
  const { classes } = useStyles()

  return (
    <Grid2 container direction="column" className={classes.container}>
      <ThemeToggle toggle={toggle} isDarkMode={isDarkMode} />
      <Typography variant="h4" className={classes.title}>
        Popular TypeScript repositories on GitHub
      </Typography>
      <RepoList />
    </Grid2>
  )
}
