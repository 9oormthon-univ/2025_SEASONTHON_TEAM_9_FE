import styled from "styled-components";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function ContentDetail() {
  // 👉 더미 데이터
  const detail = {
    title: "효율적인 코드, 프레임워크의 이해에서부터",
    writer: "박한준",
    role: "BE",
    date: "2025년 5월 22일",
    tags: ["API", "DB", "Springboot"],
    imageUrl: "",
    sections: [
      {
        subtitle: "어떤 문제일까?",
        content: `애플리케이션의 “도감 북마크 API”를 개발하면서 사용자가 특정 조류를 북마크했는지 여부를 확인하는 기능을 구현해야 하는 상황. 
스프링 초심자로서 처음에는 팀원의 코드를 참고하여 Optional<UserBirdBookmark>를 반환하는 방식으로 구현했다. 
(북마크에 user_id와 bird_id를 넣었을 때 값이 반환되면 북마크 된 거고, null이면 북마크 안 된 거라 생각했기 때문) 
이 과정에서 Optional이 무엇인지, 영속성 컨텍스트는 어떻게 작동하는지에 대한 지식이 부족했고, 
이와 관련하여 학습을 하던 중 단순 존재 여부 확인을 위해 전체 엔티티 객체를 로드하는 것이 효율적인지 의문이 생겼다.`,
      },
      {
        subtitle: "어떤 문제일까?",
        content: `애플리케이션의 “도감 북마크 API”를 개발하면서 사용자가 특정 조류를 북마크했는지 여부를 확인하는 기능을 구현해야 하는 상황. 
스프링 초심자로서 처음에는 팀원의 코드를 참고하여 Optional<UserBirdBookmark>를 반환하는 방식으로 구현했다. 
(북마크에 user_id와 bird_id를 넣었을 때 값이 반환되면 북마크 된 거고, null이면 북마크 안 된 거라 생각했기 때문) 
이 과정에서 Optional이 무엇인지, 영속성 컨텍스트는 어떻게 작동하는지에 대한 지식이 부족했고, 
이와 관련하여 학습을 하던 중 단순 존재 여부 확인을 위해 전체 엔티티 객체를 로드하는 것이 효율적인지 의문이 생겼다.`,
      },
    ],
  };

  return (
    <Wrapper>
      {/* 제목 */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {detail.title}
      </Typography>

      {/* 작성자 + 날짜 + 태그 */}
      <MetaRow>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {detail.role} {detail.writer}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          {detail.date}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
          {detail.tags.map((tag, i) => (
            <Chip
              key={i}
              label={`#${tag}`}
              size="small"
              sx={{
                backgroundColor: "#f0f0f9",
                color: "#111827",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>

        <IconButton sx={{ marginLeft: "auto" }}>
          <BookmarkBorderIcon />
        </IconButton>
      </MetaRow>

      {/* 이미지 */}
      <ImageBox>이미지</ImageBox>

      {/* 본문 */}
      {detail.sections.map((sec, idx) => (
        <Section key={idx}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {sec.subtitle}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {sec.content}
          </Typography>
        </Section>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e5e7eb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  font-size: 18px;
  font-weight: 500;
`;

const Section = styled.div`
  margin-top: 48px;
`;
