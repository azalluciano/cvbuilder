import React, { useRef, useEffect } from "react";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Mail,
  MapPinCheckInside,
  Phone,
  Star,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Props = {
  personalDetails: PersonalDetails;
  file: File | null;
  theme: string;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  hobbies: Hobby[];
  skills: Skill[];
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
}

const getStarRating = (proficiency: string) => {
  const maxStars = 5;
  let filledStars = 0;

  switch (proficiency) {
    case "Débutant":
      filledStars = 1;
      break;
    case "Intermédiaire":
      filledStars = 3;
      break;
    case "Avancé":
      filledStars = 5;
      break;
    default:
      filledStars = 0;
  }
  return (
    <>
      {Array.from({ length: filledStars }, (_, index) => (
        <Star key={index} className="text-primary" />
      ))}
      {Array.from({ length: maxStars - filledStars }, (_, index) => (
        <Star key={index + filledStars} className="text-gray-300" />
      ))}
    </>
  );
};

const CVPDFGenerator: React.FC<Props> = ({
  personalDetails,
  file,
  theme,
  experiences,
  educations,
  languages,
  hobbies,
  skills,
}) => {
  const cvRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cvRef.current) {
      const sectionH1Elements = cvRef.current.querySelectorAll("section h1");
      sectionH1Elements.forEach((h1) => {
        (h1 as HTMLElement).style.fontSize = "1.25rem";
        (h1 as HTMLElement).style.marginBottom = "0.5rem";
      });
    }
  }, []);

  const getHexColorFromCSSVar = (varName: string): string => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();

    // Si c'est une couleur OKLCH (non supportée), retourne une couleur hex fallback
    if (value.startsWith("oklch")) {
      return "#570DF8"; // ou une autre couleur par défaut
    }

    return value || "#570DF8";
  };

  const generatePDF = async () => {
    if (!cvRef.current) return;

    alert("Génération du PDF en cours, veuillez patienter...");

    try {
      if (!printRef.current) return;
      printRef.current.innerHTML = cvRef.current.innerHTML;

      const primaryColor = getHexColorFromCSSVar("--p");

      const primaryElements = printRef.current.querySelectorAll(
        ".text-primary, .border-primary, .badge-primary, .step-primary"
      );

      primaryElements.forEach((el) => {
        if (el.classList.contains("text-primary")) {
          (el as HTMLElement).style.color = primaryColor;
        }
        if (el.classList.contains("border-primary")) {
          (el as HTMLElement).style.borderColor = primaryColor;
        }
        if (el.classList.contains("badge-primary")) {
          (el as HTMLElement).style.backgroundColor = primaryColor;
          (el as HTMLElement).style.color = "#FFFFFF";
        }
        if (el.classList.contains("step-primary")) {
          const before = document.createElement("style");
          before.textContent = `.step-primary:before { background-color: ${primaryColor} !important; }`;
          document.head.appendChild(before);
        }
      });

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      if (imgHeight * ratio > pdfHeight) {
        let heightLeft = imgHeight * ratio;
        let position = 0;
        heightLeft -= pdfHeight;
        position = -pdfHeight;

        while (heightLeft >= 0) {
          position += pdfHeight;
          pdf.addPage();
          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            position,
            imgWidth * ratio,
            imgHeight * ratio
          );
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(`CV_${personalDetails.fullName.replace(/\s+/g, "_")}.pdf`);

      printRef.current.innerHTML = "";
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={generatePDF} className="btn btn-primary mb-4">
        Télécharger en PDF
      </button>
      <div
        ref={cvRef}
        className="flex p-16 w-[950px] h-auto min-h-[1200px] shadow-lg"
        data-theme={theme}
      >
        {/* Le contenu de ton CV ici */}
        {/* ... identique à ce que tu avais, je n’ai pas modifié cette partie */}
      </div>
      <div
        ref={printRef}
        className="hidden"
        style={{ width: "950px", minHeight: "1200px", padding: "4rem" }}
      />
    </div>
  );
};

export default CVPDFGenerator;
