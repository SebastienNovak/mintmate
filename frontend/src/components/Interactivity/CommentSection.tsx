import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addComment,
    addReply,
    deleteComment,
    selectAllComments,
    selectError,
    selectLoadingStatus,
    Comment as CommentType,
    Reply as ReplyType
} from '../../store/slices/interactivity/commentSectionSlice'; // Update path accordingly

const CommentSection: React.FC = () => {
    const [commentInput, setCommentInput] = useState('');
    const [replyInput, setReplyInput] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null); // ID of the comment being replied to

    const dispatch = useDispatch();
    const comments = useSelector(selectAllComments);
    const loading = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleAddComment = () => {
        if (commentInput.trim() !== '') {
            const newComment: CommentType = {
                id: `${Date.now()}`, 
                text: commentInput,
                timestamp: new Date(),
                author: "currentUser", // You'd typically get this from user authentication state
                replies: []
            };
            dispatch(addComment(newComment));
            setCommentInput('');
        }
    };

    const handleAddReply = (commentId: string) => {
        if (replyInput.trim() !== '') {
            const newReply: ReplyType = {
                id: `${Date.now()}`,
                text: replyInput,
                timestamp: new Date(),
                author: "currentUser"
            };
            dispatch(addReply({ commentId, reply: newReply }));
            setReplyInput('');
            setReplyingTo(null); // Reset replying state
        }
    };

    return (
        <div className="comment-section">
            <h2>Comments</h2>

            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}

            <div className="comment-input-container">
                <textarea 
                    value={commentInput} 
                    onChange={e => setCommentInput(e.target.value)} 
                    placeholder="Write a comment..."
                />
                <button onClick={handleAddComment}>Post</button>
            </div>

            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <p>{comment.text}</p>
                    <span>{comment.timestamp.toLocaleTimeString()} - {comment.author}</span>
                    <button onClick={() => setReplyingTo(comment.id)}>Reply</button>
                    <button onClick={() => dispatch(deleteComment(comment.id))}>Delete</button>

                    {replyingTo === comment.id && (
                        <div className="reply-input-container">
                            <textarea 
                                value={replyInput} 
                                onChange={e => setReplyInput(e.target.value)} 
                                placeholder="Write a reply..."
                            />
                            <button onClick={() => handleAddReply(comment.id)}>Post Reply</button>
                        </div>
                    )}

                    {comment.replies.map(reply => (
                        <div key={reply.id} className="reply">
                            <p>{reply.text}</p>
                            <span>{reply.timestamp.toLocaleTimeString()} - {reply.author}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CommentSection;
