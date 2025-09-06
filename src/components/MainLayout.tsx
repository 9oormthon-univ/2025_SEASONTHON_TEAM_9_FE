import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import BookmarkIcon from "@/assets/navbarIcon/bookmark_fill.png";
import ProfileIcon from "@/assets/navbarIcon/profile.png";
import NotificationIcon from "@/assets/navbarIcon/notification_fill.png";
import clucidSvgLogo from "@/assets/clucidSvgLogo.svg";

const navLinks = [
  { label: "단어", path: "/word" },
  { label: "콘텐츠", path: "/contents" },
  { label: "커뮤니티", path: "/community" },
  { label: "검색", path: "/search" },
];

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      <div style={{ flexDirection: "column" }}>
        <Navbar style={{ justifyContent: "center" }}>
          <div
            style={{ position: "absolute", left: "200px" }}
            onClick={() => navigate(`/`, { replace: false })}
          >
            <img src={clucidSvgLogo}></img>
          </div>
          <div
            style={{
              width: "400px",
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

          {!accessToken ? (
            <Loginbtn onClick={() => navigate(`/login`, { replace: false })}>
              로그인
            </Loginbtn>
          ) : (
            <NavbarRightBtn>
              <img
                src={BookmarkIcon}
                onClick={() => navigate(`/bookmark`, { replace: false })}
              ></img>
              <img src={NotificationIcon}></img>
              <img src={ProfileIcon}></img>
            </NavbarRightBtn>
          )}
        </Navbar>
      </div>
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

export default MainLayout;

const NavbarRightBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 200px;
  width: 110px;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 64px;
`;

const Navbar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #f0f0f9;
  z-index: 100;
  box-sizing: border-box;
`;

const NavButton = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "Gothic A1", sans-serif;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "rgba(30, 32, 36, 1)" : "rgba(30, 32, 36, 0.2)")};
  padding-bottom: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const Loginbtn = styled.div`
  position: absolute;
  right: 200px;
  width: 70px;
  height: 34px;
  background-color: rgba(30, 32, 36, 1);
  color: rgba(247, 248, 252, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;
