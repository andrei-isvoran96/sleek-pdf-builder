import React, { createContext, useContext, useState, ReactNode } from "react";

// Define resume data types
export interface PersonalInfo {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  customFields?: {
    id: string;
    label: string;
    value: string;
  }[];
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isPresent?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  isPresent?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // 'A1', 'A2', ...
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
}

// Default resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "Your Name",
    title: "Professional Title",
    email: "email@example.com",
    phone: "(123) 456-7890",
    location: "City, Country",
    customFields: [],
    photo: undefined
  },
  experiences: [
    {
      id: "exp1",
      company: "Company Name",
      position: "Job Title",
      startDate: "2020-01",
      endDate: "",
      isPresent: true,
      description: "Describe your responsibilities and achievements."
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "University Name",
      degree: "Degree",
      field: "Field of Study",
      startDate: "2016-09",
      endDate: "2020-05",
      isPresent: false
    }
  ],
  projects: [
    {
      id: "proj1",
      name: "Project Name",
      description: "A brief description of your project and your role in it.",
      url: "https://example.com/project"
    }
  ],
  skills: [
    { id: "skill1", name: "Skill 1" },
    { id: "skill2", name: "Skill 2" },
    { id: "skill3", name: "Skill 3" }
  ],
  languages: [
    { id: 'lang1', name: 'English', level: 'Native Speaker' }
  ],
};

// Create context
interface ResumeContextProps {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addCustomField: () => void;
  updateCustomField: (id: string, field: { label?: string; value?: string }) => void;
  removeCustomField: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, name: string) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Provider component
export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };

  const addCustomField = () => {
    const newField = {
      id: generateId(),
      label: "Custom Field",
      value: ""
    };

    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customFields: [...(prev.personalInfo.customFields || []), newField]
      }
    }));
  };

  const updateCustomField = (id: string, field: { label?: string; value?: string }) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customFields: prev.personalInfo.customFields?.map(customField => 
          customField.id === id ? { ...customField, ...field } : customField
        ) || []
      }
    }));
  };

  const removeCustomField = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customFields: prev.personalInfo.customFields?.filter(field => field.id !== id) || []
      }
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: "Company Name",
      position: "Job Title",
      startDate: "",
      endDate: "",
      isPresent: false,
      description: "Describe your responsibilities and achievements."
    };

    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const updateExperience = (id: string, data: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: "University Name",
      degree: "Degree",
      field: "Field of Study",
      startDate: "",
      endDate: "",
      isPresent: false
    };

    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: "Project Name",
      description: "A brief description of your project and your role in it.",
      url: "https://example.com/project"
    };

    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, ...data } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: "New Skill"
    };

    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, name: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, name } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addLanguage = () => {
    const newLanguage = { id: generateId(), name: '', level: '' };
    setResumeData(prev => ({ ...prev, languages: [...prev.languages, newLanguage] }));
  };

  const updateLanguage = (id: string, data: Partial<Language>) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => lang.id === id ? { ...lang, ...data } : lang)
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  const value = {
    resumeData,
    updatePersonalInfo,
    addCustomField,
    updateCustomField,
    removeCustomField,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
