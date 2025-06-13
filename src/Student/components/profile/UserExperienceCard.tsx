import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useEffect, useState } from "react";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";

interface Experience {
    id: number;
    titre: string;
    entreprise: string;
    periode: string;
    description: string;
    type: "Stage" | "Emploi" | "Alternance";
}

export default function UserExperienceCard() {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const { isOpen, openModal, closeModal } = useModal();

    const [experiences, setExperiences] = useState<Experience[]>([]);

    const [newExperience, setNewExperience] = useState<Experience>({
        id: 0,
        titre: "",
        entreprise: "",
        periode: "",
        description: "",
        type: "Stage"
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/etudiants/1/experiences`, { // TODO: ${user?.id}
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error();
            } else {
                const data = await response.json();
                setExperiences(data);
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Erreur lors de la recuperation des offres:", error);
        }

    }

    const handleExperienceChange = (id: number, field: keyof Experience, value: string) => {
        setExperiences(experiences.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const handleNewExperienceChange = (field: keyof Experience, value: string) => {
        setNewExperience({ ...newExperience, [field]: value });
    };

    const addExperience = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newExperience.titre.trim() && newExperience.entreprise.trim()) {
            try {
                const response = await fetch(`${baseUrl}/api/etudiants/1/experiences`, { // TODO: ${user?.id}
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "titre": newExperience.titre,
                        "entreprise": newExperience.entreprise,
                        "periode": newExperience.periode,
                        "description": newExperience.description,
                        "type": newExperience.type
                    })
                });
                if (!response.ok) {
                    throw new Error();
                } else {
                    setNewExperience({
                        id: 0,
                        titre: "",
                        entreprise: "",
                        periode: "",
                        description: "",
                        type: "Stage"
                    });
                    fetchExperiences();
                }
            } catch (error) {

                console.error("Erreur lors de la recuperation des offres:", error);
            }
            setNewExperience({
                id: 0,
                titre: "",
                entreprise: "",
                periode: "",
                description: "",
                type: "Stage"
            });
        }
    };

    const removeExperience = (id: number) => {
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
                        <div className="grid gap-6">
                            {experiences.map((experience) => (
                                <div key={experience.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
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
                            Gérer les expériences professionnelles
                        </h4>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Ajoutez, modifiez ou supprimez vos expériences professionnelles.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
                            <div className="space-y-4">
                                {/* Formulaire pour ajouter une nouvelle expérience */}
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
                                                onChange={(e) => handleNewExperienceChange('titre', e.target.value)}
                                                placeholder="Ex: Stage de Fin d'Études"
                                            />
                                        </div>
                                        <div>
                                            <Label>Entreprise</Label>
                                            <Input
                                                type="text"
                                                value={newExperience.entreprise}
                                                onChange={(e) => handleNewExperienceChange('entreprise', e.target.value)}
                                                placeholder="Ex: Nom de l'entreprise"
                                            />
                                        </div>
                                        <div>
                                            <Label>Période</Label>
                                            <Input
                                                type="text"
                                                value={newExperience.periode}
                                                onChange={(e) => handleNewExperienceChange('periode', e.target.value)}
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
                                            <Label>description</Label>
                                            <textarea
                                                value={newExperience.description}
                                                onChange={(e) => handleNewExperienceChange('description', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                                rows={3}
                                                placeholder="Décrivez vos responsabilités et réalisations..."
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={!newExperience.titre.trim() || !newExperience.entreprise.trim()}
                                        >
                                            Ajouter
                                        </Button>
                                    </form>
                                </div>

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
                                                    value={experience.titre}
                                                    onChange={(e) => handleExperienceChange(experience.id, 'titre', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Entreprise</Label>
                                                <Input
                                                    type="text"
                                                    value={experience.entreprise}
                                                    onChange={(e) => handleExperienceChange(experience.id, 'entreprise', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Période</Label>
                                                <Input
                                                    type="text"
                                                    value={experience.periode}
                                                    onChange={(e) => handleExperienceChange(experience.id, 'periode', e.target.value)}
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
                                                <Label>description</Label>
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