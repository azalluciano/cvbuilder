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
  address: "Ambohipo, Antananarivo, Madagascar",
  photoUrl: "/pdp.jpeg",
  postSeeking: "Développeur Web",
  description:
    "Développeur Web passionné avec expérience en développement de solutions RH et de modules métier. Strict, sérieux, dynamique et sociable avec un bon esprit d'équipe et autodidacte, je suis toujours prêt à relever de nouveaux défis technologiques.",
};

export const experiencesPreset: Experience[] = [
  {
    id: "uuid-1",
    jobTitle: "Référent technique Stallion-RH",
    companyName: "Osmosis Business Solution, Antsahavola, Antananarivo",
    startDate: "2024-07-01",
    endDate: "",
    description:
      "Interaction directe avec les clients pour recueillir leurs besoins. Traduction des exigences métier en spécifications techniques. Gestion et coordination de l'équipe de développement. Suivi de l'avancement des projets et résolution des obstacles techniques. Planification des étapes et estimation des délais. Conduite de revues de code. Accompagnement et mentorat des développeurs juniors. Communication régulière avec les parties prenantes.",
  },
  {
    id: "uuid-2",
    jobTitle: "Développeur Web",
    companyName: "Osmosis Business Solution, Antsahavola, Antananarivo",
    startDate: "2022-11-01",
    endDate: "2024-06-01",
    description:
      "Conception et développement de modules RH sous Omnis Studio et PostgreSQL : calcul de paie, gestion des contrats, gestion des salariés et prestataires, génération des pointages, gestion des congés et absences, facturation, prêt et avance sur salaire. Création de modules utilitaires Node.js intégrables dans Omnis Studio. Développement d'un module CRM pour la gestion des relations clients. Contribution au développement de Stallion RH et My-Inscription (plateforme d'inscription pour l'université du Gabon).",
  },
  {
    id: "uuid-3",
    jobTitle: "Développeur Stagiaire",
    companyName: "Osmosis Business Solution, Antsahavola, Antananarivo",
    startDate: "2022-05-01",
    endDate: "2022-10-01",
    description:
      "Participation au développement de Stallion RH, solution de gestion des ressources humaines. Développement d'une plateforme d'inscription pour la conférence d'Omnis en 2022 avec React et Node.js.",
  },
];

export const educationsPreset: Education[] = [
  {
    id: "uuid-4",
    degree: "Master 1",
    school: "CNTEMAD",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    description: "Formation en cours",
  },
  {
    id: "uuid-5",
    degree: "Licence en Informatique",
    school: "Université E-media Madagascar Ampasanimalo",
    startDate: "2019-01-01",
    endDate: "2021-12-31",
    description: "Formation complète en informatique",
  },
  {
    id: "uuid-6",
    degree: "BACC série C",
    school: "Lycée Stella Maris Toamasina",
    startDate: "2018-01-01",
    endDate: "2018-12-31",
    description: "Baccalauréat scientifique",
  },
];

export const skillsPreset: Skill[] = [
  { id: "uuid-7", name: "HTML" },
  { id: "uuid-8", name: "CSS" },
  { id: "uuid-9", name: "JavaScript" },
  { id: "uuid-10", name: "PHP" },
  { id: "uuid-11", name: "MySQL" },
  { id: "uuid-12", name: "PostgreSQL" },
  { id: "uuid-13", name: "Git" },
  { id: "uuid-14", name: "Visual Studio Code" },
  { id: "uuid-15", name: "DBeaver" },
  { id: "uuid-16", name: "FileZilla" },
  { id: "uuid-17", name: "Omnis Studio" },
  { id: "uuid-18", name: "Open Project" },
  { id: "uuid-19", name: "Bootstrap" },
  { id: "uuid-20", name: "Tailwind CSS" },
  { id: "uuid-21", name: "SASS" },
  { id: "uuid-22", name: "Ant Design" },
  { id: "uuid-23", name: "React.js" },
  { id: "uuid-24", name: "Node.js" },
  { id: "uuid-25", name: "Laravel" },
  { id: "uuid-26", name: "Flutter" },
];

export const languagesPreset: Language[] = [
  { id: "uuid-27", language: "Malagasy", proficiency: "Avancé" },
  { id: "uuid-28", language: "Français", proficiency: "Intermédiaire" },
  { id: "uuid-29", language: "Anglais", proficiency: "Débutant" },
];

export const hobbiesPreset: Hobby[] = [
  { id: "uuid-30", name: "Technologie" },
  { id: "uuid-31", name: "Jeux vidéo" },
  { id: "uuid-32", name: "Moto" },
];
