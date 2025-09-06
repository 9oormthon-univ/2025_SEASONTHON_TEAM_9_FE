import { useEffect, useState } from "react";
import styled from "styled-components";
import Searchicon from "@/assets/Searchicon.png";
import AssistantCard from "../components/AssistantCard";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import bannerLogo from "@/assets/mainBanner.png";
import ContentCard from "@/components/ContentCard";

const tags = ["프론트엔드", "백엔드", "리액트", "인공지능"];

type RelationWord = {
  id: string;
  name: string;
  tags: string[];
  isBookmarked: boolean;
  definition: string;
};

type Content = {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];
  bookmarking: boolean;
  writer: string;
  date: string;
  description: string;
};

const dummyData: Content[] = [
  {
    id: "6",
    title: "리텐션이 낮다면 먼저 살펴볼 것들",
    imageUrl: "/src/assets/dummy/6.png",
    tags: ["데이터", "비즈니스", "기획"],
    bookmarking: true,
    writer: "신혁수",
    date: "2025-09-04",
    description: "리텐션 개선을 위해 반드시 체크해야 할 핵심 지표",
  },
  {
    id: "7",
    title: "AI 생성, 직군을 뛰어넘는 서비스 구현",
    imageUrl: "/src/assets/dummy/7.png",
    tags: ["AI", "프론트엔드", "백엔드"],
    bookmarking: false,
    writer: "정하늘",
    date: "2025-09-04",
    description: "AI 기반으로 직군을 아우르는 서비스 구현 사례",
  },
  {
    id: "8",
    title: "기획자가 궁금해 하는 개발 용어.zip",
    imageUrl: "./src/assets/dummy/8.png",
    tags: ["기획", "프론트엔드", "백엔드"],
    bookmarking: false,
    writer: "김철민",
    date: "2025-09-04",
    description: "기획자들이 자주 묻는 개발 용어를 정리한 필수 자료",
  },
];

const datas: RelationWord[] = [
  {
    id: "13e754a0-da7a-45c8-a841-51d0da658429",
    name: "프론트엔드",
    tags: ["리액트", "플러터", "코틀린"],
    isBookmarked: false,
    definition: "랜더링의 원리",
  },
  {
    id: "13e754a0-da7a-45c8-a841-51d0da658429",
    name: "백엔드",
    tags: ["nodejs", "CI/CD", "스레드"],
    isBookmarked: false,
    definition: "백엔드 개발의 원리",
  },
  {
    id: "13e754a0-da7a-45c8-a841-51d0da658429",
    name: "AI",
    tags: ["트랜스포머", "GPT", "인공지능"],
    isBookmarked: false,
    definition: "인공지능의 원리",
  },
];

export default function Homepage() {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  return (
    <Container>
      <img src={bannerLogo} height={"490px"} width={"100%"} />
      <div
        style={{
          width: "30%",
          position: "relative",
          marginTop: "50px",
          alignItems: "center",
          display: "flex",
        }}
      >
        <InputBar
          placeholder="원하는 검색어를 입력하세요"
          value={searchContent}
          onChange={search}
          onClick={() => {
            navigate(`/search`, { replace: true });
          }}
        ></InputBar>
        <Searchbtn>
          <img src={Searchicon}></img>
        </Searchbtn>
      </div>

      <Tagbar>
        <span
          style={{
            color: "rgba(30, 32, 36, 0.66)",
            fontWeight: "600",
            marginRight: "10px",
          }}
        >
          이전 키워드
        </span>
        {tags.map((items, index) => (
          <Tags key={index}>{items}</Tags>
        ))}
      </Tagbar>

      <Bar>새로 등록된 키워드</Bar>
      <GridContainer>
        {datas.map((items, index) => (
          <AssistantCard
            key={index}
            id={items.id}
            name={items.name}
            isBookmarked={items.isBookmarked}
            tags={items.tags}
            definition={items.definition}
          />
        ))}
      </GridContainer>
      <Bar>인기 콘텐츠</Bar>
      <GridContainer>
        {dummyData.map((items) => (
          <ContentCard item={items} onSelect={() => {}} />
        ))}
      </GridContainer>

      <div style={{ marginBottom: "200px" }}></div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const InputBar = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 12px;
  border: 1px solid #1e202457;
  border-radius: 25px 25px 25px 25px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #dfe1e5;
  }

  &::placeholder {
    color: #1e202457;
  }
`;

const Searchbtn = styled.button`
  border: none;
  position: absolute;
  right: 20px;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Tagbar = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Tags = styled.div`
  margin-right: 10px;
  padding: 2px 12px;
  width: auto;
  background-color: #f7f8fc;
  border-radius: 10px;
  color: #5f9ceb;
  font-weight: 500;
`;

const Bar = styled.div`
  width: 1000px;
  height: 30px;
  margin-top: 50px;
  font-size: 20px;
  color: #000;
  font-weight: 600;
`;

const GridContainer = styled.div`
  margin-top: 50px;
  width: 1000px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
`;
