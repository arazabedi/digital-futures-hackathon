const BusinessValueInfo = () => {
  return (
      <div className="p-12 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-8 text-center underline decoration-2">LLM Business Readiness and Value Analysis</h1>
      <h2 className="text-2xl font-bold mb-4">Business Readiness (Horizontal Axis)</h2>
      <p className="mb-4">
        Evaluates the LLM's suitability for real-world business environments, focusing on credibility, safety, accuracy, and performance.
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Reputation of Developers (20% Weighting)</h3>
        <p>Assesses the credibility and trustworthiness of the developers behind the LLM.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Safety Against Misuse (20% Weighting)</h3>
        <p>Evaluates how effectively the LLM prevents and addresses misuse, including harmful or biased outputs.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Accuracy (30% Weighting)</h3>
        <p>Measures the precision and correctness of the LLM’s responses. This is a critical indicator of the model’s reliability and performance.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Benchmark Performance (30% Weighting)</h3>
        <p>Assesses performance on industry-standard benchmarks. This provides a quantitative measure of technical proficiency.</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Formula for Business Readiness</h3>
        <p className="italic">Business Readiness = (Reputation of Developers × 0.20) + (Safety Against Misuse × 0.20) + (Accuracy × 0.30) + (Benchmark Performance × 0.30)</p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Perceived Business Value (Vertical Axis)</h2>
      <p className="mb-4">
        Assesses the LLM’s utility and impact in business contexts, focusing on capabilities, real-world effectiveness, popularity, and innovation.
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Capabilities (30% Weighting)</h3>
        <p>Evaluates the range and quality of functions and features the LLM offers.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Real World Application (25% Weighting)</h3>
        <p>Reviews documented effectiveness in business scenarios, including case studies and user testimonials.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Popularity (20% Weighting)</h3>
        <p>Examines the level of adoption and use of the LLM within the industry.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Innovation and Impact (25% Weighting)</h3>
        <p>Evaluates the LLM's contributions to new solutions and its influence on the industry.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Formula for Perceived Business Value</h3>
        <p className="italic">Perceived Business Value = (Capabilities × 0.30) + (Real World Application × 0.25) + (Popularity × 0.20) + (Innovation and Impact × 0.25)</p>
      </div>
    </div>
  );
};

export default BusinessValueInfo;
