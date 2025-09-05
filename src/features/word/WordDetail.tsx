import styled from "styled-components";
import QuestionIcon from "@/assets/word/question.svg";

export default function WordDetail() {
  return (
    <Wrapper>
      <Header>
        <KeyWordDetail>키워드 자세히 보기</KeyWordDetail>
        <img src={QuestionIcon} alt="question" width={24} height={24} />
      </Header>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KeyWordDetail = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
