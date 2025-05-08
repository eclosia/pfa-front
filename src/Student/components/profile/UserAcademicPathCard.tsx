import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useState } from "react";

interface Education {
  id: string;
  degree: string;
  period: string;
  institution: string;
  location: string;
  isCurrent: boolean;
}

export default function UserAcademicPathCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      degree: "2e année du cycle d'ingénieur en Génie Informatique",
      period: "2023 - En cours",
      institution: "ENIAD – École Nationale de l'Intelligence Artificielle et du Digital",
      location: "Berkane",
      isCurrent: true
    },
    {
      id: '2',
      degree: "Licence Professionnelle en Ingénierie des Systèmes Informatiques et Logiciels",
      period: "2020 - 2023",
      institution: "EST - École Supérieure de Technologie",
      location: "Essaouira",
      isCurrent: false
    },
    {
      id: '3',
      degree: "Baccalauréat en Sciences Physiques",
      period: "2019 - 2020",
      institution: "Lycée Al Massira Al Khadra",
      location: "",
      isCurrent: false
    }
  ]);

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    degree: "",
    period: "",
    institution: "",
    location: "",
    isCurrent: false
  });

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleNewEducationChange = (field: keyof Education, value: string) => {
    setNewEducation({ ...newEducation, [field]: value });
  };

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setEducations([
        ...educations,
        {
          id: Date.now().toString(),
          ...newEducation
        }
      ]);
      setNewEducation({
        degree: "",
        period: "",
        institution: "",
        location: "",
        isCurrent: false
      });
    }
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const toggleCurrentEducation = (id: string) => {
    setEducations(educations.map(edu => ({
      ...edu,
      isCurrent: edu.id === id
    })));
  };

  const handleSave = () => {
    console.log("Parcours académique sauvegardé:", educations);
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Parcours Académique
          </h4>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            {/* Education items */}
            {educations.map((education) => (
              <div key={education.id} className="relative mb-8 ml-8">
                <div className={`absolute -left-8 top-1 h-4 w-4 rounded-full border-2 ${education.isCurrent ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900`}></div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        {education.degree}
                      </h5>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {education.period}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {education.institution}
                      </p>
                      {education.location && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {education.location}
                        </p>
                      )}
                    </div>
                    {education.isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Actuel
                      </span>
                    )}
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
              Gérer le parcours académique
            </h4>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Ajoutez, modifiez ou supprimez vos formations académiques.
            </p>
          </div>
          
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
              <div className="space-y-4">
                {educations.map((education) => (
                  <div key={education.id} className="mb-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
                        {education.isCurrent ? "Formation actuelle" : "Formation précédente"}
                      </h5>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleCurrentEducation(education.id)}
                          className={`px-2 py-1 text-xs rounded ${education.isCurrent ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                        >
                          {education.isCurrent ? 'Actuel' : 'Définir comme actuel'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeEducation(education.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <Label>Diplôme</Label>
                        <Input
                          type="text"
                          value={education.degree}
                          onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Période</Label>
                        <Input
                          type="text"
                          value={education.period}
                          onChange={(e) => handleEducationChange(education.id, 'period', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Établissement</Label>
                        <Input
                          type="text"
                          value={education.institution}
                          onChange={(e) => handleEducationChange(education.id, 'institution', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Lieu</Label>
                        <Input
                          type="text"
                          value={education.location}
                          onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Formulaire pour ajouter une nouvelle formation */}
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                  <h5 className="mb-3 text-base font-medium text-gray-800 dark:text-white/90">
                    Ajouter une nouvelle formation
                  </h5>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label>Diplôme</Label>
                      <Input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => handleNewEducationChange('degree', e.target.value)}
                        placeholder="Ex: Licence en Informatique"
                      />
                    </div>
                    <div>
                      <Label>Période</Label>
                      <Input
                        type="text"
                        value={newEducation.period}
                        onChange={(e) => handleNewEducationChange('period', e.target.value)}
                        placeholder="Ex: 2020 - 2023"
                      />
                    </div>
                    <div>
                      <Label>Établissement</Label>
                      <Input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => handleNewEducationChange('institution', e.target.value)}
                        placeholder="Ex: Université XYZ"
                      />
                    </div>
                    <div>
                      <Label>Lieu</Label>
                      <Input
                        type="text"
                        value={newEducation.location}
                        onChange={(e) => handleNewEducationChange('location', e.target.value)}
                        placeholder="Ex: Ville, Pays"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isCurrent"
                        checked={newEducation.isCurrent}
                        onChange={(e) => setNewEducation({...newEducation, isCurrent: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="isCurrent" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Formation actuelle
                      </label>
                    </div>
                    <Button 
                      onClick={addEducation}
                      size="sm"
                      disabled={!newEducation.degree.trim() || !newEducation.institution.trim()}
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