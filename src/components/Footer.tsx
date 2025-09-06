import { styled } from "styled-components"
import Topicon from "@/assets/homepageicon/location_to_top_icon.png"
import Allrightreserved from "@/assets/homepageicon/allrightsreserved.png"

export default function Footer(){
    return <Container>
        <Bar1 style={{color:"white"}}>
            <text>공지사항</text>
            <text>개인정보처리방침</text>
            <text>이용약관</text>
            <text>고객센터</text>
        </Bar1>
        <Bar2><img src={Allrightreserved}></img></Bar2>
        <Topbtn src={Topicon} onClick={()=>{window.scrollTo({ top: 0,behavior:"smooth" });}}></Topbtn>
    </Container>
}

const Container = styled.div`
width:100%;
height:150px;
background-color:rgba(30, 32, 36, 1);
position:relative;
`

const Bar1 = styled.div`
position:absolute;
top:20px;
left:100px;
width:400px;
height:40px;
display:flex;
justify-content:space-between;
align-items:center;
flex-direction:row;
`
const Bar2 = styled.div`
position:absolute;
top:70px;
left:100px;
width:400px;
height:40px;
`

const Topbtn = styled.img`
position:absolute;
top:70px;
right:100px;
`