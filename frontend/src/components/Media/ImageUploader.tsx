import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    startUpload,
    uploadSuccess,
    uploadFail,
    removeFile,
    selectImageFiles
} from '../../store/slices/media/imageUploaderSlice';  // Update to the actual path

const ImageUploader: React.FC = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageFiles = useSelector(selectImageFiles);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        const file = files[0];
        const fileId = new Date().toISOString(); // Generate a unique ID based on the current time

        dispatch(startUpload({ id: fileId, name: file.name }));

        // Simulate uploading
        try {
            // Replace this with your actual upload logic
            // Also, consider adding the image URL to the state when the upload is successful
            await new Promise(resolve => setTimeout(resolve, 2000));

            dispatch(uploadSuccess(fileId));
        } catch (error) {
            dispatch(uploadFail({ id: fileId, errorMessage: 'Failed to upload' }));
        }
    };

    return (
        <div>
            <h2>Image Uploader</h2>

            <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current?.click()}>Upload New Image</button>

            <ul>
                {imageFiles.map(imageFile => (
                    <li key={imageFile.id}>
                        <span>{imageFile.name}</span> - <span>{imageFile.status}</span>
                        {imageFile.errorMessage && <p>Error: {imageFile.errorMessage}</p>}
                        <button onClick={() => dispatch(removeFile(imageFile.id))}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageUploader;
