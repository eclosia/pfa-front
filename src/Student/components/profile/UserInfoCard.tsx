import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useState } from "react";

interface UserProps {
    data: {
        user: {
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            apogeeNumber: string;
            location: string;
        };
    };
}
interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
}

interface Formation {
    id: string;
    diploma: string;
    school: string;
    period: string;
    description: string;
}

export default function UserInfoCard({ data }: UserProps) {

    const { isOpen, openModal, closeModal } = useModal();

    const { user } = data;

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        personalEmail: user.email,
        academicEmail: user.email,
        phone: user.phoneNumber,
        apogeeNumber: user.apogeeNumber
    });

    console.log(user.firstName);

    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: "1",
            title: "Développeur Full Stack",
            company: "Tech Company",
            period: "2023 - Présent",
            description: "Développement d'applications web avec React et Node.js"
        }
    ]);

    const [formations, setFormations] = useState<Formation[]>([
        {
            id: "1",
            diploma: "Master en Informatique",
            school: "Université Hassan II",
            period: "2021 - 2023",
            description: "Spécialisation en développement web"
        }
    ]);

    const [newExperience, setNewExperience] = useState<Experience>({
        id: "",
        title: "",
        company: "",
        period: "",
        description: ""
    });

    const [newFormation, setNewFormation] = useState<Formation>({
        id: "",
        diploma: "",
        school: "",
        period: "",
        description: ""
    });

    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
    const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editingExperience) {
            setEditingExperience(prev => prev ? { ...prev, [name]: value } : null);
        } else {
            setNewExperience(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editingFormation) {
            setEditingFormation(prev => prev ? { ...prev, [name]: value } : null);
        } else {
            setNewFormation(prev => ({ ...prev, [name]: value }));
        }
    };

    const addExperience = () => {
        if (newExperience.title && newExperience.company) {
            setExperiences(prev => [...prev, { ...newExperience, id: Date.now().toString() }]);
            setNewExperience({
                id: "",
                title: "",
                company: "",
                period: "",
                description: ""
            });
        }
    };

    const addFormation = () => {
        if (newFormation.diploma && newFormation.school) {
            setFormations(prev => [...prev, { ...newFormation, id: Date.now().toString() }]);
            setNewFormation({
                id: "",
                diploma: "",
                school: "",
                period: "",
                description: ""
            });
        }
    };

    const startEditingExperience = (experience: Experience) => {
        setEditingExperience(experience);
    };

    const startEditingFormation = (formation: Formation) => {
        setEditingFormation(formation);
    };

    const saveExperienceEdit = () => {
        if (editingExperience) {
            setExperiences(prev =>
                prev.map(exp => (exp.id === editingExperience.id ? editingExperience : exp))
            );
            setEditingExperience(null);
        }
    };

    const saveFormationEdit = () => {
        if (editingFormation) {
            setFormations(prev =>
                prev.map(form => (form.id === editingFormation.id ? editingFormation : form))
            );
            setEditingFormation(null);
        }
    };

    const cancelEdit = () => {
        setEditingExperience(null);
        setEditingFormation(null);
    };

    const removeExperience = (id: string) => {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
    };

    const removeFormation = (id: string) => {
        setFormations(prev => prev.filter(form => form.id !== id));
    };

    const handleSave = () => {
        console.log("Saving changes:", { formData, experiences, formations });
        closeModal();
    };

    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Informations personnelles
                    </h4>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Prenom
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                Rida 
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Nom
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                Mihi
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Email personnel
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                ridamihi12@gmail.com
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Email académique
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                rida.mihi.23@ump.ac.ma
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Téléphone
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                0680501253
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                numéro apogée
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                653297
                            </p>
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
                            Modifier les informations personnelles
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Mettez à jour vos informations pour garder votre profil à jour.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Informations personnelles
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Prénom</Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Nom de famille</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Email personnel</Label>
                                        <Input
                                            type="email"
                                            name="personalEmail"
                                            value={formData.personalEmail}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Email académique</Label>
                                        <Input
                                            type="email"
                                            name="academicEmail"
                                            value={formData.academicEmail}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Téléphone</Label>
                                        <Input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>numéro apogée</Label>
                                        <Input
                                            type="text"
                                            name="apogeeNumber"
                                            value={formData.apogeeNumber}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
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