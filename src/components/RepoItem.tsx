import {
  Grid2,
  Link,
  ListItem,
  ListItemText,
  Paper,
  Theme,
  Typography,
} from '@mui/material'
import { Repository } from '../types/github'
import { makeStyles } from 'tss-react/mui'
import { StarIcon } from '../assets'

const useStyles = makeStyles()((theme: Theme) => ({
  repoContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02) translateZ(0)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    transition: 'color 0.3s ease',
  },
  description: {
    transition: 'color 0.3s ease',
  },
}))

interface RepoItemProps {
  repo: Repository
}

export const RepoItem = ({ repo }: RepoItemProps) => {
  const { classes } = useStyles()

  const { url, name, description, stargazers } = repo
  const totalCount = stargazers.totalCount

  return (
    <Paper className={classes.repoContainer}>
      <ListItem>
        <ListItemText
          primary={
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              {name}
            </Link>
          }
          secondary={
            <Grid2 container gap={1} flexDirection="column">
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
                className={classes.description}
              >
                {description}
              </Typography>
              <Grid2
                container
                gap={1}
                justifyContent="flex-end"
                alignSelf="flex-end"
              >
                <StarIcon width={20} height={20} />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="span"
                  className={classes.description}
                >
                  {totalCount}
                </Typography>
              </Grid2>
            </Grid2>
          }
        />
      </ListItem>
    </Paper>
  )
}
