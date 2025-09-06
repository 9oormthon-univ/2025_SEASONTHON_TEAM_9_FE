import { useState } from "react";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import ContentCard from "@/components/ContentCard";
import styled from "styled-components";
import Bg from "@/components/Banner";
import Footer from "@/components/Footer";
import { Box, Button } from "@mui/material";
import yellowfilter from "@/assets/yellowfilter.svg";
import SortIcon from "@/assets/word/sort.svg";

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
    title: "모달, 언제 띄울까요?",
    imageUrl: "/src/assets/dummy/1.png",
    tags: ["UXUI", "기획", "마케팅"],
    bookmarking: false,
    writer: "홍길동",
    date: "2025-09-04",
    description: "모달 UI를 효과적으로 사용하는 시점에 대한 전략",
  },
  {
    id: "2",
    title: "성과를 올리는 디지털 광고 전략 Top 3",
    imageUrl: "/src/assets/dummy/2.png",
    tags: ["마케팅", "비즈니스", "기획"],
    bookmarking: false,
    writer: "김영희",
    date: "2025-09-04",
    description: "디지털 광고에서 빠르게 성과를 낼 수 있는 세 가지 핵심 전략",
  },
  {
    id: "3",
    title: "네이버페이 vs 카카오페이 UX 비교 분석",
    imageUrl: "/src/assets/dummy/3.png",
    tags: ["UXUI", "프론트엔드", "기획"],
    bookmarking: true,
    writer: "이철수",
    date: "2025-09-04",
    description: "대표 간편결제 서비스 UX를 심층적으로 비교 분석",
  },
  {
    id: "4",
    title: "리뷰에서 진짜 인사이트를 끌어내려면",
    imageUrl: "/src/assets/dummy/4.png",
    tags: ["데이터", "마케팅"],
    bookmarking: false,
    writer: "박민수",
    date: "2025-09-04",
    description: "사용자 리뷰에서 의미 있는 데이터와 인사이트를 도출하는 방법",
  },
  {
    id: "5",
    title: "주니어 개발자를 위한 인터랙션 가이드",
    imageUrl: "/src/assets/dummy/5.png",
    tags: ["프론트엔드", "UXUI", "디자인"],
    bookmarking: false,
    writer: "최유진",
    date: "2025-09-04",
    description: "주니어 개발자가 알아야 할 인터랙션 설계와 구현 가이드",
  },
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
  {
    id: "9",
    title: "웹 성능 개선, A부터 Z까지",
    imageUrl: "/src/assets/dummy/9.png",
    tags: ["프론트엔드", "백엔드"],
    bookmarking: true,
    writer: "이수진",
    date: "2025-09-04",
    description: "웹 서비스 성능을 최적화하는 전 과정과 팁을 정리",
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
        <Title>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            콘텐츠
            <div style={{ display: "flex", gap: 10 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ color: "#1E2024" }}
                endIcon={
                  <img
                    src={yellowfilter}
                    alt="filter"
                    style={{ width: 20, height: 20 }}
                  />
                }
              >
                카테고리
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ color: "#1E2024" }}
                endIcon={
                  <img
                    src={SortIcon}
                    alt="sort"
                    style={{ width: 15, height: 15 }}
                  />
                }
              >
                최신순
              </Button>
            </div>
          </Box>
        </Title>
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
