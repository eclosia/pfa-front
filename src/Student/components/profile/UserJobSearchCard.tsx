import { useState, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import { Alert } from "../../../components/ui/alert/Alert";
import { FiSearch, FiFilter, FiX, FiCheck, FiUpload, FiCalendar, FiDollarSign, FiMapPin, FiBriefcase, FiClock, FiUser } from "react-icons/fi";
import { useAuth } from "../../../auth/authContext";

interface JobOffer {
    id: number;
    titre: string;
    entreprise: string;
    lieu: string;
    type: string;
    description: string;
    technologies: string;
    responsibilities?: string[];
    benefits?: string[];
    salary?: string;
    duree: string;
    debut: string;
    createdAt: string;
    contact_email: string;
    remote: boolean;
}

interface ApplicationData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cv: File | null;
    motivationLetter: File | null;
}

export default function UserJobSearchCard() {

    const { user } = useAuth();

    const { isOpen, openModal, closeModal } = useModal();

    const [offers, setOffers] = useState<JobOffer[]>([]);

    const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);

    const [filters, setFilters] = useState({
        search: "",
        type: "all",
        location: "all",
        remote: "all"
    });

    const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

    const [selectedOfferDetails, setSelectedOfferDetails] = useState<JobOffer | null>(null);

    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

    const [applicationData, setApplicationData] = useState<ApplicationData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
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

    const [isLoading, setIsLoading] = useState(true);

    const fetchOffers = async () => {
		try {
			const response = await fetch(`http://localhost:8082/api/stages`, {
				method: 'GET',
			});

			if (!response.ok) {
				throw new Error();
			} else {
				const data = await response.json();
				console.log("Offres récupérées:", data);
				setOffers(data);
				setIsLoading(false);
			}

		} catch (error) {
			setIsLoading(false);
			console.error("Erreur lors de la recuperation des offres:", error);
		}
	}

    useEffect(() => {
        
        setIsLoading(true);
        fetchOffers();
    }, []);

    useEffect(() => {
        let filtered = offers;

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(offer =>
                offer.titre.toLowerCase().includes(searchTerm) ||
                offer.entreprise.toLowerCase().includes(searchTerm) ||
                offer.description.toLowerCase().includes(searchTerm) ||
                splitString(offer.technologies).some(req => req.toLowerCase().includes(searchTerm))
            );
        }

        if (filters.type !== "all") {
            filtered = filtered.filter(offer => offer.type === filters.type);
        }

        if (filters.location !== "all") {
            filtered = filtered.filter(offer => offer.lieu === filters.location);
        }

        if (filters.remote !== "all") {
            filtered = filtered.filter(offer =>
                filters.remote === "yes" ? offer.remote : !offer.remote
            );
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

    const handleViewDetails = (offer: JobOffer) => {
        setSelectedOfferDetails(offer);
    };

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8082/api/condidature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "cv_path": "sadik",
                    "motivation_path": "sadik",
                    "etudiant_id": 45, // TODO: replace 45 by user?.id
                    "stage_id": 6 // TODO: replace 6 by selectedOffer?.id
                })
            });
            if (!response.ok) {
                setIsApplicationModalOpen(false);
                setAlertConfig({
                    variant: 'error',
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer plus tard.'
                });
                setShowAlert(true);
                throw new Error('Erreur lors de l\'envoi de la candidature');
            } else {
                setIsApplicationModalOpen(false);
                setAlertConfig({
                    variant: 'success',
                    title: 'Candidature envoyée',
                    message: 'Votre candidature a été envoyée avec succès !'
                });
                setShowAlert(true);
            }
        } catch (error) {
            setAlertConfig({
                variant: 'error',
                title: 'Erreur',
                message: 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer plus tard.'
            });
            setShowAlert(true);
        }
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

    const resetFilters = () => {
        setFilters({
            search: "",
            type: "all",
            location: "all",
            remote: "all"
        });
    };

    const splitString = (input: string): string[] => {

		if (!input || input.trim() === '') {
			return [];
		}

		return input
			.split(',')
			.map(item => item.trim())
			.filter(item => item !== '');

	}

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
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                        Trouvez votre opportunité idéale
                    </h4>
                    <button
                        onClick={openModal}
                        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                        <FiFilter className="w-4 h-4" />
                        Filtrer
                    </button>
                </div>

                {/* Barre de recherche améliorée */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Rechercher par mot-clé, entreprise ou compétence..."
                        className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
                    />
                    {filters.search && (
                        <button
                            onClick={() => setFilters(prev => ({ ...prev, search: "" }))}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <FiX className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Filtres actifs */}
                {(filters.type !== "all" || filters.location !== "all" || filters.remote !== "all") && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500">Filtres :</span>
                        {filters.type !== "all" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                {filters.type}
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, type: "all" }))}
                                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 dark:hover:bg-blue-800"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.location !== "all" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                {filters.location}
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, location: "all" }))}
                                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 dark:hover:bg-green-800"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.remote !== "all" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                {filters.remote === "yes" ? "Télétravail" : "Présentiel"}
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, remote: "all" }))}
                                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600 dark:hover:bg-purple-800"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        <button
                            onClick={resetFilters}
                            className="ml-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}

                {/* Résultats */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="font-medium text-gray-700 dark:text-gray-300">
                            {filteredOffers.length} {filteredOffers.length === 1 ? 'offre trouvée' : 'offres trouvées'}
                        </h5>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>Trier par :</span>
                            <select className="ml-2 bg-transparent border-0 focus:ring-2 focus:ring-blue-200 rounded-md">
                                <option>Pertinence</option>
                                <option>Date de publication</option>
                                <option>Salaire</option>
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
                                    <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-3"></div>
                                    <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-5/6 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-2/3 mb-3"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredOffers.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800 mb-4">
                                <FiBriefcase className="w-10 h-10 text-gray-400" />
                            </div>
                            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Aucune offre ne correspond à vos critères
                            </h5>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Essayez d'élargir votre recherche ou de modifier vos filtres
                            </p>
                            <button
                                onClick={resetFilters}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOffers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:shadow-none"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                                                        {offer.entreprise.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h5 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-1">
                                                        {offer.titre}
                                                    </h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {offer.entreprise} • <FiMapPin className="inline mr-1" />{offer.lieu}
                                                        {offer.remote && <span className="ml-2 text-green-600 dark:text-green-400">(Télétravail possible)</span>}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${offer.type === "Stage" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                                                            offer.type === "Alternance" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" :
                                                                "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                                            }`}>
                                                            {offer.type}
                                                        </span>
                                                        <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                            <FiClock className="mr-1" /> {offer.duree}
                                                        </span>
                                                        <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                            <FiCalendar className="mr-1" /> {offer.debut}
                                                        </span>
                                                        {offer.salary && (
                                                            <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                                <FiDollarSign className="mr-1" /> {offer.salary}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {offer.description}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {splitString(offer.technologies).map((req, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                                    >
                                                        {req}
                                                    </span>
                                                ))}
                                                {splitString(offer.technologies).length > 5 && (
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                                        +{splitString(offer.technologies).length - 5} autres
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">

                                            <Button
                                                size="sm"
                                                onClick={() => handleApplyClick(offer)}
                                                className="min-w-[120px]"
                                            >
                                                Postuler
                                            </Button>
                                            <button
                                                onClick={() => handleViewDetails(offer)}
                                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                Voir détails
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de détails de l'offre */}
            <Modal isOpen={!!selectedOfferDetails} onClose={() => setSelectedOfferDetails(null)} className="max-w-3xl">
                <div className="no-scrollbar relative w-full overflow-y-auto rounded-2xl bg-white p-6 dark:bg-gray-900 lg:p-8">
                    <button
                        onClick={() => setSelectedOfferDetails(null)}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
                    >
                        <FiX className="w-5 h-5" />
                    </button>

                    <div className="px-2">
                        {selectedOfferDetails && (
                            <>
                                <div className="mb-6">
                                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
                                        {selectedOfferDetails.titre}
                                    </h4>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                                        {selectedOfferDetails.entreprise} • <FiMapPin className="inline mr-1" />
                                        {selectedOfferDetails.lieu}
                                        {selectedOfferDetails.remote && (
                                            <span className="ml-2 text-green-600 dark:text-green-400">(Télétravail possible)</span>
                                        )}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedOfferDetails.type === "Stage" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                                            selectedOfferDetails.type === "Alternance" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" :
                                                "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                            }`}>
                                            {selectedOfferDetails.type}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            <FiClock className="mr-1" /> {selectedOfferDetails.duree}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            <FiCalendar className="mr-1" /> Début : {selectedOfferDetails.debut}
                                        </span>
                                        {selectedOfferDetails.salary && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
                                                <FiDollarSign className="mr-1" /> {selectedOfferDetails.salary}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="col-span-2">
                                        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                                    Description du poste
                                                </h5>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Publié le {new Date(selectedOfferDetails.createdAt).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="prose dark:prose-invert max-w-none">
                                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                    {selectedOfferDetails.description}
                                                </p>
                                            </div>
                                        </div>

                                        {selectedOfferDetails.responsibilities && selectedOfferDetails.responsibilities.length > 0 && (
                                            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                                                    Responsabilités
                                                </h5>
                                                <ul className="space-y-3">
                                                    {selectedOfferDetails.responsibilities.map((resp, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mr-3 flex-shrink-0">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-gray-700 dark:text-gray-300">{resp}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                                                Compétences requises
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {splitString(selectedOfferDetails.technologies).map((req, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                    >
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-1 space-y-6">
                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                                                Détails de l'offre
                                            </h5>
                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <FiBriefcase className="w-5 h-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type de contrat</h6>
                                                        <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.type}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiClock className="w-5 h-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée</h6>
                                                        <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.duree}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiCalendar className="w-5 h-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de début</h6>
                                                        <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.debut}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiClock className="w-5 h-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de publication</h6>
                                                        <p className="text-gray-800 dark:text-gray-200">
                                                            {selectedOfferDetails.createdAt ? new Date(selectedOfferDetails.createdAt).toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            }) : 'Non spécifiée'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedOfferDetails.salary && (
                                                    <div className="flex items-center">
                                                        <FiDollarSign className="w-5 h-5 text-gray-400 mr-3" />
                                                        <div>
                                                            <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salaire</h6>
                                                            <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.salary}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-center">
                                                    <FiMapPin className="w-5 h-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Localisation</h6>
                                                        <p className="text-gray-800 dark:text-gray-200">
                                                            {selectedOfferDetails.lieu}
                                                            {selectedOfferDetails.remote && (
                                                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                                    Télétravail possible
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiUser className="w-5 h-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h6>
                                                        <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.contact_email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <Button
                                                    onClick={() => {
                                                        setSelectedOffer(selectedOfferDetails);
                                                        setSelectedOfferDetails(null);
                                                        setIsApplicationModalOpen(true);
                                                    }}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                                                >
                                                    Postuler maintenant
                                                </Button>
                                            </div>
                                        </div>

                                        {selectedOfferDetails.benefits && selectedOfferDetails.benefits.length > 0 && (
                                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                                                    Avantages
                                                </h5>
                                                <ul className="space-y-3">
                                                    {selectedOfferDetails.benefits.map((benefit, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <FiCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Modal>

            {/* Modal de confirmation de candidature amélioré */}
            <Modal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} className="max-w-2xl">
                <div className="no-scrollbar relative w-full overflow-y-auto rounded-2xl bg-white p-6 dark:bg-gray-900 lg:p-8">
                    <button
                        onClick={() => setIsApplicationModalOpen(false)}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
                    >
                        <FiX className="w-5 h-5" />
                    </button>

                    <div className="px-2">
                        <div className="mb-6">
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
                                Postuler à cette offre
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Vous postulez pour : <span className="font-medium text-blue-600 dark:text-blue-400">{selectedOffer?.titre}</span> chez <span className="font-medium">{selectedOffer?.entreprise}</span>
                            </p>
                        </div>

                        <form onSubmit={handleApplicationSubmit} className="flex flex-col gap-6">
                            <div>
                                <Label htmlFor="cv">CV (PDF uniquement, max 5MB) *</Label>
                                <div className="mt-2">
                                    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center">
                                            <FiUpload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                                                <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF uniquement (MAX. 5MB)
                                            </p>
                                        </div>
                                        <input
                                            id="cv"
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => handleFileChange(e, 'cv')}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                    {applicationData.cv && (
                                        <div className="mt-3 flex items-center justify-between p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <div className="flex items-center">
                                                <FiCheck className="text-green-500 mr-2" />
                                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                                    {applicationData.cv.name}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setApplicationData(prev => ({ ...prev, cv: null }))}
                                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="motivationLetter">Lettre de motivation (PDF uniquement, max 5MB) *</Label>
                                <div className="mt-2">
                                    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center">
                                            <FiUpload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                                                <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF uniquement (MAX. 5MB)
                                            </p>
                                        </div>
                                        <input
                                            id="motivationLetter"
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => handleFileChange(e, 'motivationLetter')}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                    {applicationData.motivationLetter && (
                                        <div className="mt-3 flex items-center justify-between p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <div className="flex items-center">
                                                <FiCheck className="text-green-500 mr-2" />
                                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                                    {applicationData.motivationLetter.name}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setApplicationData(prev => ({ ...prev, motivationLetter: null }))}
                                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsApplicationModalOpen(false)}
                                    className="px-6"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    className="px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"

                                >
                                    <FiCheck className="mr-2" />
                                    Envoyer ma candidature
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* Modal de filtres */}
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl">
                <div className="no-scrollbar relative w-full overflow-y-auto rounded-2xl bg-white p-6 dark:bg-gray-900 lg:p-8">
                    <button
                        onClick={closeModal}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
                    >
                        <FiX className="w-5 h-5" />
                    </button>

                    <div className="px-2">
                        <div className="mb-6">
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
                                Filtrer les offres
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Affinez votre recherche selon vos critères
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="type">Type de contrat</Label>
                                <select
                                    id="type"
                                    name="type"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
                                >
                                    <option value="all">Tous les types</option>
                                    <option value="Stage">Stage</option>
                                    <option value="Alternance">Alternance</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="location">Localisation</Label>
                                <select
                                    id="location"
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
                                >
                                    <option value="all">Toutes les localisations</option>
                                    <option value="Casablanca">Casablanca</option>
                                    <option value="Rabat">Rabat</option>
                                    <option value="Marrakech">Marrakech</option>
                                    <option value="Tanger">Tanger</option>
                                    <option value="Agadir">Agadir</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="remote">Télétravail</Label>
                                <select
                                    id="remote"
                                    name="remote"
                                    value={filters.remote}
                                    onChange={handleFilterChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
                                >
                                    <option value="all">Tous les modes</option>
                                    <option value="yes">Télétravail possible</option>
                                    <option value="no">Présentiel uniquement</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <Button
                                onClick={resetFilters}
                                variant="outline"
                                className="min-w-[120px]"
                            >
                                Réinitialiser
                            </Button>
                            <Button
                                onClick={closeModal}
                                className="min-w-[120px]"
                            >
                                Appliquer
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}