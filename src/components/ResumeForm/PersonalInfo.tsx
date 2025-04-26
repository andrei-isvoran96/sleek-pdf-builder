import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Camera } from "lucide-react";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updatePersonalInfo({ photo: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ photo: undefined });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className="resume-section animate-fade-in group"
      style={{ transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = colorScheme.primary)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
    >
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="flex items-center gap-6 mb-4">
        <div className="relative group" style={{ width: 96, height: 96 }}>
          {personalInfo.photo ? (
            <>
              <img
                src={personalInfo.photo}
                alt="User photo"
                className="rounded-full object-cover border border-gray-300"
                style={{ width: 96, height: 96 }}
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
                title="Remove Photo"
                style={{ color: '#dc2626' }}
              >
                <X size={16} />
              </button>
              <button
                type="button"
                onClick={handlePhotoClick}
                className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
                title="Upload/Replace Photo"
              >
                <Plus size={18} className="text-green-600" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handlePhotoClick}
              className="w-full h-full flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
              style={{ width: 96, height: 96 }}
              title="Upload Photo"
            >
              <Plus size={36} className="text-gray-400" />
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      
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
