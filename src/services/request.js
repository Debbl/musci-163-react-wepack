import axios from 'axios';

import { BASE_URL, TIMEOUT } from './config';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// 拦截器
instance.interceptors.response.use((res) => {
  return res.data;
});

export default instance;
