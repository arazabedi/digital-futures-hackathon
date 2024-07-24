import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsArticle } from "@/lib/types/types";

export default function ArticleDetailsCard({ article }: { article: NewsArticle }) {
  const {
    _id,
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-GB');

  return (
    <Card style={{ maxWidth: '75%' }} className="mx-auto shadow-lg border rounded-lg p-6 bg-white">
      <CardHeader className="flex flex-col items-center text-center">
        {urlToImage && (
          <img src={urlToImage} alt="Article Image" className="w-full h-48 object-cover mb-4 rounded-md" />
        )}
        <CardTitle className="text-2xl font-semibold mb-2">{title}</CardTitle>
        <CardDescription className="text-gray-600 mb-2">{source.name}</CardDescription>
        {author && <p className="text-gray-500 mb-2">By {author}</p>}
        <p className="text-gray-500 mb-4">{formattedDate}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <section className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          <p>{description}</p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Content</h3>
          <p>{content}</p>
        </section>

        <section className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
          <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url}</a></p>
        </section>
      </CardContent>
    </Card>
  );
}