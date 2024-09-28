import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from "../Button/Button"; // Button 컴포넌트 가져오기
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
    const [quizData, setQuizData] = useState(null); // 퀴즈 데이터를 저장할 상태
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // 선택된 답안 인덱스 관리
    const [submitted, setSubmitted] = useState(false); // 제출 여부 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    // AccessToken 가져오기
    const accessToken = localStorage.getItem('token');

    // 퀴즈 데이터를 가져오기 위한 useEffect
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get('http://10.223.114.198:8080/quiz', {
                    headers: {
                        Authorization: `${accessToken}`, // AccessToken 추가
                    },
                });
                setQuizData(response.data); // 서버에서 받아온 퀴즈 데이터를 상태에 저장
            } catch (error) {
                console.error('퀴즈 데이터를 불러오는 중 오류 발생:', error);
            }
        };

        fetchQuizData();
    }, [accessToken]);

    const handleOptionClick = (answerIndex) => {
        setSelectedAnswerIndex(answerIndex);
    };

    const handleSubmit = async () => {
        if (selectedAnswerIndex === null) {
            alert("답안을 선택해주세요.");
            return;
        }

        // 선택한 답안을 index 배열을 통해 서버에 보낼 실제 값으로 변환
        const selectedAnswer = quizData.index[selectedAnswerIndex];

        // 콘솔에 전송할 데이터를 출력
        console.log("보낼 값:", {
            answer: selectedAnswer,
            id: quizData.id,
        });

        try {
            // 퀴즈 `id`와 `answer`를 함께 서버로 전송
            const response = await axios.post(
                `http://10.223.114.198:8080/quiz/${quizData.id}`,
                {
                    answer: selectedAnswer,  // 실제 선택된 인덱스에 해당하는 값을 보냄
                    id: quizData.id // 퀴즈의 id를 함께 보냄
                },
                {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                }
            );

            // 정답인 경우 QuizCorrect 페이지로 이동
            if (response.status === 200 && response.data.message === "정답입니다.") {
                alert("정답입니다!");
                // QuizCorrect로 전체 문장과 선택된 단어 인덱스를 함께 전달
                navigate('/quiz-correct', {
                    state: {
                        words: quizData.words,
                        answer: selectedAnswer
                    }
                });
            }
            // 오답인 경우 QuizWrong 페이지로 이동 (correctAnswer 값 포함)
            else if (response.status === 200 && response.data.message === "틀렸습니다.") {
                alert("오답입니다!");
                // QuizWrong로 전체 문장과 서버에서 받은 correctAnswer 인덱스를 함께 전달
                navigate('/quiz-wrong', {
                    state: {
                        words: quizData.words,
                        answer: response.data.correctAnswer // 서버에서 받은 correctAnswer 전달
                    }
                });
            }
        } catch (error) {
            console.error("제출 중 오류가 발생했습니다:", error);
            alert("제출 중 오류가 발생했습니다.");
        }
    };

    if (!quizData) {
        return <div>퀴즈를 불러오는 중...</div>; // 퀴즈 데이터를 불러오는 동안 로딩 메시지 표시
    }

    const { words, index } = quizData; // 퀴즈 데이터에서 words와 index 추출

    return (
        <div>
            <NavigationBar />
            <div className="quiz-box">
                {/* 문제와 보기를 하나의 박스 안에 넣기 */}
                <div className="quiz-content">
                    <h1 className="quiz-title">맞춤법 퀴즈</h1>
                    <h2 className="question">
                        Q. {words.join(' ')}
                    </h2>

                    {/* 선택된 단어에 1, 2, 3, 4번 표시 */}
                    <div className="options">
                        {index.map((i, idx) => (
                            <span
                                key={idx}
                                className={`option ${selectedAnswerIndex === idx ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(idx)} // 선택한 답안을 idx로 변경
                            >
                                {`${idx + 1}. ${words[i]}`}
                            </span>
                        ))}
                    </div>

                    {/* 선택된 답안 표시 */}
                    {selectedAnswerIndex !== null && (
                        <div className="answer">
                            <p>선택한 답안: {words[index[selectedAnswerIndex]]}</p>
                        </div>
                    )}

                    {/* 제출 버튼 */}
                    <Button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={submitted} // 제출 후 비활성화
                    >
                        제출하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;