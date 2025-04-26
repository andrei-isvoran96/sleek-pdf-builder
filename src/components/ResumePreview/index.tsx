import { useRef } from "react";
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
      // Create a canvas from the resume content
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the image properly on A4
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      
      // Calculate image dimensions while maintaining aspect ratio
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // If the image height is greater than the page height,
      // we need to split it across multiple pages
      if (imgHeight <= pageHeight) {
        // Image fits on a single page - add it directly
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Image is taller than the page - split it
        let heightLeft = imgHeight;
        
        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add subsequent pages as needed
        let page = 1;
        while (heightLeft > 0) {
          // Only add a new page if there's significant content left to show
          // (avoid adding a blank or nearly blank page)
          if (heightLeft > 5) { // 5mm threshold - don't add page for tiny remnants
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, -pageHeight * page, imgWidth, imgHeight);
            page++;
          }
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
            className="a4-page p-10 shadow-lg bg-white text-black"
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
