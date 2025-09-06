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
  definition: string[];
  imgUrl: string;
  tags: TermTag[];
  relations: TermRelation[];
  isBookmarked: boolean;
};

export type Word = {
  id: string;
  name: string;
  isBookmarked: boolean;
  tags: string[];
  definition: string;
  relations?: TermRelation[];
};
