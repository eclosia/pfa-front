import { useModal } from "../../../hooks/useModal";

import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

import { useState } from "react";

interface Skill {
  id: string;
  name: string;
  value: number;
  color: string;
}

export default function UserSkillsCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: "Programmation", value: 85, color: "bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 dark:from-blue-100 dark:via-blue-300 dark:to-blue-500" },
    { id: '2', name: "Intelligence Artificielle", value: 70, color: "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 dark:from-purple-100 dark:via-purple-300 dark:to-purple-500" },
    { id: '3', name: "Développement Web", value: 90, color: "bg-gradient-to-r from-green-200 via-green-400 to-green-600 dark:from-green-100 dark:via-green-300 dark:to-green-500" },
    { id: '4', name: "Développement Mobile", value: 75, color: "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500" },
    { id: '5', name: "Base de données", value: 80, color: "bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600 dark:from-teal-100 dark:via-teal-300 dark:to-teal-500" },
    { id: '6', name: "Cloud Computing", value: 65, color: "bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-600 dark:from-cyan-100 dark:via-cyan-300 dark:to-cyan-500" }
  ]);

  const [newSkill, setNewSkill] = useState({
    name: "",
    value: 50,
    color: "bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 dark:from-blue-100 dark:via-blue-300 dark:to-blue-500"
  });

  const handleSkillChange = (id: string, field: string, value: string | number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleNewSkillChange = (field: string, value: string | number) => {
    setNewSkill({ ...newSkill, [field]: value });
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([
        ...skills,
        {
          id: Date.now().toString(),
          ...newSkill
        }
      ]);
      setNewSkill({
        name: "",
        value: 50,
        color: "bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 dark:from-blue-100 dark:via-blue-300 dark:to-blue-500"
      });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleSave = () => {
    console.log("Compétences sauvegardées:", skills);
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Compétences techniques
            </h4>

            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {skill.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.value}%
                    </p>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full ${skill.color}`}
                      style={{ width: `${skill.value}%` }}
                    ></div>
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
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Gérer les compétences
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Ajoutez, modifiez ou supprimez vos compétences techniques.
            </p>
          </div>
          
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="group relative p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <Input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                        className="w-full max-w-[200px]"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.value}
                        onChange={(e) => handleSkillChange(skill.id, 'value', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                        {skill.value}%
                      </span>
                    </div>
                  </div>
                ))}

                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                  <h5 className="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">
                    Ajouter une nouvelle compétence
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <Label>Nom de la compétence</Label>
                      <Input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => handleNewSkillChange('name', e.target.value)}
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
                          value={newSkill.value}
                          onChange={(e) => handleNewSkillChange('value', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                          {newSkill.value}%
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={addSkill}
                      size="sm"
                      disabled={!newSkill.name.trim()}
                    >
                      Ajouter
                    </Button>
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
        </div>
      </Modal>
    </>
  );
}