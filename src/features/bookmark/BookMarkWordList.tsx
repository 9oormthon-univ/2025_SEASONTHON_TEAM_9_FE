import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AssistantCard from "@/components/AssistantCard";
import { TokenReq } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SkeletonWordList from "../word/SkeletonWordList";
import noIcon from "@/assets/bookmarkicon/no.svg";

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
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await TokenReq.get<{ terms: Term[] }>("/bookmarks", {
        params: { folderId: id },
      });
      console.log(res.data);
      setWords(res.data.terms);
    } catch (err) {
      toast.error("북마크 단어 불러오기 실패");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, [id]);

  const categories = ["카테고리", "카테고리", "카테고리"];

  return (
    <PageWrapper>
      <Typography sx={{ fontWeight: 600, mb: 2 }}>
        {words.length}개의 단어
      </Typography>

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
      {loading ? (
        <SkeletonWordList />
      ) : words.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <img src={noIcon} />
          <p style={{ color: "rgba(30, 32, 36, 0.66)", fontSize: "20px" }}>
            아직 저장된 키워드가 없어요
          </p>
          <p style={{ fontSize: "14px", color: "rgba(30, 32, 36, 0.34)" }}>
            폴더를 만들면 중요한 키워드를 볼 수 있어요
          </p>
        </div>
      ) : (
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
      )}
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
