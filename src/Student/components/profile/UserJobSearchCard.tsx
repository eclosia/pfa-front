import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { Alert } from "../../../components/ui/alert/Alert";

interface JobOffer {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  duration: string;
  startDate: string;
  salary?: string;
  contact: string;
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  cv: File | null;
  motivationLetter: File | null;
}

export default function UserJobSearchCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    location: "all"
  });
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    cv: null,
    motivationLetter: null
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    variant: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>({
    variant: 'success',
    title: '',
    message: ''
  });

  useEffect(() => {
    // Charger les offres depuis le fichier JSON
    fetch('/data/job-offers.json')
      .then(response => response.json())
      .then(data => {
        setOffers(data);
        setFilteredOffers(data);
      })
      .catch(error => console.error('Erreur lors du chargement des offres:', error));
  }, []);

  useEffect(() => {
    // Filtrer les offres en fonction des critères
    let filtered = offers;

    if (filters.search) {
      filtered = filtered.filter(offer =>
        offer.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        offer.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        offer.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type !== "all") {
      filtered = filtered.filter(offer => offer.type === filters.type);
    }

    if (filters.location !== "all") {
      filtered = filtered.filter(offer => offer.location === filters.location);
    }

    setFilteredOffers(filtered);
  }, [filters, offers]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyClick = (offer: JobOffer) => {
    setSelectedOffer(offer);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pourriez envoyer les données à votre API
    console.log("Candidature soumise:", {
      offer: selectedOffer,
      ...applicationData
    });
    setIsApplicationModalOpen(false);
    // Réinitialiser les champs
    setApplicationData({
      firstName: "",
      lastName: "",
      cv: null,
      motivationLetter: null
    });

    // Afficher l'alerte stylisée
    setAlertConfig({
      variant: 'success',
      title: 'Candidature envoyée !',
      message: `Votre candidature pour ${selectedOffer?.title} chez ${selectedOffer?.company} a été soumise avec succès.`
    });
    setShowAlert(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ApplicationData) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setAlertConfig({
          variant: 'error',
          title: 'Format de fichier invalide',
          message: 'Veuillez sélectionner un fichier au format PDF.'
        });
        setShowAlert(true);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setAlertConfig({
          variant: 'error',
          title: 'Fichier trop volumineux',
          message: 'Le fichier ne doit pas dépasser 5MB.'
        });
        setShowAlert(true);
        return;
      }
      setApplicationData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
      {showAlert && (
        <Alert
          variant={alertConfig.variant}
          title={alertConfig.title}
          message={alertConfig.message}
          onClose={() => setShowAlert(false)}
          autoClose={true}
          duration={5000}
        />
      )}

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recherche et candidature
          </h4>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
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
            Filtrer
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Rechercher une offre..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C9.47183 13.5 10.5955 13.0875 11.4855 12.3855L14.4697 15.3697C14.7626 15.6626 15.2374 15.6626 15.5303 15.3697C15.8232 15.0768 15.8232 14.602 15.5303 14.3091L12.5461 11.3249C13.2481 10.4349 13.6606 9.31117 13.6606 8.08934C13.6606 5.18984 11.3101 2.83934 8.41059 2.83934H8.25V3ZM4.5 8.25C4.5 6.17893 6.17893 4.5 8.25 4.5C10.3211 4.5 12 6.17893 12 8.25C12 10.3211 10.3211 12 8.25 12C6.17893 12 4.5 10.3211 4.5 8.25Z"
              fill=""
            />
          </svg>
        </div>

        {/* Liste des offres */}
        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    {offer.title}
                  </h5>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {offer.company} • {offer.location}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {offer.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {offer.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {offer.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  >
                    {req}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Durée: {offer.duration}</span>
                  <span>Début: {offer.startDate}</span>
                  {offer.salary && <span>Salaire: {offer.salary}</span>}
                </div>
                <Button size="sm" onClick={() => handleApplyClick(offer)}>
                  Postuler
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de confirmation de candidature */}
      <Modal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <button
            onClick={() => setIsApplicationModalOpen(false)}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Confirmer votre candidature
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Vous postulez pour : <span className="font-medium text-blue-600 dark:text-blue-400">{selectedOffer?.title}</span> chez <span className="font-medium">{selectedOffer?.company}</span>
            </p>
          </div>

          <form onSubmit={handleApplicationSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={applicationData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre prénom"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={applicationData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nom"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cv">CV (PDF uniquement) *</Label>
              <div className="mt-1 flex items-center gap-3">
                <label className="cursor-pointer">
                  <span className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Sélectionner un fichier
                  </span>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'cv')}
                    className="hidden"
                    required
                  />
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  {applicationData.cv ? (
                    <>
                      {applicationData.cv.name}
                      <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                    </>
                  ) : (
                    "Aucun fichier sélectionné"
                  )}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Taille maximale : 5MB
              </p>
            </div>

            <div>
              <Label htmlFor="motivationLetter">Lettre de motivation (PDF uniquement) *</Label>
              <div className="mt-1 flex items-center gap-3">
                <label className="cursor-pointer">
                  <span className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Sélectionner un fichier
                  </span>
                  <input
                    id="motivationLetter"
                    name="motivationLetter"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'motivationLetter')}
                    className="hidden"
                    required
                  />
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  {applicationData.motivationLetter ? (
                    <>
                      {applicationData.motivationLetter.name}
                      <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                    </>
                  ) : (
                    "Aucun fichier sélectionné"
                  )}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Taille maximale : 5MB
              </p>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsApplicationModalOpen(false)}
                type="button"
                className="px-6"
              >
                Annuler
              </Button>
              <Button
                size="sm"
                type="submit"
                className="px-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Confirmer la candidature
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de filtrage */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Filtrer les offres
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Affinez votre recherche selon vos critères.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="space-y-6">
              <div>
                <Label>Type d'offre</Label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500"
                >
                  <option value="all">Tous les types</option>
                  <option value="Stage">Stage</option>
                  <option value="Projet">Projet</option>
                  <option value="Alternance">Alternance</option>
                </select>
              </div>
              <div>
                <Label>Localisation</Label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500"
                >
                  <option value="all">Toutes les localisations</option>
                  <option value="Agadir">Agadir</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Tanger">Tanger</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Fermer
              </Button>
              <Button size="sm" onClick={closeModal}>
                Appliquer
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}



