"use client";
import { RotateCw, Save, ScanEye } from "lucide-react";
import PersonalDetailsForm from "./component/PersonalDetailsForm";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import { useEffect, useRef, useState } from "react";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/pressets";
import CVPreview from "./component/CVPreview";
import ExperienceForm from "./component/ExperienceForm";
import EducationForm from "./component/EducationForm";
import LanguageForm from "./component/LanguageForm";
import SkillForm from "./component/SkillForm";
import HobbyForm from "./component/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";
import CVExport from "./component/CvExport";

export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    personalDetailsPreset
  );
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<string>("retro");
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  const [zoom, setZoom] = useState<number>(163);
  const [experiences, setExperiences] =
    useState<Experience[]>(experiencesPreset);
  const [educations, setEducations] = useState<Education[]>(educationsPreset);
  const [languages, setLanguages] = useState<Language[]>(languagesPreset);
  const [skills, setSkills] = useState<Skill[]>(skillsPreset);
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const defaultImageUrl = "/pdp.jpeg";
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "pdp.jpeg", {
          type: blob.type,
        });
        setFile(defaultFile);
        setPersonalDetails((prev) => ({
          ...prev,
          photoUrl: URL.createObjectURL(defaultFile),
        }));
      });
  }, []);
  const handleResetPersonalDetails = () =>
    setPersonalDetails({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      photoUrl: "",
      postSeeking: "",
      description: "",
    });
  const handleResetExperiences = () => {
    setExperiences([]);
  };
  const handleResetEducations = () => {
    setEducations([]);
  };
  const handleResetLanguages = () => {
    setLanguages([]);
  };
  const handleResetSkills = () => {
    setSkills([]);
  };
  const handleResetHobbies = () => {
    setHobbies([]);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cvPreviewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current;
    if (!element) return;

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
      let currentY = margin;

      const sections = element.querySelectorAll<HTMLElement>(".cv-section");

      for (const section of sections) {
        const sectionHeight = section.offsetHeight;

        if (currentY + sectionHeight > pageHeight) {
          pdf.addPage();
          currentY = margin;
        }

        await pdf.html(section, {
          x: margin,
          y: currentY,
          html2canvas: { scale: 2 },
          callback: (doc) => {
            currentY += sectionHeight + 5;
          },
        });
      }

      pdf.save("cv_professionnel.pdf");

      if (isModalOpen) closeModal();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        zIndex: 9999,
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Erreur lors de la génération du PDF - Vérifiez le contenu");
    }
  };

  return (
    <div>
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">
          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollabar">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">
                CV<span className="text-primary">Builder</span>
              </h1>
              <button className="btn btn-primary" onClick={openModal}>
                Prévisualiser
                <ScanEye />
              </button>
            </div>
            <div className="flex flex-col gap-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Qui êtes-vous ?
                </h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />
              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Expérience
                </h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>

              <ExperienceForm
                experience={experiences}
                setExperinces={setExperiences}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Education</h1>
                <button
                  onClick={handleResetEducations}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Langues</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />
              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">
                      Compétences
                    </h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-primary btn-sm"
                    >
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>
                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">
                      Loisirs
                    </h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-primary btn-sm"
                    >
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9998] top-5 right-5">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => {
                  setZoom(Number(e.target.value));
                }}
                className="range range-xs range-primary"
              />
              <p className="ml-4 text-sm text-primary">{zoom}</p>
            </div>
            <select
              className="select select-primary select-bordered fixed z-[9998] select-sm top-12 right-5 w-30 text-primary"
              name=""
              id=""
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              ))}
            </select>
            <div
              className="flex justify-center items-center"
              style={{ transform: `scale(${zoom / 200})` }}
            >
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={false}
              />
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center"
            data-theme={theme}
          >
            <div className="bg-white rounded-lg w-full max-w-6xl mx-auto   mt-12 px-4 sm:px-6 lg:px-8  overflow-y-auto  max-h-[90vh] ">
              {/* Bouton de fermeture */}
              <button
                onClick={closeModal}
                className="absolute right-2 top-2 btn text-primary"
              >
                ✕
              </button>

              {/* Contenu du Modal */}
              <div className="mt-5">
                {/* Zone scrollable spécifique */}
                <div className="w-full max-w-full overflow-auto ">
                  <div className="w-full max-w-full flex justify-center items-center">
                    <CVExport
                      personalDetails={personalDetails}
                      file={file}
                      theme={theme}
                      experiences={experiences}
                      educations={educations}
                      languages={languages}
                      hobbies={hobbies}
                      skills={skills}
                      ref={cvPreviewRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:hidden">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-3xl font-bold">
                Oops! The CV Builder is only available on desktop.
              </h1>
              <p className="mb-5">
                To create and customize your CV, please use a computer. Thank
                you for your understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
