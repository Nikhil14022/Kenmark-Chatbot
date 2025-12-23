# Kenmark ITan Solutions AI Chatbot

A production-style, full-stack AI chatbot for Kenmark ITan Solutions. This chatbot acts as a virtual assistant, helping users with information about company services, FAQs, and more using a RAG (Retrieval-Augmented Generation) approach.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS 4, Framer Motion, Lucide React
- **Backend**: Next.js API Routes, TypeScript
- **Database**: MongoDB Atlas with Prisma ORM
- **AI/LLM**: Local Ollama (Models: Llama3, Mistral, or Phi3)
- **Data Engineering**: `xlsx` for Excel parsing

## ✨ Key Features

- **RAG Architecture**: Intelligent response generation based on company-specific knowledge.
- **Premium UI/UX**: Sleek, floating chat widget with glassmorphism and smooth animations.
- **Knowledge Management**: Admin dashboard to upload Excel files (.xlsx) and seed website content.
- **Session Memory**: Persistent chat history during the user session.
- **Business Rule Enforcement**: Strictly non-hallucinatory and polite behavior.

## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd chatbot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/chatbot_db"
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama3"
```

### 4. Setup Database
```bash
npx prisma generate
```

### 5. Running Ollama
Ensure Ollama is installed and running on your machine:
```bash
ollama run llama3
```

### 6. Run the Application
```bash
npm run dev
```

Visit `http://localhost:3000` to see the chatbot in action. Access the admin portal at `http://localhost:3000/admin`.

## 📁 Knowledge Base Format
The application expects Excel files with the following columns:
- **Category**: (e.g., About, Services, Contact)
- **Question**: (optional question if applicable)
- **Answer**: (The knowledge content)

A sample CSV is provided in `public/sample_knowledge.csv` which can be saved as an Excel file for testing.

## 🧪 AI Model Details
- **Primary Model**: Llama 3 (via Ollama)
- **Embeddings**: Generated using Ollama's local embeddings API.
- **System Prompt**: Enforces professional, polite, and company-focused responses.

---
Built with ❤️ for Kenmark ITan Solutions.
