import { useRef } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import generatePDF from "react-to-pdf";

export function ResumePreview() {
  const { resumeData } = useResume();
  const { colorScheme } = useColorScheme();
  const { personalInfo, experiences, education, skills } = resumeData;
  const pdfRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) {
      toast({
        title: "Download Failed",
        description: "Could not locate resume content. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const options = {
        filename: `${personalInfo.name.replace(/\s+/g, "_") || "Resume"}_Resume.pdf`,
        page: { 
          format: "A4",
          orientation: "portrait",
          margin: 20
        },
        method: "save" as "save"
      };
      
      await generatePDF(pdfRef, options);
      
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded successfully!",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Download Failed",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    try {
      const [year, month] = dateString.split("-");
      return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <Button 
          onClick={handleDownloadPDF} 
          variant="default"
          className="flex items-center gap-1"
          style={{ backgroundColor: colorScheme.primary }}
        >
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto" style={{ maxWidth: "210mm" }}>
          <div 
            ref={pdfRef} 
            className="a4-page p-8 shadow-lg bg-white text-black"
            id="pdf-content"
          >
            {/* Header / Personal Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
              <p className="text-xl font-medium mt-1" style={{ color: colorScheme.primary }}>{personalInfo.title}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-gray-600 text-sm">
                {personalInfo.email && (
                  <span>{personalInfo.email}</span>
                )}
                {personalInfo.phone && (
                  <span>{personalInfo.phone}</span>
                )}
                {personalInfo.location && (
                  <span>{personalInfo.location}</span>
                )}
              </div>
            </div>
            
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-gray-700">{personalInfo.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  Work Experience
                </h2>
                
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-medium text-gray-800">
                          {exp.position}
                        </h3>
                        <div className="text-sm text-gray-600">
                          {formatDate(exp.startDate)} – {exp.isPresent ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-0.5" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  Education
                </h2>
                
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-medium text-gray-800">
                          {edu.institution}
                        </h3>
                        <div className="text-sm text-gray-600">
                          {formatDate(edu.startDate)} – {edu.isPresent ? "Present" : formatDate(edu.endDate)}
                        </div>
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: colorScheme.primary }}>
                        {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  Skills
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="inline-block px-2 py-1 rounded text-sm"
                      style={{ 
                        backgroundColor: `${colorScheme.primary}10`, 
                        color: colorScheme.primary 
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
