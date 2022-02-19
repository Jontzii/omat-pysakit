import axios from './axiosConfig';
import ScreenSettings from '../types/screenSettings';

/**
 * Returns true if screen exists
 * @param id UUID of the screen
 */
export const checkIfScreenExists = async (id: string) => {
    try {
        await axios.get(`screen/${id}`, {
            timeout: 10000,
            validateStatus: (status) => status === 200
        });

        return true;
    } catch {
        return false;
    }
};

/**
 * Returns screen data
 * @param id UUID of the screen
 * @returns
 */
export const getScreen = async (id: string) => {
    const result = await axios.get(`screen/${id}`);
    return result.data;
};

/**
 * Create a new screen
 * @param screen Screen settings
 * @returns
 */
export const postScreen = async (screen: ScreenSettings) => {
    const result = await axios.post('screen', screen);
    return result.data;
};
