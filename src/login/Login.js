import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Link 컴포넌트 추가
import NavigationBar from "../NavigationBar/NavigationBar";
import './Login.css';
import Button from "../Button/Button";

const Login = () => {
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, password } = formData;

        try {
            const response = await axios.post(`http://10.223.114.81:8080/user/login`,
                {
                    "userID": id,
                    "password": password
                });

            // 서버에서 받은 토큰을 localStorage에 저장
            const { accessToken } = response.data;
            localStorage.setItem('token', accessToken);

            console.log('Login successful, token:', accessToken);
            navigate('/checkGrammer');  // 맞춤법 검사 창으로
        } catch (error) {
            console.error('Login error:', error);
            alert('로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div><NavigationBar />
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>로그인</h2>

                <label>아이디</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} />

                <label>비밀번호</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                <Button type="submit">로그인</Button>

                {/* 회원가입 페이지로 이동하는 링크 추가 */}
                <p className="signup-link">
                    아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </p>
            </form>
        </div>
        </div>
    );
};

export default Login;