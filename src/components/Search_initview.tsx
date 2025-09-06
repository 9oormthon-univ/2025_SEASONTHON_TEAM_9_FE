import styled from "styled-components";
import Arrowicon from "@/assets/arrow_right_circle_fill.png";

export default function SearchGuideSection() {
  const items: RowItem[] = [
    {
      label: "키워드",
      title: "키워드는 알지만 정확한 의미가 궁금할 때",
      hints: ["온보딩 CI/CD"],
    },
    {
      label: "텍스트 검색",
      title: "적용 상황은 알지만 정확한 키워드를 모를 때",
      hints: ["신규 유저가 앱에 처음 접속했을 때 보여주는 화면이 뭐였지?"],
    },
    {
      label: "이미지 검색",
      title: "스크린샷에서 궁금한 부분이 있을 때",
      hints: [
        "이미지와 함께 궁금한 부분을 설명하면 해당 맥락에 맞는 키워드를 제안해드려요",
      ],
    },
  ];

  return (
    <Section>
      <Wrapper>
        <Header>
          <Headline>
            클루시드에서는 아래와 같은 방식으로 궁금한 키워드를 쉽게 찾을 수
            있어요.
          </Headline>
          <Sub>
            정확한 키워드를 모르더라도, 상황 설명이나 이미지 하나면 충분해요.
          </Sub>
        </Header>

        <Grid>
          {items.map((it, idx) => (
            <Row key={it.label} isEven={idx % 2 === 0}>
              <Right>
                <Card>
                  <Left>{it.label}</Left>
                  <CardBody>
                    <CardText>{it.title}</CardText>
                    <HintLine>
                      <img src={Arrowicon} />
                      <HintText>{it.hints}</HintText>
                    </HintLine>
                  </CardBody>
                </Card>
              </Right>
            </Row>
          ))}
        </Grid>

        <FootNote>
          <Dot small aria-hidden />
          이미지 검색은 로그인 회원에 한하여 하루에 최대 다섯 번까지 이용이
          가능해요.
        </FootNote>
      </Wrapper>
    </Section>
  );
}

// ---------- Types ----------
interface RowItem {
  label: string;
  title: string;
  hints: string[];
}

// ---------- Styled ----------
const Section = styled.section`
  width: 100%;
  background: #fff;
  color: #111;
`;

const Wrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 48px 24px 56px;
  @media (min-width: 768px) {
    padding: 64px 32px 72px;
  }
  background: linear-gradient(180deg, #f6faff 0%, #fefeff 100%);
`;

const Header = styled.div`
  text-align: center;
`;

const Headline = styled.h2`
  font-size: 22px;
  line-height: 1.35;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const Sub = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.56);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 28px;
`;

const Row = styled.div<{ isEven: boolean }>`
  justify-self: ${({ isEven }) => (isEven ? "end" : "start")};
`;

const Right = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Left = styled.div`
  display: none;
  font-size: 18px;
  font-weight: 600;
  @media (min-width: 840px) {
    display: flex;
    align-items: center;
  }
`;

const LabelPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(6px);
`;

const Card = styled.div`
  height: 50px;
  width: 600px;
  flex-direction: row;
  align-items: center;
  display: flex;
  border-radius: 50px 50px 50px 50px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0px 0px 14.53px 0px rgba(162, 196, 240, 0.3);
  transition: box-shadow 0.2s ease;
  padding: 18px 20px;
  @media (min-width: 768px) {
    padding: 22px 24px;
    border-radius: 32px;
  }
`;

const CardBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 470px;
  left: 150px;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.92);
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const HintLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const HintText = styled.span`
  margin-left: 10px;
  color: rgba(95, 156, 235, 0.8);
  font-size: 12px;
`;

const FootNote = styled.p`
  margin: 18px 0 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.56);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  justify-content: center;
`;

const Dot = styled.span<{ small?: boolean }>`
  display: inline-block;
  width: ${({ small }) => (small ? 6 : 8)}px;
  height: ${({ small }) => (small ? 6 : 8)}px;
  background: rgba(30, 32, 36, 0.34);
  border-radius: 50%;
  margin-top: ${({ small }) => (small ? 6 : 4)}px;
`;
