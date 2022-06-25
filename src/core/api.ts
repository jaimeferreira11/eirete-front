import axios from 'axios';

const eireteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EIRETE,
});

export default eireteApi;
