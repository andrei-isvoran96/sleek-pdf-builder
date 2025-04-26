import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useColorScheme } from "@/contexts/ColorSchemeContext";

export function ExperienceSection() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experiences } = resumeData;
  const [dateErrors, setDateErrors] = useState<{[id: string]: {start: boolean, end: boolean}}>({});
  const isValidMonth = (value: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
  const { colorScheme } = useColorScheme();

  return (
    <div
      className="resume-section animate-fade-in group"
      style={{ transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = colorScheme.primary)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button 
          onClick={addExperience} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No work experience added. Click the button above to add one.
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="space-y-4">
              {index > 0 && <Separator className="my-4" />}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${experience.id}`}>Company</Label>
                  <Input
                    id={`company-${experience.id}`}
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`position-${experience.id}`}>Position</Label>
                  <Input
                    id={`position-${experience.id}`}
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, { position: e.target.value })}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date (YYYY-MM)</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateExperience(experience.id, { startDate: value });
                      setDateErrors(prev => ({
                        ...prev,
                        [experience.id]: {
                          ...prev[experience.id],
                          start: !isValidMonth(value)
                        }
                      }));
                    }}
                    className={dateErrors[experience.id]?.start
                      ? "input-error-glow focus:outline-none focus:ring-0"
                      : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`endDate-${experience.id}`}>End Date (YYYY-MM)</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`present-${experience.id}`}
                        checked={experience.isPresent}
                        onCheckedChange={(checked) => {
                          updateExperience(experience.id, { 
                            isPresent: !!checked,
                            endDate: checked ? "" : experience.endDate
                          });
                        }}
                      />
                      <Label htmlFor={`present-${experience.id}`} className="text-sm">
                        Present
                      </Label>
                    </div>
                  </div>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateExperience(experience.id, { endDate: value });
                      setDateErrors(prev => ({
                        ...prev,
                        [experience.id]: {
                          ...prev[experience.id],
                          end: !isValidMonth(value)
                        }
                      }));
                    }}
                    disabled={experience.isPresent}
                    className={dateErrors[experience.id]?.end
                      ? "input-error-glow focus:outline-none focus:ring-0"
                      : ""}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${experience.id}`}>Description</Label>
                <Textarea
                  id={`description-${experience.id}`}
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => removeExperience(experience.id)} 
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
