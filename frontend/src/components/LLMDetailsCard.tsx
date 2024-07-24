import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LLMEdit from "./LLMEdit";
import ArticleDetailsCard from "@/components/ArticleDetailsCard";
import { LLMDetailsCardProps, NewsArticle } from "@/lib/types/types";
import { Rating } from "@smastrom/react-rating";
import { addRating } from "@/services/ratingService";
import {
  deleteArticleById,
  getRelatedNewsByModelName,
} from "@/services/articleService";
import { useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface Props {
  llmData: LLMDetailsCardProps;
  relatedArticles: NewsArticle[];
  setRelatedArticles: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
}

const LLMDetailsCard = ({
  llmData,
  relatedArticles,
  setRelatedArticles,
}: Props) => {
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

  const [rating, setRating] = useState(3);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { user, isAdmin } = useAuth();
  const [editModeOn, setEditModeOn] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const modelId = searchParams.get("id") as string;

  const formattedDate = new Date(created_date).toLocaleDateString("en-GB");

  const handleCheckedChange = (checked: boolean) => {
    setEditModeOn(checked);
  };

  const { toast } = useToast();

  async function handleRatingSubmission(selectedValue: 1 | 2 | 3 | 4 | 5) {
    try {
      setIsReadOnly(true);
      setRating(selectedValue);
      const ratingData = {
        modelId: modelId,
        userId: user?.id || "",
        rating: selectedValue,
        createdAt: new Date(),
      };
      await addRating(ratingData);
      setIsReadOnly(false);
      toast({
        title: "Successfully rated",
      });
    } catch (err) {
      setIsReadOnly(false);
      setRating(0);
      toast({
        variant: "destructive",
        title: "Rating unsuccesful",
      });
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }

    try {
      await deleteArticleById(id);
      const updatedArticles = await getRelatedNewsByModelName(llmData.name);
      setRelatedArticles(updatedArticles);
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  return (
    <>
      {isAdmin && (
        <div
          style={{ maxWidth: "75%" }}
          className="mx-auto flex items-center space-x-2 mb-5"
        >
          <Switch
            onCheckedChange={(checked) => handleCheckedChange(checked)}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Edit</Label>
        </div>
      )}

      {isAdmin && editModeOn ? (
				<LLMEdit llmData={llmData} modelId={modelId} />
      ) : (
        <section className="p-6 bg-gray-50">
          <Card className="max-w-5xl mx-auto shadow-lg border rounded-lg p-6 bg-white">
            <CardHeader className="flex flex-col items-center text-center gap-3">
              <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
              {isAdmin ? (
                <Rating
                  style={{ maxWidth: 180 }}
                  readOnly={isReadOnly}
                  value={rating}
                  onChange={(value) => handleRatingSubmission(value)}
                />
              ) : (
                <Rating
                  style={{ maxWidth: 180 }}
                  readOnly={true}
                  value={rating}
                />
              )}
              <CardDescription className="text-gray-600">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <section className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  General Information
                </h3>
                <p>
                  <strong>Type:</strong> {type}
                </p>
                <p>
                  <strong>Organization:</strong> {organization}
                </p>
                <p>
                  <strong>Created Date:</strong> {formattedDate}
                </p>
                <p>
                  <strong>URL:</strong>{" "}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {url}
                  </a>
                </p>
                <p>
                  <strong>Datasheet:</strong> {datasheet}
                </p>
                <p>
                  <strong>Modality:</strong> {modality}
                </p>
                <p>
                  <strong>Size:</strong> {size}
                </p>
                <p>
                  <strong>Sample:</strong> {sample}
                </p>
              </section>

              <section className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  Analysis & Dependencies
                </h3>
                <p>
                  <strong>Analysis:</strong> {analysis}
                </p>
                <p>
                  <strong>Dependencies:</strong>{" "}
                  {Array.isArray(dependencies)
                    ? dependencies.join(", ")
                    : dependencies}
                </p>
                <p>
                  <strong>Included:</strong> {included}
                </p>
                <p>
                  <strong>Excluded:</strong> {excluded}
                </p>
              </section>

              <section className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  Quality & Access
                </h3>
                <p>
                  <strong>Quality Control:</strong> {quality_control}
                </p>
                <p>
                  <strong>Access:</strong> {access}
                </p>
                <p>
                  <strong>License:</strong> {license}
                </p>
              </section>

              <section className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  Usage Details
                </h3>
                <p>
                  <strong>Intended Uses:</strong> {intended_uses}
                </p>
                <p>
                  <strong>Prohibited Uses:</strong> {prohibited_uses}
                </p>
                <p>
                  <strong>Monitoring:</strong> {monitoring}
                </p>
                <p>
                  <strong>Feedback:</strong> {feedback}
                </p>
                <p>
                  <strong>Model Card:</strong> {model_card}
                </p>
              </section>

              <section className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  Training & Adaptation
                </h3>
                <p>
                  <strong>Training Emissions:</strong> {training_emissions}
                </p>
                <p>
                  <strong>Training Time:</strong> {training_time}
                </p>
                <p>
                  <strong>Training Hardware:</strong> {training_hardware}
                </p>
                <p>
                  <strong>Adaptation:</strong> {adaptation}
                </p>
                <p>
                  <strong>Output Space:</strong> {output_space}
                </p>
              </section>

              <section className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  Terms & Usage
                </h3>
                <p>
                  <strong>Terms of Service:</strong> {terms_of_service}
                </p>
                <p>
                  <strong>Monthly Active Users:</strong> {monthly_active_users}
                </p>
                <p>
                  <strong>User Distribution:</strong> {user_distribution}
                </p>
                <p>
                  <strong>Failures:</strong> {failures}
                </p>
              </section>

              <aside className="max-w-5xl mx-auto mt-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Related News</h2>
                {relatedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <div key={article._id} className="relative">
                        <ArticleDetailsCard article={article} />
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteArticle(article._id)}
                            className="absolute top-2 right-2 px-4 py-2 bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No related articles found.</p>
                )}
              </aside>
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
};

export default LLMDetailsCard;
