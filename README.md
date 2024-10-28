# Digital Futures Hackathon Project: LLM Model Ranking App

This repository contains the code for a full-stack application developed during a hackathon hosted by Digital Futures. The application helps businesses make informed investment decisions by providing information, rankings, and news on various Large Language Models (LLMs) based on business readiness and perceived value.

<img width="1428" alt="image" src="https://github.com/user-attachments/assets/f091d2de-4809-4fe5-9dfe-0bc8af78c4cf">

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **LLM Model Information**: Displays details on various LLMs to assist businesses in choosing the best models for their needs.
- **Ranking System**: Ranks LLMs by business readiness and perceived value, as curated by data analysts.
- **News Section**: Displays relevant articles and updates to keep users informed of recent advancements in the field.
- **Admin Capabilities**: Admins can manage news articles and LLM details through an authentication-secured portal.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with **Tailwind CSS**.
- **Backend**: Node.js and Express for handling API requests and managing data.
- **Database**: MongoDB for data persistence, including LLM information and news articles.
- **Deployment**: Hosted on Vercel and Fly.io for easy access.

## Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (Local instance or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arazabedi/digital-futures-hackathon.git
   cd digital-futures-hackathon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**: 
   - Copy `.env.example` to `.env` and fill in the required fields (e.g., database URI, API keys).

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

- **Frontend**: Access the app on `http://localhost:3000`.
- **Backend**: API endpoints are available at `http://localhost:3000/api` for data fetching.
  
### Admin Access
To manage the content:
1. Log in with admin credentials (set up in the database).
2. Access the admin dashboard to update LLM information or manage news articles.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

