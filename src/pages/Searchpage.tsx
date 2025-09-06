import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Searchicon from "@/assets/Searchicon.png";
import Vectoricon from "@/assets/Vector.png";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import SearchCard from "@/components/SearchCard";

const tagname = ["키워드","텍스트","이미지"];

type Relationword = { word: string; bookmarking: boolean; tags: string[] };

type User = { id: string; role: "user"; text: string };
type Assistant1 = { id: string; role: "assistant1"; name: string };
type Assistant2 = {
  id: string;
  role: "assistant2";
  title: string;
  description: string;
  tags: string[];
  comments: string[];
  bookmarking: boolean;
};
type Assistant3 = { id: string; role: "assistant3" };
type Assistant4 = { id: string; role: "assistant4"; words: Relationword[] };

export default function Searchpage() {
  const [msgs, setMsgs] = useState<
    (User | Assistant1 | Assistant2 | Assistant3 | Assistant4)[]
  >([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedTag, setSelectedTag] = useState<number>(0);


  // 새 메시지 도착 시 맨 아래로 스크롤
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs]);

  // textarea 자동 높이
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: User = { id: crypto.randomUUID(), role: "user", text };
    setMsgs((prev) => [...prev, newMsg]);
    setInput("");
    if (taRef.current) {
      taRef.current.style.height = "44px"; // 기본 높이로 리셋
    }

    // 데모용: 어시스턴트 에코
    setTimeout(() => {
      setMsgs((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant1", name: `00` },
        {
          id: crypto.randomUUID(),
          role: "assistant2",
          title: `CI/CD (Continuous Integration / Continuous Deployment)`,
          description:
            "코드 변경 사항을 자동으로 테스트, 통합, 배포하는 개발 프로세스. 개발 효율성과 안정성을 높이는 데 필수적인 방식.단어 쓰이는 상황 / 예문",
          tags: ["Devops", "자동화", "배포"],
          comments: [
            "우리 팀은 GitHub Actions를 이용해서 CI/CD 파이프라인을 구축했어.",
            "CD 자동화가 잘 돼 있어서 코드 머지하면 바로 스테이징에 반영돼.",
          ],
          bookmarking: false,
        },
        { id: crypto.randomUUID(), role: "assistant3", text: `세번째박스` },
        {
          id: crypto.randomUUID(),
          role: "assistant4",
          words: [
            {
              word: "리액트",
              bookmarking: false,
              tags: ["프론트엔드", "ai", "개발"],
            },
            {
              word: "리액트",
              bookmarking: false,
              tags: ["프론트엔드", "ai", "개발"],
            },
            {
              word: "리액트",
              bookmarking: true,
              tags: ["프론트엔드", "ai", "개발"],
            },
          ],
        },
      ]);
    }, 400);
  };

  //   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       send();
  //     }
  //   };

  return (
    <div
      style={{
        width: "800px",
        height: "calc(100vh - 95px)",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {/*메세지 화면*/}
      <Wrap>
        <Messages>
          {msgs.map((m) => {
            if (m.role === "user") {
              return <Bubble key={m.id}>{m.text}</Bubble>;
            } else if (m.role === "assistant1") {
              return (
                <Assistant1 key={m.id}>{m.name}님이 찾은 단어에요</Assistant1>
              );
            } else if (m.role === "assistant2") {
              return (
                <SearchCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  bookmarking={m.bookmarking}
                  description={m.description}
                  tags={m.tags}
                  comments={m.comments}
                />
              );
            } else if (m.role === "assistant3") {
              return <Assistant3 key={m.id}>연관단어 제시 텍스트</Assistant3>;
            } else {
              return (
                <Assistant4 key={m.id}>
                  {m.words.map((items, index) => (
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                        height: "180px",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 2px 0px #00000033",
                      }}
                      key={index}
                    >
                      <Element_title>
                        <text style={{ position: "absolute", left: "10px" }}>
                          {items.word}
                        </text>
                        <img
                          src={
                            items.bookmarking ? bookmark_fill : bookmark_default
                          }
                          style={{ position: "absolute", right: "10px" }}
                        ></img>
                      </Element_title>
                      <Element_tagbar>
                        {items.tags.map((items2, index) => (
                          <Element_tags key={index}>{items2}</Element_tags>
                        ))}
                      </Element_tagbar>
                      <Element_button>
                        <text>단어명</text>
                        <img src={Vectoricon}></img>
                      </Element_button>
                    </div>
                  ))}
                </Assistant4>
              );
            }
          })}
          <div ref={endRef} />
        </Messages>
      </Wrap>

      {/*검색바*/}
      <div
        style={{
          marginBottom: "30px",
          width: "100%",
          height: "140px",
          backgroundColor: "#F7F8FC",
          flexDirection: "column",
          display: "flex",
          borderRadius: "30px 30px 30px 30px",
          border: "1px solid #F0F0F9",
        }}
      >
        <div
          style={{
            width: "auto",
            height: "40px",
            margin: "0px 20px",
            marginTop: "10px",
            flexDirection: "row",
            display: "flex",
          }}
        >
          {tagname.map((items, index) => (
            <Tags
            key={index}
            $active={selectedTag === index}
            onClick={() =>{
              setSelectedTag(index); // 토글 기능
            }
              
            }
          >{items}</Tags>
          ))}
        </div>
        <div
          style={{
            width: "auto",
            position: "relative",
            height: "60px",
            margin: "0px 20px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Inputbar
            placeholder="원하는 단어를 검색하세요"
            value={input}
            onChange={search}
          ></Inputbar>
          <Searchbtn onClick={send}>
            <img src={Searchicon}></img>
          </Searchbtn>
        </div>
      </div>
    </div>
  );
}

/* ================= styles ================= */

const Wrap = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  * {
    scrollbar-width: none; /* FF */
    -ms-overflow-style: none; /* IE/old Edge */
  }
  /* Chrome, Safari, Opera, Edge(Chromium) */
  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const Messages = styled.main`
  padding: 12px 12px 0 12px;
  display: grid;
  gap: 10px;

  /* iOS 사파리 바운스 여백 보완 */
  overscroll-behavior: contain;
`;

const Bubble = styled.div<{ $me?: boolean }>`
  max-width: min(78%, 680px);
  justify-self: end;
  background: #111827;
  color: white;
  border: 1px solid #e5e7eb;
  border-color: transparent;
  padding: 5px 12px;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  white-space: pre-wrap;
  line-height: 1.56;
`;

const Assistant1 = styled.div`
  width: auto;
  height: 50px;
  justify-self: start;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
`;

const Assistant2 = styled.div`
  width: 780px;
  justify-self: start;
  box-shadow: 0 0 0 4px #c8d6e8;
  border-radius: 25px 25px 25px 25px;
`;

const Assistant2_firstblock = styled.div`
  margin: 0px 20px;
  margin-top: 20px;
  background-color: blue;
  display: flex;
  flex-direction: column;
`;

const Assistant2_secondblock = styled.div`
  margin: 0px 20px;
  margin-top: 40px;
  padding: 10px 0px;
  background-color: #f8f9fd;
  display: flex;
  flex-direction: column;
  border-radius: 5px 5px 5px 5px;
`;

const Assistant3 = styled.div`
  margin-top: 50px;
  width: auto;
  height: 30px;
  justify-self: start;
  font-size: 18px;
  font-weight: 500;
`;

const Assistant4 = styled.div`
  width: 780px;
  height: 200px;
  justify-self: start;
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

/* ========================================== */

const Tags = styled.div<{ $active?: boolean }>`
  margin-right: 10px;
  padding: 2px 12px;
  width: auto;
  background-color: ${({ $active }) => ($active ? "rgba(2, 17, 34, 1)" : "#ffffff")};
  border-radius: 30px;
  border: 1px solid #f0f0f9;
  color: ${({ $active }) => ($active ? "#ffffff" : "#5f9ceb")};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: all 0.2s ease;
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
