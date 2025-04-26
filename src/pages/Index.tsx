
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, FileText } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
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
    <ThemeProvider defaultTheme="light">
      <ResumeProvider>
        <div className="min-h-screen flex flex-col">
          <header className="h-16 border-b flex items-center justify-between px-4">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="text-purple-500">Resume</span>
              <span>Builder</span>
            </h1>
            <ThemeToggle />
          </header>
          
          {isMobile ? <MobileLayout /> : <DesktopLayout />}
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
};

export default Index;
