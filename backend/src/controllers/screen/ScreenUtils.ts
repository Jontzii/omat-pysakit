import ScreenModel from '@models/screenSettings';
import ScreenSettings from '@definitions/screenSettings';

/**
 * Save screen to database
 * @param payload
 * @returns
 */
export const createAndSaveScreen = (payload: ScreenSettings) => {
    const screen = new ScreenModel(payload);
    return screen.save();
};

/**
 * Find screen data from DB with the UUID
 * @param uuid
 * @returns
 */
export const getScreenWithUuid = (
    uuid: string
): Promise<ScreenSettings | null> => {
    return ScreenModel.findOne({ uuid }).exec();
};
