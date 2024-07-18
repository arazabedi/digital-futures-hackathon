import { LLMCatalog } from "@/components/LLMCatalog";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const Catalog = () => {
  return (
    <>
      <Navbar />
      <div className="ml-44 mr-44 mt-24">
        <LLMCatalog />
      </div>
    </>
  );
};

export default Catalog;
