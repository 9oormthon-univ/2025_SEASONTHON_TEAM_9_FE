// KeywordRequestForm.tsx
import React, { useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Notifyicon from "@/assets/pin_2_fill.png"

type TagKey =
    | "개발" | "기획" | "UX/UI" | "디자인" | "마케팅"
    | "데이터" | "AI" | "비즈니스" | "커뮤니케이션";

const ALL_TAGS: TagKey[] = ["개발", "기획", "UX/UI", "디자인", "마케팅", "데이터", "AI", "비즈니스", "커뮤니케이션"];

export default function KeywordRequestForm() {
    const [keywordName, setKeywordName] = useState("");
    const [keywordDef, setKeywordDef] = useState("");
    const [selected, setSelected] = useState<Set<TagKey>>(new Set(["개발"]));
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isGenLoading, setGenLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const canSubmit = useMemo(() => {
        return keywordName.trim().length > 0 && keywordDef.trim().length > 0 && selected.size > 0;
    }, [keywordName, keywordDef, selected]);

    const onToggle = (t: TagKey) => {
        setSelected(prev => {
            const s = new Set(prev);
            s.has(t) ? s.delete(t) : s.add(t);
            return s;
        });
    };

    const onUpload = (f?: File) => {
        if (!f) return;
        setImageFile(f);
        const url = URL.createObjectURL(f);
        setImageUrl(url);
    };

    const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) onUpload(e.dataTransfer.files[0]);
    };

    const handleGenerate = async () => {
        // 샘플: 키워드 정의 자동 생성(실서비스에서는 API 호출 지점)
        setGenLoading(true);
        await new Promise(r => setTimeout(r, 600)); // demo delay
        if (!keywordDef.trim())
            setKeywordDef(`"${keywordName}" 키워드에 대한 간단한 설명을 여기에 작성하세요.`);
        setGenLoading(false);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // 제출 payload 예시
        const payload = {
            name: keywordName.trim(),
            definition: keywordDef.trim(),
            tags: Array.from(selected),
            image: imageFile,
        };
        console.log("SUBMIT", payload);
        alert("제출되었습니다! (콘솔을 확인하세요)");
    };

    const changename = (e: any) => {
        setKeywordName(e.target.value)
    }

    return (

        <Card as="form" onSubmit={handleSubmit}>
            <Title>새로운 키워드 요청하기</Title>
            <Hint style={{ marginTop: "30px" }}>원하는 키워드가 없을 경우 직접 키워드를 제안할 수 있어요.</Hint>
            <Hint style={{}}>제안해주신 키워드는 클루시드팀에서 검토 후 등록할 예정이에요.</Hint>
            <div style={{ marginTop: "30px", borderBottom: "1px solid rgba(240, 240, 249, 1)", width: "100%" }}></div>
            <Field>
                <Leftbar style={{ fontSize: "18px", fontWeight: "500" }}>
                    <text style={{ marginTop: "10px" }}>제안 키워드명</text>
                    <text style={{ marginTop: "30px" }}>키워드 정의</text>
                    <text style={{ marginTop: "130px" }}>태그 선택</text>
                    <text style={{ marginTop: "150px" }}>이미지 첨부</text>
                </Leftbar>
                <Rightbar>
                    <Namebar
                        placeholder="원하는 검색어를 입력하세요"
                        value={keywordName}
                        onChange={changename}
                    ></Namebar>
                    <Definitionbar></Definitionbar>
                    <Tagbar>
                        {ALL_TAGS.map((v, i) => (<Tags key={i}>{v}</Tags>))}
                    </Tagbar>
                    <Notifybar>
                        <img src={Notifyicon} style={{ marginLeft: "10px" }}></img>
                        <div style={{ marginLeft: "10px", fontSize: "12px", color: "rgba(30, 32, 36, 0.66)" }}>키워드 정의 생성이 완료되면 자동으로 태그가 선택돼요. </div>
                    </Notifybar>
                    <Imguploadbar>
                        <UploadBox
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            role="button"
                            tabIndex={0}
                        >
                            {imageUrl ? (
                                <Preview>
                                    <img src={imageUrl} alt="미리보기" />
                                </Preview>
                            ) : (
                                <>
                                    <UploadIcon aria-hidden>🖼️</UploadIcon>
                                    <UploadText>이미지를 끌어놓거나 클릭하여 업로드하세요 (PNG/JPG)</UploadText>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => e.target.files && onUpload(e.target.files[0])}
                            />
                        </UploadBox>
                    </Imguploadbar>
                </Rightbar>

            </Field>
            <div style={{ width: "100%", height: "50px", borderBottom: "1px solid rgba(240, 240, 249, 1)" }}></div>
            <div style={{ width: "100%", justifyContent: "center", marginTop: "50px", display: "flex", justifySelf: "center", height: "50px" }}>
                <GenButton>완료</GenButton>
            </div>
            <div style={{ marginBottom: "100px" }}></div>
            {/* <Title>새로운 키워드 요청하기</Title>
        <Hint>원하는 키워드가 없을 경우 직접 키워드를 제안할 수 있어요. 아래 양식에 맞추어 제안해주시면 내부 검토 후 키워드를 등록할 예정이에요.</Hint>

        <Field>
          <Label>제안 키워드 명</Label>
          <Input
            placeholder="제안하고 싶은 키워드를 입력해주세요"
            value={keywordName}
            onChange={e => setKeywordName(e.target.value)}
            maxLength={50}
          />
          <Count>{keywordName.length}/50</Count>
        </Field>

        <Field>
          <LabelRow>
            <Label>키워드 정의</Label>
            <GenButton type="button" onClick={handleGenerate} disabled={!keywordName || isGenLoading}>
              {isGenLoading ? "생성 중..." : "생성"}
            </GenButton>
          </LabelRow>
          <Textarea
            placeholder="생성 버튼을 눌러 키워드 정의를 작성해주세요"
            value={keywordDef}
            onChange={e => setKeywordDef(e.target.value)}
            rows={6}
            maxLength={500}
          />
          <Count>{keywordDef.length}/500</Count>
        </Field>

        <Field>
          <Label>태그 선택</Label>
          <ChipWrap>
            {ALL_TAGS.map(tag => (
              <Chip
                key={tag}
                $active={selected.has(tag)}
                type="button"
                onClick={() => onToggle(tag)}
              >
                {tag}
              </Chip>
            ))}
          </ChipWrap>
          <Notice>
            <NoticeIcon aria-hidden>🔔</NoticeIcon>
            <div>
              제안하신 키워드는 내부 검토 후 등록됩니다. 보다 구체적인 정의와 예시를 포함하면 검토가 빨라져요.
            </div>
          </Notice>
        </Field>

        <Field>
          <Label>이미지 첨부</Label>
          <UploadBox
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            {imageUrl ? (
              <Preview>
                <img src={imageUrl} alt="미리보기" />
              </Preview>
            ) : (
              <>
                <UploadIcon aria-hidden>🖼️</UploadIcon>
                <UploadText>이미지를 끌어놓거나 클릭하여 업로드하세요 (PNG/JPG)</UploadText>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => e.target.files && onUpload(e.target.files[0])}
            />
          </UploadBox>
        </Field>

        <Submit type="submit" disabled={!canSubmit}>완료</Submit> */}
        </Card>

    );
}

/* ===== styles ===== */


const Card = styled.div`
width:600px;
  display: flex;
  flex-direction:column;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top:40px;
  color: #1e2024;
  text-align:center;
`;

const Hint = styled.div`
  color: #7b8087;
  line-height: 1.5;
  font-size: 14px;
  text-align:center;
`;

const Field = styled.div`
  margin-top: 30px;
  width:100%;
  display:flex;
  flex-direction:row;
`;

const Leftbar = styled.div`
width:120px;
display:flex;
  flex-direction:column;
`
const Rightbar = styled.div`
width:480px;
display:flex;
  flex-direction:column;
`
const Namebar = styled.input`
width: 100%;
  height: 50px;
  padding: 0 12px;
  border: 1px solid #1e202457;
  border-radius: 12px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #dfe1e5;
  }

  &::placeholder {
    color: #1e202457;
  }
`

const Definitionbar = styled.div`
width: 100%;
height: 150px;
background-color:rgba(240, 240, 249, 1);
  border-radius: 12px;
  margin-top:10px;
`

const Tagbar = styled.div`
box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  margin-top: 10px;

  display: flex;
  flex-wrap: wrap;   /* 한 줄에 다 안 들어가면 다음 줄로 */
  gap: 10px;         /* 태그들 간격 */
  align-items: flex-start;
  padding: 10px;
`;

const Tags = styled.div<{ $active?: boolean }>`
  padding: 6px 14px;   /* 글자 수에 맞춰 여백 */
  background-color: ${({ $active }) => ($active ? "rgba(2, 17, 34, 1)" : "#ffffff")};
  border-radius: 30px;
  border: 1px solid #f0f0f9;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(30, 32, 36, 0.34)")};
  font-weight: 500;
  display: inline-flex; /* 내부 글자 크기에 맞춰짐 */
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: all 0.2s ease;
`;

const Notifybar = styled.div`
width: 100%;
height: 50px;
background-color:rgba(240, 240, 249, 1);
  margin-top:10px;
  border-radius: 12px;
align-items:center;
display:flex;
flex-direction:row;
`

const Imguploadbar = styled.div`
width: 50%;
height: 100px;
margin-top: 12px;
  border: 1.5px dashed #cbd5e1;
  padding: 18px;
  text-align: center;
  outline: none;
  user-select: none;
background-color:rgba(240, 240, 249, 1);
  border-radius: 12px;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #1e2024;
  margin-bottom: 8px;
  font-weight: 600;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid #e6e8ec;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  transition: border-color .15s;
  &:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #e6e8ec;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  resize: vertical;
  outline: none;
  transition: border-color .15s;
  &:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
`;

const Count = styled.div`
  position: absolute;
  right: 6px;
  bottom: -18px;
  font-size: 12px;
  color: #a1a6ad;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #e6e8ec;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: .15s;
  ${({ $active }) =>
        $active &&
        css`
      background: #111826;
      color: #fff;
      border-color: #111826;
    `}
  &:hover { transform: translateY(-1px); }
`;

const Notice = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 12px;
  border-radius: 12px;
  padding: 12px;
  background: #f2f6ff;
  color: #334155;
  font-size: 13px;
  line-height: 1.5;
`;

const NoticeIcon = styled.span`
  font-size: 18px;
  line-height: 1;
  margin-top: 2px;
`;

const GenButton = styled.div`
width:360px;
height:100%;
background-color:rgba(247, 248, 252, 1);
 border-radius: 12px;
 display:flex;
 align-items: center;
  justify-content: center;
 color:rgba(30, 32, 36, 0.34);
`;

const UploadBox = styled.div`
  
`;

const UploadIcon = styled.div`
  font-size: 22px;
  margin-bottom: 8px;
`;

const UploadText = styled.div`
  font-size: 13px;
  color: #64748b;
`;

const Preview = styled.div`
  display: grid;
  place-items: center;
  img {
    max-width: 100%;
    max-height: 220px;
    border-radius: 10px;
  }
`;

const Submit = styled.button`
  width: 100%;
  height: 46px;
  margin-top: 20px;
  border: none;
  border-radius: 12px;
  background: #111826;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background: #d1d5db; color: #ffffff; cursor: not-allowed;
  }
`;
