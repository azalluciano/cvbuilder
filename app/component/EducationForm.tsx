import { Education } from "@/type";
import { Minus, Plus } from "lucide-react";
import React, { ChangeEvent, FC, useState } from "react";

type Props = {
  educations: Education[];
  setEducations: (experience: Education[]) => void;
};

const EducationForm: FC<Props> = ({ educations, setEducations }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Education
  ) => {
    setNewEducation({ ...newEducation, [field]: e.target.value });
  };
  const handleAddEducation = () => {
    setEducations([...educations, newEducation]);
    setNewEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };
  const handleRemoveEducation = () => {
    setEducations(educations.slice(0, educations.length - 1));
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Nom de l'école"
            value={newEducation.school}
            className="input input-bordered w-full"
            onChange={(e) => handleChange(e, "school")}
          />
          <input
            type="text"
            placeholder="Diplôme"
            value={newEducation.degree}
            className="input input-bordered w-full ml-4"
            onChange={(e) => handleChange(e, "degree")}
          />
        </div>

        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Date de début"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={newEducation.startDate}
            className="input input-bordered w-full"
            onChange={(e) => handleChange(e, "startDate")}
          />
          <input
            type="text"
            placeholder="Date de fin"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={newEducation.endDate}
            className="input input-bordered w-full ml-4"
            onChange={(e) => handleChange(e, "endDate")}
          />
        </div>
        <textarea
          placeholder="Description"
          value={newEducation.description}
          className="input input-bordered w-full h-32 overflow-y-auto whitespace-normal break-words"
          onChange={(e) => handleChange(e, "description")}
        ></textarea>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handleAddEducation} className="btn btn-primary mt-4 ">
          Ajouter <Plus className="w-4" />
        </button>
        <button
          onClick={handleRemoveEducation}
          className="btn btn-primary mt-4 "
        >
          Supprimer <Minus className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
