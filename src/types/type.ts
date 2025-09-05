export type TermTag = {
  id: string;
  name: string;
};

export type TermRelation = {
  id: string;
  nameKr: string;
  definition: string;
};

export type Term = {
  id: string;
  nameKr: string;
  nameEn: string;
  definition: string;
  imgUrl: string;
  tags: TermTag[];
  relations: TermRelation[]; // 🔹 relations 추가
};

export type Word = {
  id: string;
  name: string;
  bookmarking: boolean;
  tags: string[];
  definition: string;
  relations?: TermRelation[]; // 🔹 연관 키워드 필요할 때만 사용
};
