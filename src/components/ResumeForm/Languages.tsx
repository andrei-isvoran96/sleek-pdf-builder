import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import "./Languages.css";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native Speaker"];

export function LanguagesSection() {
  const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResume();
  const { languages } = resumeData;
  const { colorScheme } = useColorScheme();

  return (
    <div
      className="resume-section animate-fade-in group"
      style={{ transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = colorScheme.primary)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Languages</h2>
        <Button 
          onClick={addLanguage} 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No languages added. Click the button above to add one.
        </div>
      ) : (
        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-2">
              <Input
                value={lang.name}
                onChange={e => updateLanguage(lang.id, { name: e.target.value })}
                placeholder="Language (e.g. English)"
                className="text-sm flex-1"
              />
              <select
                value={lang.level}
                onChange={e => updateLanguage(lang.id, { level: e.target.value })}
                className="text-sm flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                style={{ borderColor: colorScheme.primary }}
              >
                <option value="">Level</option>
                {LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1 p-0 hover:bg-transparent"
                onClick={() => removeLanguage(lang.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove language</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 