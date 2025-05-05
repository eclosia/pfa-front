import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState } from "react";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "Stage" | "Emploi" | "Alternance";
}

export default function UserExperienceCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: "Stage de Fin d'Études",
      company: "ZAI-CONCEPTINFO",
      period: "Avril à Juin 2023",
      description: "Développement d'une plateforme de gestion de l'éclairage public pour la commune d'Inzegane, améliorant l'efficacité grâce à un suivi en temps réel, à la planification de la maintenance et au suivi des pannes.",
      type: "Stage"
    },
    {
      id: '2',
      title: "Stage de Fin d'Études",
      company: "CMCP-AGADIR",
      period: "Avril à Juin 2022",
      description: "Développement d'une plateforme de gestion des commandes afin d'optimiser les opérations, avec saisie des commandes, suivi d'inventaire en temps réel et supervision des livraisons.",
      type: "Stage"
    },
    {
      id: '3',
      title: "Stage d'Initiation",
      company: "CMCP-AGADIR",
      period: "Août à Septembre 2021",
      description: "Développement d'un site web dynamique pour améliorer l'interaction utilisateur et la gestion des données, avec une solution évolutive adaptée aux mises à jour futures.",
      type: "Stage"
    }
  ]);

  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    title: "",
    company: "",
    period: "",
    description: "",
    type: "Stage"
  });

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleNewExperienceChange = (field: keyof Experience, value: string) => {
    setNewExperience({ ...newExperience, [field]: value });
  };

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      setExperiences([
        ...experiences,
        {
          id: Date.now().toString(),
          ...newExperience
        }
      ]);
      setNewExperience({
        title: "",
        company: "",
        period: "",
        description: "",
        type: "Stage"
      });
    }
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleSave = () => {
    console.log("Expériences sauvegardées:", experiences);
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Expériences Professionnelles
          </h4>

          <div className="grid gap-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-900/20"></div>
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {experience.title}
                      </h5>
                      <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                        {experience.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {experience.period}
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
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Modifier
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
              Gérer les expériences professionnelles
            </h4>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Ajoutez, modifiez ou supprimez vos expériences professionnelles.
            </p>
          </div>
          
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <div key={experience.id} className="mb-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
                        Expérience {experiences.findIndex(e => e.id === experience.id) + 1}
                      </h5>
                      <button
                        type="button"
                        onClick={() => removeExperience(experience.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <Label>Titre</Label>
                        <Input
                          type="text"
                          value={experience.title}
                          onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Entreprise</Label>
                        <Input
                          type="text"
                          value={experience.company}
                          onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Période</Label>
                        <Input
                          type="text"
                          value={experience.period}
                          onChange={(e) => handleExperienceChange(experience.id, 'period', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <select
                          value={experience.type}
                          onChange={(e) => handleExperienceChange(experience.id, 'type', e.target.value as Experience['type'])}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          <option value="Stage">Stage</option>
                          <option value="Emploi">Emploi</option>
                          <option value="Alternance">Alternance</option>
                        </select>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          value={experience.description}
                          onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Formulaire pour ajouter une nouvelle expérience */}
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                  <h5 className="mb-3 text-base font-medium text-gray-800 dark:text-white/90">
                    Ajouter une nouvelle expérience
                  </h5>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label>Titre</Label>
                      <Input
                        type="text"
                        value={newExperience.title}
                        onChange={(e) => handleNewExperienceChange('title', e.target.value)}
                        placeholder="Ex: Stage de Fin d'Études"
                      />
                    </div>
                    <div>
                      <Label>Entreprise</Label>
                      <Input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => handleNewExperienceChange('company', e.target.value)}
                        placeholder="Ex: Nom de l'entreprise"
                      />
                    </div>
                    <div>
                      <Label>Période</Label>
                      <Input
                        type="text"
                        value={newExperience.period}
                        onChange={(e) => handleNewExperienceChange('period', e.target.value)}
                        placeholder="Ex: Janvier 2023 - Mars 2023"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <select
                        value={newExperience.type}
                        onChange={(e) => handleNewExperienceChange('type', e.target.value as Experience['type'])}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      >
                        <option value="Stage">Stage</option>
                        <option value="Emploi">Emploi</option>
                        <option value="Alternance">Alternance</option>
                      </select>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        value={newExperience.description}
                        onChange={(e) => handleNewExperienceChange('description', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        rows={3}
                        placeholder="Décrivez vos responsabilités et réalisations..."
                      />
                    </div>
                    <Button 
                      onClick={addExperience}
                      size="sm"
                      disabled={!newExperience.title.trim() || !newExperience.company.trim()}
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
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
          </form>
        </div>
      </Modal>
    </div>
  );
}