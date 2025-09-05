import styled from "styled-components";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";

export interface ContentItem {
  title: string;
  writer: string;
  date: string;
  imageurl: string;
  tags: string[];
  discription: string;
  bookmarking: boolean;
}

interface ContentCardProps {
  item: ContentItem;
  onSelect: (item: ContentItem) => void;
}

export default function ContentCard({ item, onSelect }: ContentCardProps) {
  return (
    <CardContainer
      onClick={() => {
        onSelect(item);
      }}
    >
      <ElementImg />
      <ElementTitle>
        <span>{item.title}</span>
        <img
          src={item.bookmarking ? bookmark_fill : bookmark_default}
          style={{ position: "absolute", right: "10px" }}
          alt="bookmark"
        />
      </ElementTitle>
      <ElementTagbar>
        {item.tags.map((tag, index) => (
          <ElementTag key={index}>{tag}</ElementTag>
        ))}
      </ElementTagbar>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 250px;
  cursor: pointer;
`;

const ElementImg = styled.div`
  width: 100%;
  height: 150px;
  background-color: blue;
  border-radius: 5px;
`;

const ElementTitle = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const ElementTagbar = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const ElementTag = styled.div`
  margin-right: 10px;
  padding: 2px 12px;
  width: auto;
  background-color: #f0f0f9;
  border-radius: 10px;
`;
