import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cart_session')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data?.message || 'Something went wrong.'),
)

export default apiClient
