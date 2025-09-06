import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Searchicon from "@/assets/Searchicon.png";
import AssistantCard from "../components/AssistantCard";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import bannerLogo from "@/assets/mainBanner.png";

const tags = ["프론트엔드", "백엔드", "리액트", "인공지능"];

type RelationWord = {
  id: string;
  name: string;
  tags: string[];
  isBookmarked: boolean;
  definition: string;
};

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

const datas2: RelationWord[] = [
  {
    id: "13e754a0-da7a-45c8-a841-51d0da658429",
    name: "프론트엔드",
    tags: ["리액트", "플러터", "코틀린"],
    isBookmarked: true,
    definition: "랜더링의 원리",
  },
  {
    id: "13e754a0-da7a-45c8-a841-51d0da658429",
    name: "백엔드",
    tags: ["nodejs", "CI/CD", "스레드"],
    isBookmarked: true,
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
  const [logintrue,setlogintrue] = useState(false)
  const [relativeword,setrelative] = useState<RelationWord[]>(datas)

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      setrelative(datas2)
    }
    else{
      setrelative(datas)
    }
  },[])

  return (
    <Container>
      <img src={bannerLogo} height={"460px"} width={"100%"} />
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
        {tags.map((items, index) => (
          <Tags key={index}>{items}</Tags>
        ))}
      </Tagbar>

      <Bar>새로 등록된 키워드</Bar>
      <GridContainer>
        {relativeword.map((items, index) => (
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
      <div
        style={{
          width: "1000px",
          height: "400px",
          marginTop: "50px",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "460px",
            height: "400px",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "460px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            콘텐츠
          </div>
          <div
            style={{
              marginTop: "10px",
              width: "460px",
              height: "340px",
              borderRadius: "10px",
              backgroundColor: "#F7F8FC",
              flexDirection: "column",
              display: "flex",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "460px",
            height: "400px",
            flexDirection: "column",
            display: "flex",
            marginLeft: "80px",
          }}
        >
          <div
            style={{
              width: "460px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            커뮤니티
          </div>
          <div
            style={{
              marginTop: "10px",
              width: "460px",
              height: "340px",
              borderRadius: "10px",
              backgroundColor: "#F7F8FC",
              flexDirection: "column",
              display: "flex",
            }}
          ></div>
        </div>
      </div>
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
`;

const GridContainer = styled.div`
  margin-top: 20px;
  width: 1000px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); /* 2열 그리드 */
  grid-template-rows: auto;
`;
