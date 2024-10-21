import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL ?? ''

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Please check your access token.')
    }
    throw error
  }
)

export default axiosInstance
