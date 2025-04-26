import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useColorScheme } from "@/contexts/ColorSchemeContext";

export function PersonalInfoSection() {
  const { 
    resumeData, 
    updatePersonalInfo, 
    addCustomField, 
    updateCustomField, 
    removeCustomField 
  } = useResume();
  const { personalInfo } = resumeData;
  const { colorScheme } = useColorScheme();

  return (
    <div
      className="resume-section animate-fade-in group"
      style={{ transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = colorScheme.primary)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
    >
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={personalInfo.name}
              onChange={(e) => updatePersonalInfo({ name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={personalInfo.title}
              onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              placeholder="Software Developer"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email || ""}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="johndoe@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalInfo.phone || ""}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalInfo.location || ""}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="New York, NY"
          />
        </div>
        
        {/* Custom Fields */}
        {personalInfo.customFields && personalInfo.customFields.length > 0 && (
          <div className="space-y-4 mt-2">
            <h3 className="text-md font-medium">Custom Fields</h3>
            
            {personalInfo.customFields.map(field => (
              <div key={field.id} className="space-y-2 border p-3 rounded-md relative">
                <button 
                  onClick={() => removeCustomField(field.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  <X size={18} />
                </button>
                
                <div className="space-y-2">
                  <Label htmlFor={`field-label-${field.id}`}>Field Label</Label>
                  <Input
                    id={`field-label-${field.id}`}
                    value={field.label}
                    onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                    placeholder="Field Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`field-value-${field.id}`}>Value</Label>
                  <Input
                    id={`field-value-${field.id}`}
                    value={field.value}
                    onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                    placeholder="Field Value"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center gap-2 mt-2"
          onClick={addCustomField}
        >
          <Plus size={16} />
          <span>Add Custom Field</span>
        </Button>
      </div>
    </div>
  );
}
