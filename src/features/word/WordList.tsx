import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Tabs,
  Tab,
  Button,
  Box,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import Bg from "@/components/Banner";
import SearchIcon from "@/assets/word/search.svg";
import SortIcon from "@/assets/word/sort.svg";
import FilterIcon from "@/assets/word/filter.svg";
import Footer from "@/components/Footer";
import WordListing from "./WordListing";
import useWordDetail from "@/hooks/useWordDetail";
import type { Word } from "@/types/type";
import PlusIcon from "@/assets/plus.svg";
import wordBanner from "@/assets/wordBanner.png";
import useDebounce from "@/hooks/useDebounce"; // ✅ debounce 훅 추가
import { useNavigate } from "react-router-dom";

function getKoreanInitial(char: string): string {
  const KOR_BEGIN_UNICODE = 44032;
  const KOR_END_UNICODE = 55203;
  const KOR_BASE = 588;
  const INITIALS = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const code = char.charCodeAt(0);
  if (code < KOR_BEGIN_UNICODE || code > KOR_END_UNICODE) return char;
  return INITIALS[Math.floor((code - KOR_BEGIN_UNICODE) / KOR_BASE)];
}

export default function WordList() {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);
  const { words = [], loading } = useWordDetail(undefined, debouncedSearch);

  const [langFilter, setLangFilter] = useState<"kor" | "eng" | null>(null);
  const [charFilter, setCharFilter] = useState<string | null>(null);

  const [anchorKor, setAnchorKor] = useState<null | HTMLElement>(null);
  const [anchorEng, setAnchorEng] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const tags = useMemo(() => {
    const dic = new Set<string>();
    words.forEach((w) => w.tags?.forEach((t: string) => dic.add(t)));
    return Array.from(dic);
  }, [words]);

  const safeValue = value >= tags.length + 1 ? 0 : value;

  const filteredWords = useMemo(() => {
    let result: Word[] = words;

    if (safeValue !== 0) {
      const selectedTag = tags[safeValue - 1];
      result = result.filter((w) => w.tags.includes(selectedTag));
    }

    if (charFilter) {
      result = result.filter((w) => {
        const firstChar = w.name.charAt(0);
        if (langFilter === "kor")
          return getKoreanInitial(firstChar) === charFilter;
        if (langFilter === "eng")
          return firstChar.toLowerCase().startsWith(charFilter.toLowerCase());
        return true;
      });
    }

    return result;
  }, [safeValue, words, tags, langFilter, charFilter]);

  const koreanInitials = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const englishAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <Container>
      <Bg src={wordBanner} />
      <PageWrapper>
        {/* 검색창 */}
        <SearchBox>
          <TextField
            placeholder="원하는 단어를 검색하세요"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <Button onClick={() => navigate("/wordupload")}>
            새로운 키워드 요청하기
          </Button>
        </div>

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
            <Tab label="전체" />
            {tags.map((c, i) => (
              <Tab label={c} key={c + i} />
            ))}
          </Tabs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* ✅ 한글 버튼 */}
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => setAnchorKor(e.currentTarget)}
              endIcon={
                <img
                  src={FilterIcon}
                  alt="filter"
                  style={{ width: 15, height: 15 }}
                />
              }
            >
              {langFilter === "kor" && charFilter
                ? `한글: ${charFilter}`
                : "한글 선택"}
            </Button>

            {/* ✅ 영어 버튼
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => setAnchorEng(e.currentTarget)}
              endIcon={
                <img
                  src={FilterIcon}
                  alt="filter"
                  style={{ width: 15, height: 15 }}
                />
              }
            >
              {langFilter === "eng" && charFilter
                ? `영문: ${charFilter}`
                : "영문 선택"}
            </Button> */}

            {/* 정렬 */}
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

        {/* ✅ 한글 Menu */}
        <Menu
          anchorEl={anchorKor}
          open={Boolean(anchorKor)}
          onClose={() => setAnchorKor(null)}
        >
          <MenuItem
            onClick={() => {
              setLangFilter(null);
              setCharFilter(null);
              setAnchorKor(null);
            }}
          >
            전체 해제
          </MenuItem>
          <Grid>
            {koreanInitials.map((k) => (
              <Button
                fullWidth
                key={k}
                onClick={() => {
                  setLangFilter("kor");
                  setCharFilter(k);
                  setAnchorKor(null);
                }}
              >
                {k}
              </Button>
            ))}
          </Grid>
        </Menu>

        {/* ✅ 영어 Menu */}
        <Menu
          anchorEl={anchorEng}
          open={Boolean(anchorEng)}
          onClose={() => setAnchorEng(null)}
        >
          <MenuItem
            onClick={() => {
              setLangFilter(null);
              setCharFilter(null);
              setAnchorEng(null);
            }}
          >
            전체 해제
          </MenuItem>
          <Grid>
            {englishAlphabet.map((c) => (
              <Button
                fullWidth
                key={c}
                onClick={() => {
                  setLangFilter("eng");
                  setCharFilter(c);
                  setAnchorEng(null);
                }}
              >
                {c.toUpperCase()}
              </Button>
            ))}
          </Grid>
        </Menu>

        {/* ✅ 필터링된 단어 */}
        <WordListing words={filteredWords} loading={loading} />

        {/* 더보기 버튼 */}
        <LoadMore>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "30px",
              padding: "10px 20px",
              color: "rgba(30, 32, 36, 0.66)",
              borderColor: "#ff9800",
              boxShadow: "0 0 8px 0 rgba(247, 167, 45, 0.20)",
              gap: "10px",
            }}
          >
            <img src={PlusIcon} alt="plus" />
            단어 더보기
          </Button>
        </LoadMore>
      </PageWrapper>
      <Footer />
    </Container>
  );
}

/* ---------------- styled-components ---------------- */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(180deg, #f6faff 0%, #fefeff 100%);
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  min-height: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SearchBox = styled.div`
  width: 100%;
  margin-bottom: 30px;
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
`;
