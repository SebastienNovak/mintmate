import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectQuestions,
    selectCurrentQuestion,
    selectScore,
    selectLoadingStatus,
    selectError,
    answerQuestion,
    resetTrivia
} from '../../store/slices/interactivity/triviaSlice'; // Update path accordingly

const Trivia: React.FC = () => {
    const dispatch = useDispatch();
    const questions = useSelector(selectQuestions);
    const currentQuestion = useSelector(selectCurrentQuestion);
    const score = useSelector(selectScore);
    const loading = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleAnswerClick = useCallback((index: number) => {
        dispatch(answerQuestion(index));
    }, [dispatch]);

    const handleResetClick = useCallback(() => {
        dispatch(resetTrivia());
    }, [dispatch]);

    return (
        <div className="trivia">
            <h2>Trivia Game</h2>

            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
            {currentQuestion ? (
                <div>
                    <p>{currentQuestion.text}</p>
                    <ul className="options">
                        {currentQuestion.options.map((option, index) => (
                            <li key={index}>
                                <button onClick={() => handleAnswerClick(index)}>{option}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    Game Over! Your score: {score} / {questions.length}
                    <button onClick={handleResetClick}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default Trivia;
