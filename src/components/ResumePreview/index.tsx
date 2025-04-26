import React, { useRef, Fragment } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { Button } from "@/components/ui/button";
import { Download, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export function ResumePreview() {
  const { resumeData } = useResume();
  const { colorScheme } = useColorScheme();
  const { personalInfo, experiences, education, skills, projects } = resumeData;
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
      // Create canvas with everything visible
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        height: pdfRef.current.scrollHeight + 100, // Add extra space for safety
        windowHeight: pdfRef.current.scrollHeight + 100,
        // Apply additional styling to ensure skills are visible
        onclone: (clonedDoc) => {
          const skillsSection = clonedDoc.querySelector('.skill-section') as HTMLElement | null;
          if (skillsSection) {
            // Increase spacing around skills
            skillsSection.style.paddingBottom = '40px';
            
            // Ensure consistent styling in the clone
            // No need to add additional styling for separators as they're already in the DOM
          }
        }
      });
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgWidth = pageWidth;
      
      // Use a more aggressive scaling to ensure everything fits
      const scaleFactor = 0.95; // Scale down more to prevent cut-off
      const imgHeight = (canvas.height * imgWidth) / canvas.width * scaleFactor;
      
      // Add the resume content to the PDF
      if (imgHeight <= pageHeight) {
        // Single page - adjust position to center content
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multi-page handling
        let heightLeft = imgHeight;
        let position = 0;
        let page = 0;
        
        // First page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Additional pages if needed
        while (heightLeft > 0) {
          position = -pageHeight * (page + 1);
          page++;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }
      
      pdf.save(`${personalInfo.name.replace(/\s+/g, "_") || "Resume"}_Resume.pdf`);
      
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

  const handleDownloadPNG = async () => {
    if (!pdfRef.current) {
      toast({
        title: "Download Failed",
        description: "Could not locate resume content. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a canvas from the resume content
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      // Convert canvas to data URL and create a download link
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${personalInfo.name.replace(/\s+/g, "_") || "Resume"}_Resume.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "PNG Downloaded",
        description: "Your resume image has been downloaded successfully!",
      });
    } catch (error) {
      console.error("PNG generation error:", error);
      toast({
        title: "Download Failed",
        description: "Failed to download PNG. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add a date validation function
  const isValidMonth = (value: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(value);

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
        <div className="flex space-x-2">
          <Button 
            onClick={handleDownloadPNG} 
            variant="outline"
            className="flex items-center gap-1"
          >
            <Image className="h-4 w-4" />
            <span>PNG</span>
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            variant="default"
            className="flex items-center gap-1"
            style={{ backgroundColor: colorScheme.primary }}
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto" style={{ maxWidth: "210mm" }}>
          <div 
            ref={pdfRef} 
            className="a4-page p-10 pb-24 shadow-lg bg-white text-black" 
            id="pdf-content"
            style={{ minHeight: skills.length > 0 ? "calc(100% + 80px)" : "100%", backgroundColor: '#ffffff' }}
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
                {/* Display custom fields */}
                {personalInfo.customFields?.map(field => (
                  field.value && (
                    <span key={field.id}>
                      <strong>{field.label}:</strong> {field.value}
                    </span>
                  )
                ))}
              </div>
            </div>
            
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
                          {isValidMonth(exp.startDate) ? formatDate(exp.startDate) : "ERROR"} – {exp.isPresent ? "Present" : (isValidMonth(exp.endDate) ? formatDate(exp.endDate) : (exp.endDate ? "ERROR" : ""))}
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-0.5" style={{ color: colorScheme.primary }}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-line break-words">
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
                          {isValidMonth(edu.startDate) ? formatDate(edu.startDate) : "ERROR"} – {edu.isPresent ? "Present" : (isValidMonth(edu.endDate) ? formatDate(edu.endDate) : (edu.endDate ? "ERROR" : ""))}
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
            
            {/* Projects */}
            {projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  Projects
                </h2>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="mb-3">
                      <h3 className="text-base font-medium text-gray-800">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-line break-words">
                        {project.description}
                      </p>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm mt-1 inline-block"
                          style={{ color: colorScheme.primary }}
                        >
                          {project.url.replace(/^https?:\/\/(www\.)?/i, '')}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
              <div className="skill-section" style={{ marginBottom: "70px", paddingBottom: "30px" }}>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                  Skills
                </h2>
                
                <div className="flex flex-wrap">
                  {skills.map((skill, index) => (
                    <Fragment key={skill.id}>
                      <span 
                        className="font-bold"
                        style={{ 
                          color: colorScheme.primary,
                          display: "inline-block",
                          marginBottom: "6px"
                        }}
                      >
                        {skill.name}
                      </span>
                      {index < skills.length - 1 && (
                        <span className="mx-2 text-gray-400 font-normal">|</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add a large spacer div to ensure content is fully rendered */}
            <div style={{ height: "100px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
