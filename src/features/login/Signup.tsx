import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenReq } from "@/api/axiosInstance"; // axios 인스턴스 import

export default function Signuppage() {
  const navigate = useNavigate();

  // 입력값 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {

    // 1. 공백 여부 확인
    if(password === "" || email === "" || confirmPassword === ""){
      setError("공백을 허용하지 않습니다.");
      return;
    }

    // 2. 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 2. 서버에 회원가입 요청
      const res = await TokenReq.post("/signup", {
        email,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        setError(null);
        navigate(`/signupsuccess`, { replace: false });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <Container>
      <div style={{ marginTop: "50px" }}>회원가입</div>

      <Bar1>이메일</Bar1>
      <Inputbar
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Bar1>비밀번호</Bar1>
      <Inputbar
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Bar1>비밀번호 확인</Bar1>
      <Inputbar
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* 상태 표시 */}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      <div
        style={{
          borderBottom: "1px solid #DEE3F0",
          width: "100%",
          height: "30px",
        }}
      />

      <Rules>{"(전체) 약관 동의"}</Rules>
      <Rules>{"(선택) 약관 동의"}</Rules>
      <Rules>{"(선택) 약관 동의"}</Rules>

      <Loginbtn onClick={handleSignup}>회원가입</Loginbtn>
      <div style={{marginBottom:"100px"}}></div>
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  width: 600px;
  display: flex;
  align-items: center;
`;

const Bar1 = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 30px;
`;

const Inputbar = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 12px;
  border: 1px solid #1e202457;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #1e202457;
  }
`;

const Rules = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  background-color: #f7f8fc;
  color: #1e202457;
  padding: 0 12px;
  box-sizing: border-box;
  &:hover {
    background-color: #021122;
    color: #ffffff;
  }
`;

const Loginbtn = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 50px;
  border-radius: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #021122;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
