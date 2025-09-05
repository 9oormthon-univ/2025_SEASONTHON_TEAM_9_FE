import styled from "styled-components";
import QuestionIcon from "@/assets/word/question.svg";
import WordDetail from "@/features/word/WordDetail";

export default function WordDetailPage() {
  return <WordDetail />;
}

const Wrapper = styled.div`
  width: 100%;
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
