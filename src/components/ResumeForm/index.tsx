import { PersonalInfoSection } from "./PersonalInfo";
import { ExperienceSection } from "./Experience";
import { EducationSection } from "./Education";
import { ProjectsSection } from "./Projects";
import { SkillsSection } from "./Skills";
import { LanguagesSection } from "./Languages";
import { Separator } from "@/components/ui/separator";

export function ResumeForm() {
  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full max-h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Resume Editor</h1>
      <Separator className="my-4" />
      <PersonalInfoSection />
      <ExperienceSection />
      <EducationSection />
      <LanguagesSection />
      <ProjectsSection />
      <SkillsSection />
    </div>
  );
}
