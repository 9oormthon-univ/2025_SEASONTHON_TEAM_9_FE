import { useMemo, useState } from "react";
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
import Footer from "@/components/Footer";
import WordListing from "./WordListing";
import useWordDetail from "@/hooks/useWordDetail";
import yellowfilter from "@/assets/yellowfilter.svg";

export default function WordList() {
  const [value, setValue] = useState(0);
  const { words = [], loading } = useWordDetail();

  const tags = useMemo(() => {
    const dic = new Set<string>();
    words.forEach((w) => w.tags?.forEach((t: string) => dic.add(t)));
    return Array.from(dic);
  }, [words]);

  const safeValue = value >= tags.length ? 0 : value;

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
            value={safeValue}
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
              "& .Mui-selected": { backgroundColor: "#111827", color: "white" },
            }}
          >
            {tags.length === 0 ? (
              <Tab label="전체" />
            ) : (
              tags.map((c, i) => <Tab label={c} key={c + i} />)
            )}
          </Tabs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "#1E2024" }}
              endIcon={
                <img
                  src={yellowfilter}
                  alt="filter-a"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              A
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "#1E2024" }}
              endIcon={
                <img
                  src={FilterIcon}
                  alt="filter"
                  style={{ width: 20, height: 20 }}
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
                  style={{ width: 15, height: 15 }}
                />
              }
            >
              가나다순
            </Button>
          </Box>
        </ToolbarWrapper>

        <WordListing words={words} loading={loading} />

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
      <Footer />
    </Container>
  );
}

/* ---------------- styled-components: 반드시 백틱 사용 ---------------- */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 900px;
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
