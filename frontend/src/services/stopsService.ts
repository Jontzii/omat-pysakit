import axios from './axiosConfig';

/**
 * Fetch list of stops from the API
 * @returns
 */
export const getStops = async () => {
    const response = await axios.get('stops');
    return response.data;
};
