import axios from 'axios';

export const apiMeeting = axios.create({ baseURL: 'http://172.17.0.1:50000' });
