import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useEffect, useState } from "react";

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

export default function UserMetaCard({ data }: UserProps) {

    const { user } = data;
    
    const { isOpen, openModal, closeModal } = useModal();
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvName, setCvName] = useState<string>("");
    const [showCvPreview, setShowCvPreview] = useState(false);

    
    const handleSave = () => {
        console.log("Saving changes...", { cvFile, cvName });
        closeModal();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCvFile(file);
            setCvName(file.name);
        }
    };

    const handleRemoveCV = () => {
        setCvFile(null);
        setCvName("");
    };

    const handleCvClick = () => {
        if (cvFile) {
            const url = URL.createObjectURL(cvFile);
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                            <img src="/images/user/owner.jpg" alt="user" />
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {user.firstName} {user.lastName}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Etudiant
                                </p>
                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.location}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center order-2 gap-4 grow xl:order-3 xl:justify-end">
                            {cvFile ? (
                                <div
                                    onClick={handleCvClick}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                >
                                    <svg
                                        className="fill-current text-blue-600 dark:text-blue-400"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 14H16V16H8V14ZM8 10H16V12H8V10Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cvName}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveCV();
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={openModal}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full transition-all duration-200 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
                                >
                                    <svg
                                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    Ajouter CV
                                </button>
                            )}

                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

                            <a
                                href="https://www.linkedin.com/company/pimjo"
                                target="_blank"
                                rel="noopener"
                                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                            >
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.78381 4.16645C5.78351 4.84504 5.37181 5.45569 4.74286 5.71045C4.11391 5.96521 3.39331 5.81321 2.92083 5.32613C2.44836 4.83904 2.31837 4.11413 2.59216 3.49323C2.86596 2.87233 3.48886 2.47942 4.16715 2.49978C5.06804 2.52682 5.78422 3.26515 5.78381 4.16645ZM5.83381 7.06645H2.50048V17.4998H5.83381V7.06645ZM11.1005 7.06645H7.78381V17.4998H11.0672V12.0248C11.0672 8.97475 15.0422 8.69142 15.0422 12.0248V17.4998H18.3338V10.8914C18.3338 5.74978 12.4505 5.94145 11.0672 8.46642L11.1005 7.06645Z"
                                        fill=""
                                    />
                                </svg>
                            </a>
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
                                    Liens sociaux
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <Label>Linkedin</Label>
                                        <Input
                                            type="text"
                                            value="https://www.linkedin.com/company/pimjo"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    CV
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                                    {cvFile ? (
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <svg
                                                    className="fill-current text-blue-600 dark:text-blue-400"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 14H16V16H8V14ZM8 10H16V12H8V10Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <span className="text-sm text-gray-800 dark:text-white/90">{cvName}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveCV}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700">
                                            <label className="flex flex-col items-center cursor-pointer">
                                                <svg
                                                    className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Cliquez pour télécharger votre CV
                                                </span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Informations personnelles
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Prénom</Label>
                                        <Input
                                            type="text"
                                            value={user.firstName}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Nom de famille</Label>
                                        <Input
                                            type="text"
                                            value={user.lastName}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Addresse Email</Label>
                                        <Input
                                            type="text"
                                            value={user.email}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Téléphone</Label>
                                        <Input type="text" value={user.phoneNumber} />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>numéro apogée</Label>
                                        <Input
                                            type="text"
                                            value={user.apogeeNumber}
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
        </>
    );
}
