import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        nickname: '',
        id: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [idAvailable, setIdAvailable] = useState(null);
    const [idValid, setIdValid] = useState(false);  // 아이디 유효성 검사 상태 추가
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

        if (name === 'id') {
            setIsIdChecked(false);  // 아이디 변경 시 중복 확인 상태 리셋
            setIdValid(validateId(value));  // 아이디 유효성 검사
        }
    };

    useEffect(() => {
        setPasswordMatch(formData.password !== '' && formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    const handleCheckId = async () => {
        try {
            const response = await axios.post(`${process.env.SERVER_URL}/api/check-id`, { id: formData.id });
            setIdAvailable(response.data.available);
            setIsIdChecked(true);
        } catch (error) {
            console.error('아이디 중복 확인 중 오류 발생:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMatch && isIdChecked && idAvailable && idValid) {
            try {
                const response = await axios.post(`${process.env.SERVER_URL}/api/signup`, formData);
                if (response.status === 201) {
                    alert('회원가입이 성공적으로 완료되었습니다.');
                    navigate('/login');
                }
            } catch (error) {
                console.error('회원가입 중 오류 발생:', error);
            }
        } else {
            alert('아이디 유효성 검사 또는 중복 확인, 비밀번호 확인이 필요합니다.');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>회원 가입</h2>

                <label>닉네임</label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />

                <label>아이디</label>
                <div className="input-group">
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="영어와 숫자 조합, 4~15글자"
                        style={{ flexGrow: 2, marginRight: '10px' }}
                    />
                    <button
                        type="button"
                        onClick={handleCheckId}
                        disabled={!formData.id || !idValid}  // 유효하지 않은 아이디는 중복 확인 불가
                        className="check-id-btn"
                    >
                        중복 확인
                    </button>
                </div>
                {/* 아이디 유효성 검사 결과 */}
                {!idValid && formData.id.length > 0 && (
                    <p className="invalid-message">아이디는 영어와 숫자로 이루어진 4~15글자이어야 합니다.</p>
                )}

                {/* 아이디 중복 확인 결과 */}
                {isIdChecked && idValid && (
                    idAvailable ? (
                        <p className="valid-message">사용 가능한 아이디입니다.</p>
                    ) : (
                        <p className="invalid-message">이미 존재하는 아이디입니다.</p>
                    )
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

                <button type="submit" disabled={!passwordMatch || !isIdChecked || !idAvailable || !idValid}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Signup;