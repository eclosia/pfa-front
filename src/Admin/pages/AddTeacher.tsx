import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { FC, FormEvent, useState } from "react";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

interface TeacherFormData {
  fullName: string;
  email: string;
  department: string;
  academicRank: string;
  specialization: string;
}

const AddTeacher: FC = () => {
  const [formData, setFormData] = useState<TeacherFormData>({
    fullName: "",
    email: "",
    department: "",
    academicRank: "",
    specialization: "",
  });

  const departments = [
    { value: "informatique", label: "Informatique" },
    { value: "mathematiques", label: "Mathématiques" },
    { value: "physique", label: "Physique" },
    { value: "chimie", label: "Chimie" },
    { value: "biologie", label: "Biologie" },
    { value: "genie_civil", label: "Génie Civil" },
    { value: "genie_mecanique", label: "Génie Mécanique" },
  ];

  const academicRanks = [
    { value: "maitre_assistant", label: "Maître Assistant" },
    { value: "assistant", label: "Assistant" },
    { value: "professeur", label: "Professeur" },
    { value: "professeur_agrege", label: "Professeur Agrégé" },
    { value: "professeur_universitaire", label: "Professeur Universitaire" },
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
      console.log("Form submitted:", formData);
      // TODO: Add API call
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <PageMeta title="Add Teacher | Eclosia" description="Add new teacher to the system" />
      <PageBreadcrumb pageTitle="Ajouter un Enseignant" />
      <div className="space-y-6 px-4 sm:px-8 md:px-16 lg:px-32 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Informations de l'enseignant</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-white">
            <div>
              <label className="block mb-1 font-medium">Nom Complet</label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Prénom et Nom"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Email Institutionnel</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="prenom.nom@institution.edu"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Grade Académique</label>
                <Select
                  options={[{ value: "", label: "Sélectionnez un grade", disabled: true }, ...academicRanks]}
                  onChange={(value) => handleSelectChange("academicRank", value)}
                  value={formData.academicRank}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Département / Filière</label>
                <Select
                  options={[{ value: "", label: "Sélectionnez un département", disabled: true }, ...departments]}
                  onChange={(value) => handleSelectChange("department", value)}
                  value={formData.department}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Spécialités / Domaines d'expertise</label>
                <Input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="Ex: Intelligence Artificielle, Physique Quantique..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    fullName: "",
                    email: "",
                    department: "",
                    academicRank: "",
                    specialization: "",
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

export default AddTeacher;
