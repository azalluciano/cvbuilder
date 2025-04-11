"use client";
import { Experience } from "@/type";
import React, { ChangeEvent, FC } from "react";

type Props = {
  experience: Experience[];
  setExperinces: (experience: Experience[]) => void;
};

const ExperienceForm: FC<Props> = ({ experience, setExperinces }) => {
  const [newExperience, setNewExperience] = React.useState<Experience>({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Experience
  ) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Nom complet"
          value={newExperience.jobTitle}
          className="input input-bordered w-full"
          onChange={(e) => handleChange(e, "jobTitle")}
        />
        <input
          type="text"
          placeholder="Nom de l'entreprise"
          value={newExperience.companyName}
          className="input input-bordered w-full ml-4"
          onChange={(e) => handleChange(e, "companyName")}
        />
      </div>

      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Nom complet"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          value={newExperience.jobTitle}
          className="input input-bordered w-full"
          onChange={(e) => handleChange(e, "jobTitle")}
        />
        <input
          type="text"
          placeholder="Nom de l'entreprise"
          value={newExperience.companyName}
          className="input input-bordered w-full ml-4"
          onChange={(e) => handleChange(e, "companyName")}
        />
      </div>
    </div>
  );
};

export default ExperienceForm;
