const axios = require('axios');

const BASE_URL = 'https://api.neonnextgeneration.com/';

/**
 * Make a GET request to Neon API with given endpoint and params
 * @param {string} endpoint - API endpoint (e.g. 'someEndpoint')
 * @param {Object} params - Query parameters as key-value pairs
 * @returns {Promise<Object>} - API response data
 */
async function getNeonData(endpoint, params = {}) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Neon API request failed:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  getNeonData,
};
