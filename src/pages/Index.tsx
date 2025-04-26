import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeProvider } from "@/contexts/ResumeContext";
// import { ThemeToggle } from "@/components/ThemeToggle"; // Removed
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, FileText } from "lucide-react";

// GitHub icon SVG
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1.5em" width="1.5em" {...props}>
    <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495 0.997 0.108-0.775 0.418-1.305 0.762-1.605-2.665-0.305-5.466-1.334-5.466-5.931 0-1.31 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.523 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.291-1.553 3.297-1.23 3.297-1.23 0.653 1.653 0.242 2.873 0.118 3.176 0.77 0.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921 0.43 0.371 0.823 1.102 0.823 2.222 0 1.606-0.014 2.898-0.014 3.293 0 0.322 0.216 0.694 0.825 0.576 4.765-1.589 8.199-6.085 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Index = () => {
  const isMobile = useIsMobile();
  const { colorScheme } = useColorScheme();
  const [activeTab, setActiveTab] = useState<string>("editor");

  // Desktop view with side-by-side panels
  const DesktopLayout = () => (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-1/2 border-r">
        <ResumeForm />
      </div>
      <div className="w-1/2">
        <ResumePreview />
      </div>
    </div>
  );

  // Mobile view with tabs
  const MobileLayout = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-64px)]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="editor" className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          <span>Editor</span>
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Preview</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="editor" className="h-[calc(100vh-112px)]">
        <ResumeForm />
      </TabsContent>
      <TabsContent value="preview" className="h-[calc(100vh-112px)]">
        <ResumePreview />
      </TabsContent>
    </Tabs>
  );

  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold flex items-center">
            <span style={{ color: colorScheme.primary }}>Sleek</span>
            <span>Resume</span>
          </h1>
          <div className="flex items-center space-x-2">
            <ColorSchemeToggle />
            <a
              href="https://github.com/andrei-isvoran96/sleek-pdf-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 hover:bg-accent transition-colors"
              title="View on GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </header>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </ResumeProvider>
  );
};

export default Index;
