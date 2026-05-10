# KrishiBondhu Client

## Live Deployment
- **Live App:** [https://krishi-bondhu-client-lf3r9s5l4-rubel6623s-projects.vercel.app](https://krishi-bondhu-client-lf3r9s5l4-rubel6623s-projects.vercel.app)
- **API Server:** [https://krishibondhu-server.onrender.com](https://krishibondhu-server.onrender.com)

## Project Overview
KrishiBondhu is a comprehensive platform designed to bridge the gap between farmers, veterinarians, and service providers. It offers an intuitive interface for managing consultations, real-time chat, an equipment marketplace, and AI-powered assistance for farming insights. The client application provides tailored, modern dashboards with a focus on seamless user experience for Farmers, Veterinarians, and Providers.

## Tech Stack
- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS, Shadcn UI, Framer Motion, Radix UI
- **State Management & Data Fetching:** React Query
- **Form Handling:** React Hook Form, Zod
- **Real-time Communication:** Socket.io-client
- **Authentication & Backend Integration:** JWT, Firebase
- **AI Integration:** Google Generative AI SDK (`@google/generative-ai`)
- **Monitoring:** Sentry

## AI Features Explanation
The KrishiBondhu client integrates with the Gemini API to offer smart, AI-powered features directly to users:
- **AI Assistant:** Provides farmers with immediate insights on crop diseases, weather impacts, and modern farming techniques through an interactive chat interface.
- **Smart Context:** Leverages Google's Generative AI to understand agricultural queries and provide relevant recommendations.

## Setup Instructions

1. **Navigate to the client directory:**
   ```bash
   cd KrishiBondhu-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the client project and configure the necessary variables (API URLs, keys, Sentry DSN, etc.):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   # Add other required keys here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
