import { useState } from "react";
import styled from "styled-components";
import Vectoricon from "@/assets/Vector.png";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import { useNavigate } from "react-router-dom";
import { TokenReq } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import BookMarkModal from "@/features/word/BookMarkModal";

interface CardProps {
  id: string;
  name: string;
  isBookmarked: boolean;
  tags: string[];
  definition: string;
}

type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isIn: boolean;
};

export default function AssistantCard({
  id,
  name,
  isBookmarked,
  tags,
  definition,
}: CardProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);

  const handleClickCard = () => {
    navigate(`/word/${id}`);
  };

  // 북마크 클릭 → 무조건 모달 열기
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchFolders();
    setOpen(true);
  };

  // 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const res = await TokenReq.get<Folder[]>("/bookmarks/folder/in", {
        params: { termId: id },
      });
      console.log(" 응답!:", res.data);
      setFolders(res.data);
    } catch (err) {
      toast.error("폴더 목록 불러오기 실패");
    }
  };

  return (
    <>
      <CardWrapper>
        <Title>
          <span>{name}</span>
          <Bookmark
            src={isBookmarked ? bookmark_fill : bookmark_default}
            alt="bookmark"
            onClick={handleBookmarkClick}
          />
        </Title>

        <TagBar>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </TagBar>

        <ActionButton onClick={handleClickCard}>
          <span>
            {definition.slice(0, 12)}
            {definition.length > 12 && "..."}
          </span>
          <img src={Vectoricon} alt="vector" />
        </ActionButton>
      </CardWrapper>

      <BookMarkModal
        id={id}
        open={open}
        setOpen={setOpen}
        folders={folders}
        setFolders={setFolders}
      />
    </>
  );
}

/* ================= styles ================= */

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 151px;
  width: 260px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #00000033;
  padding: 12px 14px 14px 14px;
  cursor: pointer;
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
  cursor: pointer;
`;

const TagBar = styled.div`
  width: 100%;
  height: 25px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 10px;
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
