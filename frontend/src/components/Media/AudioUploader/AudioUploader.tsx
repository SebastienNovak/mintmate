import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    startUpload,
    uploadSuccess,
    uploadFail,
    removeFile,
    selectAudioFiles
} from '../../../store/slices/media/audioUploaderSlice';  // Update to the actual path

const AudioUploader: React.FC = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioFiles = useSelector(selectAudioFiles);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) return;

        const file = files[0];
        const fileId = new Date().toISOString(); // Generate a unique ID based on the current time

        dispatch(startUpload({ id: fileId, name: file.name }));

        // Simulate uploading
        try {
            // Replace this with your actual upload logic
            await new Promise(resolve => setTimeout(resolve, 2000));

            dispatch(uploadSuccess(fileId));
        } catch (error) {
            dispatch(uploadFail({ id: fileId, errorMessage: 'Failed to upload' }));
        }
    };

    return (
        <div>
            <h2>Audio Uploader</h2>

            <input 
                type="file" 
                ref={fileInputRef} 
                accept="audio/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current?.click()}>Upload New Audio</button>

            <ul>
                {audioFiles.map(audioFile => (
                    <li key={audioFile.id}>
                        <span>{audioFile.name}</span> - <span>{audioFile.status}</span>
                        {audioFile.errorMessage && <p>Error: {audioFile.errorMessage}</p>}
                        <button onClick={() => dispatch(removeFile(audioFile.id))}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AudioUploader;
