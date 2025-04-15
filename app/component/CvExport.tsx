"use client";

import React, { RefObject, useRef } from "react";
// @ts-expect-error: html2pdf.js does not have TypeScript definitions
import html2pdf from "html2pdf.js";
import CVPreview from "./CVPreview";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
type Props = {
  personalDetails: PersonalDetails;
  file: File | null;
  theme: string;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  hobbies: Hobby[];
  skills: Skill[];
  download: boolean;
  ref?: RefObject<HTMLDivElement>;
};

const CVExport: React.FC<Props> = ({
  personalDetails,
  file,
  theme,
  experiences,
  educations,
  languages,
  hobbies,
  skills,
  download,
  ref,
}) => {
  const handleDownload = () => {
    const element = ref?.current;
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `${personalDetails.fullName}_cv.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleDownload} className="btn btn-primary my-4">
        Télécharger en PDF
      </button>

      <div ref={ref} className="bg-white p-10">
        <CVPreview
          personalDetails={personalDetails}
          file={file}
          theme={theme}
          experiences={experiences}
          educations={educations}
          languages={languages}
          hobbies={hobbies}
          skills={skills}
          download={true}
          ref={ref}
        />
      </div>
    </div>
  );
};

export default CVExport;
