"use client";

import withAuth from "@/hoc/withAuth";
import { getLlmById } from "@/services/llmService";
import { getRelatedNewsByModelName } from "@/services/articleService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LLMDetailsCard from "@/components/LLMDetailsCard";
import { LLMDetailsCardProps, NewsArticle } from "@/lib/types/types";

const LLMDetails = () => {
  const [llmData, setLlmData] = useState<LLMDetailsCardProps | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id: string) => {
    try {

      const llmDetails = await getLlmById(id);
      setLlmData(llmDetails);

      const articles = await getRelatedNewsByModelName(llmDetails.name);
      setRelatedArticles(articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!llmData) return <p>Loading...</p>;

  return (
    <section className="p-32">
      <LLMDetailsCard llmData={llmData} relatedArticles={relatedArticles} />
    </section>
  );
};

export default withAuth(LLMDetails);
