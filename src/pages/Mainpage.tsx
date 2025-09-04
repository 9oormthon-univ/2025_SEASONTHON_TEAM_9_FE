import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavContext from "./Navcontext";

const Mainpage = () => {
    const { pathname } = useLocation();
    const lastSegment = pathname.split("/").pop();

    const [btnclick, setbtnclick] = useState<[Boolean, Boolean, Boolean, Boolean]>([false, false, false, false]);
    const navigate = useNavigate();

    // 현재 경로에 맞춰 버튼 상태 동기화
    useEffect(() => {
        if (lastSegment === "word") setbtnclick([true, false, false, false]);
        else if (lastSegment === "contents") setbtnclick([false, true, false, false]);
        else if (lastSegment === "community") setbtnclick([false, false, true, false]);
        else if (lastSegment === "search") setbtnclick([false, false, false, true]);
        else setbtnclick([false, false, false, false]);
    }, [lastSegment]);

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

        // 라우트 이름을 lastSegment 기준과 동일하게 유지
        if (i === 0) navigate(`/word`, { replace: true });
        else if (i === 1) navigate(`/contents`, { replace: true });
        else if (i === 2) navigate(`/community`, { replace: true });
        else navigate(`/search`, { replace: true });
    };

    return (
        <NavContext.Provider value={{ setbtnclick }}>
          <div style={{flexDirection:"column"}}>
            <Navbar style={{justifyContent:"center"}}>
                <div style={{position:"absolute",left:"200px"}} onClick={()=>{navigate(`/`, { replace: false });}}>이미지</div>
                <div style={{width:"600px",height:"40px",alignItems:"center",justifyContent:"space-between",flexDirection:"row",display:"flex"}}>
                    <Btns $clicked={btnclick[0]} onClick={()=>{window.scrollTo({ top: 0 });btnchange(0)}}>단어</Btns>
                    <Btns $clicked={btnclick[1]} onClick={()=>{window.scrollTo({ top: 0 });btnchange(1)}}>콘텐츠</Btns>
                    <Btns $clicked={btnclick[2]} onClick={()=>{window.scrollTo({ top: 0 });btnchange(2)}}>커뮤니티</Btns>
                    <Btns $clicked={btnclick[3]} onClick={()=>{window.scrollTo({ top: 0 });btnchange(3)}}>검색</Btns>

                </div>
                <div style={{position:"absolute",right:"200px"}} onClick={()=>{navigate(`/login`, { replace: false });}}>로그인</div>
                
            </Navbar>
            
        </div>
            <MainContent>
                <Outlet />
            </MainContent>
        </NavContext.Provider>
    );
};

export default Mainpage;

/* ===== styled-components ===== */


const MainContent = styled.main`
  padding-top: 95px;   /* 네비바 높이 */
  display: flex;
  justify-content:center
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
  border-bottom: 1px solid #F0F0F9;
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
