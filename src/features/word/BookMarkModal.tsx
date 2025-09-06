import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  DialogContent,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import bookmark_fill from "@/assets/bookmarkicon/bookmark_fill.png";
import bookmark_default from "@/assets/bookmarkicon/bookmark_default.png";
import { TokenReq } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isIn: boolean;
};

interface Props {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
}

export default function BookMarkModal({
  id,
  open,
  setOpen,
  folders,
  setFolders,
}: Props) {
  const [addFoldername, setAddFoldername] = useState("");
  const [mode, setMode] = useState<"list" | "add">("list");
  const navigate = useNavigate();

  const fetchFolders = async () => {
    try {
      const res = await TokenReq.get<Folder[]>("/bookmarks/folder/in", {
        params: { termId: id },
      });
      setFolders(res.data);
    } catch (err) {
      toast.error("폴더 목록 불러오기 실패");
    }
  };

  const handleAllBookmarksCleared = (folders: Folder[]) => {
    const allCleared = folders.length > 0 && folders.every((f) => !f.isIn);
    if (allCleared) {
      navigate(0);
    }
    setOpen(false);
  };

  const toggleBookmark = async (folderId: string, isIn: boolean) => {
    try {
      if (isIn) {
        await TokenReq.delete("/bookmarks/delete", {
          data: { folderId, termId: id },
        });
        toast.success("북마크 삭제 성공");
      } else {
        await TokenReq.post("/bookmarks", { folderId, termId: id });
        toast.success("북마크 추가 성공");
      }
      fetchFolders();
      navigate(location);
    } catch (err) {
      toast.error("북마크 변경 실패");
    }
  };

  // 새 폴더 추가
  const handleAddFolder = async () => {
    try {
      const res = await TokenReq.post("/bookmarks/folders", {
        name: addFoldername,
      });
      if (res.status === 200) {
        setAddFoldername("");
        toast.success("폴더 생성 성공");
        fetchFolders();
        setMode("list");
      }
    } catch (err: any) {
      toast.error("폴더 생성 실패");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleAllBookmarksCleared(folders)}
      fullWidth
      maxWidth="xs"
    >
      {mode === "list" ? (
        <>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "600",
              }}
            >
              키워드 저장하기
              <Button
                variant="text"
                size="small"
                onClick={() => setMode("add")}
                sx={{
                  color: "#5F9CEB !important",
                  backgroundColor: "#F0F0F9",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  fontSize: "14px",
                }}
              >
                새 폴더 추가
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ padding: "20px !important" }}>
            <List>
              {folders.length > 0 ? (
                folders.map((folder) => (
                  <ListItemButton
                    key={folder.id}
                    sx={{
                      borderRadius: "12px",
                      mb: 1,
                      height: "60px",
                      backgroundColor: "#F7F8FC",
                    }}
                  >
                    <ListItemText primary={folder.name} />
                    <img
                      src={folder.isIn ? bookmark_fill : bookmark_default}
                      alt="bookmark"
                      style={{ cursor: "pointer", width: 20, height: 20 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(folder.id, folder.isIn);
                      }}
                    />
                  </ListItemButton>
                ))
              ) : (
                <p>폴더가 없습니다.</p>
              )}
            </List>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton onClick={() => setMode("list")} size="small">
                <ArrowBackIcon />
              </IconButton>
              새 폴더 추가하기
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{
              padding: "20px !important",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="내 폴더"
              value={addFoldername}
              onChange={(e) => setAddFoldername(e.target.value)}
              size="small"
              sx={{ marginBottom: "60px" }}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={!addFoldername.trim()}
              onClick={handleAddFolder}
              sx={{
                backgroundColor: "#F7F8FC",
                color: "rgba(30,32,36,0.34)",
                borderRadius: "8px",
                width: "160px",
                height: "44px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#111827",
                  color: "#fff",
                },
              }}
            >
              생성
            </Button>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
