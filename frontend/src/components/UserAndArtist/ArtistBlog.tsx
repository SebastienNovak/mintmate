import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtistBlogPosts, createNewBlogPost } from '../../store/slices/userAndArtist/artistBlogSlice';
import { RootState } from '../../store/store';

type ArtistBlogProps = {
    artistId: string;
};

const ArtistBlog: React.FC<ArtistBlogProps> = ({ artistId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const blogPosts = useSelector((state: RootState) => state.artistBlog);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(fetchArtistBlogPosts(artistId));
    }, [artistId, dispatch]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleAddPost = () => {
        dispatch(createNewBlogPost(title, content));
        setTitle('');
        setContent('');
    }

    return (
        <div>
            <h2>Artist Blog Posts</h2>
            {blogPosts.map(post => (
                <div key={post.postId}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>{post.date}</small>
                </div>
            ))}
            <hr />
            <h3>Add New Post</h3>
            <div>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
            </div>
            <div>
                <label>
                    Content:
                    <textarea value={content} onChange={handleContentChange}></textarea>
                </label>
            </div>
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    );
}

export default ArtistBlog;
