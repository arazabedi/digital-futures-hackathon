import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LLMDetailsCardProps } from "@/lib/types/types";

export default function LLMDetailsCard({ llmData }: { llmData: LLMDetailsCardProps }) {
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
	
  return  (
    <Card style={{ maxWidth: '75%' }} className=" mx-auto shadow-lg border rounded-lg p-6 bg-white">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-2x1 font-semibold  mb-2">{name}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
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
          <p><strong>Dependencies:</strong> {dependencies}</p>
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
  );
}
