import { useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Tabs,
  Tab,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@/assets/word/search.svg";
import SortIcon from "@/assets/word/sort.svg";
import FilterIcon from "@/assets/word/filter.svg";
import AssistantCard from "@/components/AssistantCard";

const categories = ["카테고리", "카테고리", "카테고리"];

export default function WordList() {
  const [value, setValue] = useState(0);
  const [words] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      name: `단어명 ${i + 1}`,
      bookmarking: i % 2 === 0,
      tags: ["태그", "태그", "태그"],
    }))
  );

  return (
    <PageWrapper>
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
          >
            가나다순
          </Button>
        </Box>
      </ToolbarWrapper>

      {/* 카드 그리드 */}
      <Grid>
        {words.map((w, i) => (
          <AssistantCard
            key={i}
            name={w.name}
            bookmarking={w.bookmarking}
            tags={w.tags}
          />
        ))}
      </Grid>

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
  );
}

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
