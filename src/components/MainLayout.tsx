import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import BookmarkIcon from "@/assets/navbarIcon/bookmark_fill.png";
import ProfileIcon from "@/assets/profile.jpg";
import NotificationIcon from "@/assets/navbarIcon/notification_fill.png";
import clucidSvgLogo from "@/assets/Clucidlogo_navbar.png";
import BadgeIcon from "@mui/icons-material/EmojiEvents"; // 배지
import SettingsIcon from "@mui/icons-material/Settings"; // 계정 설정
import LogoutIcon from "@mui/icons-material/Logout"; // 로그아웃

const navLinks = [
  { label: "키워드", path: "/word" },
  { label: "콘텐츠", path: "/contents" },
  { label: "커뮤니티", path: "/community" },
  { label: "검색", path: "/search" },
];

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  // 프로필 메뉴 상태
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("accessToken");
    navigate(`/`, { replace: false });
  };

  const handleBadgeClick = () => {
    navigate(`/badge`);
  };

  return (
    <>
      <div style={{ flexDirection: "column" }}>
        <Navbar style={{ justifyContent: "center" }}>
          <div
            style={{ position: "absolute", left: "200px" }}
            onClick={() => navigate(`/`, { replace: false })}
          >
            <img src={clucidSvgLogo} alt="logo" />
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
                style={{ cursor: "pointer" }}
                alt="bookmark"
              />
              <img src={NotificationIcon} alt="notification" />
              <img
                src={ProfileIcon}
                alt="profile"
                width={26}
                height={26}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={handleMenuOpen}
              />
            </NavbarRightBtn>
          )}
        </Navbar>
      </div>

      {/* 프로필 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: "12px",
            minWidth: 200,
            overflow: "visible",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          },
        }}
      >
        <MenuItem>
          <img
            src={ProfileIcon}
            alt="profile"
            width={26}
            height={26}
            style={{
              borderRadius: "50%",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          <Typography fontWeight={600}>신혁수</Typography>
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleBadgeClick}>
          <ListItemIcon>
            <BadgeIcon fontSize="small" />
          </ListItemIcon>
          배지
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          계정 설정
        </MenuItem>

        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      </Menu>

      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

export default MainLayout;

/* styled-components */
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
  background: linear-gradient(180deg, #f6faff 0%, #fefeff 100%);
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
  font-weight: 700;
  color: ${({ $active }) =>
    $active ? "rgba(30, 32, 36, 1)" : "rgba(30, 32, 36, 0.2)"};
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
