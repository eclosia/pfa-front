import { FC, FormEvent, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

interface OffreStageFormData {
  titre: string;
  entreprise: string;
  lieu: string;
  type: string;
  description: string;
  technologies: string;
  duree: string;
  debut: string;
  remuneration: string;
  salaire: string;
  competences: string;
  niveauEtude: string;
}

const AddOffreStage: FC = () => {
  const [formData, setFormData] = useState<OffreStageFormData>({
    titre: "",
    entreprise: "",
    lieu: "",
    type: "Stage",
    description: "",
    technologies: "",
    duree: "",
    debut: "",
    remuneration: "non",
    salaire: "",
    competences: "",
    niveauEtude: "",
  });

  const typesOffre = [
    { value: "Stage", label: "Stage" },
    { value: "Alternance", label: "Alternance" },
    { value: "Projet", label: "Projet de fin d'études" },
  ];

  const niveauxEtude = [
    { value: "", label: "Sélectionnez un niveau", disabled: true },
    { value: "bac+2", label: "Bac+2 (DEUG, DUT, BTS)" },
    { value: "bac+3", label: "Bac+3 (Licence, Bachelor)" },
    { value: "bac+5", label: "Bac+5 (Master, Ingénieur)" },
    { value: "bac+8", label: "Bac+8 (Doctorat)" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      salaire: value === "non" ? "Non rémunéré" : "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Offre de stage soumise:", formData);
      // TODO: Ajouter l'appel API ici
    } catch (error) {
      console.error("Erreur lors de la soumission de l'offre:", error);
    }
  };

  const isPaid = formData.remuneration === "oui";

  return (
    <>
      <PageMeta title="Ajouter une Offre de Stage | Eclosia" description="Publier une nouvelle offre de stage" />
      <PageBreadcrumb pageTitle="Ajouter une Offre de Stage" />

      <div className="space-y-6 px-4 sm:px-8 md:px-16 lg:px-32 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Nouvelle Offre de Stage</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Titre de l'offre</label>
                <Input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  placeholder="Ex: Développeur Front-end React"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Entreprise</label>
                <Input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleInputChange}
                  placeholder="Nom de l'entreprise"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium">Lieu</label>
                <Input
                  type="text"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleInputChange}
                  placeholder="Ville, Pays"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Type d'offre</label>
                <Select
                  options={typesOffre}
                  onChange={(value) => handleSelectChange("type", value)}
                  value={formData.type}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Niveau d'étude requis</label>
                <Select
                  options={niveauxEtude}
                  onChange={(value) => handleSelectChange("niveauEtude", value)}
                  value={formData.niveauEtude}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Description détaillée</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Décrivez les missions, responsabilités, etc."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Technologies requises</label>
                <Input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, MongoDB (séparées par des virgules)"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Compétences recherchées</label>
                <Input
                  type="text"
                  name="competences"
                  value={formData.competences}
                  onChange={handleInputChange}
                  placeholder="Autonomie, Travail d'équipe, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium">Durée</label>
                <Input
                  type="text"
                  name="duree"
                  value={formData.duree}
                  onChange={handleInputChange}
                  placeholder="Ex: 3 mois"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Date de début</label>
                <Input
                  type="date"
                  name="debut"
                  value={formData.debut}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Rémunération</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="remuneration"
                      value="oui"
                      checked={isPaid}
                      onChange={handleRadioChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Oui</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="remuneration"
                      value="non"
                      checked={!isPaid}
                      onChange={handleRadioChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Non</span>
                  </label>
                </div>

                {isPaid && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="salaire"
                      value={formData.salaire}
                      onChange={handleInputChange}
                      placeholder="Montant ou fourchette (ex: 3000-4000 MAD)"
                    />
                  </div>
                )}

                {!isPaid && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                    Non rémunéré
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setFormData({
                  titre: "",
                  entreprise: "",
                  lieu: "",
                  type: "Stage",
                  description: "",
                  technologies: "",
                  duree: "",
                  debut: "",
                  remuneration: "non",
                  salaire: "",
                  competences: "",
                  niveauEtude: "",
                })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Publier l'offre
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddOffreStage;