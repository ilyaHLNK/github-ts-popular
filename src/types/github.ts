export interface Repository {
  id: string
  name: string
  stargazers: {
    totalCount: number
  }
  description: string
  url: string
}

export interface Edge {
  node: Repository
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}

export interface SearchResponse {
  edges: Edge[]
  pageInfo: PageInfo
}

export interface GraphQLResponse {
  data: {
    search: SearchResponse
  }
}
