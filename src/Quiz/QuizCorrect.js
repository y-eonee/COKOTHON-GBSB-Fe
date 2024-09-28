import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // 상태를 받기 위해 useLocation 사용
import NavigationBar from "../NavigationBar/NavigationBar";
import './QuizCorrect.css';

const QuizCorrect = () => {
    const [info, setInfo] = useState(''); // info 데이터를 저장할 상태 변수
    const location = useLocation(); // location 객체에서 전달된 state 받기
    const sentence = location.state?.sentence || ''; // 전달된 sentence가 없으면 빈 문자열

    useEffect(() => {
        const fetchExplanation = async () => {
            try {
                // 서버에 POST 요청 보내기
                const response = await axios.post(`http://10.223.114.198:8080`,
                    {
                        "sentence": sentence // 전달받은 sentence를 서버에 보냄
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

        // sentence가 존재하는 경우에만 서버 요청 실행
        if (sentence) {
            fetchExplanation();
        }
    }, [sentence]); // sentence가 바뀔 때마다 실행되도록 useEffect 설정

    return (
        <div>
            <NavigationBar />
            <div className="correct-box">
                <div className="quiz-content">
                    <h1 className="quiz-title">정답입니다!</h1>

                    {/* 전달된 sentence를 Q. 로 표시 */}
                    <h2 className="question">Q. {sentence}</h2>

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

export default QuizCorrect;