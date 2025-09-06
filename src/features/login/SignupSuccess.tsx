import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import congratude from "@/assets/congratude.svg";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1 style={{ marginTop: "80px", fontSize: "24px" }}>가입완료</h1>
      <div
        style={{
          textAlign: "center",
          color: "rgba(30, 32, 36, 0.66)",
        }}
      >
        당신의 궁금증을 명확하게 해결해주는 플랫폼,
        <br />
        클루시드에 오신 것을 환영해요!
      </div>
      <Imagecontainer src={congratude} />
      <Loginbtn
        onClick={() => {
          navigate(`/login`, { replace: true });
        }}
      >
        로그인하러 가기
      </Loginbtn>
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
  width: 180px;
  height: 180px;
  margin-top: 40px;
`;

const Loginbtn = styled.div`
  width: 398px;
  height: 50px;
  margin-top: 130px;
  border-radius: 10px;
  padding: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #021122;
  color: #ffffff;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;
