import { useState } from "react";
import { Box, Tabs, Tab, Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

const badges = [
  {
    id: 1,
    name: "반짝임의 순간",
    description: "검색 시작하기",
    acquired: true,
    imgUrl: "src/assets/badgeDummy/1.png",
  },
  {
    id: 2,
    name: "고뇌의 흔적",
    description: "키워드 검색 30회 돌파",
    acquired: true,
    imgUrl: "src/assets/badgeDummy/2.png",
  },
  {
    id: 3,
    name: "탐험가",
    description: "키워드 검색 100회 돌파",
    acquired: false,
    imgUrl: "src/assets/badgeDummy/3.png",
  },
  {
    id: 4,
    name: "인사이트 오픈",
    description: "첫 콘텐츠 열람",
    acquired: false,
    imgUrl: "src/assets/badgeDummy/4.png",
  },
  {
    id: 5,
    name: "인사이트 모험가",
    description: "콘텐츠 10개 이상 열람",
    acquired: false,
    imgUrl: "src/assets/badgeDummy/5.png",
  },
  {
    id: 6,
    name: "인사이트 수집가",
    description: "콘텐츠 5회 이상 저장",
    acquired: true,
    imgUrl: "src/assets/badgeDummy/6.png",
  },
  {
    id: 7,
    name: "폴더 마스터",
    description: "폴더 5개 이상 생성",
    acquired: true,
    imgUrl: "src/assets/badgeDummy/7.png",
  },
  {
    id: 8,
    name: "꾸준함의 시작",
    description: "7일 연속 이용",
    acquired: false,
    imgUrl: "src/assets/badgeDummy/8.png",
  },
];

export default function BadgeList() {
  const [tab, setTab] = useState(0);

  // 필터링
  const filteredBadges = badges.filter((b) => {
    if (tab === 1) return b.acquired;
    if (tab === 2) return !b.acquired;
    return true;
  });

  return (
    <Wrapper>
      {/* 탭 */}
      <Box sx={{ mb: 4, borderBottom: "1px solid #f0f0f9" }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              minHeight: "36px",
              textTransform: "none",
              fontWeight: 500,
              marginRight: "20px",
              color: "#9ca3af",
            },
            "& .Mui-selected": {
              color: "#111827",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="모든 배지" />
          <Tab
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                획득 배지
                <CountBox>{badges.filter((b) => b.acquired).length}</CountBox>
              </div>
            }
          />
          <Tab label="미획득 배지" />
        </Tabs>
      </Box>

      <Grid>
        {filteredBadges.map((badge) => (
          <CardWrapper $acquired={badge.acquired}>
            <Circle src={badge.imgUrl} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                fontWeight={600}
                color={badge.acquired ? "#111827" : "#9ca3af"}
              >
                {badge.name}
              </Typography>
              <Typography
                fontSize={12}
                color={badge.acquired ? "#555" : "#d1d5db"}
              >
                {badge.description}
              </Typography>
            </CardContent>
          </CardWrapper>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 50px auto;
`;

const CardWrapper = styled(Card)<{ $acquired: boolean }>`
  border-radius: 16px;
  padding-top: 20px;
  box-shadow: ${({ $acquired }) =>
    $acquired ? "0 0 8.3px 0 rgba(246, 190, 79, 0.5)" : "rgba(0, 0, 0, 0.10)"};
  background-color: #fff;
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 183px;
  height: 200px;
  opacity: ${({ $acquired }) => ($acquired ? 1 : 0.5)};
`;

const Circle = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

const CountBox = styled.span`
  margin-left: 6px;
  background-color: #f3f4f6;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 13px;
  color: #5f9ceb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
