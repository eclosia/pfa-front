import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { FC, FormEvent, useState } from "react";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

interface EntrepriseFormData {
  name: string;
  email: string;
  sector: string;
  country: string;
  address: string;
  phone: string;
}

const AddEntreprise: FC = () => {
  const [formData, setFormData] = useState<EntrepriseFormData>({
    name: "",
    email: "",
    sector: "",
    country: "",
    address: "",
    phone: "",
  });

  const sectors = [
    { value: "informatique", label: "Informatique" },
    { value: "telecommunications", label: "Télécommunications" },
    { value: "automobile", label: "Automobile" },
    { value: "aeronautique", label: "Aéronautique" },
    { value: "finance", label: "Finance" },
    { value: "sante", label: "Santé" },
    { value: "autre", label: "Autre" },
  ];

  const countries = [
    { value: "maroc", label: "Maroc" },
    { value: "france", label: "France" },
    { value: "canada", label: "Canada" },
    { value: "allemagne", label: "Allemagne" },
    { value: "usa", label: "États-Unis" },
    { value: "autre", label: "Autre" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Entreprise form submitted:", formData);
      // TODO: Add API call
    } catch (error) {
      console.error("Error submitting entreprise form:", error);
    }
  };

  return (
    <>
      <PageMeta title="Ajouter une Entreprise | Eclosia" description="Ajout d'une entreprise partenaire" />
      <PageBreadcrumb pageTitle="Ajouter une Entreprise" />
      <div className="space-y-6 px-4 sm:px-8 md:px-16 lg:px-32 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Informations de l'entreprise</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-white">
            <div>
              <label className="block mb-1 font-medium">Nom de l'entreprise</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: TechCorp"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Email de contact</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@entreprise.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Secteur d'activité</label>
                <Select
                  options={[{ value: "", label: "Sélectionnez un secteur", disabled: true }, ...sectors]}
                  onChange={(value) => handleSelectChange("sector", value)}
                  value={formData.sector}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Pays</label>
                <Select
                  options={[{ value: "", label: "Sélectionnez un pays", disabled: true }, ...countries]}
                  onChange={(value) => handleSelectChange("country", value)}
                  value={formData.country}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Numéro de téléphone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+212 600-000000"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Adresse complète</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Adresse complète de l'entreprise"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    email: "",
                    sector: "",
                    country: "",
                    address: "",
                    phone: "",
                  })
                }
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEntreprise;
