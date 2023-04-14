import axios from 'axios';
require('dotenv').config()

/**
 * Creates an instance of Axios with the base URL set to https://api.nasa.gov/ and the NASA API key as a query parameter.
 * @returns An instance of Axios with the NASA API key as a query parameter.
 */
const nasaApi = axios.create({
  baseURL: `https://api.nasa.gov/`,
  params: {
    api_key: process.env.NASA_API_KEY
  }
});

/**
 * Creates an instance of Axios with the base URL set to https://images-api.nasa.gov/.
 * @returns An instance of Axios with no query parameters.
 */
const imagesSearch = axios.create({
  baseURL: `https://images-api.nasa.gov/`,
});

/**
 * Creates an instance of Axios with the base URL set to http://api.open-notify.org/.
 * @returns An instance of Axios with no query parameters.
 */
const issData = axios.create({
  baseURL: `http://api.open-notify.org/`
})

export { nasaApi, imagesSearch, issData };
