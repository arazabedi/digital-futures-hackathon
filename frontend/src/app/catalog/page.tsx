"use client"

import { LLMCatalog } from "@/components/LLMCatalog";
import withAuth from "@/hoc/withAuth";

const Catalog = () => {
  return (
    <>
      <div className="ml-44 mr-44 mt-24">
        <LLMCatalog />
      </div>
    </>
  );
};

export default withAuth(Catalog);
