import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Link as LinkIcon } from "lucide-react";

export function ProjectsSection() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  return (
    <div className="resume-section animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button 
          onClick={addProject} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No projects added. Click the button above to add one.
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="space-y-4">
              {index > 0 && <Separator className="my-4" />}
              
              <div className="space-y-2">
                <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                <Input
                  id={`name-${project.id}`}
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder="Project Name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder="A brief description of your project and your role in it."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`url-${project.id}`} className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <span>URL</span>
                </Label>
                <Input
                  id={`url-${project.id}`}
                  value={project.url}
                  onChange={(e) => updateProject(project.id, { url: e.target.value })}
                  placeholder="https://example.com/project"
                  type="url"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => removeProject(project.id)} 
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