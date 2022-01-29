const devBaseURL = 'http://123.207.32.32:9001';
const prodBadeUrl = 'http://123.207.32.32:9001';
const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : prodBadeUrl;

const TIMEOUT = 5000;

console.log(BASE_URL);

export { BASE_URL, TIMEOUT };
