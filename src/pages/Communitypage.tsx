// CommunityPage.tsx
import { useMemo, useState } from "react";
import styled from "styled-components";

import i1_1 from "@/assets/communitypageicon/laptop_2_fill.png";
import i1_2 from "@/assets/communitypageicon/laptop_2_fill-1.png";
import i2_1 from "@/assets/communitypageicon/chart_bar_fill.png";
import i2_2 from "@/assets/communitypageicon/chart_bar_fill-1.png";
import i3_1 from "@/assets/communitypageicon/brain_fill.png";
import i3_2 from "@/assets/communitypageicon/brain_fill-1.png";
import i4_1 from "@/assets/communitypageicon/document_3_fill.png";
import i4_2 from "@/assets/communitypageicon/document_3_fill-1.png";
import i5_1 from "@/assets/communitypageicon/layers_fill.png";
import i5_2 from "@/assets/communitypageicon/layers_fill-1.png";
import i6_1 from "@/assets/communitypageicon/shopping_cart_1_fill.png";
import i6_2 from "@/assets/communitypageicon/shopping_cart_1_fill-1.png";
import i7_1 from "@/assets/communitypageicon/necktie_fill.png";
import i7_2 from "@/assets/communitypageicon/necktie_fill-1.png";
import Descendicon from "@/assets/communitypageicon/sort_descending_line.png"

type Category = {
  title:string
  icon1: string,
  icon2: string,
}

type Post = {
  id: string;
  category: string;
  author: string;
  title: string;
  excerpt: string;
  minutesAgo: number; // 방금/분 전 표기를 위한 값
  likes?: number;
  comments?: number;
};

const CATEGORIES: Category[] = [
  {
    title: "개발",
    icon1 : i1_1,
    icon2 : i1_2

  }, 
  {
    title: "데이터",
    icon1 : i2_1,
    icon2 : i2_2

  }, 
  {
    title: "AI",
    icon1 : i3_1,
    icon2 : i3_2

  }, 
  {
    title: "기획",
    icon1 : i4_1,
    icon2 : i4_2
  }, 
  {
    title: "디자인",
    icon1 : i5_1,
    icon2 : i5_2

  }, 
  {
    title: "마케팅",
    icon1 : i6_1,
    icon2 : i6_2

  }, 
  {
    title: "비즈니스",
    icon1 : i7_1,
    icon2 : i7_2

  }, 
];

const DUMMY_POSTS: Post[] = [
  {
    id: "1",
    category: "개발",
    author: "김도윤",
    title: "쿠버네티스 비용 최적화, 우리가 놓친 5가지",
    excerpt:
      "이번 분기 쿠버 비용을 추적하면서 드러난 숨은 낭비를 정리했다. 노드 수는 그대로인데 사용량은 2배가 늘어난 것처럼 보였던 이유는…",
    minutesAgo: 4,
    likes: 84,
    comments: 12,
  },
  {
    id: "2",
    category: "개발",
    author: "수진이의 즐거운 세상",
    title: "프론트엔드 성능은 실사용자 모니터링(RUM)에서 시작된다",
    excerpt:
      "현업에서는 LCP가 2초인데, 고객사단에서는 여전히 느리다는 불만이 있다. 그날 알게 된 RUM 스피커즈 모임과 다음 날 아침 대시보드…",
    minutesAgo: 54,
    likes: 28,
    comments: 3,
  },
  {
    id: "3",
    category: "AI",
    author: "짱미니",
    title: "LLM 에이전트로 고객지원 30% 자동화: 파일럿 후기",
    excerpt:
      "챗봇 붙이기 초반 성능은 기대보다 낮았지만, 라우팅 개선과 가이드 문구 튜닝으로 초기의 하이프를 현실화했다. 엑스퍼리먼트의 기준을 정하며…",
    minutesAgo: 62,
    likes: 72,
    comments: 9,
  },
  {
    id: "4",
    category: "데이터",
    author: "정윤아",
    title: "데이터 계약(Data Contract)으로 ETL 지옥 탈출",
    excerpt:
      "지난 분기, 마케팅 팀의 대시보드 중 하나가 예고 없이 깨지는 일이 무려 다섯 번. 원인은 스키마 변경이었다. 데이터 계약을 도입한 뒤…",
    minutesAgo: 77,
    likes: 31,
    comments: 6,
  },
  {
    id: "5",
    category: "개발",
    author: "Seoyeon choi",
    title: "Feature Flag로 배포 스트레스 종이기: 오픈소스만으로",
    excerpt:
      "런칭 당일에 롤백했던 그 날의 멘붕. 결국에 우리는 토글 기반의 점진적 릴리즈 전략으로 넘어갔다. 클라우드 안 쓰고도…",
    minutesAgo: 95,
    likes: 18,
    comments: 2,
  },
];

export default function Communitypage() {
  // active는 string (카테고리 title)로 관리
  const [active, setActive] = useState<string>("개발");
  const [sort, setSort] = useState<"latest" | "popular">("latest");

  const posts = useMemo(() => {
    const filtered = DUMMY_POSTS.filter((p) => p.category === active);
    if (sort === "latest") {
      return [...filtered].sort((a, b) => a.minutesAgo - b.minutesAgo);
    } else {
      return [...filtered].sort(
        (a, b) =>
          (b.likes ?? 0) + (b.comments ?? 0) -
          ((a.likes ?? 0) + (a.comments ?? 0))
      );
    }
  }, [active, sort]);

  return (
    <Wrap>
      <Sidebar>
        {CATEGORIES.map((c) => {
          const isActive = active === c.title;
          return (
            <SideItem
              key={c.title}
              aria-current={isActive}
              onClick={() => setActive(c.title)}
              role="button"
              tabIndex={0}
            >
              <img
                src={isActive ? c.icon1 : c.icon2}
                alt={c.title}
                style={{ width: 20, height: 20 }}
              />
              <span>{c.title}</span>
            </SideItem>
          );
        })}
      </Sidebar>

      <Content>
        <HeaderRow>
          <h2>전체글 보기</h2>
          <SortButton
            onClick={() => setSort((s) => (s === "latest" ? "popular" : "latest"))}
          >
            {sort === "latest" ? "최신순" : "인기순"}<img style={{marginLeft:"10px"}} src={Descendicon}></img>
          </SortButton>
        </HeaderRow>

        <PostList>
          {posts.map((p) => (
            <PostItem key={p.id}>
              <Left>
                <Avatar aria-hidden />
              </Left>
              <Right>
                <Author>{p.author}</Author>
                <Title>{p.title}</Title>
                <Excerpt>{p.excerpt}</Excerpt>
                <Meta>
                  <span>{formatMinutes(p.minutesAgo)}</span>
                  {typeof p.likes === "number" && <span>· 좋아요 {p.likes}</span>}
                  {typeof p.comments === "number" && (
                    <span>· 댓글 {p.comments}</span>
                  )}
                </Meta>
              </Right>
            </PostItem>
          ))}
        </PostList>
      </Content>
    </Wrap>
  );
}

function formatMinutes(mins: number) {
  if (mins < 1) return "방금 전";
  if (mins < 60) return `${mins}분 전`;
  const h = Math.floor(mins / 60);
  return `${h}시간 전`;
}


/* ============ styles ============ */

const Wrap = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
  min-height: 100vh;
  background: #ffffff; /* 전체 배경 하얀색 */
  color: #1e2024;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: #ffffff; /* 사이드바 배경 흰색 */
  padding: 14px;
  position: sticky;
  top: 100px;
  height: fit-content;

  @media (max-width: 900px) {
    position: static;
    display: flex;
    overflow-x: auto;
    gap: 8px;
  }
`;

const SideItem = styled.div<{ "aria-current"?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  color: ${({ ["aria-current"]: active }) => (active ? "rgba(255, 255, 255, 1)" : "rgba(30, 32, 36, 0.34)")};
  background: ${({ ["aria-current"]: active }) => (active ? "rgba(2, 17, 34, 1)" : "rgba(248, 249, 253, 1)")};
  transition: 120ms ease;

  & + & {
    margin-top: 6px;
  }

  @media (max-width: 900px) {
    white-space: nowrap;
    & + & {
      margin-top: 0;
    }
  }
`;

const Dot = styled.span<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  background: ${({ active }) => (active ? "#2196f3" : "#bbb")};
`;

const Content = styled.main`
  background: #ffffff; /* 메인 컨텐츠 배경 흰색 */
  padding: 18px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  h2 {
    font-size: 18px;
    margin: 0;
    color: rgba(30, 32, 36, 0.66);
  }
`;

const SortButton = styled.button`
  border: 1px solid #ccc;
  color: rgba(30, 32, 36, 0.6);
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 120ms ease;
  background-color:white;
  display:flex;
  justify-content:center;
  &:hover {
    background: #f0f0f0;
  }
`;

const PostList = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostItem = styled.article`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  padding: 14px 12px;
  background: #ffffff; /* 게시글 카드 배경 흰색 */
  border-bottom: 1px solid #F0F0F9;
  transition: 120ms ease;
  cursor: pointer;

  &:hover {
    border-color: #bdbdbd;
    background: #fafafa;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(180deg, #d7dbe2, #a8b2c4);
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Author = styled.div`
  font-size: 12px;
  color: #666;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111;
`;

const Excerpt = styled.div`
  font-size: 13px;
  color: #444;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Meta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #888;

  span + span {
    margin-left: 6px;
  }
`;

