import styled from "styled-components"
import { useNavigate } from "react-router-dom";

export default function Loginpage() {

    const navigate = useNavigate();

    return <Container>
        <Imagecontainer></Imagecontainer>
        <Bar1>이메일</Bar1>
        <Inputbar placeholder="이메일을 입력해주세요"></Inputbar>
        <Bar1>비밀번호</Bar1>
        <Inputbar placeholder="비밀번호를 입력해주세요" type="password"></Inputbar>
        <Btncontainer>
            <Btn onClick={()=>{navigate(`/signup`, { replace: false });}}>회원가입</Btn>
            <Btn style={{ marginLeft: "4%" }}>로그인</Btn>
        </Btncontainer>
        <div style={{marginTop:"30px",textAlign:"center",color:"#1E2024A8"}}>아이디/비밀번호 찾기</div>
        <div style={{marginTop:"60px",textAlign:"center",color:"#1E2024A8"}}>소셜 로그인</div>
        <Btncontainer2>
            <div>카카오</div>
            <div>네이버</div>
            <div>애플</div>
        </Btncontainer2>
    </Container>
}

const Container = styled.div`
flex-direction:column;
width:600px;
display:flex;
align-items:center;
`

const Imagecontainer = styled.div`
width:100%;
background-color:lightgray;
margin-top:50px;
height:200px;
`

const Bar1 = styled.div`
width:100%;
height:30px;
margin-top:10px
`

const Inputbar = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 12px;
  border: 1px solid #1E202457;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;  /* padding, border 포함해서 100% */

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #1E202457;
  }
`;

const Btncontainer = styled.div`
  width: 100%;
  margin-top:50px;
  flex-direction:row;
  height:60px;
`

const Btn = styled.button`
width:48%;
height:100%;
border:none;
border-radius:10px;
font-size:18px;
background-color:#F7F8FC;
color:#1E202457;
&:hover {
    background-color:#021122;
    color:#FFFFFF;
  }
`

const Btncontainer2 = styled.div`
  width: 60%;
  margin-top:40px;
  display:flex;
  flex-direction:row;
  height:90px;
  justify-content:space-between;
`