import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    DiaryEntry,
    fetchArtistDiary, 
    createDiaryEntry,
    editEntry,
    removeEntry,
    selectAllDiaryEntries,
} from '../../store/slices/userAndArtist/artistDiarySlice'; // Adjust path as needed
import { AppDispatch } from '../../store/store';

type ArtistDiaryProps = {
    artistId: string;
};

const ArtistDiary: React.FC<ArtistDiaryProps> = ({ artistId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const diaryEntries = useSelector(selectAllDiaryEntries);
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        dispatch(fetchArtistDiary(artistId));
    }, [artistId, dispatch]);

    const handleAddEntry = () => {
        const newEntry: DiaryEntry = {
            diaryEntryId: Date.now().toString(), // Just a mock ID generation based on timestamp
            date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            content: content,
        };
        dispatch(createDiaryEntry(newEntry));
        setContent(''); // Clear the content after adding
    };

    return (
        <div>
            <h2>Artist Diary</h2>

            {/* Add new diary entry */}
            <div>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your diary entry here..."
                />
                <button onClick={handleAddEntry}>Add Entry</button>
            </div>

            {/* Display diary entries */}
            {diaryEntries.map(entry => (
                <div key={entry.diaryEntryId}>
                    <p>Date: {entry.date}</p>
                    <p>Content: {entry.content}</p>
                    <button onClick={() => dispatch(editEntry(entry))}>Edit</button>
                    <button onClick={() => dispatch(removeEntry(entry.diaryEntryId))}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default ArtistDiary;
