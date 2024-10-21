import { useEffect, useRef, useState } from 'react'
import { fetchPopularTSReposGraphQL } from '../api/githubApi'
import { Repository } from '../types/github'
import { RepoItem } from './RepoItem'
import { Box, Button, CircularProgress, Theme, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { isScrolledToBottom } from '../utils/scroll'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    overflowY: 'auto',
    flex: 1,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2.5),
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '@supports (-moz-appearance: none)': {
      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[300]}`,
    },
    '&::-webkit-scrollbar': {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[300],
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: theme.spacing(1),
    },
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export const RepoList = () => {
  const { classes } = useStyles()
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [after, setAfter] = useState<string | undefined>(undefined)
  const [loadMoreClicked, setLoadMoreClicked] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fetchRepos = async () => {
    try {
      setLoading(true)
      const { repositories, hasNextPage, endCursor } =
        await fetchPopularTSReposGraphQL(after)
      setRepos((prevRepos) => [...prevRepos, ...repositories])
      setHasNextPage(hasNextPage)
      setAfter(endCursor ?? undefined)
    } catch (error) {
      setError('Error fetching repositories.')
      console.error('Error fetching repos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  const loadMore = () => {
    if (hasNextPage && !loading) {
      fetchRepos()
      setLoadMoreClicked(true)
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current

      if (
        isScrolledToBottom(scrollTop, clientHeight, scrollHeight) &&
        hasNextPage &&
        !loading &&
        loadMoreClicked
      ) {
        loadMore()
      }
    }
  }

  if (loading && repos.length === 0)
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    )

  if (error)
    return (
      <Box className={classes.error}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    )

  return (
    <Box
      ref={containerRef}
      className={classes.container}
      onScroll={handleScroll}
    >
      <Box component="ul" className={classes.list}>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </Box>
      {!loadMoreClicked && hasNextPage && !loading && (
        <Box className={classes.loadMoreButton}>
          <Button variant="contained" color="primary" onClick={loadMore}>
            Load More
          </Button>
        </Box>
      )}
      {loading && repos.length > 0 && (
        <Box className={classes.loadMoreButton}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
