import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function GrammerLog() { 
    const { index } = useParams(); // URL에서 index 가져오기
    const [original, setOriginal] = useState("");
    const [edit, setEdit] = useState([]); // edit을 빈 배열로 초기화
    const accessToken = localStorage.getItem('token');

    // 로그 가져오기
    const fetchLog = async () => {
        try {
            const response = await axios.post(`http://10.223.114.198:8080/log`, null, { 
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            const logs = response.data.logs; // 모든 로그 가져오기
            console.log("가져온 로그 수:", logs.length); // 로그 수 확인

            const log = logs[index]; // index에 해당하는 로그 가져오기
            if (log) {
                console.log("현재 log:", log); // 현재 log 확인
                console.log("log.result:", log.result); // result 확인
                setOriginal(log.input); // 원문 설정
                setEdit(log.result); // 교정 결과 설정
            } else {
                console.error("해당 index의 로그가 없습니다."); // log가 없는 경우
            }
        } catch (error) {
            console.error('API 에러:', error);
        }
    };

    useEffect(() => {
        fetchLog(); // 컴포넌트 마운트 시 로그 가져오기
    }, [index]); // index가 바뀔 때마다 호출

    // edit의 값이 업데이트될 때마다 로그 출력
    useEffect(() => {
        console.log("edit 상태:", edit); // edit 상태 확인
    }, [edit]);

    return (
        <div style={{ marginTop: 70 }}>
            <NavigationBar />
            <div className="rectangle-container">
                <div className="rectangle">
                    <div className="check-title">
                        <span>원문</span>
                    </div>
                    <span className="input-content">{original}</span> {/* 원문 표시 */}
                </div>

                <div className="rectangle">
                    <div className="check-title">
                        <span>교정 결과</span>
                    </div>
                    <span className="input-content">
                        {edit.length > 0 ? (
                            edit.map((resultArray, idx) => {
                                // resultArray가 배열인지 확인
                                if (Array.isArray(resultArray)) {
                                    return (
                                        <div key={idx}>
                                            {resultArray.map((result, subIdx) => (
                                                <div key={subIdx}>
                                                    <strong>교정해야할 부분</strong> {result.token} <br />
                                                    <strong>제안</strong> {Array.isArray(result.suggestions) ? result.suggestions.join(", ") : "제안 없음"} <br />
                                                    <strong>틀린 이유</strong> {result.info || "정보 없음"} <br />
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    );
                                } else {
                                    // resultArray가 배열이 아닐 경우 처리
                                    return (
                                        <div key={idx}>
                                            <strong>교정해야할 부분</strong> {resultArray.token} <br />
                                            <strong>제안</strong> {Array.isArray(resultArray.suggestions) ? resultArray.suggestions.join(", ") : "제안 없음"} <br />
                                            <strong>틀린 이유</strong> {resultArray.info || "정보 없음"} <br />
                                            <hr />
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <span>교정 결과가 없습니다.</span> // 교정 결과가 없을 때 메시지 표시
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}