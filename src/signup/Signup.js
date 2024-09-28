import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from "../Button/Button";
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        nickname: '',
        id: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(false);
    const navigate = useNavigate();

    // 아이디 유효성 검사 함수 (영어, 숫자 조합 & 4~15글자 사이)
    const validateId = (id) => {
        const regex = /^[a-zA-Z0-9]{4,15}$/;  // 영어, 숫자 조합 & 4~15글자 사이
        return regex.test(id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setPasswordMatch(formData.password !== '' && formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMatch && validateId(formData.id)) {
            try {
                const response = await axios.post(`${process.env.SERVER_URL}/user/signup`, formData);
                if (response.status === 201) {
                    alert('회원가입이 성공적으로 완료되었습니다.');
                    navigate('/login');
                }
            } catch (error) {
                console.error('회원가입 중 오류 발생:', error);
            }
        } else {
            alert('아이디 유효성 검사 또는 비밀번호 확인이 필요합니다.');
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="signup-container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h2>회원 가입</h2>

                    <label>닉네임</label>
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />

                    <label>아이디</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="영어와 숫자 조합, 4~15글자"
                    />

                    {!validateId(formData.id) && formData.id.length > 0 && (
                        <p className="invalid-message">아이디는 영어와 숫자로 이루어진 4~15글자이어야 합니다.</p>
                    )}

                    <label>비밀번호</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />

                    <label>비밀번호 확인</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

                    {formData.confirmPassword && (
                        passwordMatch ? (
                            <p className="valid-message">비밀번호가 일치합니다.</p>
                        ) : (
                            <p className="invalid-message">비밀번호가 일치하지 않습니다.</p>
                        )
                    )}

                    <Button className="signup-btn" type="submit" disabled={!passwordMatch || !validateId(formData.id)}>
                        회원가입
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;