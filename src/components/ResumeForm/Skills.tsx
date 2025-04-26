
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

export function SkillsSection() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  return (
    <div className="resume-section animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <Button 
          onClick={addSkill} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No skills added. Click the button above to add one.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} className="flex items-center gap-1 py-2 px-3 text-sm">
                {skill.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                  onClick={() => removeSkill(skill.id)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove skill</span>
                </Button>
              </Badge>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Add or Edit Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {skills.map((skill) => (
                <Input
                  key={skill.id}
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, e.target.value)}
                  placeholder="Skill name"
                  className="text-sm"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
