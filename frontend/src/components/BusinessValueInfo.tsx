import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const BusinessValueInfo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="p-12 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-8 text-center underline decoration-2">
        LLM Business Readiness and Value Analysis
      </h1>
      <h2 className="text-2xl font-bold mb-4">
        Business Readiness (Horizontal Axis)
      </h2>
      <p className="mb-4">
        Evaluates the LLM&apos;s suitability for real-world business environments,
        focusing on credibility, safety, accuracy, and performance.
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Reputation of Developers (20% Weighting)
        </h3>
        <p>
          Assesses the credibility and trustworthiness of the developers behind
          the LLM.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Safety Against Misuse (20% Weighting)
        </h3>
        <p>
          Evaluates how effectively the LLM prevents and addresses misuse,
          including harmful or biased outputs.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Accuracy (30% Weighting)</h3>
        <p>
          Measures the precision and correctness of the LLM&apos;s responses. This is
          a critical indicator of the model&apos;s reliability and performance.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Benchmark Performance (30% Weighting)
        </h3>
        <p>
          Assesses performance on industry-standard benchmarks. This provides a
          quantitative measure of technical proficiency.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Formula for Business Readiness
        </h3>
        <p className="italic">
          Business Readiness = (Reputation of Developers × 0.20) + (Safety
          Against Misuse × 0.20) + (Accuracy × 0.30) + (Benchmark Performance ×
          0.30)
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Perceived Business Value (Vertical Axis)
      </h2>
      <p className="mb-4">
        Assesses the LLM&apos;s utility and impact in business contexts, focusing on
        capabilities, real-world effectiveness, popularity, and innovation.
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Capabilities (30% Weighting)</h3>
        <p>
          Evaluates the range and quality of functions and features the LLM
          offers.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Real World Application (25% Weighting)
        </h3>
        <p>
          Reviews documented effectiveness in business scenarios, including case
          studies and user testimonials.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Popularity (20% Weighting)</h3>
        <p>
          Examines the level of adoption and use of the LLM within the industry.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Innovation and Impact (25% Weighting)
        </h3>
        <p>
          Evaluates the LLM&apos;s contributions to new solutions and its influence
          on the industry.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">
          Formula for Perceived Business Value
        </h3>
        <p className="italic">
          Perceived Business Value = (Capabilities × 0.30) + (Real World
          Application × 0.25) + (Popularity × 0.20) + (Innovation and Impact ×
          0.25)
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md transition"
            variant="outline"
          >
            Show Quadrants Information
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl h-3/4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quadrants in the LLMs Comparison Matrix</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Proven Excellence</h3>
              <p>
                Models in this quadrant excel in both business readiness and
                perceived business value. They are well-established, highly
                reliable, and have a proven track record in delivering tangible
                business benefits. These models are typically backed by
                reputable developers, have strong safeguards against misuse, and
                perform exceptionally well in standardized benchmarks. They are
                widely used and trusted in the industry, often setting
                benchmarks for quality and performance.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Emerging Prospects</h3>
              <p>
                This quadrant represents language models that show high
                perceived business value but have lower business readiness.
                These models are often recognized for their innovative features,
                potential impact, or cutting-edge capabilities. However, they
                may still be in the development phase, lack comprehensive
                support infrastructure, or have limited real-world application
                experience. They are promising and attract interest for future
                potential but may require further refinement and validation
                before being widely adopted.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Operationally Effective</h3>
              <p>
                This quadrant includes models that are highly ready for
                deployment but offer moderate perceived business value. These
                models are stable, well-tested, and have established support
                systems, making them reliable choices for specific, well-defined
                tasks. While they may not lead in innovation or cover a wide
                range of applications, they are efficient and effective in their
                designated roles, providing dependable performance in real-world
                settings.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Foundational Merit</h3>
              <p>
                Models in this quadrant are characterized by lower scores in
                both business readiness and perceived business value. These are
                typically early-stage or niche models that may not yet have
                fully developed features, comprehensive support, or widespread
                recognition. While they hold foundational merit and may be
                useful in specialized areas, they require significant
                development and enhancement to reach broader applicability and
                effectiveness.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mt-8 mb-4">
                Business Readiness (Horizontal Axis)
              </h2>
              <p>
                This dimension evaluates the LLM&apos;s suitability for real-world
                business environments. It focuses on the model&apos;s credibility,
                safety, accuracy, and technical performance to determine how
                well it can be integrated and relied upon in professional
                settings.
              </p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Reputation of Developers
                </h3>
                <p>
                  Assesses the credibility and trustworthiness of the developers
                  behind the LLM. This involves evaluating their track record,
                  industry recognition, endorsements, and historical
                  reliability.
                </p>
                <p>
                  <b>Score Ranges:</b>
                </p>
                <p>
                  Low (0-35): Developers have limited industry recognition and a
                  weak track record.
                </p>
                <p>
                  Medium (35-70): Developers have a moderate reputation with
                  some industry recognition and positive feedback.
                </p>
                <p>
                  High (70-100): Developers are highly reputable with
                  significant industry recognition and endorsements.
                </p>
                <p>
                  <b>Weighting:</b> 20%
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Safety Against Misuse</h3>
                <p>
                  Assesses how effectively the LLM prevents and addresses cases
                  of misuse, including harmful, biased, or misleading outputs.
                  This involves evaluating the frequency of misuse cases
                  reported and the model&apos;s effectiveness in implementing
                  safeguards and corrective measures. The focus is on how well
                  the model manages and mitigates instances of misuse to ensure
                  ethical and safe use.
                </p>
                <p>
                  <b>Score Ranges:</b>
                </p>
                <p>
                  Low (0-35): The model has a high frequency of misuse cases and
                  harmful outputs, indicating inadequate measures and responses
                  to prevent or address misuse.
                </p>
                <p>
                  Medium (35-70): The model experiences some misuse cases and
                  harmful outputs but has implemented moderate safeguards and
                  corrective actions. There may be gaps in fully preventing or
                  addressing misuse.
                </p>
                <p>
                  High (70-100): The model has a low frequency of misuse cases
                  and harmful outputs, demonstrating effective safeguards and
                  proactive measures to prevent and address potential misuse.
                </p>
                <p>
                  <b>Weighting:</b> 20%
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Accuracy</h3>
                <p>
                  Measures the precision and correctness of the LLM&apos;s responses.
                  This is assessed through standardized benchmarks and
                  real-world tests to determine how consistently the model
                  provides accurate and relevant information.
                </p>
                <p>
                  <b>Score Ranges:</b>
                </p>
                <p>
                  Low (0-35): The model frequently produces inaccurate or
                  irrelevant responses.
                </p>
                <p>
                  Medium (35-70): The model generally provides accurate
                  responses but may have occasional errors or inconsistencies.
                </p>
                <p>
                  High (70-100): The model consistently provides precise,
                  accurate, and contextually appropriate responses.
                </p>
                <p>
                  <b>Weighting:</b> 30%
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Benchmark Performance</h3>
                <p>
                  Evaluates the LLM&apos;s performance on industry-standard
                  benchmarks such as GLUE, SuperGLUE, and SQuAD. This provides a
                  quantitative measure of the model&apos;s technical proficiency and
                  performance in various language tasks.
                </p>
                <p>
                  <b>Score Ranges:</b>
                </p>
                <p>
                  Low (0-35): The model scores poorly on industry-standard
                  benchmarks.
                </p>
                <p>
                  Medium (35-70): The model performs reasonably well on
                  benchmarks but does not lead in performance.
                </p>
                <p>
                  High (70-100): The model excels in benchmark tests,
                  demonstrating top-tier technical proficiency.
                </p>
                <p>
                  <b>Weighting:</b> 30%
                </p>
              </div>
              <p>
                <b>Weighting and Justification for Business Readiness:</b>
              </p>
              <p>
                Accuracy (30%) and Benchmark Performance (30%) are weighted the
                highest because they are critical indicators of the model&apos;s
                technical capabilities and reliability. Accurate and
                high-performing models are essential for effective business
                applications.
              </p>
              <p>
                Safety Against Misuse (20%) is crucial for maintaining ethical
                standards and trust, but it is slightly less weighted compared
                to accuracy and benchmark performance to ensure a balanced
                evaluation.
              </p>
              <p>
                Reputation of Developers (20%) is important for establishing
                trust, but its impact on technical performance is less direct
                compared to the other criteria.
              </p>
              <p>
                <b>Formula for Business Readiness:</b>
              </p>
              <p>
                Business Readiness = (Reputation of Developers × 0.20) + (Safety
                Against Misuse × 0.20) + (Accuracy × 0.30) + (Benchmark
                Performance × 0.30)
              </p>
              <div className="mb-4">
                <h2 className="text-xl font-bold mt-8 mb-4">
                  Perceived Business Value (Vertical Axis)
                </h2>
                <p>
                  This dimension assesses the LLM&apos;s utility and impact in
                  business contexts. It focuses on the model&apos;s capabilities,
                  real-world effectiveness, popularity, and its contribution to
                  industry innovation.
                </p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Capabilities</h3>
                  <p>
                    Evaluates the range of functions and features the LLM can
                    perform, including natural language understanding,
                    generation, summarization, and translation. It assesses the
                    model&apos;s versatility and ability to handle various tasks.
                  </p>
                  <p>
                    <b>Score Ranges:</b>
                  </p>
                  <p>
                    Low (0-35): The model has limited functionality and performs
                    poorly across various tasks.
                  </p>
                  <p>
                    Medium (35-70): The model offers a moderate range of
                    functions with decent performance in several tasks.
                  </p>
                  <p>
                    High (70-100): The model provides a broad range of advanced
                    features and excels in various language tasks.
                  </p>
                  <p>
                    <b>Weighting:</b> 30%
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Real World Application
                  </h3>
                  <p>
                    Reviews documented cases of the LLM being effectively
                    applied in business scenarios. This includes case studies,
                    user testimonials, and implementation reports that
                    demonstrate the model&apos;s success in achieving business goals.
                  </p>
                  <p>
                    <b>Score Ranges:</b>
                  </p>
                  <p>
                    Low (0-35): There are few or no documented business
                    applications or success stories.
                  </p>
                  <p>
                    Medium (35-70): The model has some documented applications
                    and positive case studies.
                  </p>
                  <p>
                    High (70-100): The model is widely adopted with numerous
                    successful real-world applications and case studies.
                  </p>
                  <p>
                    <b>Weighting:</b> 25%
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Popularity</h3>
                  <p>
                    Examines the level of adoption and use of the LLM within the
                    industry. This includes market penetration, the number of
                    active users, and the diversity of applications using the
                    model.
                  </p>
                  <p>
                    <b>Score Ranges:</b>
                  </p>
                  <p>
                    Low (0-35): The model has low adoption and minimal industry
                    presence.
                  </p>
                  <p>
                    Medium (35-70): The model has moderate adoption and a
                    reasonable number of users and applications.
                  </p>
                  <p>
                    High (70-100): The model is widely adopted with high market
                    penetration and diverse applications.
                  </p>
                  <p>
                    <b>Weighting:</b> 20%
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Innovation and Impact
                  </h3>
                  <p>
                    Evaluates the model&apos;s contribution to new solutions and its
                    influence in the industry. This includes its role in
                    advancing methodologies, introducing significant
                    improvements, and overall industry impact.
                  </p>
                  <p>
                    <b>Score Ranges:</b>
                  </p>
                  <p>
                    Low (0-35): The model has minimal impact or contribution to
                    new solutions and industry advancements.
                  </p>
                  <p>
                    Medium (35-70): The model shows some innovation and
                    influence but is not leading in the industry.
                  </p>
                  <p>
                    High (70-100): The model is highly innovative with
                    significant contributions to new solutions and substantial
                    industry impact.
                  </p>
                  <p>
                    <b>Weighting:</b> 25%
                  </p>
                </div>
                <p>
                  <b>
                    Weighting and Justification for Perceived Business Value:
                  </b>
                </p>
                <p>
                  Capabilities (30%) is weighted the highest as it directly
                  reflects the model&apos;s functionality and versatility, which are
                  crucial for addressing various business needs.
                </p>
                <p>
                  Real World Application (25%) is important for demonstrating
                  practical value and effectiveness, though slightly less
                  weighted than capabilities to balance practical use with
                  feature versatility.
                </p>
                <p>
                  Innovation and Impact (25%) reflects the model&apos;s ability to
                  drive industry change and contribute to new solutions, which
                  is vital for long-term business value and influence.
                </p>
                <p>
                  Popularity (20%) indicates market acceptance and can reflect
                  the model&apos;s reliability and perceived value, but it is
                  weighted less compared to practical applications and
                  capabilities.
                </p>
                <p>
                  <b>Formula for Perceived Business Value:</b>
                </p>
                <p>
                  Perceived Business Value = (Capabilities × 0.30) + (Real World
                  Application × 0.25) + (Popularity × 0.20) + (Innovation and
                  Impact × 0.25)
                </p>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessValueInfo;
