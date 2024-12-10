import axios from 'axios';

import Env from '@/utils/env';

const axiosInstance = axios.create({
  baseURL: Env.LLM_AGENT_URL,
  timeout: 1000,
});

export default axiosInstance;
