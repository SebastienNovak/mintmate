import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ImageFile = {
    id: string;  // A unique identifier, perhaps generated at the client-side for each upload
    name: string;  // File name
    status: 'uploading' | 'succeeded' | 'failed';
    errorMessage?: string;  // In case the upload fails
    // Depending on your needs, you might also want to store the URL/path of the uploaded image
    // imageUrl?: string;
};

type ImageUploaderState = {
    imageFiles: ImageFile[];
};

const initialState: ImageUploaderState = {
    imageFiles: [],
};

const imageUploaderSlice = createSlice({
    name: 'imageUploader',
    initialState,
    reducers: {
        startUpload: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const newImageFile: ImageFile = {
                id: action.payload.id,
                name: action.payload.name,
                status: 'uploading',
            };
            state.imageFiles.push(newImageFile);
        },
        uploadSuccess: (state, action: PayloadAction<string>) => {
            const imageFile = state.imageFiles.find(file => file.id === action.payload);
            if (imageFile) {
                imageFile.status = 'succeeded';
                delete imageFile.errorMessage;
                // if you have the imageUrl: imageFile.imageUrl = 'path/to/image/on/server';
            }
        },
        uploadFail: (state, action: PayloadAction<{ id: string; errorMessage: string }>) => {
            const imageFile = state.imageFiles.find(file => file.id === action.payload.id);
            if (imageFile) {
                imageFile.status = 'failed';
                imageFile.errorMessage = action.payload.errorMessage;
            }
        },
        removeFile: (state, action: PayloadAction<string>) => {
            state.imageFiles = state.imageFiles.filter(file => file.id !== action.payload);
        }
    }
});

export const {
    startUpload,
    uploadSuccess,
    uploadFail,
    removeFile
} = imageUploaderSlice.actions;

// Selectors
type RootState = {
    imageUploader: ImageUploaderState;
};

export const selectImageFiles = (state: RootState) => state.imageUploader.imageFiles;

export default imageUploaderSlice.reducer;
