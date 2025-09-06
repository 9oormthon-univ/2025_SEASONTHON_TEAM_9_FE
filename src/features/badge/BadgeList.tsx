import { useState } from "react";
import { Box, Tabs, Tab, Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

// 더미 데이터
const badges = [
  { id: 1, name: "배지", description: "배지", acquired: true },
  { id: 2, name: "배지", description: "배지", acquired: false },
  { id: 3, name: "배지", description: "배지", acquired: false },
  { id: 4, name: "배지", description: "배지", acquired: true },
  { id: 5, name: "배지", description: "배지", acquired: true },
  { id: 6, name: "배지", description: "배지", acquired: false },
  { id: 7, name: "배지", description: "배지", acquired: false },
  { id: 8, name: "배지", description: "배지", acquired: true },
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
            <Circle $acquired={badge.acquired} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                fontWeight={600}
                color={badge.acquired ? "#111827" : "#9ca3af"}
              >
                {badge.name}
              </Typography>
              <Typography
                fontSize={14}
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
  box-shadow: 0px 0px 14.53px 0px rgba(162, 196, 240, 0.3);
  background-color: #fff;
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 183px;
  height: 200px;
  opacity: ${({ $acquired }) => ($acquired ? 1 : 0.5)};
`;

const Circle = styled.div<{ $acquired: boolean }>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: ${({ $acquired }) => ($acquired ? "#5F9CEB" : "#E5E7EB")};
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
