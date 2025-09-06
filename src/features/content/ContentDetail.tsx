import styled from "styled-components";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";

export default function ContentDetail() {
  // 👉 더미 데이터
  const detail = {
    title: "모달은 언제 띄우는 게 좋을까요?",
    writer: "UXUI 팀",
    role: "기획",
    date: "2025년 9월 6일",
    tags: ["UXUI", "기획", "마케팅"],
    imageUrl: "/src/assets/dummy/10.png",
    sections: [
      {
        subtitle: "",
        content: `모달, 언제 띄우는 게 좋을까요? 기능적으로는 간단하지만, 맥락 없이 등장하면 사용자의 흐름을 끊고 혼란만 주죠. 반면, 잘 설계된 모달은 전환율을 높이고, 정보 탐색을 도우며, UX의 완성도를 높여줍니다.
        
결국 관건은 타이밍과 목적. ‘지금 이 순간, 이 정보를 모달로 보여주는 게 적절한가?’라는 질문에 답할 수 있어야 하는데요. 오늘 콘텐츠에서는 실무 관점에서 모달을 띄워야 할 타이밍에 대해 알려드릴게요!`,
      },
      {
        subtitle: "1. 사용자의 결정이 머뭇거릴 때, 안내가 필요하다면",
        content: `사용자가 어떤 버튼 앞에서 멈칫하거나, 페이지에서 이탈하려 할 때는 의사결정의 ‘공백 구간’인데요. 이때 필요한 건 정보의 추가 제공 혹은 행동 유도입니다. 
예를 들어, “삭제하기”를 눌렀을 때 “정말 삭제하시겠습니까?”라는 확인 모달은 거의 모든 인터페이스에서 사용되고 있죠. 또는 요금제를 선택할 때, 상세 설명을 담은 모달을 띄우면, 사용자가 선택을 더 쉽게 할 수 있어요.

✔️ 유료 결제 전, 리스크 안내나 환불 정책을 안내해야 할 때
✔️ 삭제/초기화처럼 복구 불가한 행동을 경고할 때
✔️ 할인 혜택이 있는 대안을 보여주고 싶을 때`,
      },
      {
        subtitle: "2. 정보가 많지만, 페이지 전환은 피하고 싶을 때",
        content: `모달의 가장 큰 장점 중 하나는 ‘페이지 전환 없이 정보를 보여줄 수 있다’는 점이에요. 
특히 하나의 페이지 안에 여러 기능과 정보가 복잡하게 얽혀 있을 때, 모달은 사용자의 인지 부담을 줄여주는 도구가 됩니다. 
예를 들어, 상품 리스트에서 ‘옵션 보기’를 클릭했을 때, 페이지를 이동하는 대신 모달로 색상, 사이즈, 배송 정보 등을 보여줄 수 있죠. 

✔️ 다단계 요금제, 서비스 비교 테이블의 세부 항목
✔️ “더 알아보기” 버튼 아래 숨겨진 설명
✔️ 설정값 변경, 약관 보기 등 부가 정보`,
      },
      {
        subtitle: "3. 사용자 흐름을 유지하면서도 입력/확인을 요구할 때",
        content: `모달은 인터랙션 중심의 흐름에서도 유용합니다. 예를 들어 회원가입, 이탈 방지, 설문 조사, 혹은 진행 중 상태 확인 같은 케이스에서 모달은 중단 없는 인터랙션을 만들어주죠. 
특히, 입력 중인 내용을 날려야 할 상황(예: 나가기 클릭 시 저장 안 됨 경고)에서 모달을 띄우면 사용자의 실수를 줄일 수 있어요. 

✔️ 입력 중 폼을 벗어나려는 사용자를 붙잡을 때
✔️ 예약이나 신청 전에 정보 재확인을 요청할 때
✔️ 페이지 안에서 피드백을 요청하거나, 간단한 액션을 처리할 때`,
      },
      {
        subtitle: "🎯 모달은 ‘보여주는 것’보다 ‘맥락에 스며드는 것’",
        content: `모달은 팝업과 다르게 사용자의 요청에 따라 등장하는 경우가 많아요. 그래서 더욱 사용자 흐름을 방해하지 않아야 하고, ‘왜 지금 이걸 보는지’에 대한 명확한 이유를 제공해야 해요. 

“이 모달이 지금 등장할 타이밍인가?”, “이건 정말 새 창으로 띄워야 할 정보인가?”를 기준으로 판단해보세요! 

모달은 언제나 “보여주기”보다 “이해를 돕기 위한 수단”이어야 합니다. 적절한 타이밍, 적절한 양의 정보, 그리고 닫기 쉬운 UI. 이 세 가지가 맞아떨어질 때, 모달은 가장 강력한 도구가 될 거예요.`,
      },
    ],
  };

  return (
    <Wrapper>
      {/* 제목 */}
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {detail.title}
        <img
          src={bookmark_fill}
          alt="bookmark"
          width={"30px"}
          height={"30px"}
        />
      </Typography>

      <MetaRow style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "30px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {detail.role} {detail.writer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {detail.date}
            </Typography>
          </div>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
        </div>
      </MetaRow>

      {/* 이미지 */}
      <ImageBox src={detail.imageUrl} />

      {/* 본문 */}
      {detail.sections.map((sec, idx) => (
        <Section key={idx}>
          {sec.subtitle && (
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {sec.subtitle}
            </Typography>
          )}
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

const ImageBox = styled.img`
  width: 100%;
  height: 400px;
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
