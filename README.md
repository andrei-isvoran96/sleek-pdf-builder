# Sleek PDF Builder

A modern and intuitive resume builder application that allows users to create professional resumes with a clean, sleek design and export them as PDF or PNG files.

## Features

- **Interactive Resume Editor**: Create and customize your professional resume with real-time preview
- **PDF/PNG Export**: Download your resume in PDF or PNG format with a single click
- **Custom Color Schemes**: Personalize your resume with custom color schemes
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS for a clean, modern look

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Build Tool**: Vite
- **PDF Export**: jsPDF and html2canvas
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

You can try it out online [here](https://andrei-isvoran96.github.io/sleek-pdf-builder/)

Or if you prefer locally follow the steps below.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/andrei-isvoran96/sleek-pdf-builder.git
   cd sleek-pdf-builder
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```sh
npm run build
```

## Application Structure

- `/src/components` - React components including the resume editor and preview
- `/src/contexts` - React contexts for state management (resume data, color scheme)
- `/src/hooks` - Custom React hooks
- `/src/pages` - Page components
- `/src/lib` - Utility functions and shared code

## How to Use

1. Fill in your personal information, experience, education, skills, and projects
2. Customize the color scheme to match your style
3. Preview your resume in real-time
4. Download your resume as a PDF or PNG file
5. Share your professional resume with potential employers
