import styled from "styled-components";
import QuestionIcon from "@/assets/word/question.svg";
import SearchCard from "@/components/SearchCard";
import AssistantCard from "@/components/AssistantCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TokenReq } from "@/api/axiosInstance";
import type { Term, Word } from "@/types/type";

const dummyComments = [
  "우리 팀은 GitHub Actions를 이용해서 CI/CD 파이프라인을 구축했어.",
  "CD 자동화가 잘 돼 있어서 코드 머지하면 바로 스테이징에 반영돼.",
];

export default function WordDetail() {
  const { id } = useParams();
  const [word, setWord] = useState<Word | null>(null);
  const [relatedWords, setRelatedWords] = useState<Word[]>([]);

  async function fetchTerms() {
    try {
      const res = await TokenReq.get<{ terms: Term[] }>("/terms", {
        params: { ids: id },
      });
      console.log("✅ 응답:", res.data);

      // 첫 번째 term 상세 데이터
      const mappedWord: Word = {
        id: res.data.terms[0].id,
        name: res.data.terms[0].nameKr,
        isBookmarked: res.data.terms[0].isBookmarked,
        definition: res.data.terms[0].definition,
        tags: res.data.terms[0].tags.map((tag) => tag.name),
      };
      setWord(mappedWord);

      const mappedRelations = res.data.terms.map((r) => ({
        id: r.id,
        name: r.nameKr,
        isBookmarked: r.isBookmarked,
        definition: r.definition,
        tags: r.tags.map((tag) => tag.name),
      }));
      setRelatedWords(mappedRelations);
    } catch (err) {
      console.error("❌ 에러:", err);
    }
  }

  useEffect(() => {
    if (id) fetchTerms();
  }, [id]);

  return (
    <Wrapper>
      <Content>
        <Header>
          <KeyWordDetail>키워드 자세히 보기</KeyWordDetail>
          <img src={QuestionIcon} alt="question" width={24} height={24} />
        </Header>

        {/* 상세 카드 */}
        {word && (
          <SearchCard
            id={String(word.id)}
            title={word.name}
            description={word.definition}
            tags={word.tags}
            comments={dummyComments}
            bookmarking={word.isBookmarked}
          />
        )}

        <SubHeader>함께 알면 좋은 키워드</SubHeader>

        {/* 연관 키워드 */}
        <Grid>
          {relatedWords.map((card) => (
            <AssistantCard key={card.id} {...card} />
          ))}
        </Grid>
      </Content>
    </Wrapper>
  );
}

//
// styled-components
//

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
