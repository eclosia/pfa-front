import { useModal } from "../../../hooks/useModal";

import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

import { useEffect, useState } from "react";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { useAuth } from "../../../auth/authContext";

interface Skill {
    id: number;
    nom: string;
    niveau: number;
}

export default function UserSkillsCard() {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const { user } = useAuth();

    const { isOpen, openModal, closeModal } = useModal();

    const [skills, setSkills] = useState<Skill[]>([]);

    const [newSkill, setNewSkill] = useState({
        nom: "",
        niveau: 50,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/etudiants/1/competences`, { // TODO: ${user?.id}
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error();
            } else {
                const data = await response.json();
                setSkills(data);
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Erreur lors de la recuperation des offres:", error);
        }

    }

    const handleSkillChange = (id: number, field: string, value: string | number) => {
        setSkills(skills.map(skill =>
            skill.id === id ? { ...skill, [field]: value } : skill
        ));
    };

    const handleNewSkillChange = (field: string, value: string | number) => {
        setNewSkill({ ...newSkill, [field]: value });
    };

    const addSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill.nom?.trim()) {
            try {
                const response = await fetch(`${baseUrl}/api/etudiants/1/competences`, { // TODO: ${user?.id}
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "nom": newSkill.nom,
                        "niveau": newSkill.niveau,
                    })
                });
                if (!response.ok) {
                    throw new Error();
                } else {
                    setNewSkill({
                        nom: "",
                        niveau: 50
                    });
                    fetchSkills();
                }
            } catch (error) {

                console.error("Erreur lors de la recuperation des offres:", error);
            }

        }
    };

    const removeSkill = async (id: number) => {
        try {
            const response = await fetch(`${baseUrl}/api/etudiants/1/competences/${id}`, { // TODO: ${user?.id}  
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error();
            } else {
                fetchSkills();
            }

        } catch (error) {
            console.error("Erreur lors de la suppression de la compétence:", error);
        }
    };

    const handleSave = () => {
        // TODO: handle skills editing logic here
        closeModal();
    };

    const colors = [
        "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 dark:from-purple-100 dark:via-purple-300 dark:to-purple-500",
        "bg-gradient-to-r from-green-200 via-green-400 to-green-600 dark:from-green-100 dark:via-green-300 dark:to-green-500",
        "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500",
        "bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600 dark:from-teal-100 dark:via-teal-300 dark:to-teal-500",
        "bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-600 dark:from-cyan-100 dark:via-cyan-300 dark:to-cyan-500"
    ]

    function createCircularIterator(arr: string[]) {
        let index = 0;
        return function getNext() {
            const value = arr[index];
            index = (index + 1) % arr.length;
            return value;
        };
    }

    const nextColor = createCircularIterator(colors);

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="w-full">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Compétences techniques
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
                            <div className="space-y-4">
                                {skills.map((skill) => (
                                    <div key={skill.id}>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                {skill.nom}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {skill.niveau}%
                                            </p>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div
                                                className={`h-2 rounded-full ${nextColor()}`}
                                                style={{ width: `${skill.niveau}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {skills.length === 0 ? (
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
            </div >

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Gérer vos compétences
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Ajoutez, modifiez ou supprimez vos compétences techniques.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="px-2 overflow-y-auto custom-scrollbar max-h-[400px]">
                            <div className="space-y-6">
                                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
                                    <h5 className="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">
                                        Ajouter une nouvelle compétence
                                    </h5>
                                    <form onSubmit={addSkill} className="space-y-4">
                                        <div>
                                            <Label>Nom de la compétence</Label>
                                            <Input
                                                type="text"
                                                value={newSkill.nom}
                                                onChange={(e) => handleNewSkillChange('nom', e.target.value)}
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
                                                    value={newSkill.niveau}
                                                    onChange={(e) => handleNewSkillChange('niveau', parseInt(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                                />
                                                <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                                                    {newSkill.niveau}%
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={!newSkill.nom?.trim()}
                                        >
                                            Ajouter
                                        </Button>
                                    </form>
                                </div>

                                {skills.map((skill) => (
                                    <div key={skill.id} className="group relative p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <Input
                                                type="text"
                                                value={skill.nom}
                                                onChange={(e) => handleSkillChange(skill.id, 'nom', e.target.value)}
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
                                                value={skill.niveau}
                                                onChange={(e) => handleSkillChange(skill.id, 'value', parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                            />
                                            <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                                                {skill.niveau}%
                                            </span>
                                        </div>
                                    </div>
                                ))}


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
                    </div>
                </div>
            </Modal>
        </>
    );
}