import mongoose, { Schema } from 'mongoose';
import ScreenSettings from '@definitions/screenSettings';

export const settingsSchema = new Schema<ScreenSettings>({
    uuid: {
        type: String,
        required: [true, 'Unique ID is required'],
        unique: true,
        index: true
    },
    stops: {
        type: [String],
        required: true
    },
    displayFinnish: Boolean,
    displaySwedish: Boolean,
    displayEnglish: Boolean,
    languageTime: Number,
    columns: Number,
    rows: Number
});

export default mongoose.model<ScreenSettings>('screenSettings', settingsSchema);
