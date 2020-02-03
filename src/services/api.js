import axios from 'axios';

const getApi = axios.create({
  baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps/',
});

const postApi = axios.create({
  baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps/',
});

export { getApi, postApi };
