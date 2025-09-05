import { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Tabs,
  Tab,
  Card,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@/assets/bookmarkicon/close_fill.png"
import { useNavigate } from "react-router-dom";
import { TokenReq } from "@/api/axiosInstance";

type Folder ={
  id: number;
  name : string;
  count : number;
}

export default function BookmarkPage() {
  const [tab, setTab] = useState(0); // 0 = 단어, 1 = 콘텐츠
  const [addfolder , setaddfolder] = useState(false)
  const [addfoldername,setaddfoldername] = useState("")
  const [folderdatas,setfolderdatas] = useState<Folder[]>([])
  const [error ,setError] = useState(false)
  const navigate = useNavigate();

  const folders = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    name: tab === 0 ? "단어 폴더" : "콘텐츠 폴더",
    count: 16,
  }));

  const handleNavigate = (id: number) => {
    if (tab === 0) {
      navigate(`word/${id}`);
    } else {
      navigate(`contents/${id}`);
    }
  };

  const add_folder = ()=>{
    handleaddfolder()
    setaddfolder(false)
    setaddfoldername("")
  }

  const add_foldername = (e:any)=>{
    setaddfoldername(e.target.value)
  }

  const handleaddfolder = async () => {
      try {
        const res = await TokenReq.post("/folders", {name:addfoldername});
  
        if (res.status === 200) {
  
          setError(false);
          navigate(`/bookmark`, { replace: true });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "로그인 실패");
      }
    };

  return (
    <PageWrapper>
      {addfolder && <Overlaycontainer>
          <OverlayModal>
            <OverlayBar style={{display:"flex",justifyContent:"space-between"}}>
              <text style={{fontWeight:"500",fontSize:"18px"}}>새로운 폴더 생성하기</text>
              <img src = {CloseIcon} onClick={()=>{setaddfoldername("");setaddfolder(false)}}></img>
            </OverlayBar>
            <OverlayBar>
              <Inputbar
          placeholder="원하는 검색어를 입력하세요"
          value={addfoldername}
          onChange={add_foldername}
        ></Inputbar>
        <Sendbtn onClick={()=>{add_folder()}}>확인</Sendbtn>
            </OverlayBar>
          </OverlayModal>
        </Overlaycontainer>}
      {/* 제목 + 탭 */}
      {!addfolder && <div>
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
          <CardWrapper key={f.id} onClick={() => handleNavigate(f.id)}>
            <FolderBox />
            <InfoRow>
              <div>
                <Typography variant="subtitle1" fontWeight={500}>
                  {f.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +{f.count}개의 {tab === 0 ? "단어" : "콘텐츠"}
                </Typography>
              </div>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // 옵션 클릭 시 카드 클릭 막기
                  console.log("옵션 클릭");
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </InfoRow>
          </CardWrapper>
        ))}

        {/* 추가하기 버튼 */}
        <AddCard>
          <Button
            onClick={()=>{setaddfolder(true)}}
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
      </div>}
    </PageWrapper>
  );
}

/* ================= styles ================= */

const Overlaycontainer = styled.div`
width:100%;
height:400px;
display:flex;
justify-content:center;
align-items:center;
`
const OverlayModal = styled.div`
width:500px;
height:200px;
background-color:white;
flex-direction:column;
display:flex;
align-items:center;
border-radius:20px;
border:1px solid lightgrey;
`
const OverlayBar = styled.div`
width:400px;
height:50px;
margin-top:30px;
display:flex;
align-items:center;
flex-direction:row;
`

const Inputbar = styled.input`
  width: 280px;
  height: 50px;
  padding: 0 12px;
  border: 1px solid #1e202457;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box; /* padding, border 포함해서 100% */

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #dfe1e5;
  }

  &::placeholder {
    color: #1e202457;
  }
`;

const Sendbtn = styled.div`
width:100px;
height:50px;
border-radius:25px;
margin-left:20px;
background-color:rgba(247, 248, 252, 1);
display:flex;
align-items:center;
justify-content:center;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
