import styled from "styled-components";
import { Skeleton } from "@mui/material";

function SkeletonCard() {
  return (
    <CardWrapper>
      <Title>
        <Skeleton variant="text" width={100} height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Title>

      <TagBar>
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={60} height={24} />
      </TagBar>

      <ActionButton>
        <Skeleton variant="text" width="80%" height={24} />
      </ActionButton>
    </CardWrapper>
  );
}

export default function SkeletonWordList() {
  return (
    <CardGrid>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </CardGrid>
  );
}

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 900px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 151px;
  width: 260px;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px #00000033;
  padding: 10px;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagBar = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  gap: 8px;
  padding: 0 10px;
`;

const ActionButton = styled.div`
  margin: 20px 10px 0;
  height: 45px;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;
