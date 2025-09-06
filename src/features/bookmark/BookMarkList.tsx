import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Tabs,
  Tab,
  Card,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { TokenReq } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import EditIcon from "@/assets/bookmarkicon/edit.svg";
import DeleteIcon from "@/assets/bookmarkicon/delete.svg";

type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function BookmarkPage() {
  const [tab, setTab] = useState(0);
  const [addFolder, setAddFolder] = useState(false);
  const [addFoldername, setAddFoldername] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // ✅ 수정 모달 상태
  const [editName, setEditName] = useState(""); // ✅ 수정 이름

  const navigate = useNavigate();

  // ✅ 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const res = await TokenReq.get<{ folders: Folder[] }>(
        "/bookmarks/folders"
      );
      setFolders(res.data.folders);
    } catch (err) {
      toast.error("폴더 목록 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleNavigate = (id: string, folderName: string) => {
    if (tab === 0) {
      navigate(`word/${id}?folderName=${folderName}`);
    } else {
      navigate(`contents/${id}?folderName=${folderName}`);
    }
  };

  // ✅ 새 폴더 추가
  const handleAddFolder = async () => {
    try {
      const res = await TokenReq.post("/bookmarks/folders", {
        name: addFoldername,
      });
      if (res.status === 200) {
        setAddFolder(false);
        setAddFoldername("");
        toast.success("폴더 생성 성공");
        fetchFolders();
      }
    } catch (err: any) {
      toast.error("폴더 생성 실패");
    }
  };

  // ✅ 옵션 메뉴 열기
  const handleMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    folder: Folder
  ) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedFolder(folder);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ✅ 폴더 수정 열기
  const handleEdit = () => {
    if (selectedFolder) {
      setEditName(selectedFolder.name);
      setEditOpen(true);
    }
    handleMenuClose();
  };

  // ✅ 폴더 수정 API 호출
  const handleEditConfirm = async () => {
    if (!selectedFolder) return;
    try {
      await TokenReq.patch(`/bookmarks/folders/${selectedFolder.id}`, {
        name: editName,
      });
      toast.success("폴더 수정 성공");
      fetchFolders();
      setEditOpen(false);
      setSelectedFolder(null);
    } catch (err) {
      toast.error("폴더 수정 실패");
    }
  };

  // ✅ 폴더 삭제 버튼 → 모달 열기
  const openDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  // ✅ 실제 삭제
  const handleDeleteConfirm = async () => {
    if (!selectedFolder) return;
    try {
      await TokenReq.delete("/bookmarks/folders/delete", {
        data: { folderId: selectedFolder.id },
      });
      toast.success("폴더 삭제 성공");
      fetchFolders();
    } catch (err) {
      toast.error("폴더 삭제 실패");
    }
    setDeleteConfirmOpen(false);
    setSelectedFolder(null);
  };

  return (
    <PageWrapper>
      <Dialog
        open={addFolder}
        onClose={() => setAddFolder(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          새로운 폴더 생성하기
          <IconButton onClick={() => setAddFolder(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            placeholder="폴더 이름을 입력하세요"
            value={addFoldername}
            onChange={(e) => setAddFoldername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleAddFolder}
            disabled={!addFoldername.trim()}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 제목 + 탭 */}
      <Header>
        <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
          나의 북마크
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                borderRadius: "6px",
                minHeight: "32px",
                padding: "6px 16px",
                textTransform: "none",
                fontWeight: 500,
                color: "#9ca3af",
              },
              "& .Mui-selected": {
                backgroundColor: "#111827",
                color: "#fff",
              },
            }}
          >
            <Tab label="단어" />
            <Tab label="콘텐츠" />
          </Tabs>
        </Box>
      </Header>

      {/* 폴더 카드들 */}
      <FolderGrid>
        {folders.map((f) => (
          <CardWrapper key={f.id} onClick={() => handleNavigate(f.id, f.name)}>
            <FolderBox />
            <InfoRow>
              <div>
                <Typography variant="subtitle1" fontWeight={500}>
                  {f.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  생성일: {new Date(f.createdAt).toLocaleDateString()}
                </Typography>
              </div>
              <IconButton size="small" onClick={(e) => handleMenuOpen(e, f)}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </InfoRow>
          </CardWrapper>
        ))}

        {/* 추가하기 버튼 */}
        <AddCard>
          <Button
            onClick={() => setAddFolder(true)}
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              flexDirection: "column",
              color: "#9ca3af",
              height: "100%",
              fontWeight: 500,
            }}
          >
            추가하기
          </Button>
        </AddCard>
      </FolderGrid>

      {/* 옵션 메뉴 */}
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
        <MenuItem onClick={openDeleteConfirm}>
          <ListItemIcon>
            <img src={DeleteIcon} alt="delete" width={18} height={18} />
          </ListItemIcon>
          삭제하기
        </MenuItem>
      </Menu>

      {/* ✅ 폴더 수정 모달 */}
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
    </PageWrapper>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 50px;
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const FolderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const CardWrapper = styled(Card)`
  border-radius: 16px !important;
  box-shadow: none !important;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
`;

const FolderBox = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 16px;
  background: linear-gradient(144.37deg, #ddebfc 8.53%, #c1d9f8 88.88%);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const AddCard = styled(Card)`
  border-radius: 16px !important;
  background-color: #f9fafb !important;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  border: 1px solid #f0f0f9;
`;
