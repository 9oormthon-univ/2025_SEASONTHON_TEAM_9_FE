import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Tabs,
  Tab,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import Bg from "@/components/Banner";
import SearchIcon from "@/assets/word/search.svg";
import SortIcon from "@/assets/word/sort.svg";
import FilterIcon from "@/assets/word/filter.svg";
import AssistantCard from "@/components/AssistantCard";
import { TokenReq } from "@/api/axiosInstance";
import type { Term, Word } from "@/types/type";

const categories = ["전체", "UI/UX", "Frontend"];

export default function WordList() {
  const [value, setValue] = useState(0);
  const [words, setWords] = useState<Word[]>([]);

  async function fetchTerms() {
    try {
      const res = await TokenReq.get<{ terms: Term[] }>("/terms");
      console.log("✅ 응답:", res.data);

      const mapped: Word[] = res.data.terms.map((t) => ({
        id: t.id,
        name: t.nameKr,
        isBookmarked: t.isBookmarked,
        definition: t.definition,
        tags: t.tags.map((tag) => tag.name),
      }));

      setWords(mapped);
    } catch (err) {
      console.error("❌ 에러:", err);
    }
  }

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <Container>
      <Bg />
      <PageWrapper>
        {/* 검색창 */}
        <SearchBox>
          <TextField
            placeholder="원하는 단어를 검색하세요"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={SearchIcon}
                    alt="search"
                    style={{ width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
              sx: { borderRadius: 10, backgroundColor: "white" },
            }}
          />
        </SearchBox>

        {/* 탭 & 필터 */}
        <ToolbarWrapper>
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                borderRadius: "20px",
                minHeight: "36px",
                padding: "6px 16px",
                marginRight: "8px",
                backgroundColor: "#f0f0f9",
                textTransform: "none",
                fontWeight: 500,
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "#1E2024" }}
              endIcon={
                <img
                  src={FilterIcon}
                  alt="filter"
                  style={{ width: 10, height: 10 }}
                />
              }
            >
              ㄱ
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "#1E2024" }}
              endIcon={
                <img
                  src={SortIcon}
                  alt="sort"
                  style={{ width: 10, height: 10 }}
                />
              }
            ></Button>
          </Box>
        </ToolbarWrapper>

        {/* 카드 그리드 */}
        <Grid>
          {words.map((w) => (
            <AssistantCard
              key={w.id}
              id={w.id}
              name={w.name}
              isBookmarked={w.isBookmarked}
              tags={w.tags}
              definition={w.definition}
            />
          ))}
        </Grid>

        {/* 더보기 버튼 */}
        <LoadMore>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "30px",
              padding: "10px 20px",
              color: "#ff9800",
              borderColor: "#ff9800",
            }}
          >
            단어 더 알아보기
          </Button>
        </LoadMore>
      </PageWrapper>
    </Container>
  );
}

//
// 🔹 styled-components
//

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SearchBox = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;

const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
`;
