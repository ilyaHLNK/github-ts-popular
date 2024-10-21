import axiosInstance from './axiosInstance'
import { Repository, GraphQLResponse } from '../types/github'

export const fetchPopularTSReposGraphQL = async (
  after?: string
): Promise<{
  repositories: Repository[]
  hasNextPage: boolean
  endCursor: string | null
}> => {
  const query = `
    {
      search(query: "language:typescript", type: REPOSITORY, first: 10, after: ${after ? `"${after}"` : null}) {
        edges {
          node {
            ... on Repository {
              id
              name
              stargazers {
                totalCount
              }
              description
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

  try {
    const response = await axiosInstance.post<GraphQLResponse>('/graphql', {
      query,
    })
    const repositories = response.data.data.search.edges.map(
      (edge) => edge.node
    )
    const pageInfo = response.data.data.search.pageInfo
    const hasNextPage = pageInfo.hasNextPage
    const endCursor = pageInfo.endCursor

    return { repositories, hasNextPage, endCursor }
  } catch (error) {
    console.error(
      'Error fetching popular TypeScript repositories via GraphQL:',
      error
    )
    throw error
  }
}
