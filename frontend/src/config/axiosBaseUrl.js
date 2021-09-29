import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development'

export default axios.create({
  baseURL: isDevelopment ? 'http://localhost:3000' : 'http://james-alb-1262667731.ap-northeast-1.elb.amazonaws.com/'
});