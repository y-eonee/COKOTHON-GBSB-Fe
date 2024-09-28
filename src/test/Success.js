import React from 'react';

const Success = () => {
    const user = localStorage.getItem('user');  // localStorage에서 사용자 아이디 가져오기
    const token = localStorage.getItem('token');  // localStorage에서 토큰 가져오기

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>로그인 성공</h2>
            <p>환영합니다, {user}님!</p>
            <p>당신의 토큰: {token}</p>
        </div>
    );
};

export default Success;