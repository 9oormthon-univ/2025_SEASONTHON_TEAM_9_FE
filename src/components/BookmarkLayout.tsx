import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { TokenReq } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import EditIcon from "@/assets/bookmarkicon/edit.svg";
import DeleteIcon from "@/assets/bookmarkicon/delete.svg";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  children: React.ReactNode;
}
type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// ...
export default function BookmarkLayout({ children }: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { id: folderId } = useParams();
  const folderName = params.get("folderName");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [editName, setEditName] = useState(folderName || ""); // 기본값 세팅

  // 메뉴 열기
  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 폴더 수정 열기
  const handleEdit = () => {
    setEditName(folderName || "");
    setEditOpen(true);
    handleMenuClose();
  };

  const handleEditConfirm = async () => {
    if (!folderId) return;
    try {
      await TokenReq.patch(`/bookmarks/folders/${folderId}`, {
        name: editName,
      });
      toast.success("폴더 수정 성공");

      navigate(
        `/bookmark/word/${folderId}?folderName=${encodeURIComponent(editName)}`,
        { replace: true }
      );

      setEditOpen(false);
    } catch {
      toast.error("폴더 수정 실패");
    }
  };

  // 폴더 삭제 API
  const handleDeleteConfirm = async () => {
    if (!folderId) return;
    try {
      await TokenReq.delete("/bookmarks/folders/delete", {
        data: { folderId },
      });
      toast.success("폴더 삭제 성공");
      navigate(-1);
    } catch {
      toast.error("폴더 삭제 실패");
    }
    setDeleteConfirmOpen(false);
  };

  return (
    <LayoutContainer>
      <LayoutWrapper>
        {/* 왼쪽: 뒤로가기 + 폴더이름 */}
        <LeftSection>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon sx={{ color: "#111827" }} />
          </IconButton>
          <Typography sx={{ fontWeight: 600, fontSize: "20px", ml: "8px" }}>
            {folderName}
          </Typography>
        </LeftSection>

        <RightSection>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon sx={{ color: "#111827" }} />
          </IconButton>
        </RightSection>
      </LayoutWrapper>

      {/* 자식 콘텐츠 */}
      <ContentWrapper>{children}</ContentWrapper>

      {/* 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <img src={EditIcon} alt="edit" width={18} height={18} />
          </ListItemIcon>
          수정하기
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteConfirmOpen(true);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <img src={DeleteIcon} alt="delete" width={18} height={18} />
          </ListItemIcon>
          삭제하기
        </MenuItem>
      </Menu>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10px",
            position: "relative",
          }}
        >
          폴더 수정하기
          <IconButton
            onClick={() => setEditOpen(false)}
            size="small"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#555", marginBottom: "40px" }}>
            새로운 폴더 이름을 입력해주세요
          </Typography>
          <TextField
            fullWidth
            placeholder="폴더 이름"
            value={editName}
            sx={{
              height: "44px",
            }}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleEditConfirm}
            disabled={!editName.trim()}
            sx={{
              backgroundColor: "#111827",
              "&:hover": { backgroundColor: "#1f2937" },
              "&.Mui-disabled": {
                backgroundColor: "#F7F8FC",
                color: "rgba(30, 32, 36, 0.34)",
              },
              borderRadius: "8px",
              width: "240px",
              height: "50px",
              marginBottom: "20px",
              boxShadow: "none",
            }}
          >
            수정하기
          </Button>
        </DialogActions>
      </Dialog>

      {/* 삭제 확인 모달 */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{ fontWeight: "600", textAlign: "center", marginTop: "10px" }}
        >
          폴더 삭제하기
          <IconButton
            onClick={() => setDeleteConfirmOpen(false)}
            size="small"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", color: "#555" }}>
          한번 삭제한 폴더는 다시 되돌릴 수 없어요 <br />
          정말 삭제하실 건가요?
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: "#111827",
              "&:hover": { backgroundColor: "#1f2937" },
              borderRadius: "8px",
              width: "240px",
              height: "50px",
              marginBottom: "20px",
            }}
          >
            삭제하기
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutContainer>
  );
}
/* ================= styled-components ================= */

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  width: 100%;
`;

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  max-width: 1000px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div``;
