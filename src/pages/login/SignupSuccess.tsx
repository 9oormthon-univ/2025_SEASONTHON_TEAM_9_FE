import {styled} from "styled-components"
import { useNavigate } from "react-router-dom";


export default function SignupSuccess(){
    
    
    const navigate = useNavigate();


    return <Container>
        <div style={{marginTop:"160px"}}>가입완료</div>
        <div style={{marginTop:"70px"}}>서비스 카피</div>
        <Imagecontainer></Imagecontainer>
        <Loginbtn onClick={()=>{navigate(`/login`, { replace: true });}}>로그인</Loginbtn>
    </Container>
}

const Container = styled.div`
flex-direction:column;
width:600px;
display:flex;
align-items:center;
`

const Imagecontainer = styled.div`
width:150px;
height:150px;
background-color:red;
margin-top:40px;
`

const Loginbtn = styled.div`
width:100%;
height:50px;
margin-top:130px;
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