import { useState } from "react";
import styled from "styled-components";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AssistantCard from "@/components/AssistantCard";

export default function BookMarkWordList() {
  const [tab, setTab] = useState(0);

  const words = Array.from({ length: 9 }).map((_, i) => ({
    id: String(i),
    name: `단어명`,
    isBookmarked: i % 2 === 0,
    tags: ["태그", "태그", "태그"],
    definition: "",
  }));

  const categories = ["카테고리", "카테고리", "카테고리"];

  return (
    <PageWrapper>
      {/* 단어 개수 */}
      <Typography sx={{ fontWeight: 600, mb: 2 }}>
        {words.length}개의 단어
      </Typography>

      {/* 카테고리 탭 */}
      <Box sx={{ display: "flex", mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              borderRadius: "20px",
              minHeight: "36px",
              padding: "6px 16px",
              marginRight: "8px",
              backgroundColor: "#f9fafb",
              textTransform: "none",
              fontWeight: 500,
              color: "#9ca3af",
            },
            "& .Mui-selected": {
              backgroundColor: "#111827",
              color: "white",
            },
          }}
        >
          {categories.map((c, i) => (
            <Tab label={c} key={i} />
          ))}
        </Tabs>
      </Box>

      {/* 카드 그리드 */}
      <CardGrid>
        {words.map((w) => (
          <AssistantCard
            id={w.id}
            key={w.id}
            name={w.name}
            isBookmarked={w.isBookmarked}
            tags={w.tags}
            definition={w.definition}
          />
        ))}
      </CardGrid>
    </PageWrapper>
  );
}

/* styled-components */
const PageWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
