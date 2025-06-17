import { FC, FormEvent, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router";

interface ProjetFormData {
    titre: string;
    domaine: string;
    type: string;
    description: string;
    technologies: string;
    duree: string;
    niveauRequis: string;
    prerequis: string;
    objectifs: string;
    nombreEtudiants: string;
    contactEmail: string;
    ressourcesDisponibles: string;
}

const ProposerPFA: FC = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProjetFormData>({
        titre: "",
        domaine: "",
        type: "PFA",
        description: "",
        technologies: "",
        duree: "4-6 mois",
        niveauRequis: "",
        prerequis: "",
        objectifs: "",
        nombreEtudiants: "1",
        contactEmail: user?.email || "",
        ressourcesDisponibles: "",
    });

    const typesProjet = [
        { value: "PFA", label: "Projet de Fin d'Année" },
        { value: "PFE", label: "Projet de Fin d'Études" },
        { value: "Recherche", label: "Projet de Recherche" },
    ];

    const niveauxRequis = [
        { value: "", label: "Sélectionnez un niveau", disabled: true },
        { value: "L2", label: "Licence 2ème année" },
        { value: "L3", label: "Licence 3ème année" },
        { value: "M1", label: "Master 1ère année" },
        { value: "M2", label: "Master 2ème année" },
        { value: "Ingénieur", label: "Cycle ingénieur" },
    ];

    const nombreEtudiantsOptions = [
        { value: "1", label: "1 étudiant" },
        { value: "2", label: "2 étudiants" },
        { value: "3", label: "3 étudiants" },
        { value: "4+", label: "4 étudiants ou plus" },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/projets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    enseignant_id: user?.id // On envoie toujours l'ID de l'enseignant côté serveur
                }),
            });
            
            if (!response.ok) {
                throw new Error("Erreur lors de la soumission du projet");
            } else {
                navigate('/enseignant/projets');
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du projet:", error);
        }
    };

    return (
        <>
            <PageMeta title="Proposer un PFA | Eclosia" description="Proposer un nouveau sujet de projet de fin d'année" />
            <PageBreadcrumb pageTitle="Proposer un PFA" />

            <div className="space-y-6 px-4 sm:px-8 md:px-16 lg:px-32 py-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Nouveau Sujet de PFA</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Titre du projet</label>
                                <Input
                                    type="text"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Développement d'une application de gestion scolaire"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Domaine</label>
                                <Input
                                    type="text"
                                    name="domaine"
                                    value={formData.domaine}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Informatique, Data Science, Réseaux..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Type de projet</label>
                                <Select
                                    options={typesProjet}
                                    onChange={(value) => handleSelectChange("type", value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Niveau requis</label>
                                <Select
                                    options={niveauxRequis}
                                    onChange={(value) => handleSelectChange("niveauRequis", value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Nombre d'étudiants</label>
                                <Select
                                    options={nombreEtudiantsOptions}
                                    onChange={(value) => handleSelectChange("nombreEtudiants", value)}
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
                                placeholder="Décrivez le projet, son contexte et son intérêt pédagogique"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Objectifs pédagogiques</label>
                                <textarea
                                    name="objectifs"
                                    value={formData.objectifs}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Quelles compétences les étudiants devront-ils acquérir?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Prérequis techniques</label>
                                <Input
                                    type="text"
                                    name="prerequis"
                                    value={formData.prerequis}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Connaissances en Java, Bases de données..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Technologies à utiliser</label>
                                <Input
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleInputChange}
                                    placeholder="Ex: React, Node.js, MongoDB (séparées par des virgules)"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Ressources disponibles</label>
                                <Input
                                    type="text"
                                    name="ressourcesDisponibles"
                                    value={formData.ressourcesDisponibles}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Serveurs, Logiciels, Données..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Durée estimée</label>
                                <Input
                                    type="text"
                                    name="duree"
                                    value={formData.duree}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 4-6 mois"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Email de contact</label>
                                <Input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Proposer le PFA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProposerPFA;