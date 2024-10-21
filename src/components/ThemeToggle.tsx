import { Grid2, Switch, Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { MoonIcon, SunIcon } from '../assets'

const useStyles = makeStyles()((theme: Theme) => ({
  switch: {
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 0.3s ease',
  },
}))

interface ThemeToggleProps {
  toggle: () => void
  isDarkMode: boolean
}

export const ThemeToggle = ({ toggle, isDarkMode }: ThemeToggleProps) => {
  const { classes } = useStyles()

  return (
    <Grid2 container alignItems="center">
      <SunIcon width={20} height={20} />
      <Switch
        checked={isDarkMode}
        onChange={toggle}
        inputProps={{ 'aria-label': 'controlled' }}
        className={classes.switch}
      />
      <MoonIcon width={20} height={20} />
    </Grid2>
  )
}
