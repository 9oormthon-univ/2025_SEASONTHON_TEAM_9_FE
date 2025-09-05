import { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Tabs,
  Tab,
  Card,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function BookmarkPage() {
  const [tab, setTab] = useState(0); // 0 = 단어, 1 = 콘텐츠
  const navigate = useNavigate();

  const folders = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    name: tab === 0 ? "단어 폴더" : "콘텐츠 폴더",
    count: 16,
  }));

  const handleNavigate = (id: number) => {
    if (tab === 0) {
      navigate(`word/${id}`);
    } else {
      navigate(`contents/${id}`);
    }
  };

  return (
    <PageWrapper>
      {/* 제목 + 탭 */}
      <Header>
        <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
          나의 북마크
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                borderRadius: "6px",
                minHeight: "32px",
                padding: "6px 16px",
                textTransform: "none",
                fontWeight: 500,
                color: "#9ca3af",
              },
              "& .Mui-selected": {
                backgroundColor: "#111827",
                color: "#fff",
              },
            }}
          >
            <Tab label="단어" />
            <Tab label="콘텐츠" />
          </Tabs>
        </Box>
      </Header>

      {/* 폴더 카드들 */}
      <FolderGrid>
        {folders.map((f) => (
          <CardWrapper key={f.id} onClick={() => handleNavigate(f.id)}>
            <FolderBox />
            <InfoRow>
              <div>
                <Typography variant="subtitle1" fontWeight={500}>
                  {f.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +{f.count}개의 {tab === 0 ? "단어" : "콘텐츠"}
                </Typography>
              </div>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // 옵션 클릭 시 카드 클릭 막기
                  console.log("옵션 클릭");
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </InfoRow>
          </CardWrapper>
        ))}

        {/* 추가하기 버튼 */}
        <AddCard>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              flexDirection: "column",
              color: "#9ca3af",
              height: "100%",
              fontWeight: 500,
            }}
          >
            추가하기
          </Button>
        </AddCard>
      </FolderGrid>
    </PageWrapper>
  );
}

/* ================= styles ================= */

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const FolderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const CardWrapper = styled(Card)`
  border-radius: 16px !important;
  box-shadow: none !important;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
`;

const FolderBox = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 16px;
  background: linear-gradient(144.37deg, #ddebfc 8.53%, #c1d9f8 88.88%);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const AddCard = styled(Card)`
  border-radius: 16px !important;
  background-color: #f9fafb !important;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  border: 1px solid #f0f0f9;
`;
