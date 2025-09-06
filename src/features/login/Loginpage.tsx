import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenReq } from "@/api/axiosInstance"; // axios 인스턴스 import

import Kakaoicon from "@/assets/loginicon/kakaoicon.png"
import Appleicon from "@/assets/loginicon/appleicon.png"
import Navericon from "@/assets/loginicon/navericon.png"

export default function Loginpage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await TokenReq.post("/login", { email, password });

      if (res.status === 200) {
        const token = res.headers["authorization"];
        if (token) {
          localStorage.setItem("accessToken", token);
          TokenReq.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        setError(null);
        navigate(`/`, { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <Container>
      <Imagecontainer></Imagecontainer>

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

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Btncontainer>
        <Btn
          onClick={() => {
            navigate(`/signup`, { replace: false });
          }}
        >
          회원가입
        </Btn>
        <Btn style={{ marginLeft: "4%" }} onClick={handleLogin}>
          로그인
        </Btn>
      </Btncontainer>

      <div
        style={{ marginTop: "30px", textAlign: "center", color: "#1E2024A8" }}
      >
        아이디/비밀번호 찾기
      </div>

      <div
        style={{ marginTop: "60px", textAlign: "center", color: "#1E2024A8" }}
      >
        소셜 로그인
      </div>

      <Btncontainer2>
        <img src={Kakaoicon}></img>
        <img src={Navericon}></img>
        <img src={Appleicon}></img>
      </Btncontainer2>
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

const Imagecontainer = styled.div`
  width: 100%;
  background-color: lightgray;
  margin-top: 50px;
  height: 200px;
`;

const Bar1 = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
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

const Btncontainer = styled.div`
  width: 100%;
  margin-top: 50px;
  flex-direction: row;
  height: 60px;
`;

const Btn = styled.button`
  width: 48%;
  height: 100%;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  background-color: #f7f8fc;
  color: #1e202457;
  &:hover {
    background-color: #021122;
    color: #ffffff;
  }
`;

const Btncontainer2 = styled.div`
  width: 250px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
