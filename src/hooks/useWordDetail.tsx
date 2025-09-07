import { useState, useEffect } from "react";
import { TokenReq } from "@/api/axiosInstance";
import type { Word, Term } from "@/types/type";

export default function useWordDetail(id?: string, search?: string) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [mappedWord, setMappedWord] = useState<Word>();

  async function fetchTerms() {
    try {
      setLoading(true);
      let res;
      if (search) {
        res = await TokenReq.get<{ terms: Term[] }>(
          "/terms/names?query=" + encodeURIComponent(search)
        );
      } else {
        res = await TokenReq.get<{ terms: Term[] }>("/terms", {
          params: { ids: id || "" },
        });
      }
      const mapped: Word[] = res.data.terms.map((t) => ({
        id: t.id,
        name: t.nameKr,
        isBookmarked: t.isBookmarked,
        definition: t.definition[0],
        tags: t.tags.map((tag) => tag.name),
      }));

      const mapWord: Word = {
        id: res.data.terms[0].id,
        name: res.data.terms[0].nameKr,
        isBookmarked: res.data.terms[0].isBookmarked,
        definition: res.data.terms[0].definition[0],
        tags: res.data.terms[0].tags.map((tag) => tag.name),
      };
      setMappedWord(mapWord);

      setWords(mapped);
    } catch (err) {
      console.error("❌ 에러:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTerms();
  }, [search]);

  return { words, loading, mappedWord };
}
