"use client";
import { RotateCw, ScanEye } from "lucide-react";
import PersonalDetailsForm from "./component/PersonalDetailsForm";
import { Education, Experience, Language, PersonalDetails } from "@/type";
import { useState } from "react";
import {
  educationsPreset,
  experiencesPreset,
  languagesPreset,
  personalDetailsPreset,
} from "@/pressets";
import CVPreview from "./component/CVPreview";
import ExperienceForm from "./component/ExperienceForm";
import EducationForm from "./component/EducationForm";
import LanguageForm from "./component/LanguageForm";

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
  return (
    <div>
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">
          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollabar">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">
                CV<span className="text-primary">Builder</span>
              </h1>
              <button className="btn btn-primary">
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
            </div>
          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
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
              className="select select-primary select-bordered fixed z-[9999] select-sm top-12 right-5 w-30 text-primary"
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
              />
            </div>
          </div>
        </section>
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
