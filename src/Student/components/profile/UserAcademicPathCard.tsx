import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/authContext";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";

interface Education {
    id: number;
    diplome: string;
    periode: string;
    etablissement: string;
    lieu: string;
    statut: string;
}

export default function UserAcademicPathCard() {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const { user } = useAuth();

    const { isOpen, openModal, closeModal } = useModal();

    const [educations, setEducations] = useState<Education[]>([]);

    const [newEducation, setNewEducation] = useState<Education>({
        id: 0,
        diplome: "",
        periode: "",
        etablissement: "",
        lieu: "",
        statut: ""
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/etudiants/1/parcours-academique`, { // TODO: ${user?.id}
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error();
            } else {
                const data = await response.json();
                setEducations(data);
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Erreur lors de la recuperation des offres:", error);
        }

    }

    const handleEducationChange = (id: number, field: keyof Education, value: string) => {
        setEducations(educations.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    const addEducation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newEducation.diplome?.trim() && newEducation.etablissement?.trim()) {
            try {
                const response = await fetch(`${baseUrl}/api/etudiants/1/parcours-academique`, { // TODO: ${user?.id}
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "diplome": newEducation.diplome,
                        "periode": newEducation.periode,
                        "etablissement": newEducation.etablissement,
                        "lieu": newEducation.lieu,
                        "statut": newEducation.statut
                    })
                });
                if (!response.ok) {
                    throw new Error();
                } else {
                    setNewEducation({
                        id: 0,
                        diplome: "",
                        periode: "",
                        etablissement: "",
                        lieu: "",
                        statut: ""
                    });
                    fetchEducations();
                }
            } catch (error) {

                console.error("Erreur lors de la recuperation des offres:", error);
            }

        }
    };

    const handleNewEducationChange = (field: keyof Education, value: string) => {
        setNewEducation({ ...newEducation, [field]: value });
    };

    const removeEducation = async (id: number) => {
        try {
            const response = await fetch(`${baseUrl}/api/etudiants/1/parcours-academique/${id}`, { // TODO: ${user?.id}  
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error();
            } else {
                fetchEducations();
            }

        } catch (error) {
            console.error("Erreur lors de la suppression de la compétence:", error);
        }
    };

    const toggleCurrentEducation = (id: number) => {
        setEducations(educations.map(edu => ({
            ...edu,
            statut: edu.id === id ? "actuel" : ""
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
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
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
                                    <div className={`absolute -left-8 top-1 h-4 w-4 rounded-full border-2 ${education.statut ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900`}></div>
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
                        onClick={openModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        <FiPlusCircle />
                        Ajouter
                    </button>
                ) : (
                    <button
                        onClick={openModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        <FiEdit2 />
                        Modifier
                    </button>
                )}
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

                    <div className="flex flex-col">
                        <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
                            <div className="space-y-4">
                                {/* Formulaire pour ajouter une nouvelle formation */}
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
                                                onChange={(e) => handleNewEducationChange('diplome', e.target.value)}
                                                placeholder="Ex: Licence en Informatique"
                                            />
                                        </div>
                                        <div>
                                            <Label>Période</Label>
                                            <Input
                                                type="text"
                                                value={newEducation.periode}
                                                onChange={(e) => handleNewEducationChange('periode', e.target.value)}
                                                placeholder="Ex: 2020 - 2023"
                                            />
                                        </div>
                                        <div>
                                            <Label>Établissement</Label>
                                            <Input
                                                type="text"
                                                value={newEducation.etablissement}
                                                onChange={(e) => handleNewEducationChange('etablissement', e.target.value)}
                                                placeholder="Ex: Université XYZ"
                                            />
                                        </div>
                                        <div>
                                            <Label>Lieu</Label>
                                            <Input
                                                type="text"
                                                value={newEducation.lieu}
                                                onChange={(e) => handleNewEducationChange('lieu', e.target.value)}
                                                placeholder="Ex: Ville, Pays"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="statut"
                                                checked={newEducation.statut === "actuel"}
                                                onChange={(e) => setNewEducation({ ...newEducation, statut: e.target.checked ? "actuel" : "" })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="statut" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                                Formation actuelle
                                            </label>
                                        </div>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={!newEducation.diplome.trim() || !newEducation.etablissement.trim()}
                                        >
                                            Ajouter
                                        </Button>
                                    </form>
                                </div>

                                {educations.map((education) => (
                                    <div key={education.id} className="mb-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
                                                {education.statut ? "Formation actuelle" : "Formation précédente"}
                                            </h5>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleCurrentEducation(education.id)}
                                                    className={`px-2 py-1 text-xs rounded ${education.statut ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                                                >
                                                    {education.statut ? 'Actuel' : 'Définir comme actuel'}
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
                                                    value={education.diplome}
                                                    onChange={(e) => handleEducationChange(education.id, 'diplome', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Période</Label>
                                                <Input
                                                    type="text"
                                                    value={education.periode}
                                                    onChange={(e) => handleEducationChange(education.id, 'periode', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Établissement</Label>
                                                <Input
                                                    type="text"
                                                    value={education.etablissement}
                                                    onChange={(e) => handleEducationChange(education.id, 'etablissement', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Lieu</Label>
                                                <Input
                                                    type="text"
                                                    value={education.lieu}
                                                    onChange={(e) => handleEducationChange(education.id, 'lieu', e.target.value)}
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
                </div>
            </Modal>
        </div>
    );
}