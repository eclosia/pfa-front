import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState } from "react";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    birthDate: "24/08/2002",
    gender: "male",
    field: "GINF",
    studyLevel: "2"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving changes:", formData);
    closeModal();
  };

  const getGenderLabel = (value: string) => {
    return value === "male" ? "Homme" : "Femme";
  };

  const getStudyLevelLabel = (value: string) => {
    return `${value}${value === "1" ? "ère" : "ème"} année`;
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-gray-900">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white lg:mb-6">
              Informations supplémentaires
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-400">
                  Date de naissance
                </p>
                <p className="text-sm font-medium text-white">
                  {formData.birthDate}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-400">
                  Genre
                </p>
                <p className="text-sm font-medium text-white">
                  {getGenderLabel(formData.gender)}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-400">
                  Filière
                </p>
                <p className="text-sm font-medium text-white">
                  {formData.field}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-400">
                  Niveau d'étude
                </p>
                <p className="text-sm font-medium text-white">
                  {getStudyLevelLabel(formData.studyLevel)}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-gray-700 hover:text-white lg:inline-flex lg:w-auto"
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
                fill="currentColor"
              />
            </svg>
            Modifier
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-gray-900 no-scrollbar rounded-3xl lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-white">
              Modifier les informations
            </h4>
            <p className="mb-6 text-sm text-gray-400 lg:mb-7">
              Mettez à jour vos informations pour garder votre profil à jour.
            </p>
          </div>
          
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label className="text-white">Date de naissance</Label>
                  <Input 
                    type="text" 
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>

                <div>
                  <Label className="text-white">Genre</Label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border rounded-lg border-gray-700 bg-gray-800 text-white"
                  >
                    <option value="male" className="text-white">Homme</option>
                    <option value="female" className="text-white">Femme</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white">Filière</Label>
                  <select
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border rounded-lg border-gray-700 bg-gray-800 text-white"
                  >
                    <option value="GINF" className="text-white">Génie Informatique (GINF)</option>
                    <option value="IRSI" className="text-white">Ingénierie des Réseaux et Systèmes Informatiques (IRSI)</option>
                    <option value="ROC" className="text-white">Robotique et Objets Connectes (ROC)</option>
                    <option value="IA" className="text-white">Intelligence Artificielle (IA)</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white">Niveau d'étude</Label>
                  <select
                    name="studyLevel"
                    value={formData.studyLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border rounded-lg border-gray-700 bg-gray-800 text-white"
                  >
                    <option value="1" className="text-white">1ère année</option>
                    <option value="2" className="text-white">2ème année</option>
                    <option value="3" className="text-white">3ème année</option>
                    <option value="4" className="text-white">4ème année</option>
                    <option value="5" className="text-white">5ème année</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={closeModal}
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                Fermer
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}