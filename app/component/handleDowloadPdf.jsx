import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialiser pdfMake avec les polices
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const handleDownloadPdf = ({
  personalDetails,
  experiences,
  educations,
  languages,
  hobbies,
  skills,
  file,
  theme,
}) => {
  // Fonction pour formater la date comme dans votre composant
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  // Récupérer la couleur primaire en fonction du thème
  const getThemeColors = (themeName) => {
    // Vous devrez adapter ces couleurs en fonction de vos thèmes réels
    const themeColors = {
      light: {
        primary: "#570df8",
        secondary: "#f000b8",
        background: "#ffffff",
        text: "#000000",
      },
      dark: {
        primary: "#661AE6",
        secondary: "#D926AA",
        background: "#1D232A",
        text: "#A6ADBA",
      },
      cupcake: {
        primary: "#65c3c8",
        secondary: "#ef9fbc",
        background: "#faf7f5",
        text: "#291334",
      },
      bumblebee: {
        primary: "#e0a82e",
        secondary: "#f9d72f",
        background: "#ffffff",
        text: "#000000",
      },
      emerald: {
        primary: "#66cc8a",
        secondary: "#377cfb",
        background: "#ffffff",
        text: "#333333",
      },
      corporate: {
        primary: "#4b6bfb",
        secondary: "#7b92b2",
        background: "#ffffff",
        text: "#000000",
      },
      synthwave: {
        primary: "#e779c1",
        secondary: "#58c7f3",
        background: "#2D1B69",
        text: "#f9f7fd",
      },
      retro: {
        primary: "#ef9995",
        secondary: "#2cb67d",
        background: "#e4d8b4",
        text: "#2b3440",
      },
      cyberpunk: {
        primary: "#ff7598",
        secondary: "#75d1f0",
        background: "#ffee00",
        text: "#000000",
      },
      valentine: {
        primary: "#e96d7b",
        secondary: "#a991f7",
        background: "#f0d6e8",
        text: "#632c3b",
      },
      halloween: {
        primary: "#f28c18",
        secondary: "#6d3a9c",
        background: "#212121",
        text: "#e9e7e7",
      },
      garden: {
        primary: "#5c7f67",
        secondary: "#ecf4e7",
        background: "#e9e7e7",
        text: "#000000",
      },
      forest: {
        primary: "#1eb854",
        secondary: "#1fd65f",
        background: "#171212",
        text: "#f0f8ff",
      },
      aqua: {
        primary: "#09ecf3",
        secondary: "#966fb3",
        background: "#345DA7",
        text: "#ffffff",
      },
      lofi: {
        primary: "#0d0d0d",
        secondary: "#1a1919",
        background: "#ffffff",
        text: "#000000",
      },
      pastel: {
        primary: "#d1c1d7",
        secondary: "#f6cbd1",
        background: "#ffffff",
        text: "#000000",
      },
      fantasy: {
        primary: "#6e0b75",
        secondary: "#007ebd",
        background: "#ffffff",
        text: "#000000",
      },
      wireframe: {
        primary: "#b8b8b8",
        secondary: "#b8b8b8",
        background: "#ffffff",
        text: "#000000",
      },
      black: {
        primary: "#333333",
        secondary: "#666666",
        background: "#000000",
        text: "#ffffff",
      },
      luxury: {
        primary: "#ffffff",
        secondary: "#152747",
        background: "#09090b",
        text: "#ffffff",
      },
      dracula: {
        primary: "#ff79c6",
        secondary: "#bd93f9",
        background: "#282a36",
        text: "#f8f8f2",
      },
      cmyk: {
        primary: "#45AEEE",
        secondary: "#E8488A",
        background: "#ffffff",
        text: "#000000",
      },
      autumn: {
        primary: "#8C0327",
        secondary: "#D85251",
        background: "#F9E4D0",
        text: "#000000",
      },
      business: {
        primary: "#1C4E80",
        secondary: "#7C909A",
        background: "#ffffff",
        text: "#000000",
      },
      acid: {
        primary: "#FF00F4",
        secondary: "#CFFF00",
        background: "#000000",
        text: "#ffffff",
      },
      lemonade: {
        primary: "#519903",
        secondary: "#E9E92E",
        background: "#ffffff",
        text: "#000000",
      },
      night: {
        primary: "#2E1065",
        secondary: "#4338CA",
        background: "#0F1729",
        text: "#C8D0D8",
      },
      coffee: {
        primary: "#DB924B",
        secondary: "#7D73B6",
        background: "#20161F",
        text: "#f5e0be",
      },
      winter: {
        primary: "#0891B2",
        secondary: "#111827",
        background: "#ffffff",
        text: "#000000",
      },
    };

    return themeColors[themeName] || themeColors["light"]; // Retourne le thème par défaut si non trouvé
  };

  const colors = getThemeColors(theme);

  // Convertir l'image en base64 si disponible
  const processImage = () => {
    return new Promise((resolve) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      } else {
        resolve(null);
      }
    });
  };

  // Fonction pour convertir le niveau de compétence en nombre d'étoiles
  function getProficiencyStars(proficiency) {
    switch (proficiency) {
      case "Débutant":
        return 1;
      case "Intermédiaire":
        return 3;
      case "Avancé":
        return 5;
      default:
        return 0;
    }
  }

  // Fonction principale pour générer le PDF
  async function generatePDF() {
    const imageData = await processImage();

    // Définition de la structure du PDF
    const documentDefinition = {
      pageSize: "A4",
      pageMargins: [40, 40, 40, 40],
      background: {
        color: colors.background,
      },
      content: [
        {
          columns: [
            {
              width: "30%",
              stack: [
                // Photo
                imageData
                  ? {
                      image: imageData,
                      width: 150,
                      height: 150,
                      fit: [150, 150],
                      borderRadius: 75,
                      alignment: "center",
                      margin: [0, 0, 0, 20],
                      border: [8, 8, 8, 8],
                      borderColor: colors.primary,
                    }
                  : {},

                // Contact
                {
                  text: "CONTACT",
                  style: "sectionHeader",
                  color: colors.text,
                  margin: [0, 20, 0, 10],
                },
                personalDetails.phone
                  ? {
                      text: [
                        { text: "📞 ", color: colors.primary },
                        { text: personalDetails.phone, color: colors.text },
                      ],
                      margin: [0, 0, 0, 5],
                    }
                  : {},
                personalDetails.email
                  ? {
                      text: [
                        { text: "✉️ ", color: colors.primary },
                        { text: personalDetails.email, color: colors.text },
                      ],
                      margin: [0, 0, 0, 5],
                    }
                  : {},
                personalDetails.address
                  ? {
                      text: [
                        { text: "📍 ", color: colors.primary },
                        { text: personalDetails.address, color: colors.text },
                      ],
                      margin: [0, 0, 0, 5],
                    }
                  : {},

                // Compétences
                {
                  text: "COMPÉTENCES",
                  style: "sectionHeader",
                  color: colors.text,
                  margin: [0, 20, 0, 10],
                },
                {
                  columns: skills.map((skill) => ({
                    text: skill.name,
                    background: colors.primary,
                    color: "#FFFFFF",
                    margin: [0, 2, 5, 2],
                    padding: [3, 2],
                    fontSize: 10,
                    borderRadius: 4,
                  })),
                  columnGap: 5,
                  margin: [0, 0, 0, 15],
                },

                // Langues
                {
                  text: "LANGUES",
                  style: "sectionHeader",
                  color: colors.text,
                  margin: [0, 10, 0, 10],
                },
                ...languages
                  .map((lang) => [
                    {
                      text: lang.language,
                      style: "subHeader",
                      color: colors.text,
                      margin: [0, 5, 0, 2],
                    },
                    {
                      text:
                        "★".repeat(getProficiencyStars(lang.proficiency)) +
                        "☆".repeat(5 - getProficiencyStars(lang.proficiency)),
                      color: colors.primary,
                      margin: [0, 0, 0, 10],
                    },
                  ])
                  .flat(),

                // Loisirs
                {
                  text: "LOISIRS",
                  style: "sectionHeader",
                  color: colors.text,
                  margin: [0, 10, 0, 10],
                },
                ...hobbies.map((hobby) => ({
                  text: hobby.name,
                  color: colors.text,
                  margin: [0, 0, 0, 5],
                })),
              ],
            },
            {
              width: "70%",
              stack: [
                // En-tête
                {
                  text: personalDetails.fullName,
                  style: "name",
                  color: colors.text,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: personalDetails.postSeeking,
                  style: "title",
                  color: colors.primary,
                  margin: [0, 0, 0, 10],
                },
                {
                  text: personalDetails.description,
                  color: colors.text,
                  margin: [0, 0, 0, 20],
                },

                // Expériences
                {
                  text: "EXPERIENCES",
                  style: "sectionHeader",
                  color: colors.text,
                  margin: [0, 20, 0, 15],
                },
                ...experiences.flatMap((exp, index) => [
                  {
                    columns: [
                      {
                        width: 8,
                        canvas: [
                          {
                            type: "ellipse",
                            x: 4,
                            y: 4,
                            r1: 4,
                            r2: 4,
                            color: colors.primary,
                          },
                        ],
                      },
                      {
                        width: "auto",
                        margin: [5, 0, 0, 0],
                        stack: [
                          {
                            text: [
                              { text: "💼 ", color: colors.primary },
                              {
                                text: exp.jobTitle,
                                style: "jobTitle",
                                color: colors.text,
                              },
                            ],
                          },
                          {
                            text: exp.companyName,
                            style: "company",
                            color: colors.primary,
                            margin: [0, 5, 0, 0],
                          },
                          {
                            text: `${formatDate(exp.startDate)} au ${formatDate(
                              exp.endDate
                            )}`,
                            style: "date",
                            italics: true,
                            color: colors.text,
                            margin: [0, 5, 0, 0],
                          },
                          {
                            text: exp.description,
                            color: colors.text,
                            margin: [0, 5, 0, 0],
                          },
                        ],
                      },
                    ],
                    margin: [0, 0, 0, 15],
                  },
                  index < experiences.length - 1
                    ? {
                        canvas: [
                          {
                            type: "line",
                            x1: 4,
                            y1: 5,
                            x2: 4,
                            y2: 25,
                            lineWidth: 1,
                            dash: { length: 2, space: 2 },
                            color: colors.primary,
                          },
                        ],
                        margin: [0, 0, 0, 0],
                      }
                    : {},
                ]),

                // Formations
                {
                  text: "FORMATIONS",
                  style: "sectionHeader",
                  color: colors.text,
                  margin: [0, 20, 0, 15],
                },
                ...educations.flatMap((edu, index) => [
                  {
                    columns: [
                      {
                        width: 8,
                        canvas: [
                          {
                            type: "ellipse",
                            x: 4,
                            y: 4,
                            r1: 4,
                            r2: 4,
                            color: colors.primary,
                          },
                        ],
                      },
                      {
                        width: "auto",
                        margin: [5, 0, 0, 0],
                        stack: [
                          {
                            text: [
                              { text: "🎓 ", color: colors.primary },
                              {
                                text: edu.degree,
                                style: "jobTitle",
                                color: colors.text,
                              },
                            ],
                          },
                          {
                            text: edu.school,
                            style: "company",
                            color: colors.primary,
                            margin: [0, 5, 0, 0],
                          },
                          {
                            text: `${formatDate(edu.startDate)} au ${formatDate(
                              edu.endDate
                            )}`,
                            style: "date",
                            italics: true,
                            color: colors.text,
                            margin: [0, 5, 0, 0],
                          },
                          {
                            text: edu.description,
                            color: colors.text,
                            margin: [0, 5, 0, 0],
                          },
                        ],
                      },
                    ],
                    margin: [0, 0, 0, 15],
                  },
                  index < educations.length - 1
                    ? {
                        canvas: [
                          {
                            type: "line",
                            x1: 4,
                            y1: 5,
                            x2: 4,
                            y2: 25,
                            lineWidth: 1,
                            dash: { length: 2, space: 2 },
                            color: colors.primary,
                          },
                        ],
                        margin: [0, 0, 0, 0],
                      }
                    : {},
                ]),
              ],
            },
          ],
        },
      ],
      styles: {
        name: {
          fontSize: 14,
          bold: true,
        },
        title: {
          fontSize: 24,
          bold: true,
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
        },
        subHeader: {
          fontSize: 11,
          bold: true,
        },
        jobTitle: {
          fontSize: 12,
          bold: true,
        },
        company: {
          fontSize: 10,
          bold: true,
        },
        date: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };

    // Génération du PDF
    pdfMake.createPdf(documentDefinition).download("cv.pdf");
  }

  // Lancer la génération du PDF
  generatePDF();
};

export default handleDownloadPdf;
