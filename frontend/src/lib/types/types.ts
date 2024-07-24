export type registrationDetails = {
  username: string;
  email: string;
  full_name: {
    first_name: string;
    middle_name: string | undefined;
    last_name: string;
  };
  password: string;
};

export type CatalogHeaders = {
  _id: string;
  llm: string;
  organization: string;
  description: string;
  modality: string;
};

export type LLMBasicData = {
  name: string;
  organization: string;
  description: string;
  modality: string;
};

export type LLMDetailsCardProps = {
  type: string;
  name: string;
  organization: string;
  description: string;
  created_date: Date;
  url: string;
  datasheet: string;
  modality: string;
  size: string;
  sample: string;
  analysis: string;
  dependencies: string[] | string;
  included: string;
  excluded: string;
  quality_control: string;
  access: string;
  license: string;
  intended_uses: string;
  prohibited_uses: string;
  monitoring: string;
  feedback: string;
  model_card: string;
  training_emissions: string;
  training_time: string;
  training_hardware: string;
  adaptation: string;
  output_space: string;
  terms_of_service: string;
  monthly_active_users: string;
  user_distribution: string;
  failures: string;
};

export type NewsSource = {
  id: string | null;
  name: string;
};

export type NewsArticle = {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string;
};

export type NewsHeaders = {
  _id: string;
  title: string;
  description: string;
  publishedAt: Date;
};

export type RatingData = {
  modelId: string;
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
};
