import { useState, useEffect } from "react";
import { FiCheck, FiX, FiEye, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

interface OffreStage {
    id: number;
    societe: string;
    secteurActivite: string;
    ville: string;
    intitule: string;
    description: string;
    statut: "en_attente" | "valide";
    contact: string;
    datePublication: string;
}

const initialOffre: OffreStage = {
    id: 0,
    societe: '',
    secteurActivite: '',
    ville: '',
    intitule: '',
    description: '',
    statut: 'en_attente',
    contact: '',
    datePublication: new Date().toISOString().split('T')[0]
};

export default function Stages() {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        variant: 'success',
        title: '',
        message: ''
    });
    const [currentOffre, setCurrentOffre] = useState<OffreStage>(initialOffre);
    const [offres, setOffres] = useState<OffreStage[]>([]);
    const [filteredOffres, setFilteredOffres] = useState<OffreStage[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Simulation de chargement des données
        setTimeout(() => {
            const mockOffres = [
                {
                    id: 1,
                    societe: "Tech Innovations",
                    secteurActivite: "Développement Logiciel",
                    ville: "Casablanca",
                    intitule: "Développeur FullStack",
                    description: "Développement d'applications web et mobiles avec React et Node.js",
                    statut: "en_attente",
                    contact: "contact@tech-innov.ma",
                    datePublication: "2024-05-15"
                },
                {
                    id: 2,
                    societe: "Digital Solutions",
                    secteurActivite: "Data Science",
                    ville: "Rabat",
                    intitule: "Data Analyst",
                    description: "Analyse de données et création de tableaux de bord",
                    statut: "valide",
                    contact: "hr@digitalsolutions.ma",
                    datePublication: "2024-06-01"
                },
                {
                    id: 3,
                    societe: "Web Services",
                    secteurActivite: "Services Cloud",
                    ville: "Marrakech",
                    intitule: "Ingénieur DevOps",
                    description: "Gestion de l'infrastructure cloud et automatisation des déploiements",
                    statut: "valide",
                    contact: "careers@webservices.ma",
                    datePublication: "2024-05-20"
                },
                {
                    id: 4,
                    societe: "AI Labs",
                    secteurActivite: "Intelligence Artificielle",
                    ville: "Tanger",
                    intitule: "Spécialiste Machine Learning",
                    description: "Développement de modèles d'apprentissage automatique",
                    statut: "en_attente",
                    contact: "jobs@ailabs.ma",
                    datePublication: "2024-06-10"
                },
                {
                    id: 5,
                    societe: "CyberSec",
                    secteurActivite: "Sécurité Informatique",
                    ville: "Casablanca",
                    intitule: "Analyste Sécurité",
                    description: "Audit et renforcement de la sécurité des systèmes",
                    statut: "valide",
                    contact: "security@cybersec.ma",
                    datePublication: "2024-05-25"
                }
            ];
            setOffres(mockOffres);
            setFilteredOffres(mockOffres);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = offres.filter(offre =>
            offre.intitule.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOffres(filtered);
    }, [searchTerm, offres]);

    const validerOffre = (id: number) => {
        const updatedOffres = offres.map(offre => 
            offre.id === id ? { ...offre, statut: "valide" } : offre
        );
        setOffres(updatedOffres);
        showNotification('success', 'Offre validée', 'L\'offre a été publiée avec succès');
    };

    const supprimerOffre = (id: number) => {
        const updatedOffres = offres.filter(offre => offre.id !== id);
        setOffres(updatedOffres);
        showNotification('success', 'Offre supprimée', 'L\'offre a été supprimée avec succès');
        setIsDetailModalOpen(false);
    };

    const showNotification = (variant: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
        setAlertConfig({ variant, title, message });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    };

    const handleViewDetails = (offre: OffreStage) => {
        setCurrentOffre(offre);
        setIsDetailModalOpen(true);
    };

    const openDetailModal = () => setIsDetailModalOpen(true);
    const closeDetailModal = () => setIsDetailModalOpen(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            {showAlert && (
                <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
                    alertConfig.variant === 'success' ? 'bg-green-100 text-green-800' :
                    alertConfig.variant === 'error' ? 'bg-red-100 text-red-800' :
                    alertConfig.variant === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                    <div className="font-bold">{alertConfig.title}</div>
                    <div>{alertConfig.message}</div>
                </div>
            )}

            {/* Modal de détails */}
            {isDetailModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{currentOffre.intitule}</h2>
                                <button 
                                    onClick={closeDetailModal}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <FiX className="h-6 w-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Société :</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{currentOffre.societe}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Secteur d'activité :</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{currentOffre.secteurActivite}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Ville :</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{currentOffre.ville}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Date de publication :</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{currentOffre.datePublication}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Description :</h3>
                                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        {currentOffre.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Contact :</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{currentOffre.contact}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Statut :</h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                        currentOffre.statut === "valide" 
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" 
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                    }`}>
                                        {currentOffre.statut === "valide" ? "Validée" : "En attente"}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6">
                                {currentOffre.statut !== "valide" && (
                                    <button
                                        onClick={() => validerOffre(currentOffre.id)}
                                        className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                                            currentOffre.statut === "valide"
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                        disabled={currentOffre.statut === "valide"}
                                    >
                                        <FiCheck className="size-5" />
                                        Valider l'offre
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
                                            supprimerOffre(currentOffre.id);
                                        }
                                    }}
                                    className="px-4 py-2 rounded-md flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <FiTrash2 className="size-5" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-100 dark:border-white/[0.05] gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gestion des offres de stage</h2>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Filtrer par intitulé..."
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                     
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <table className="w-full">
                        <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                            <tr>
                                <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                                    Société
                                </th>
                                <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                                    Secteur
                                </th>
                                <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                                    Ville
                                </th>
                                <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                                    Intitulé
                                </th>
                                <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                                    Statut
                                </th>
                                <th className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredOffres.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {searchTerm ? "Aucune offre ne correspond à votre recherche" : "Aucune offre de stage disponible"}
                                    </td>
                                </tr>
                            ) : (
                                filteredOffres.map((offre) => (
                                    <tr key={offre.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                                            {offre.societe}
                                        </td>
                                        <td className="px-5 py-4 text-start text-gray-600 dark:text-gray-400">
                                            {offre.secteurActivite}
                                        </td>
                                        <td className="px-5 py-4 text-start text-gray-600 dark:text-gray-400">
                                            {offre.ville}
                                        </td>
                                        <td className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                                            {offre.intitule}
                                        </td>
                                        <td className="px-5 py-4 text-start">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                                                offre.statut === "valide" 
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" 
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                            }`}>
                                                {offre.statut === "valide" ? "Validée" : "En attente"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-start">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(offre)}
                                                    className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                                >
                                                    <FiEye className="size-5" />
                                                    <span>Détails</span>
                                                </button>
                                                {offre.statut !== "valide" && (
                                                    <button
                                                        onClick={() => validerOffre(offre.id)}
                                                        className="px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                                                    >
                                                        <FiCheck className="size-5" />
                                                        <span>Valider</span>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setCurrentOffre(offre);
                                                        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
                                                            supprimerOffre(offre.id);
                                                        }
                                                    }}
                                                    className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                                                >
                                                    <FiTrash2 className="size-5" />
                                                    <span>Supprimer</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}