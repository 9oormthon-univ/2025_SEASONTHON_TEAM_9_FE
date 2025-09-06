import styled from "styled-components"
import { useNavigate } from "react-router-dom";


export default function Signuppage() {
    const navigate = useNavigate();



    return <Container>
        <div style={{marginTop:"50px"}}>회원가입</div>
        <Bar1>이메일</Bar1>
        <Inputbar placeholder="이메일을 입력해주세요"></Inputbar>
        <Bar1>비밀번호</Bar1>
        <Inputbar placeholder="비밀번호를 입력해주세요" type="password"></Inputbar>
        <Bar1>비밀번호 확인</Bar1>
        <Inputbar placeholder="비밀번호를 입력해주세요" type="password"></Inputbar>
        <div style={{borderBottom:"1px solid #DEE3F0",width:"100%",height:"30px"}}></div>
        <Rules>{"(전체) 약관 동의"}</Rules>
        <Rules>{"(선택) 약관 동의"}</Rules>
        <Rules>{"(선택) 약관 동의"}</Rules>
        <Loginbtn onClick={()=>{navigate(`/signupsuccess`, { replace: false });}}>로그인</Loginbtn>
        <div style={{marginBottom:"100px"}}></div>
    </Container>
}

const Container = styled.div`
flex-direction:column;
width:600px;
display:flex;
align-items:center;
`

const Bar1 = styled.div`
width:100%;
height:30px;
margin-top:30px
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


const Rules = styled.div`
width:100%;
height:50px;
border:none;
margin-top:10px;
border-radius:10px;
font-size:18px;
display:flex;
align-items:center;
background-color:#F7F8FC;
color:#1E202457;
padding: 0 12px;
box-sizing: border-box;  /* padding, border 포함해서 100% */
&:hover {
    background-color:#021122;
    color:#FFFFFF;
  }
`

const Loginbtn = styled.div`
width:100%;
height:50px;
margin-top:50px;
border-radius:10px;
font-size:18px;
display:flex;
align-items:center;
justify-content:center;
background-color:#021122;
color:#FFFFFF;
&:hover {
    opacity:0.8;
  }
`
