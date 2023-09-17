import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AudioFile = {
    id: string;  // A unique identifier, perhaps generated at the client-side for each upload
    name: string;  // File name
    status: 'uploading' | 'succeeded' | 'failed';
    errorMessage?: string;  // In case the upload fails
};

type AudioUploaderState = {
    audioFiles: AudioFile[];
};

const initialState: AudioUploaderState = {
    audioFiles: [],
};

const audioUploaderSlice = createSlice({
    name: 'audioUploader',
    initialState,
    reducers: {
        startUpload: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const newAudioFile: AudioFile = {
                id: action.payload.id,
                name: action.payload.name,
                status: 'uploading',
            };
            state.audioFiles.push(newAudioFile);
        },
        uploadSuccess: (state, action: PayloadAction<string>) => {
            const audioFile = state.audioFiles.find(file => file.id === action.payload);
            if (audioFile) {
                audioFile.status = 'succeeded';
                delete audioFile.errorMessage;
            }
        },
        uploadFail: (state, action: PayloadAction<{ id: string; errorMessage: string }>) => {
            const audioFile = state.audioFiles.find(file => file.id === action.payload.id);
            if (audioFile) {
                audioFile.status = 'failed';
                audioFile.errorMessage = action.payload.errorMessage;
            }
        },
        removeFile: (state, action: PayloadAction<string>) => {
            state.audioFiles = state.audioFiles.filter(file => file.id !== action.payload);
        }
    }
});

export const {
    startUpload,
    uploadSuccess,
    uploadFail,
    removeFile
} = audioUploaderSlice.actions;

// Selectors
type RootState = {
    audioUploader: AudioUploaderState;
};

export const selectAudioFiles = (state: RootState) => state.audioUploader.audioFiles;

export default audioUploaderSlice.reducer;
