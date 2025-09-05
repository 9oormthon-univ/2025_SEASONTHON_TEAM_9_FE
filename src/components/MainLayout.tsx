import { useLocation, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const navLinks = [
  { label: "단어", path: "/word" },
  { label: "콘텐츠", path: "/contents" },
  { label: "커뮤니티", path: "/community" },
  { label: "검색", path: "/search" },
];

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div style={{ flexDirection: "column" }}>
        <Navbar style={{ justifyContent: "center" }}>
          <div
            style={{ position: "absolute", left: "200px" }}
            onClick={() => navigate(`/`, { replace: false })}
          >
            이미지
          </div>
          <div
            style={{
              width: "600px",
              height: "40px",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              display: "flex",
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.path);
              return (
                <NavButton
                  key={link.path}
                  $active={isActive}
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    navigate(link.path, { replace: true });
                  }}
                >
                  {link.label}
                </NavButton>
              );
            })}
          </div>

          <div
            style={{ position: "absolute", right: "200px" }}
            onClick={() => navigate(`/login`, { replace: false })}
          >
            로그인
          </div>
        </Navbar>
      </div>
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

export default MainLayout;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
`;

const Navbar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: white;
  border-bottom: 1px solid #f0f0f9;
  z-index: 9999;
  box-sizing: border-box;
`;

const NavButton = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: "Gothic A1", sans-serif;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#111827" : "#11182757")};
  padding-bottom: 4px;

  &:hover {
    cursor: pointer;
  }
`;
