import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";

export const personalDetailsPreset: PersonalDetails = {
  fullName: "RANDRIAMORATONY LAZA LUCIANO",
  email: "lazaluciano327@gmail.com",
  phone: "+261 34 10 000 60",
  address: "Ambatolampy, Antananarivo, Madagascar",
  photoUrl: "/pdp.jpeg",
  postSeeking: "Développeur Web",
  description:
    "Développeur Web passionné et autodidacte, doté d’un bon esprit d’équipe, sérieux et dynamique. Ayant de solides compétences techniques, je suis toujours prêt à relever de nouveaux défis technologiques.",
};

export const experiencesPreset: Experience[] = [
  {
    id: "uuid-1",
    jobTitle: "Développeur Stagiaire",
    companyName: "Osmosis Business Solution",
    startDate: "2022-05-01",
    endDate: "2022-10-01",
    description:
      "Développement de Stallion RH (outil de gestion RH). Développement d'une plateforme d'inscription pour conférence (NodeJS / ReactJS).",
  },
  {
    id: "uuid-2",
    jobTitle: "Développeur Web",
    companyName: "Osmosis Business Solution",
    startDate: "2022-11-01",
    endDate: "2024-06-01",
    description:
      "Développement de modules RH, gestion de paie (Omnis Studio / PostgreSQL), exploitation de fichiers Excel, génération de rapports, génération automatique de bons de sortie/entrée, et participation au projet Stallion RH.",
  },
];

export const educationsPreset: Education[] = [
  {
    id: "uuid-3",
    degree: "Non spécifié",
    school: "Non spécifié",
    startDate: "",
    endDate: "",
    description: "",
  },
];

export const skillsPreset: Skill[] = [
  { id: "uuid-4", name: "HTML" },
  { id: "uuid-5", name: "CSS" },
  { id: "uuid-6", name: "JavaScript" },
  { id: "uuid-7", name: "PHP" },
  { id: "uuid-8", name: "MySQL" },
  { id: "uuid-9", name: "PostgreSQL" },
  { id: "uuid-10", name: "Git" },
  { id: "uuid-11", name: "Laravel" },
  { id: "uuid-12", name: "Flutter" },
  { id: "uuid-13", name: "ReactJS" },
  { id: "uuid-14", name: "NodeJS" },
  { id: "uuid-15", name: "Bootstrap" },
  { id: "uuid-16", name: "TailwindCSS" },
  { id: "uuid-17", name: "SASS" },
  { id: "uuid-18", name: "Omnis Studio" },
  { id: "uuid-19", name: "DBeaver" },
  { id: "uuid-20", name: "FileZilla" },
  { id: "uuid-21", name: "Open Project" },
];

export const languagesPreset: Language[] = [
  { id: "uuid-22", language: "Malagasy", proficiency: "Langue maternelle" },
  { id: "uuid-23", language: "Français", proficiency: "Courant" },
  { id: "uuid-24", language: "Anglais", proficiency: "Débutant" },
];

export const hobbiesPreset: Hobby[] = [
  { id: "uuid-25", name: "Technologie" },
  { id: "uuid-26", name: "Jeux vidéo" },
  { id: "uuid-27", name: "Moto" },
];
