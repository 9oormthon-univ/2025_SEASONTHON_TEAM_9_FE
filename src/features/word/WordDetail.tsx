import styled from "styled-components";
import QuestionIcon from "@/assets/word/question.svg";
import SearchCard from "@/components/SearchCard";
import { useParams } from "react-router-dom";
import WordListing from "./WordListing";
import useWordDetail from "@/hooks/useWordDetail";
import SkeletonSearchCard from "../search/SkeletonSearchCard";

const dummyComments = [
  "우리 팀은 GitHub Actions를 이용해서 CI/CD 파이프라인을 구축했어.",
  "CD 자동화가 잘 돼 있어서 코드 머지하면 바로 스테이징에 반영돼.",
];

export default function WordDetail() {
  const { id } = useParams();

  const { words, mappedWord, loading } = useWordDetail(id);

  return (
    <Wrapper>
      <Content>
        <Header>
          <KeyWordDetail>키워드 자세히 보기</KeyWordDetail>
          <img src={QuestionIcon} alt="question" width={24} height={24} />
        </Header>
        {loading ? (
          <SkeletonSearchCard />
        ) : (
          mappedWord && (
            <SearchCard
              id={String(mappedWord.id)}
              title={mappedWord.name}
              description={mappedWord.definition}
              tags={mappedWord.tags}
              comments={dummyComments}
              bookmarking={mappedWord.isBookmarked}
            />
          )
        )}

        <SubHeader>함께 알면 좋은 키워드</SubHeader>

        <WordListing words={words} loading={loading} />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f9fafb;
`;

const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KeyWordDetail = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const SubHeader = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;
