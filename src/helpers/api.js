import axios from 'axios'

const api=axios.create({
  baseURL:"http://localhost:5000/think-piece-ed400/us-central1",
  timeout:10000,
})

export default api