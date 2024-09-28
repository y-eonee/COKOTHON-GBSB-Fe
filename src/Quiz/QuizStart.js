import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'; // 공통 Button 컴포넌트 가져오기
import NavigationBar from "../NavigationBar/NavigationBar";
import './QuizStart.css'; // 필요한 스타일 추가

const StartQuiz = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        // 버튼을 누르면 /quiz로 이동
        navigate('/quiz');
    };

    return (
        <div>
            <NavigationBar />
            <div className="start-quiz-container">
                <h1 className="start-quiz-title">맞춤법 퀴즈</h1>
                <p>맞춤법 퀴즈를 시작하려면 아래 버튼을 누르세요.</p>
                <Button className="start-quiz-btn" onClick={handleStartQuiz}>
                    퀴즈 시작
                </Button>
            </div>
        </div>
    );
};

export default StartQuiz;