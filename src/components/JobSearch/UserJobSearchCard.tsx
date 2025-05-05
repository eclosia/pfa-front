import { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { toast } from "react-hot-toast";

export interface JobOffer {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Stage" | "Projet" | "Alternance";
  description: string;
  requirements: string[];
  duration: string;
  startDate: string;
  salary?: string;
}

export default function UserJobSearchCard() {
  // États pour les modals
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // États pour les données
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
    cv: null as File | null,
  });
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
  });

  // Chargement des offres
  useEffect(() => {
    fetch("/data/job-offers.json")
      .then((response) => response.json())
      .then((data) => {
        setOffers(data);
        setFilteredOffers(data);
      })
      .catch((error) => {
        console.error("Error loading job offers:", error);
        toast.error("Erreur lors du chargement des offres");
      });
  }, []);

  // Filtrage des offres
  useEffect(() => {
    let filtered = offers;
    if (filters.search) {
      filtered = filtered.filter(
        (offer) =>
          offer.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          offer.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          offer.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter((offer) => offer.type === filters.type);
    }
    if (filters.location) {
      filtered = filtered.filter((offer) => offer.location === filters.location);
    }
    setFilteredOffers(filtered);
  }, [filters, offers]);

  // Gestion des filtres
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la candidature
  const handleApply = (offer: JobOffer) => {
    setSelectedOffer(offer);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Veuillez sélectionner un fichier PDF");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error("Le fichier ne doit pas dépasser 5MB");
        return;
      }
      setApplicationForm(prev => ({ ...prev, cv: file }));
    }
  };

  const validateForm = () => {
    if (!applicationForm.name.trim()) {
      toast.error("Veuillez entrer votre nom");
      return false;
    }
    if (!applicationForm.email.trim()) {
      toast.error("Veuillez entrer votre email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationForm.email)) {
      toast.error("Veuillez entrer un email valide");
      return false;
    }
    if (!applicationForm.phone.trim()) {
      toast.error("Veuillez entrer votre numéro de téléphone");
      return false;
    }
    if (!applicationForm.motivation.trim()) {
      toast.error("Veuillez écrire votre lettre de motivation");
      return false;
    }
    if (!applicationForm.cv) {
      toast.error("Veuillez joindre votre CV");
      return false;
    }
    return true;
  };

  const handleSubmitApplication = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simuler un délai de soumission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Ici, vous pouvez ajouter la logique pour envoyer la candidature au serveur
      console.log("Candidature soumise:", { 
        offer: selectedOffer, 
        form: applicationForm 
      });

      toast.success("Votre candidature a été soumise avec succès !");
      setIsApplicationModalOpen(false);
      setApplicationForm({
        name: "",
        email: "",
        phone: "",
        motivation: "",
        cv: null,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Une erreur est survenue lors de la soumission de votre candidature");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* En-tête et filtres */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Offres de stages et projets
        </h4>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Rechercher..."
            className="w-full lg:w-64"
          />
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsFilterModalOpen(true)}
          >
            Filtres avancés
          </Button>
        </div>
      </div>

      {/* Liste des offres */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="p-6 border border-gray-200 rounded-xl dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {offer.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {offer.company} - {offer.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                  {offer.type}
                </span>
                <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-800">
                  {offer.duration}
                </span>
                {offer.salary && (
                  <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full dark:text-green-400 dark:bg-green-900/30">
                    {offer.salary}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {offer.description}
              </p>

              <div>
                <h6 className="mb-2 text-sm font-medium text-gray-800 dark:text-white/90">
                  Compétences requises :
                </h6>
                <div className="flex flex-wrap gap-2">
                  {offer.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-800"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Date de début : {offer.startDate}
                </p>
                <Button 
                  size="sm" 
                  onClick={() => handleApply(offer)}
                >
                  Postuler
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal des filtres */}
      <Modal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Filtres avancés
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Affinez votre recherche en utilisant les filtres ci-dessous.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5">
            <div>
              <Label>Type d'offre</Label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              >
                <option value="">Tous les types</option>
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
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              >
                <option value="">Toutes les localisations</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Tanger">Tanger</option>
                <option value="Agadir">Agadir</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsFilterModalOpen(false)}
            >
              Fermer
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de candidature */}
      <Modal 
        isOpen={isApplicationModalOpen} 
        onClose={() => setIsApplicationModalOpen(false)} 
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Candidature - {selectedOffer?.title}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Complétez le formulaire ci-dessous pour postuler à cette offre.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmitApplication(); }} className="flex flex-col">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
              <div>
                <Label>Nom complet</Label>
                <input
                  type="text"
                  name="name"
                  value={applicationForm.name}
                  onChange={handleApplicationChange}
                  placeholder="Votre nom complet"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                />
              </div>

              <div>
                <Label>Email</Label>
                <input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleApplicationChange}
                  placeholder="Votre email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                />
              </div>

              <div>
                <Label>Téléphone</Label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleApplicationChange}
                  placeholder="Votre numéro de téléphone"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                />
              </div>

              <div className="col-span-2">
                <Label>Lettre de motivation</Label>
                <textarea
                  name="motivation"
                  value={applicationForm.motivation}
                  onChange={handleApplicationChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  rows={4}
                  placeholder="Expliquez pourquoi vous êtes intéressé par ce poste..."
                  required
                />
              </div>

              <div className="col-span-2">
                <Label>CV (PDF)</Label>
                <input
                  type="file"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Format PDF uniquement, taille maximale : 5MB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsApplicationModalOpen(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                size="sm" 
                onClick={handleSubmitApplication}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Soumission en cours..." : "Soumettre ma candidature"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}