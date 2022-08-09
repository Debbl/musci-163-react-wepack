const devBaseURL = 'https://netease-cloud-music-api-psi-woad-13.vercel.app/';
// const devClientBaseURL = 'http://localhost:3000/';
const prodBadeUrl = 'https://netease-cloud-music-api-psi-woad-13.vercel.app/';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : prodBadeUrl;

const TIMEOUT = 9000;

export { BASE_URL, TIMEOUT };
