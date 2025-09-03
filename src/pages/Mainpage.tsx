import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavContext from "./Navcontext";
import Homepage from "./Homepage";
import Wordpage from "./Wordpage";
import Contentspage from "./Contentspage";
import Communitypage from "./Communitypage";
import Searchpage from "./Searchpage";

const Mainpage = () => {

    const [btnclick, setbtnclick] = useState<[Boolean, Boolean,Boolean,Boolean]>([false, false, false, false]);
    const navigate = useNavigate();
    const [homeview,sethomeview] = useState(true)

    // 현재 경로에 맞춰 버튼 상태 동기화

    // (필요 시) 리사이즈 리스너는 useEffect로 관리
    useEffect(() => {
        const updateWidth = () => {
            /* 필요하면 여기서 상태 갱신 */
        };
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const btnchange = (i: number) => {
        const newarr: [Boolean, Boolean, Boolean, Boolean] = [false, false, false, false];
        newarr[i] = true;
        setbtnclick(newarr);
        sethomeview(false)
    };

    return (
        <div style={{flexDirection:"column"}}>
            <Navbar style={{justifyContent:"center"}}>
                <div style={{position:"absolute",left:"200px"}}>이미지</div>
                <div style={{width:"600px",height:"40px",alignItems:"center",justifyContent:"space-between",flexDirection:"row",display:"flex"}}>
                    <Btns $clicked={btnclick[0]} onClick={()=>{btnchange(0)}}>단어</Btns>
                    <Btns $clicked={btnclick[1]} onClick={()=>{btnchange(1)}}>콘텐츠</Btns>
                    <Btns $clicked={btnclick[2]} onClick={()=>{btnchange(2)}}>커뮤니티</Btns>
                    <Btns $clicked={btnclick[3]} onClick={()=>{btnchange(3)}}>검색</Btns>

                </div>
                <div style={{position:"absolute",right:"200px"}}>로그인</div>
                
            </Navbar>
            <div style={{paddingTop:"95px"}}>
                {homeview && <Homepage/>}
                {btnclick[0] && <Wordpage></Wordpage>}
                {btnclick[1] && <Contentspage></Contentspage>}
                {btnclick[2] && <Communitypage></Communitypage>}
                {btnclick[3] && <Searchpage></Searchpage>}
            </div>
        </div>
    );
};

export default Mainpage;

/* ===== styled-components ===== */

const Container = styled.div`
width:100%;

`

const MainContent = styled.main`
  padding-top: 95px;   /* 네비바 높이 */
  min-height: 100dvh;
`;

const Navbar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100%;
  height: 95px;
  background-color: white;
  border-bottom: 2px solid black;
  z-index: 9999;
  box-sizing: border-box;
`;

const Btns = styled.div<{ $clicked: Boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: "Gothic A1", sans-serif;
  font-style: normal;
  font-weight: ${({ $clicked }) => ($clicked ? "800" : "500")};
  &:hover {
    cursor: pointer;
    font-weight: 800;
  }
`;

const Navbarin = styled.div`
  position: fixed;
  right: 1%;
  width: 340px;
  height: 95px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Imgcontainer = styled.img`
  width: 73px;
  height: 60px;
  margin-left: 19px;
  &:hover { cursor: pointer; }
`;
