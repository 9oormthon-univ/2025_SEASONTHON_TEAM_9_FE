import { useContext, useState } from "react";
import styled from "styled-components";
import Searchicon from "@/assets/Searchicon.png";
import AssistantCard from "../components/AssistantCard";

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
    id: "1",
    name: "프론트엔드",
    tags: ["리액트", "플러터", "코틀린"],
    isBookmarked: true,
    definition: "",
  },
  {
    id: "2",
    name: "백엔드",
    tags: ["nodejs", "CI/CD", "스레드"],
    isBookmarked: false,
    definition: "",
  },
  {
    id: "3",
    name: "AI",
    tags: ["트랜스포머", "GPT", "인공지능"],
    isBookmarked: true,
    definition: "",
  },
];

export default function Homepage() {
  const [searchcontent, setsearchcontent] = useState("");

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchcontent(e.target.value);
  };

  return (
    <Container>
      <Bg>
        <text
          style={{
            marginTop: "70px",
            color: "#1E2024",
            fontWeight: "600",
            fontSize: "22px",
          }}
        >
          클루시드
        </text>
        <text style={{ marginTop: "70px" }}>
          원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며,
          1차에 한하여 중임할 수 있다.
        </text>
        <text>
          대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.
        </text>
        <text style={{ marginTop: "40px" }}>
          선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가
          출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.{" "}
        </text>
        <text>
          대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써
          군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요
        </text>
        <text>
          가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.
        </text>
      </Bg>
      <div
        style={{
          width: "30%",
          position: "relative",
          marginTop: "50px",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Inputbar
          placeholder="원하는 검색어를 입력하세요"
          value={searchcontent}
          onChange={search}
        ></Inputbar>
        <Searchbtn>
          <img src={Searchicon}></img>
        </Searchbtn>
      </div>
      <Tagbar>
        {tags.map((items, index) => (
          <Tags key={index}>{items}</Tags>
        ))}
      </Tagbar>

      <Bar>연관단어 제시 텍스트</Bar>
      <Gridcontainer>
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
      </Gridcontainer>
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Bg = styled.div`
  width: 100%;
  height: 400px;
  background-color: #d9d9d9;
  flex-direction: column;
  display: flex;
  align-items: center;
  color: #1e2024a8;
`;

const Inputbar = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 12px;
  border: 1px solid #1e202457;
  border-radius: 8px;
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
  background-color: #f0f0f9;
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

const Gridcontainer = styled.div`
  margin-top: 40px;
  width: 1000px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); /* 2열 그리드 */
  grid-template-rows: auto;
`;

const Element_title = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  position: relative;
`;
const Element_tagbar = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const Element_tags = styled.div`
  margin-left: 10px;
  padding: 2px 12px;
  width: auto;
  background-color: #f0f0f9;
  border-radius: 10px;
  color: #5f9ceb;
  font-weight: 500;
`;

const Element_button = styled.div`
  width: auto;
  height: 60px;
  margin-top: 20px;
  padding: 0 12px;
  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  font-size: 18px;
  background-color: #f7f8fc;
  color: #1e202457;

  &:hover {
    background-color: #021122;
    color: #fff;
  }
`;
