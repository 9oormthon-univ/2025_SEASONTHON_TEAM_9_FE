import styled from "styled-components";
import Vectoricon from "@/assets/Vector.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  name: string;
  bookmarking: boolean;
  tags: string[];
  definition: string;
}

export default function AssistantCard({
  id,
  name,
  bookmarking,
  tags,
  definition,
}: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/word/${id}`);
  };

  return (
    <CardWrapper>
      <Title>
        <span>{name}</span>
        <Bookmark
          src={bookmarking ? bookmark_fill : bookmark_default}
          alt="bookmark"
        />
      </Title>

      <TagBar>
        {tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </TagBar>

      <ActionButton onClick={handleClick}>
        <span>{definition}</span>
        <img src={Vectoricon} alt="vector" />
      </ActionButton>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 151px;
  width: 260px;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px #00000033;
  padding: 10px;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 10px;

  span {
    position: absolute;
    left: 10px;
    font-weight: 600;
  }
`;

const Bookmark = styled.img`
  position: absolute;
  right: 25px;
`;

const TagBar = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 10px;
`;

const Tag = styled.div`
  padding: 2px 12px;
  background-color: #f0f0f9;
  border-radius: 10px;
  color: #5f9ceb;
  font-weight: 500;
`;

const ActionButton = styled.button`
  margin: 20px 10px 0;
  height: 45px;
  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  background-color: #f7f8fc;
  color: #1e202457;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #021122;
    color: #fff;
    cursor: pointer;
  }
`;
