import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import { Alert } from "../../components/ui/alert/Alert";
import { FiSearch, FiFilter, FiX, FiCheck, FiCalendar, FiDollarSign, FiMapPin, FiBriefcase, FiClock, FiUser, FiTrash2, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../../auth/authContext";

interface JobOffer {
  id: string;
  titre: string;
  entreprise: string;
  lieu: string;
  type: string;
  description: string;
  technologies: string;
  responsibilities?: string[];
  benefits?: string[];
  remuneration: number;
  duree: string;
  dateDebut: string;
  createdAt: string;
  contactEmail: string;
  remote: boolean;
}

export default function EntrepriseJobSearchCard() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
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
  const [selectedOfferDetails, setSelectedOfferDetails] = useState<JobOffer | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      // Offres statiques
      const staticOffers: JobOffer[] = [
        {
          id: "1",
          titre: "Développeur Web Full Stack",
          entreprise: "Tech Innovations",
          lieu: "Maroc",
          type: "Stage",
          description: "Nous recherchons un stagiaire pour développer des applications web modernes avec React et Node.js. Vous participerez à toutes les phases du cycle de développement.",
          technologies: "React, Node.js, TypeScript, MongoDB, REST API",
          remuneration: 1200,
          duree: "6 mois",
          dateDebut: "01/09/2024",
          createdAt: "2024-05-15",
          contactEmail: "recrutement@techinnov.com",
          remote: true,
          responsibilities: [
            "Développement de nouvelles fonctionnalités frontend",
            "Création d'API REST avec Node.js",
            "Collaboration avec l'équipe UX/UI",
            "Tests unitaires et d'intégration"
          ],
          benefits: [
            "Télétravail flexible",
            "Bureau moderne en centre-ville",
            "Mentorat technique"
          ]
        },
        {
          id: "2",
          titre: "Développeur Mobile iOS/Android",
          entreprise: "AppCreators",
          lieu: "Maroc",
          type: "Stage",
          description: "Stage en développement d'applications mobiles cross-platform avec Flutter. Idéal pour apprendre les bonnes pratiques du mobile et publier sur les stores.",
          technologies: "Flutter, Dart, Firebase, Git, CI/CD",
          remuneration: 1000,
          duree: "4 mois",
          dateDebut: "15/07/2024",
          createdAt: "2024-04-20",
          contactEmail: "hr@appcreators.fr",
          remote: false,
          responsibilities: [
            "Implémentation d'UI responsive",
            "Intégration avec Firebase",
            "Optimisation des performances",
            "Publication sur App Store/Play Store"
          ]
        },
        {
          id: "3",
          titre: "Assistant Ingénieur IA",
          entreprise: "DataFuture",
          lieu: "Maroc",
          type: "Stage",
          description: "Stage en intelligence artificielle avec mise en œuvre de modèles de machine learning pour le traitement automatique du langage naturel (NLP).",
          technologies: "Python, TensorFlow, PyTorch, NLP, Pandas",
          remuneration: 1500,
          duree: "5 mois",
          dateDebut: "01/10/2024",
          createdAt: "2024-06-01",
          contactEmail: "ia-team@datafuture.ai",
          remote: true,
          responsibilities: [
            "Prétraitement des données textuelles",
            "Entraînement de modèles de classification",
            "Évaluation des performances",
            "Documentation technique"
          ],
          benefits: [
            "Accès à des clusters GPU",
            "Conférences techniques mensuelles",
            "Projets open-source"
          ]
        }
      ];

      console.log("Offres statiques chargées:", staticOffers);
      setOffers(staticOffers);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors du chargement des offres:", error);
    }
  };

  useEffect(() => {
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

  const handleViewDetails = (offer: JobOffer) => {
    setSelectedOfferDetails(offer);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      location: "all",
      remote: "all"
    });
  };

  const handleDelete = async (offer: JobOffer) => {
    try {
      const response = await fetch(`${baseUrl}/api/stages/${offer.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error();
      } else {
        setShowAlert(true);
        setOffers(prev => prev.filter(o => o.id !== offer.id));
      }

    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre:", error);
    }
  };

  const handleEdit = (offer: JobOffer) => {
    // Implémentez la logique d'édition ici
  };

  const splitString = (input: string): string[] => {
    if (!input || input.trim() === '') {
      return [];
    }
    return input
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
      {showAlert && (
        <Alert
          variant="success"
          title="Offre supprimée"
          message="L'offre a été supprimée avec succès."
          onClose={() => setShowAlert(false)}
          autoClose={true}
          duration={9000}
        />
      )}

      <div className="flex flex-col gap-6">
        {/* Barre de recherche et filtres */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
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
          
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <FiFilter className="w-4 h-4" />
            Filtrer
          </button>
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
                              <FiCalendar className="mr-1" /> {offer.dateDebut}
                            </span>
                            {offer.remuneration != 0 && (
                              <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <FiDollarSign className="mr-1" /> {offer.remuneration}MAD/mois
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
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(offer)}
                          className="min-w-[80px] hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:border-blue-600 dark:hover:text-blue-400"
                        >
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(offer)}
                          className="min-w-[80px] hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-600 dark:hover:text-red-400"
                        >
                          <FiTrash2 className="w-4 h-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(offer)}
                        className="min-w-[120px]"
                      >
                        Voir détails
                      </Button>
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
                      <FiCalendar className="mr-1" /> Début : {selectedOfferDetails.dateDebut}
                    </span>
                    {selectedOfferDetails.remuneration != 0 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
                        <FiDollarSign className="mr-1" /> {selectedOfferDetails.remuneration}MAD/mois
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
                            <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.dateDebut}</p>
                          </div>
                        </div>
                        {selectedOfferDetails.remuneration != 0 && (
                          <div className="flex items-center">
                            <FiDollarSign className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rémunération</h6>
                              <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.remuneration}MAD/mois</p>
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
                            <p className="text-gray-800 dark:text-gray-200">{selectedOfferDetails.contactEmail}</p>
                          </div>
                        </div>
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
                  <option value="Paris">Paris</option>
                  <option value="Lyon">Lyon</option>
                  <option value="Toulouse">Toulouse</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Rabat">Rabat</option>
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