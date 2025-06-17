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

export default function UserMetaCard({ data }: UserProps) {
  const { user } = data;
  const { isOpen, openModal, closeModal } = useModal();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvName, setCvName] = useState<string>("");

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

  const handleRemoveCV = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCvFile(null);
    setCvName("");
  };

  const handleCvClick = () => {
    if (cvFile) {
      const url = URL.createObjectURL(cvFile);
      window.open(url, '_blank');
    }
  };

  // Composants d'icônes intégrés pour plus de clarté
  const DocumentIcon = ({ className }: { className?: string }) => (
    <svg className={`fill-current ${className}`} width="20" height="20" viewBox="0 0 24 24">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 14H16V16H8V14ZM8 10H16V12H8V10Z" />
    </svg>
  );

  const UploadIcon = ({ className }: { className?: string }) => (
    <svg className={`${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={`fill-current ${className}`} width="20" height="20" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const EditIcon = ({ className }: { className?: string }) => (
    <svg className={`fill-current ${className}`} width="18" height="18" viewBox="0 0 18 18">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" />
    </svg>
  );

  const CloseIcon = ({ className }: { className?: string }) => (
    <svg className={`${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:items-start xl:gap-4 xl:flex-col">
            {/* Ligne 1 : image + actions */}
            <div className="flex items-center justify-between w-full gap-6">
              {/* Image */}
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <img 
                  src="/images/user/owner.jpg" 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Actions (CV + LinkedIn) */}
              <div className="flex items-center gap-3">
                {/* Bouton CV */}
                <div className="relative group">
                  {cvFile ? (
                    <div
                      onClick={handleCvClick}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 group"
                    >
                      <DocumentIcon className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
                        {cvName}
                      </span>
                      <button
                        onClick={(e) => handleRemoveCV(e)}
                        className="ml-1 text-red-500 hover:text-red-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        title="Supprimer le CV"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={openModal}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full transition-all duration-200 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 hover:shadow-sm"
                    >
                      <UploadIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>Créer CV</span>
                    </button>
                  )}
                </div>

                {/* Séparateur */}
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Bouton LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/pimjo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Profil LinkedIn"
                  title="Profil LinkedIn"
                >
                  <LinkedInIcon className="text-[#0A66C2]" />
                </a>
              </div>
            </div>

            {/* Ligne 2 : infos personnelles */}
            <div className="w-full text-center xl:text-left">
              <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                {user.firstName} {user.lastName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Etudiant</p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.location || 'Non spécifié'}</p>
              </div>
            </div>
          </div>

          {/* Bouton Modifier */}
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-200 lg:inline-flex lg:w-auto"
          >
            <EditIcon />
            <span>Modifier</span>
          </button>
        </div>
      </div>

      {/* Modal (reste identique) */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        {/* ... (le contenu du modal reste inchangé) ... */}
      </Modal>
    </>
  );
}