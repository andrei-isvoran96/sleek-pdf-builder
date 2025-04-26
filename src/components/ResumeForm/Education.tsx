
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";

export function EducationSection() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <div className="resume-section animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button 
          onClick={addEducation} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No education added. Click the button above to add one.
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="space-y-4">
              {index > 0 && <Separator className="my-4" />}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="University Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                <Input
                  id={`field-${edu.id}`}
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`present-${edu.id}`}
                        checked={edu.isPresent}
                        onCheckedChange={(checked) => {
                          updateEducation(edu.id, { 
                            isPresent: !!checked,
                            endDate: checked ? "" : edu.endDate
                          });
                        }}
                      />
                      <Label htmlFor={`present-${edu.id}`} className="text-sm">
                        Present
                      </Label>
                    </div>
                  </div>
                  <Input
                    id={`endDate-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    disabled={edu.isPresent}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => removeEducation(edu.id)} 
                  size="sm" 
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
