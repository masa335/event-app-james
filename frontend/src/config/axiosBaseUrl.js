import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development'

export default axios.create({
  withCredentials: true,
  baseURL: isDevelopment ? 'http://localhost' : 'https://masa335.link'
});