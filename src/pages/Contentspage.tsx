import { useEffect, useState } from "react";
import { TokenReq } from "@/api/axiosInstance"; // 경로 맞게 import
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import ContentCard from "@/components/ContentCard";
import styled from "styled-components";
import Bg from "@/components/Banner";
import Footer from "@/components/Footer";
import nextImg from "@/assets/nextjs2.png";
import dbImg from "@/assets/db.jpg";
import bojImg from "@/assets/boj.png";

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
    id: "1",
    title: "알고리즘",
    imageUrl: bojImg,
    tags: ["프로그래밍", "자료구조", "bfs"],
    bookmarking: false,
    writer: "채현후",
    date: "2025-09-04",
    description: "sd",
  },
  {
    id: "2",
    title: "nextjs",
    imageUrl: nextImg,
    tags: ["개발", "디자인", "리액트"],
    bookmarking: false,
    writer: "홍길동",
    date: "2025-09-04",
    description: "sd",
  },
  {
    id: "3",
    title: "데이터베이스",
    imageUrl: dbImg,
    tags: ["개발", "데이터", "sql"],
    bookmarking: true,
    writer: "신혁수",
    date: "2025-09-04",
    description: "sd",
  },
];

export default function Contentspage() {
  const [select, setSelect] = useState(false);

  const [contentsData, setContentsData] = useState<Content[]>(dummyData);

  const [detailData, setDetailData] = useState<Content | null>(null);

  // async function fetchData() {
  //   try {
  //     const res = await TokenReq.get("/데이터가져오는url");
  //     console.log("✅ 응답:", res.data);
  //     setContentsData(res.data);
  //   } catch (err) {
  //     console.error("❌ 에러:", err);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return !select ? (
    <Container>
      <Bg />
      <ContentsContainer>
        <Title>타이틀</Title>
        <GridContainer>
          {contentsData.map((items) => (
            <ContentCard item={items} onSelect={setDetailData} />
          ))}
        </GridContainer>
      </ContentsContainer>
      <Footer />
    </Container>
  ) : (
    //detail view
    <Container>
      <Detail_container>
        <Backbar>
          <div
            style={{ marginRight: "20px" }}
            onClick={() => {
              setSelect(false);
            }}
          >
            {"<"}
          </div>
        </Backbar>
        <Detail_title>
          <text>{detailData?.title}</text>
          <img
            src={detailData?.bookmarking ? bookmark_fill : bookmark_default}
            style={{ position: "absolute", right: "10px" }}
          ></img>
        </Detail_title>
        <Detail_writer>{detailData?.writer}</Detail_writer>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
            flexDirection: "row",
            display: "flex",
            backgroundColor: "",
          }}
        >
          <Detail_date>{detailData?.date}</Detail_date>
          <Detail_tags>
            {detailData?.tags.map((items, index) => (
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
        <Detail_image src={detailData?.imageUrl} />
        <Detail_discription>{detailData?.description}</Detail_discription>
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

const ContentsContainer = styled.div`
  width: 900px;
  height: 900px;
  margin-top: 50px;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  font-size: 18px;
`;

const GridContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
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
const Detail_image = styled.img`
  width: 100%;
  height: 300px;
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
