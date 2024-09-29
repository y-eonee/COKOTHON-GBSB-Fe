import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // 상태를 받기 위해 useLocation 사용
import NavigationBar from "../NavigationBar/NavigationBar";
import './QuizCorrect.css'; // 스타일은 동일하게 QuizCorrect.css를 사용

const QuizWrong = () => {
    const [info, setInfo] = useState(''); // info 데이터를 저장할 상태 변수
    const location = useLocation(); // location 객체에서 전달된 state 받기
    const words = location.state?.words || []; // 전달된 words 배열
    const answer = location.state?.answer; // 선택한 답안 인덱스

    useEffect(() => {
        const fetchExplanation = async () => {
            try {
                // 서버에 POST 요청 보내기
                const response = await axios.post(`http://10.223.114.81:8080`,
                    {
                        "sentence": words.join(' ') // 전달받은 words를 join해서 서버에 보냄
                    }
                );

                // 서버에서 받은 result 중 첫 번째 항목의 info를 추출
                if (response.data.result && response.data.result.length > 0) {
                    setInfo(response.data.result[0].info); // 첫 번째 인덱스의 info 저장
                }
            } catch (error) {
                console.error('해설 가져오기 중 오류 발생:', error);
            }
        };

        // words 배열이 존재하는 경우에만 서버 요청 실행
        if (words.length > 0) {
            fetchExplanation();
        }
    }, [words]); // words가 바뀔 때마다 실행되도록 useEffect 설정

    // 선택된 단어를 빨간색으로 강조한 문장 생성
    const renderSentence = () => {
        return words.map((word, idx) => {
            // 선택된 단어에 해당하는 경우 빨간색으로 스타일링
            if (idx === answer) {
                return <span key={idx} style={{ color: 'red', fontWeight: 'bold' }}>{word} </span>;
            }
            return <span key={idx} style={{ color: 'black' }}>{word} </span>;
        });
    };

    return (
        <div>
            <NavigationBar />
            <div className="correct-box">
                <div className="quiz-content">
                    <h1 className="quiz-title" style={{ color: 'red' }}>오답입니다!</h1> {/* 오답 표시 */}

                    {/* 전달된 words를 조합한 문장을 Q. 로 표시 */}
                    <h2 className="question">Q. {renderSentence()}</h2>

                    {/* 서버에서 받아온 해설 info 출력 */}
                    {info && (
                        <div className="explanation">
                            <h3>해설</h3>
                            <p>{info}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizWrong;