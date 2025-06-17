import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import Modal from "../../components/common/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  apogeeNumber: string;
  location: string;
  birthDate?: string;
  gender?: string;
  nationality?: string;
  fieldOfStudy?: string;
  studyLevel?: string;
  languages?: string[];
  interests?: string[];
  certifications?: string[];
  github?: string;
  portfolio?: string;
}

interface Skill {
  id: string;
  nom: string;
  niveau: number;
}

interface Education {
  id: string;
  diplome: string;
  periode: string;
  etablissement: string;
  lieu?: string;
  statut: string;
}

interface Experience {
  id: string;
  titre: string;
  entreprise: string;
  periode: string;
  type: "Stage" | "Emploi" | "Alternance";
  description: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User>({
    firstName: "Rida",
    lastName: "Mihi",
    email: "ridamihi12@gmail.com",
    phoneNumber: "0680501253",
    apogeeNumber: "653297",
    location: "",
    birthDate: "01/01/2000",
    gender: "Homme",
    nationality: "Marocaine",
    fieldOfStudy: "Informatique",
    studyLevel: "Licence",
    languages: ["Français", "Anglais", "Arabe"],
    interests: ["Programmation", "Design", "Musique"],
    certifications: ["AWS Certified", "Google Cloud"],
    github: "github.com/ridamihi",
    portfolio: "ridamihi-portfolio.com",
  });

  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", nom: "React", niveau: 80 },
    { id: "2", nom: "Node.js", niveau: 70 },
    { id: "3", nom: "TypeScript", niveau: 75 },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      diplome: "Licence en Informatique",
      periode: "2020 - 2023",
      etablissement: "Université XYZ",
      lieu: "Casablanca, Maroc",
      statut: "",
    },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      titre: "Stage de Fin d'Études",
      entreprise: "PIMJO",
      periode: "Janvier 2023 - Mars 2023",
      type: "Stage",
      description: "Développement d'une application web avec React et Node.js",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "skills" | "education" | "experience">("info");

  // Form states
  const [formData, setFormData] = useState<User>(user);
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({ nom: "", niveau: 50 });
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    diplome: "",
    periode: "",
    etablissement: "",
    lieu: "",
    statut: "",
  });
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    titre: "",
    entreprise: "",
    periode: "",
    type: "Stage",
    description: "",
  });

  // Modal handlers
  const openModal = (tab: typeof activeTab = "info") => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    closeModal();
  };

  // Skills handlers
  const handleNewSkillChange = (field: keyof Skill, value: string | number) => {
    setNewSkill(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    setSkills(prev => [...prev, { ...newSkill, id: Date.now().toString() }]);
    setNewSkill({ nom: "", niveau: 50 });
  };

  const handleSkillChange = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(prev =>
      prev.map(skill => (skill.id === id ? { ...skill, [field]: value } : skill))
    );
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  // Education handlers
  const handleNewEducationChange = (field: keyof Education, value: string) => {
    setNewEducation(prev => ({ ...prev, [field]: value }));
  };

  const addEducation = (e: React.FormEvent) => {
    e.preventDefault();
    setEducations(prev => [...prev, { ...newEducation, id: Date.now().toString() }]);
    setNewEducation({
      diplome: "",
      periode: "",
      etablissement: "",
      lieu: "",
      statut: "",
    });
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducations(prev =>
      prev.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const toggleCurrentEducation = (id: string) => {
    setEducations(prev =>
      prev.map(edu => ({
        ...edu,
        statut: edu.id === id ? "actuel" : "",
      }))
    );
  };

  const removeEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  // Experience handlers
  const handleNewExperienceChange = <K extends keyof Experience>(
    field: K,
    value: Experience[K]
  ) => {
    setNewExperience(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = (e: React.FormEvent) => {
    e.preventDefault();
    setExperiences(prev => [...prev, { ...newExperience, id: Date.now().toString() }]);
    setNewExperience({
      titre: "",
      entreprise: "",
      periode: "",
      type: "Stage",
      description: "",
    });
  };

  const handleExperienceChange = <K extends keyof Experience>(
    id: string,
    field: K,
    value: Experience[K]
  ) => {
    setExperiences(prev =>
      prev.map(exp => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  // Color generator for skill bars
  const nextColor = () => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col items-center w-full gap-6 xl:items-start xl:gap-4 xl:flex-col">
                {/* Row 1: Image + Actions */}
                <div className="flex items-center justify-between w-full gap-6">
                  {/* Image */}
                  <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                    <img
                      src="/images/user/owner.jpg"
                      alt={`${user.firstName} ${user.lastName}`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Actions (CV + LinkedIn) */}
                  <div className="flex items-center gap-3">
                    {/* CV Button */}
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full transition-all duration-200 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 hover:shadow-sm">
                      <span>Créer CV</span>
                    </button>

                    {/* Separator */}
                    <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                    {/* LinkedIn Button */}
                    <a
                      href="https://www.linkedin.com/company/pimjo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Profil LinkedIn"
                      title="Profil LinkedIn"
                    >
                      <span className="text-[#0A66C2]">in</span>
                    </a>
                  </div>
                </div>

                {/* Row 2: Personal Info */}
                <div className="w-full text-center xl:text-left">
                  <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                    {user.firstName} {user.lastName}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Etudiant</p>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.location || 'Non spécifié'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => openModal("info")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-200 lg:inline-flex lg:w-auto"
              >
                <FiEdit2 />
                <span>Modifier</span>
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Informations personnelles
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Prenom
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.firstName}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Nom
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Email personnel
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Email académique
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.apogeeNumber}@ump.ac.ma
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Téléphone
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      numéro apogée
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.apogeeNumber}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openModal("info")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <FiEdit2 />
                Modifier
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Informations supplémentaires
                </h4>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Informations personnelles
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Date de naissance
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {user.birthDate}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Genre
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {user.gender}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Nationalité
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {user.nationality}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Informations académiques
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Filière
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {user.fieldOfStudy}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Niveau d'études
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {user.studyLevel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Languages and Interests */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Langues et centres d'intérêt
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Langues
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {user.languages?.map((lang, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Centres d'intérêt
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {user.interests?.map((interest, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-full dark:bg-purple-900/30 dark:text-purple-400"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications and Links */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Certifications et liens
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Certifications
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {user.certifications?.map((cert, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full dark:bg-green-900/30 dark:text-green-400"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Liens professionnels
                        </p>
                        <div className="space-y-2">
                          <a
                            href={`https://${user.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            {user.github}
                          </a>
                          <a
                            href={`https://${user.portfolio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 16.057v-3.057h2v3.057h-2zm1.964-10.186c.976 0 1.791.62 1.791 1.383 0 .779-.815 1.384-1.791 1.384-.976 0-1.791-.605-1.791-1.384 0-.763.815-1.383 1.791-1.383z" />
                            </svg>
                            {user.portfolio}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openModal("info")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <FiEdit2 />
                Modifier
              </button>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Compétences techniques
                </h4>

                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800"
                      >
                        <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-2/3 mb-3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {skill.nom}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.niveau}%
                          </p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className={`h-2 rounded-full ${nextColor()}`}
                            style={{ width: `${skill.niveau}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {skills.length === 0 ? (
                <button
                  onClick={() => openModal("skills")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <FiPlusCircle />
                  Ajouter
                </button>
              ) : (
                <button
                  onClick={() => openModal("skills")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <FiEdit2 />
                  Modifier
                </button>
              )}
            </div>
          </div>

          {/* Academic Path */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Parcours Académique
                </h4>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800"
                      >
                        <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-2/3 mb-3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                    {/* Education items */}
                    {educations.map((education) => (
                      <div key={education.id} className="relative mb-8 ml-8">
                        <div
                          className={`absolute -left-8 top-1 h-4 w-4 rounded-full border-2 ${
                            education.statut
                              ? "border-blue-500"
                              : "border-gray-300 dark:border-gray-700"
                          } bg-white dark:bg-gray-900`}
                        ></div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-base font-semibold text-gray-800 dark:text-white/90">
                                {education.diplome}
                              </h5>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {education.periode}
                              </p>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {education.etablissement}
                              </p>
                              {education.lieu && (
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {education.lieu}
                                </p>
                              )}
                            </div>
                            {education.statut && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                Actuel
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {educations.length === 0 ? (
                <button
                  onClick={() => openModal("education")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <FiPlusCircle />
                  Ajouter
                </button>
              ) : (
                <button
                  onClick={() => openModal("education")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <FiEdit2 />
                  Modifier
                </button>
              )}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Expériences Professionnelles
                </h4>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800"
                      >
                        <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-2/3 mb-3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {experiences.map((experience) => (
                      <div
                        key={experience.id}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-900/20"></div>
                        <div className="relative">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                {experience.titre}
                              </h5>
                              <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                                {experience.entreprise}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {experience.periode}
                              </span>
                              <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {experience.type}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {experience.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {experiences.length === 0 ? (
                <button
                  onClick={() => openModal("experience")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <FiPlusCircle />
                  Ajouter
                </button>
              ) : (
                <button
                  onClick={() => openModal("experience")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                  <FiEdit2 />
                  Modifier
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          {activeTab === "info" && (
            <>
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Modifier les informations personnelles
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                  Mettez à jour vos informations pour garder votre profil à jour.
                </p>
              </div>
              <form className="flex flex-col">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                  <div>
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                      Informations personnelles
                    </h5>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      <div className="col-span-2 lg:col-span-1">
                        <Label>Prénom</Label>
                        <Input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          disabled
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Nom de famille</Label>
                        <Input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          disabled
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Email personnel</Label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Email académique</Label>
                        <Input
                          type="email"
                          name="academicEmail"
                          value={`${formData.apogeeNumber}@ump.ac.ma`}
                          disabled
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Téléphone</Label>
                        <Input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-2">
                        <Label>numéro apogée</Label>
                        <Input
                          type="text"
                          name="apogeeNumber"
                          value={formData.apogeeNumber}
                          disabled
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                      Informations supplémentaires
                    </h5>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      <div>
                        <Label>Date de naissance</Label>
                        <Input
                          type="text"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Genre</Label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500"
                        >
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <Label>Nationalité</Label>
                        <Input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Filière</Label>
                        <Input
                          type="text"
                          name="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Niveau d'études</Label>
                        <Input
                          type="text"
                          name="studyLevel"
                          value={formData.studyLevel}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Langues (séparées par des virgules)</Label>
                        <Input
                          type="text"
                          name="languages"
                          value={formData.languages?.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              languages: e.target.value
                                .split(",")
                                .map((lang) => lang.trim()),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Centres d'intérêt (séparés par des virgules)</Label>
                        <Input
                          type="text"
                          name="interests"
                          value={formData.interests?.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              interests: e.target.value
                                .split(",")
                                .map((interest) => interest.trim()),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Certifications (séparées par des virgules)</Label>
                        <Input
                          type="text"
                          name="certifications"
                          value={formData.certifications?.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              certifications: e.target.value
                                .split(",")
                                .map((cert) => cert.trim()),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>GitHub</Label>
                        <Input
                          type="text"
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Portfolio</Label>
                        <Input
                          type="text"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Fermer
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Enregistrer
                  </Button>
                </div>
              </form>
            </>
          )}

          {activeTab === "skills" && (
            <>
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Gérer vos compétences
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                  Ajoutez, modifiez ou supprimez vos compétences techniques.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
                  <div className="space-y-6">
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                      <h5 className="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">
                        Ajouter une nouvelle compétence
                      </h5>
                      <form onSubmit={addSkill} className="space-y-4">
                        <div>
                          <Label>Nom de la compétence</Label>
                          <Input
                            type="text"
                            value={newSkill.nom}
                            onChange={(e) =>
                              handleNewSkillChange("nom", e.target.value)
                            }
                            placeholder="Ex: Machine Learning"
                          />
                        </div>
                        <div>
                          <Label>Niveau</Label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={newSkill.niveau}
                              onChange={(e) =>
                                handleNewSkillChange(
                                  "niveau",
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                              {newSkill.niveau}%
                            </span>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!newSkill.nom?.trim()}
                        >
                          Ajouter
                        </Button>
                      </form>
                    </div>

                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative p-4 border border-gray-200 rounded-lg dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Input
                            type="text"
                            value={skill.nom}
                            onChange={(e) =>
                              handleSkillChange(skill.id, "nom", e.target.value)
                            }
                            className="w-full max-w-[200px]"
                          />
                          <button
                            type="button"
                            onClick={() => removeSkill(skill.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.niveau}
                            onChange={(e) =>
                              handleSkillChange(
                                skill.id,
                                "niveau",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                            {skill.niveau}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Fermer
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab === "education" && (
            <>
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                  Gérer le parcours académique
                </h4>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  Ajoutez, modifiez ou supprimez vos formations académiques.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                      <h5 className="mb-3 text-base font-medium text-gray-800 dark:text-white/90">
                        Ajouter une nouvelle formation
                      </h5>
                      <form onSubmit={addEducation} className="grid grid-cols-1 gap-3">
                        <div>
                          <Label>Diplôme</Label>
                          <Input
                            type="text"
                            value={newEducation.diplome}
                            onChange={(e) =>
                              handleNewEducationChange("diplome", e.target.value)
                            }
                            placeholder="Ex: Licence en Informatique"
                          />
                        </div>
                        <div>
                          <Label>Période</Label>
                          <Input
                            type="text"
                            value={newEducation.periode}
                            onChange={(e) =>
                              handleNewEducationChange("periode", e.target.value)
                            }
                            placeholder="Ex: 2020 - 2023"
                          />
                        </div>
                        <div>
                          <Label>Établissement</Label>
                          <Input
                            type="text"
                            value={newEducation.etablissement}
                            onChange={(e) =>
                              handleNewEducationChange(
                                "etablissement",
                                e.target.value
                              )
                            }
                            placeholder="Ex: Université XYZ"
                          />
                        </div>
                        <div>
                          <Label>Lieu</Label>
                          <Input
                            type="text"
                            value={newEducation.lieu}
                            onChange={(e) =>
                              handleNewEducationChange("lieu", e.target.value)
                            }
                            placeholder="Ex: Ville, Pays"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="statut"
                            checked={newEducation.statut === "actuel"}
                            onChange={(e) =>
                              setNewEducation({
                                ...newEducation,
                                statut: e.target.checked ? "actuel" : "",
                              })
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="statut"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            Formation actuelle
                          </label>
                        </div>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={
                            !newEducation.diplome.trim() ||
                            !newEducation.etablissement.trim()
                          }
                        >
                          Ajouter
                        </Button>
                      </form>
                    </div>

                    {educations.map((education) => (
                      <div
                        key={education.id}
                        className="mb-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
                            {education.statut
                              ? "Formation actuelle"
                              : "Formation précédente"}
                          </h5>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleCurrentEducation(education.id)}
                              className={`px-2 py-1 text-xs rounded ${
                                education.statut
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {education.statut
                                ? "Actuel"
                                : "Définir comme actuel"}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeEducation(education.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label>Diplôme</Label>
                            <Input
                              type="text"
                              value={education.diplome}
                              onChange={(e) =>
                                handleEducationChange(
                                  education.id,
                                  "diplome",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Période</Label>
                            <Input
                              type="text"
                              value={education.periode}
                              onChange={(e) =>
                                handleEducationChange(
                                  education.id,
                                  "periode",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Établissement</Label>
                            <Input
                              type="text"
                              value={education.etablissement}
                              onChange={(e) =>
                                handleEducationChange(
                                  education.id,
                                  "etablissement",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Lieu</Label>
                            <Input
                              type="text"
                              value={education.lieu}
                              onChange={(e) =>
                                handleEducationChange(
                                  education.id,
                                  "lieu",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-4 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Annuler
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab === "experience" && (
            <>
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                  Gérer les expériences professionnelles
                </h4>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  Ajoutez, modifiez ou supprimez vos expériences professionnelles.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                      <h5 className="mb-3 text-base font-medium text-gray-800 dark:text-white/90">
                        Ajouter une nouvelle expérience
                      </h5>
                      <form onSubmit={addExperience} className="grid grid-cols-1 gap-3">
                        <div>
                          <Label>Titre</Label>
                          <Input
                            type="text"
                            value={newExperience.titre}
                            onChange={(e) =>
                              handleNewExperienceChange("titre", e.target.value)
                            }
                            placeholder="Ex: Stage de Fin d'Études"
                          />
                        </div>
                        <div>
                          <Label>Entreprise</Label>
                          <Input
                            type="text"
                            value={newExperience.entreprise}
                            onChange={(e) =>
                              handleNewExperienceChange(
                                "entreprise",
                                e.target.value
                              )
                            }
                            placeholder="Ex: Nom de l'entreprise"
                          />
                        </div>
                        <div>
                          <Label>Période</Label>
                          <Input
                            type="text"
                            value={newExperience.periode}
                            onChange={(e) =>
                              handleNewExperienceChange(
                                "periode",
                                e.target.value
                              )
                            }
                            placeholder="Ex: Janvier 2023 - Mars 2023"
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <select
                            value={newExperience.type}
                            onChange={(e) =>
                              handleNewExperienceChange(
                                "type",
                                e.target.value as Experience["type"]
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                          >
                            <option value="Stage">Stage</option>
                            <option value="Emploi">Emploi</option>
                            <option value="Alternance">Alternance</option>
                          </select>
                        </div>
                        <div>
                          <Label>description</Label>
                          <textarea
                            value={newExperience.description}
                            onChange={(e) =>
                              handleNewExperienceChange(
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            rows={3}
                            placeholder="Décrivez vos responsabilités et réalisations..."
                          />
                        </div>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={
                            !newExperience.titre.trim() ||
                            !newExperience.entreprise.trim()
                          }
                        >
                          Ajouter
                        </Button>
                      </form>
                    </div>

                    {experiences.map((experience) => (
                      <div
                        key={experience.id}
                        className="mb-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
                            Expérience{" "}
                            {experiences.findIndex((e) => e.id === experience.id) +
                              1}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeExperience(experience.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label>Titre</Label>
                            <Input
                              type="text"
                              value={experience.titre}
                              onChange={(e) =>
                                handleExperienceChange(
                                  experience.id,
                                  "titre",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Entreprise</Label>
                            <Input
                              type="text"
                              value={experience.entreprise}
                              onChange={(e) =>
                                handleExperienceChange(
                                  experience.id,
                                  "entreprise",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Période</Label>
                            <Input
                              type="text"
                              value={experience.periode}
                              onChange={(e) =>
                                handleExperienceChange(
                                  experience.id,
                                  "periode",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <select
                              value={experience.type}
                              onChange={(e) =>
                                handleExperienceChange(
                                  experience.id,
                                  "type",
                                  e.target.value as Experience["type"]
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            >
                              <option value="Stage">Stage</option>
                              <option value="Emploi">Emploi</option>
                              <option value="Alternance">Alternance</option>
                            </select>
                          </div>
                          <div>
                            <Label>description</Label>
                            <textarea
                              value={experience.description}
                              onChange={(e) =>
                                handleExperienceChange(
                                  experience.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-4 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Annuler
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}