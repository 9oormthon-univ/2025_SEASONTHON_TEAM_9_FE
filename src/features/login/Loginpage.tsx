import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenReq } from "@/api/axiosInstance"; // axios 인스턴스 import

import Kakaoicon from "@/assets/loginicon/kakaoicon.png";
import Appleicon from "@/assets/loginicon/appleicon.png";
import Navericon from "@/assets/loginicon/navericon.png";
import clucidLogo from "@/assets/clucidSvglogo.svg";

import { toast } from "react-toastify";

export default function Loginpage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await TokenReq.post("/login", { email, password });

      if (res.status === 200) {
        const token = res.headers["authorization"];
        if (token) {
          const pureToken = token.replace(/^Bearer\s+/i, "");

          localStorage.setItem("accessToken", pureToken);
          TokenReq.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${pureToken}`;
        }
        navigate(`/`, { replace: true });
      }
    } catch (err: any) {
      toast.warn("로그인 실패");
    }
  };

  return (
    <Container>
      <Imagecontainer src={clucidLogo} />

      <Bar1>이메일</Bar1>
      <InputBar
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Bar1>비밀번호</Bar1>
      <InputBar
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

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

      <p
        style={{
          marginTop: "30px",
          textAlign: "center",
          color: "#1E2024A8",
          textDecoration: "underline",
          fontSize: "14px",
        }}
      >
        아이디/비밀번호 찾기
      </p>

      <p
        style={{
          textAlign: "center",
          color: "#1E2024A8",
          fontWeight: "500",
          fontSize: "18px",
          marginTop: "30px",
        }}
      >
        소셜 로그인하기
      </p>

      <Btncontainer2>
        <img src={Kakaoicon}></img>
        <img src={Navericon}></img>
        <img src={Appleicon}></img>
      </Btncontainer2>
      <div style={{ marginBottom: "80px" }}></div>
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  width: 600px;
  display: flex;
  align-items: center;
`;

const Imagecontainer = styled.img`
  margin-top: 100px;
  margin-bottom: 50px;
  height: 64px;
`;

const Bar1 = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  font-weight: 500;
  color: "#1E2024";
`;

const InputBar = styled.input`
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
  cursor: pointer;
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
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
