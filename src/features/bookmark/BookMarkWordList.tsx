import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AssistantCard from "@/components/AssistantCard";
import { TokenReq } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type Tag = {
  id: string;
  name: string;
};

type Term = {
  id: string;
  nameKr: string;
  nameEn: string;
  definition: string;
  imgUrl?: string;
  tags: Tag[];
  isBookmarked: boolean;
};

export default function BookMarkWordList() {
  const [tab, setTab] = useState(0);
  const [words, setWords] = useState<Term[]>([]);
  const { id } = useParams();

  const fetchBookmarks = async () => {
    try {
      const res = await TokenReq.get<{ terms: Term[] }>("/bookmarks", {
        params: { folderId: id },
      });
      console.log(res.data);
      setWords(res.data.terms);
    } catch (err) {
      toast.error("북마크 단어 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [id]);

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
            name={w.nameKr || w.nameEn}
            isBookmarked={w.isBookmarked}
            tags={w.tags.map((t) => t.name)}
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
