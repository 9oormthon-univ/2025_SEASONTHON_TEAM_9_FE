import styled from "styled-components";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";

type AssistantCardProps = {
  id: string;
  title: string;
  bookmarking: boolean;
  description: string;
  tags: string[];
  comments: string[];
};

export default function SearchCard({
  id,
  title,
  bookmarking,
  description,
  tags,
  comments,
}: AssistantCardProps) {
  return (
    <CardWrapper>
      <Header>
        {title}
        <BookmarkIcon
          src={bookmarking ? bookmark_fill : bookmark_default}
          alt="bookmark"
        />
      </Header>

      <Description>{description}</Description>

      <TagRow>
        {tags.map((t, i) => (
          <Tag key={i}>{t}</Tag>
        ))}
      </TagRow>

      {comments.length > 0 && (
        <CommentBlock>
          {comments.map((c, i) => (
            <Comment key={i}>{c}</Comment>
          ))}
        </CommentBlock>
      )}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 100%;
  justify-self: start;
  box-shadow: 0 0 0 1px #c8d6e8;
  border-radius: 25px;
  background-color: #fff;
  overflow: hidden;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 20px;
  position: relative;
`;

const BookmarkIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const Description = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin: 0 20px 20px 20px;
  color: #1e2024;
`;

const TagRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 20px 20px 20px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  padding: 0px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fc;
  border-radius: 6px;
  color: #5f9ceb;
  font-weight: 500;
  font-size: 11px;
`;

const CommentBlock = styled.div`
  margin: 0 20px 20px 20px;
  padding: 10px 0;
  background-color: #f8f9fd;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const Comment = styled.div`
  color: #1e202457;
  font-size: 14px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
`;
