import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./NavigationBar.css";

export default function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [nickname, setNickname] = useState(''); // 닉네임 상태 관리
    const navigate = useNavigate();

    // 로그인 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.post('http://10.223.114.198:8080/info', {}, {
                        headers: {
                            Authorization: `${token}`
                        }
                    });
                    if (response.status === 200) {
                        setNickname(response.data.nickname); // 닉네임 저장
                        setIsLoggedIn(true); // 로그인 상태 업데이트
                    }
                } catch (error) {
                    console.error('유저 정보 불러오기 실패:', error);
                    // 오류 발생 시 토큰 제거 및 로그아웃 상태로 전환
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                }
            }
        };

        fetchUserInfo(); // 컴포넌트 마운트 시 유저 정보 요청
    }, []);

    const handleSignIn = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleGrammer = () => {
        navigate('/checkGrammer');
    };

    const handleQuiz = () => {
        navigate('/quiz');
    };

    const handleMyPage = () => {
        navigate('/mypage');
    };

    // 로컬스토리지에서 토큰을 삭제하고 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        setIsLoggedIn(false); // 로그아웃 상태로 변경
        navigate('/checkGrammer'); // 로그아웃 후 홈으로 이동
    };

    return (
        <div className="header">
            <div className="title-container">
                <span>뿌리 깊은 나무</span>
            </div>

            <div className="menu-container">
                {/* 로그인 여부에 따른 네비게이션 바 조건부 렌더링 */}
                {isLoggedIn ? (
                    <>
                        <span className="nickname">{nickname}님, 안녕하세요!</span> {/* 회색 스타일 적용 */}
                        <span onClick={handleGrammer}>맞춤법 검사</span>
                        <span onClick={handleQuiz}>맞춤법 퀴즈</span>
                        <span onClick={handleMyPage}>마이페이지</span>
                        <span onClick={handleLogout}>로그아웃</span>
                    </>
                ) : (
                    <>
                        <span onClick={handleSignIn}>회원가입</span>
                        <span onClick={handleLogin}>로그인</span>
                        <span onClick={handleGrammer}>맞춤법 검사</span>
                        <span onClick={handleQuiz}>맞춤법 퀴즈</span>
                    </>
                )}
            </div>
        </div>
    );
}