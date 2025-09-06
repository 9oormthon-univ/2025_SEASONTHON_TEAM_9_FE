import styled from "styled-components";
import { Skeleton } from "@mui/material";

export default function SkeletonSearchCard() {
  return (
    <CardWrapper>
      {/* 제목 + 북마크 아이콘 자리 */}
      <Header>
        <Skeleton variant="text" width={120} height={28} />
        <Skeleton variant="circular" width={24} height={24} />
      </Header>

      {/* 설명 */}
      <Description>
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="60%" height={20} />
      </Description>

      {/* 태그 */}
      <TagRow>
        <Skeleton
          variant="rectangular"
          width={60}
          height={28}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={80}
          height={28}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={50}
          height={28}
          sx={{ borderRadius: "30px" }}
        />
      </TagRow>

      {/* 댓글 */}
      <CommentBlock>
        <Skeleton variant="text" width="70%" height={20} />
        <Skeleton variant="text" width="50%" height={20} />
      </CommentBlock>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 100%;
  justify-self: start;
  box-shadow: 0 0 0 2px #c8d6e8;
  border-radius: 25px;
  background-color: #fff;
  overflow: hidden;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.div`
  margin: 0 20px 20px 20px;
`;

const TagRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 20px 20px 20px;
`;

const CommentBlock = styled.div`
  margin: 0 20px 20px 20px;
  padding: 10px 0;
  background-color: #f8f9fd;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 8px;
`;
