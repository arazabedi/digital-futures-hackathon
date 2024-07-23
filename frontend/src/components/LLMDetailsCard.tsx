import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LLMDetailsCardProps, NewsArticle } from "@/lib/types/types";
import ArticleDetailsCard from "@/components/ArticleDetailsCard"; // Ensure this is the correct path

interface Props {
  llmData: LLMDetailsCardProps;
  relatedArticles: NewsArticle[];
}

const LLMDetailsCard = ({ llmData, relatedArticles }: Props) => {
  const {
    name,
    description,
    type,
    organization,
    created_date,
    url,
    datasheet,
    modality,
    size,
    sample,
    analysis,
    dependencies,
    included,
    excluded,
    quality_control,
    access,
    license,
    intended_uses,
    prohibited_uses,
    monitoring,
    feedback,
    model_card,
    training_emissions,
    training_time,
    training_hardware,
    adaptation,
    output_space,
    terms_of_service,
    monthly_active_users,
    user_distribution,
    failures,
  } = llmData;

  const formattedDate = new Date(created_date).toLocaleDateString('en-GB');

  return (
    <section className="p-6 bg-gray-50">
      <Card className="max-w-5xl mx-auto shadow-lg border rounded-lg p-6 bg-white">
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle className="text-2xl font-semibold mb-2">{name}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">General Information</h3>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Organization:</strong> {organization}</p>
            <p><strong>Created Date:</strong> {formattedDate}</p>
            <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url}</a></p>
            <p><strong>Datasheet:</strong> {datasheet}</p>
            <p><strong>Modality:</strong> {modality}</p>
            <p><strong>Size:</strong> {size}</p>
            <p><strong>Sample:</strong> {sample}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Analysis & Dependencies</h3>
            <p><strong>Analysis:</strong> {analysis}</p>
            <p><strong>Dependencies:</strong> {Array.isArray(dependencies) ? dependencies.join(', ') : dependencies}</p>
            <p><strong>Included:</strong> {included}</p>
            <p><strong>Excluded:</strong> {excluded}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Quality & Access</h3>
            <p><strong>Quality Control:</strong> {quality_control}</p>
            <p><strong>Access:</strong> {access}</p>
            <p><strong>License:</strong> {license}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Usage Details</h3>
            <p><strong>Intended Uses:</strong> {intended_uses}</p>
            <p><strong>Prohibited Uses:</strong> {prohibited_uses}</p>
            <p><strong>Monitoring:</strong> {monitoring}</p>
            <p><strong>Feedback:</strong> {feedback}</p>
            <p><strong>Model Card:</strong> {model_card}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Training & Adaptation</h3>
            <p><strong>Training Emissions:</strong> {training_emissions}</p>
            <p><strong>Training Time:</strong> {training_time}</p>
            <p><strong>Training Hardware:</strong> {training_hardware}</p>
            <p><strong>Adaptation:</strong> {adaptation}</p>
            <p><strong>Output Space:</strong> {output_space}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Terms & Usage</h3>
            <p><strong>Terms of Service:</strong> {terms_of_service}</p>
            <p><strong>Monthly Active Users:</strong> {monthly_active_users}</p>
            <p><strong>User Distribution:</strong> {user_distribution}</p>
            <p><strong>Failures:</strong> {failures}</p>
          </section>
        </CardContent>
      </Card>

      <aside className="max-w-5xl mx-auto mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Related News</h2>
        {relatedArticles.length > 0 ? (
          <div className="space-y-4">
            {relatedArticles.map((article, index) => (
              <ArticleDetailsCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <p>No related articles found.</p>
        )}
      </aside>
    </section>
  );
};

export default LLMDetailsCard;





//================keep==================
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LLMDetailsCardProps } from "@/lib/types/types";

// export default function LLMDetailsCard({ llmData }: { llmData: LLMDetailsCardProps }) {
//   const {
//     name,
//     description,
//     type,
//     organization,
//     created_date,
//     url,
//     datasheet,
//     modality,
//     size,
//     sample,
//     analysis,
//     dependencies,
//     included,
//     excluded,
//     quality_control,
//     access,
//     license,
//     intended_uses,
//     prohibited_uses,
//     monitoring,
//     feedback,
//     model_card,
//     training_emissions,
//     training_time,
//     training_hardware,
//     adaptation,
//     output_space,
//     terms_of_service,
//     monthly_active_users,
//     user_distribution,
//     failures,
//   } = llmData;

// 	const formattedDate = new Date(created_date).toLocaleDateString('en-GB');
	
//   return  (
//     <Card style={{ maxWidth: '75%' }} className=" mx-auto shadow-lg border rounded-lg p-6 bg-white">
//       <CardHeader className="flex flex-col items-center text-center">
//         <CardTitle className="text-2x1 font-semibold  mb-2">{name}</CardTitle>
//         <CardDescription className="text-gray-600">{description}</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <section className="bg-gray-100 p-4 rounded-md shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800">General Information</h3>
//           <p><strong>Type:</strong> {type}</p>
//           <p><strong>Organization:</strong> {organization}</p>
//           <p><strong>Created Date:</strong> {formattedDate}</p>
//           <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url}</a></p>
//           <p><strong>Datasheet:</strong> {datasheet}</p>
//           <p><strong>Modality:</strong> {modality}</p>
//           <p><strong>Size:</strong> {size}</p>
//           <p><strong>Sample:</strong> {sample}</p>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-md shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800">Analysis & Dependencies</h3>
//           <p><strong>Analysis:</strong> {analysis}</p>
//           <p><strong>Dependencies:</strong> {dependencies}</p>
//           <p><strong>Included:</strong> {included}</p>
//           <p><strong>Excluded:</strong> {excluded}</p>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-md shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800">Quality & Access</h3>
//           <p><strong>Quality Control:</strong> {quality_control}</p>
//           <p><strong>Access:</strong> {access}</p>
//           <p><strong>License:</strong> {license}</p>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-md shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800">Usage Details</h3>
//           <p><strong>Intended Uses:</strong> {intended_uses}</p>
//           <p><strong>Prohibited Uses:</strong> {prohibited_uses}</p>
//           <p><strong>Monitoring:</strong> {monitoring}</p>
//           <p><strong>Feedback:</strong> {feedback}</p>
//           <p><strong>Model Card:</strong> {model_card}</p>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-md shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800">Training & Adaptation</h3>
//           <p><strong>Training Emissions:</strong> {training_emissions}</p>
//           <p><strong>Training Time:</strong> {training_time}</p>
//           <p><strong>Training Hardware:</strong> {training_hardware}</p>
//           <p><strong>Adaptation:</strong> {adaptation}</p>
//           <p><strong>Output Space:</strong> {output_space}</p>
//         </section>

//         <section className="bg-gray-100 p-4 rounded-md shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800">Terms & Usage</h3>
//           <p><strong>Terms of Service:</strong> {terms_of_service}</p>
//           <p><strong>Monthly Active Users:</strong> {monthly_active_users}</p>
//           <p><strong>User Distribution:</strong> {user_distribution}</p>
//           <p><strong>Failures:</strong> {failures}</p>
//         </section>
//       </CardContent>
//     </Card>
//   );
// }



//=========== original code ==========
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LLMDetailsCardProps } from "@/lib/types/types";

// export default function LLMDetailsCard(props: any) {
// 	const data: LLMDetailsCardProps = props.llmData
// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>{data.name}</CardTitle>
// 				<CardDescription>{data.description}</CardDescription>
// 			</CardHeader>
// 			<CardContent>
// 				<p>Type: {data.type}</p>
// 				<p>Organization: {data.organization}</p>
// 				<p>Created Date: {data.created_date.toString()}</p>
// 				<p>URL: {data.url}</p>
// 				<p>Datasheet: {data.datasheet}</p>
// 				<p>Modality: {data.modality}</p>
// 				<p>Size: {data.size}</p>
// 				<p>Sample: {data.sample}</p>
// 				<p>Analysis: {data.analysis}</p>
// 				<p>Dependencies: {data.dependencies}</p>
// 				<p>Included: {data.included}</p>
// 				<p>Excluded: {data.excluded}</p>
// 				<p>Quality Control: {data.quality_control}</p>
// 				<p>Access: {data.access}</p>
// 				<p>License: {data.license}</p>
// 				<p>Intended Uses: {data.intended_uses}</p>
// 				<p>Prohibited Uses: {data.prohibited_uses}</p>
// 				<p>Monitoring: {data.monitoring}</p>
// 				<p>Feedback: {data.feedback}</p>
// 				<p>Model Card: {data.model_card}</p>
// 				<p>Training Emissions: {data.training_emissions}</p>
// 				<p>Training Time: {data.training_time}</p>
// 				<p>Training Hardware: {data.training_hardware}</p>
// 				<p>Adaptation: {data.adaptation}</p>
// 				<p>Output Space: {data.output_space}</p>
// 				<p>Terms of Service: {data.terms_of_service}</p>
// 				<p>Monthly Active Users: {data.monthly_active_users}</p>
// 				<p>User Distribution: {data.user_distribution}</p>
// 				<p>Failures: {data.failures}</p>
// 			</CardContent>
// 		</Card>
// 	);
// }
