import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useState } from "react";

export default function UserAddressCard() {

    const { isOpen, openModal, closeModal } = useModal();
    
    const [formData, setFormData] = useState({
        birthDate: "01/01/2000",
        gender: "Homme",
        fieldOfStudy: "Génie Informatique",
        studyLevel: "3ème année",
        nationality: "Marocaine",
        languages: ["Arabe", "Français", "Anglais"],
        interests: ["Intelligence Artificielle", "Développement Web", "Cloud Computing"],
        certifications: ["AWS Certified Cloud Practitioner", "Microsoft Azure Fundamentals"],
        github: "github.com/ridamihi",
        portfolio: "ridamihi.dev"
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

    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Informations supplémentaires
                    </h4>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Informations personnelles */}
                        <div className="space-y-4">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Informations personnelles</h5>
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Date de naissance</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formData.birthDate}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Genre</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formData.gender}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Nationalité</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formData.nationality}</p>
                                </div>
                            </div>
                        </div>

                        {/* Informations académiques */}
                        <div className="space-y-4">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Informations académiques</h5>
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Filière</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formData.fieldOfStudy}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Niveau d'études</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formData.studyLevel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Langues et centres d'intérêt */}
                        <div className="space-y-4">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Langues et centres d'intérêt</h5>
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Langues</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.languages.map((lang, index) => (
                                            <span key={index} className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Centres d'intérêt</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.interests.map((interest, index) => (
                                            <span key={index} className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certifications et liens */}
                        <div className="space-y-4">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Certifications et liens</h5>
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Certifications</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.certifications.map((cert, index) => (
                                            <span key={index} className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Liens professionnels</p>
                                    <div className="space-y-2">
                                        <a href={`https://${formData.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                            {formData.github}
                                        </a>
                                        <a href={`https://${formData.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 16.057v-3.057h2v3.057h-2zm1.964-10.186c.976 0 1.791.62 1.791 1.383 0 .779-.815 1.384-1.791 1.384-.976 0-1.791-.605-1.791-1.384 0-.763.815-1.383 1.791-1.383z" /></svg>
                                            {formData.portfolio}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Modifier les informations supplémentaires
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Mettez à jour vos informations supplémentaires pour enrichir votre profil.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div className="space-y-6">
                                <div>
                                    <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                                        Informations personnelles
                                    </h5>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                        <div>
                                            <Label>Date de naissance</Label>
                                            <Input
                                                type="text"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label>Genre</Label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500"
                                            >
                                                <option value="Homme">Homme</option>
                                                <option value="Femme">Femme</option>
                                                <option value="Autre">Autre</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label>Nationalité</Label>
                                            <Input
                                                type="text"
                                                name="nationality"
                                                value={formData.nationality}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                                        Informations académiques
                                    </h5>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                        <div>
                                            <Label>Filière</Label>
                                            <Input
                                                type="text"
                                                name="fieldOfStudy"
                                                value={formData.fieldOfStudy}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label>Niveau d'études</Label>
                                            <Input
                                                type="text"
                                                name="studyLevel"
                                                value={formData.studyLevel}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                                        Langues et centres d'intérêt
                                    </h5>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                        <div>
                                            <Label>Langues (séparées par des virgules)</Label>
                                            <Input
                                                type="text"
                                                name="languages"
                                                value={formData.languages.join(", ")}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    languages: e.target.value.split(",").map(lang => lang.trim())
                                                }))}
                                            />
                                        </div>
                                        <div>
                                            <Label>Centres d'intérêt (séparés par des virgules)</Label>
                                            <Input
                                                type="text"
                                                name="interests"
                                                value={formData.interests.join(", ")}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    interests: e.target.value.split(",").map(interest => interest.trim())
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                                        Certifications et liens
                                    </h5>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                        <div>
                                            <Label>Certifications (séparées par des virgules)</Label>
                                            <Input
                                                type="text"
                                                name="certifications"
                                                value={formData.certifications.join(", ")}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    certifications: e.target.value.split(",").map(cert => cert.trim())
                                                }))}
                                            />
                                        </div>
                                        <div>
                                            <Label>GitHub</Label>
                                            <Input
                                                type="text"
                                                name="github"
                                                value={formData.github}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label>Portfolio</Label>
                                            <Input
                                                type="text"
                                                name="portfolio"
                                                value={formData.portfolio}
                                                onChange={handleChange}
                                            />
                                        </div>
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
        </div>
    );
}