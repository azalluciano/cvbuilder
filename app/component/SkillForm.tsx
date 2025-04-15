import { Skill } from "@/type";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
};

const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fied: keyof Skill
  ) => {
    setNewSkill({ ...newSkill, [fied]: e.target.value });
  };

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: "" });
  };

  const handleRemoveSkill = () => {
    setSkills(skills.slice(0, skills.length - 1));
  };

  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="compétence"
          value={newSkill.name}
          onChange={(e) => handleChange(e, "name")}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={handleAddSkill} className="btn btn-primary mt-4">
          Ajouter
          <Plus className="w-4" />
        </button>
        <button onClick={handleRemoveSkill} className="btn btn-primary mt-4 ">
          Supprimer <Minus className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default SkillForm;
