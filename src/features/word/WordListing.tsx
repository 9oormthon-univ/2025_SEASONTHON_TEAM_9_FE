import { useState, useEffect } from "react";
import type { Term, Word } from "@/types/type";
import { TokenReq } from "@/api/axiosInstance";
import AssistantCard from "@/components/AssistantCard";
import styled from "styled-components";
import SkeletonWordList from "./SkeletonWordList";

interface Props {
  words: Word[];
  loading: boolean;
}

export default function WordListing({ words, loading }: Props) {
  if (loading) {
    return <SkeletonWordList />; // ✅ 데이터 불러올 때 스켈레톤 UI
  }

  return (
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
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 5px;
`;
