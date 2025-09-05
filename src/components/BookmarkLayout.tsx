import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function BookmarkLayout({ children }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const folderName = `폴더이름 ${id}`;

  return (
    <LayoutContainer>
      <LayoutWrapper>
        {/* 왼쪽: 뒤로가기 + 폴더이름 */}
        <LeftSection>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon sx={{ color: "#111827" }} />
          </IconButton>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              marginLeft: "8px",
            }}
          >
            {folderName}
          </Typography>
        </LeftSection>

        <RightSection>
          <IconButton>
            <MoreVertIcon sx={{ color: "#111827" }} />
          </IconButton>
        </RightSection>
      </LayoutWrapper>

      {/* 자식 콘텐츠 */}
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
}

/* ================= styled-components ================= */

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  width: 100%;
`;

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  max-width: 1000px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div``;
