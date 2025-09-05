import { useContext, useEffect, useState } from "react";
import { TokenReq } from "@/api/axiosInstance"; // 경로 맞게 import
import styled from "styled-components";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import ContentCard from "@/components/ContentCard";

type Content = {
  title: string;
  imageurl: string;
  tags: string[];
  bookmarking: boolean;
  writer: string;
  date: string;
  discription: string; // 서버 필드명이 이 철자라면 그대로 유지
};

const datas: Content[] = [
  {
    title: "프론트엔드",
    imageurl: "s",
    tags: ["개발", "디자인", "리액트"],
    bookmarking: false,
    writer: "홍길동",
    date: "2025-09-04",
    discription: "sd",
  },
  {
    title: "프론트엔드",
    imageurl: "s",
    tags: ["개발", "디자인", "리액트"],
    bookmarking: false,
    writer: "홍길동",
    date: "2025-09-04",
    discription: "sd",
  },
  {
    title: "프론트엔드",
    imageurl: "s",
    tags: ["개발", "디자인", "리액트"],
    bookmarking: true,
    writer: "홍길동",
    date: "2025-09-04",
    discription: "sd",
  },
  {
    title: "프론트엔드",
    imageurl: "s",
    tags: ["개발", "디자인", "리액트"],
    bookmarking: false,
    writer: "홍길동",
    date: "2025-09-04",
    discription: "sd",
  },
  // ...
];

export default function Contentspage() {
  const [select, setselect] = useState(false);

  const [contentsdata, setcontentsdata] = useState<Content[]>(datas);

  const [detaildatas, setdetaildatas] = useState<Content | null>(null);

  async function fetchData() {
    try {
      const res = await TokenReq.get("/데이터가져오는url");
      console.log("✅ 응답:", res.data);
      setcontentsdata(res.data);
    } catch (err) {
      console.error("❌ 에러:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !select ? (
    <Container>
      <Bg></Bg>
      <ContentsContainer>
        <Title>타이틀</Title>
        <Gridcontainer>
          {contentsdata.map((items, index) => (
            <ContentCard item={items} onSelect={setdetaildatas} />
          ))}
        </Gridcontainer>
      </ContentsContainer>
    </Container>
  ) : (
    //detail view
    <Container>
      <Detail_container>
        <Backbar>
          <div
            style={{ marginRight: "20px" }}
            onClick={() => {
              setselect(false);
            }}
          >
            {"<"}
          </div>
        </Backbar>
        <Detail_title>
          <text>{detaildatas?.title}</text>
          <img
            src={detaildatas?.bookmarking ? bookmark_fill : bookmark_default}
            style={{ position: "absolute", right: "10px" }}
          ></img>
        </Detail_title>
        <Detail_writer>{detaildatas?.writer}</Detail_writer>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
            flexDirection: "row",
            display: "flex",
            backgroundColor: "",
          }}
        >
          <Detail_date>{detaildatas?.date}</Detail_date>
          <Detail_tags>
            {detaildatas?.tags.map((items, index) => (
              <Element_tags key={index}>{items}</Element_tags>
            ))}
          </Detail_tags>
        </div>
        <div
          style={{
            width: "100%",
            height: "20px",
            borderBottom: "1px solid #DFE1E5",
          }}
        ></div>
        <Detail_image></Detail_image>
        <Detail_discription>{detaildatas?.discription}</Detail_discription>
        <div style={{ marginBottom: "200px" }}></div>
      </Detail_container>
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
  background-color: black;
`;

const ContentsContainer = styled.div`
  width: 1000px;
  height: 900px;
  margin-top: 50px;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  font-size: 18px;
`;

const Gridcontainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); /* 2열 그리드 */
  grid-template-rows: auto;
`;

const Element_img = styled.div`
  width: 100%;
  height: 150px;
  background-color: blue;
  border-radius: 5px;
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
  margin-right: 10px;
  padding: 2px 12px;
  width: auto;
  background-color: #f0f0f9;
  border-radius: 10px;
`;

const Detail_container = styled.div`
  width: 1000px;
  margin-top: 100px;
`;

const Detail_title = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 35px;
  margin-top: 10px;
  position: relative;
`;
const Detail_date = styled.div``;
const Detail_writer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const Detail_tags = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: row;
`;
const Detail_image = styled.div`
  width: 100%;
  height: 300px;
  background-color: grey;
  margin-top: 60px;
  border-radius: 10px;
`;
const Detail_discription = styled.div`
  width: 100%;
  margin-top: 100px;
`;

const Backbar = styled.div`
  width: 100%;
  height: 50px;
  font-size: 30px;
  display: flex;
  justify-content: flex-end; /* 👉 오른쪽 끝으로 정렬 */
  align-items: center; /* 👉 세로 가운데 정렬 */
`;
