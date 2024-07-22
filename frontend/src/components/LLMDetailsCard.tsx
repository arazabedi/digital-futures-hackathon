import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LLMDetailsCardProps } from "@/types/types";

export default function LLMDetailsCard(props: any) {
	const data: LLMDetailsCardProps = props.llmData
	return (
		<Card>
			<CardHeader>
				<CardTitle>{data.name}</CardTitle>
				<CardDescription>{data.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Type: {data.type}</p>
				<p>Organization: {data.organization}</p>
				<p>Created Date: {data.created_date.toString()}</p>
				<p>URL: {data.url}</p>
				<p>Datasheet: {data.datasheet}</p>
				<p>Modality: {data.modality}</p>
				<p>Size: {data.size}</p>
				<p>Sample: {data.sample}</p>
				<p>Analysis: {data.analysis}</p>
				<p>Dependencies: {data.dependencies}</p>
				<p>Included: {data.included}</p>
				<p>Excluded: {data.excluded}</p>
				<p>Quality Control: {data.quality_control}</p>
				<p>Access: {data.access}</p>
				<p>License: {data.license}</p>
				<p>Intended Uses: {data.intended_uses}</p>
				<p>Prohibited Uses: {data.prohibited_uses}</p>
				<p>Monitoring: {data.monitoring}</p>
				<p>Feedback: {data.feedback}</p>
				<p>Model Card: {data.model_card}</p>
				<p>Training Emissions: {data.training_emissions}</p>
				<p>Training Time: {data.training_time}</p>
				<p>Training Hardware: {data.training_hardware}</p>
				<p>Adaptation: {data.adaptation}</p>
				<p>Output Space: {data.output_space}</p>
				<p>Terms of Service: {data.terms_of_service}</p>
				<p>Monthly Active Users: {data.monthly_active_users}</p>
				<p>User Distribution: {data.user_distribution}</p>
				<p>Failures: {data.failures}</p>
			</CardContent>
		</Card>
	);
}
