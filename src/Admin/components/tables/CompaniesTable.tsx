import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { Alert } from "../../../components/ui/alert/Alert";
import { FiEdit2, FiTrash2, FiPlus, FiHome } from "react-icons/fi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import { FiX } from "react-icons/fi";
interface Company {
  id: string;
  nom: string;
  secteurActivite: string;
  ville: string;
  email: string;
  telephone: string;
}

const initialCompany: Company = {
  id: '',
  nom: '',
  secteurActivite: '',
  ville: '',
  email: '',
  telephone: ''
};

const tableData: Company[] = [
    {
      id: "1",
      nom: "TechNova Solutions",
      secteurActivite: "Informatique",
      ville: "Casablanca",
      email: "contact@technova.ma",
      telephone: "0522123456"
    },
    {
      id: "2",
      nom: "AgroPlus",
      secteurActivite: "Agroalimentaire",
      ville: "Meknès",
      email: "info@agroplus.ma",
      telephone: "0535554321"
    },
    {
      id: "3",
      nom: "GreenEnergy Maroc",
      secteurActivite: "Énergies renouvelables",
      ville: "Ouarzazate",
      email: "contact@greenenergy.ma",
      telephone: "0526112233"
    },
    {
      id: "4",
      nom: "EduSmart",
      secteurActivite: "Éducation",
      ville: "Fès",
      email: "support@edusmart.ma",
      telephone: "0536876543"
    },
    {
      id: "5",
      nom: "Medilab",
      secteurActivite: "Santé",
      ville: "Rabat",
      email: "contact@medilab.ma",
      telephone: "0522897766"
    },
    {
      id: "6",
      nom: "BuildCraft",
      secteurActivite: "Construction",
      ville: "Tanger",
      email: "contact@buildcraft.ma",
      telephone: "0539321987"
    }
  ];
  

export default function CompaniesTable() {
  const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal } = useModal();
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
  
  const [currentCompany, setCurrentCompany] = useState<Company>(initialCompany);
  const [companies, setCompanies] = useState<Company[]>(tableData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (Math.max(...companies.map(c => parseInt(c.id)), 0) + 1).toString();
    const newCompany = { ...currentCompany, id: newId };
    setCompanies([...companies, newCompany]);
    setCurrentCompany(initialCompany);
    
    setAlertConfig({
      variant: 'success',
      title: 'Entreprise ajoutée',
      message: 'L\'entreprise a été ajoutée avec succès.'
    });
    setShowAlert(true);
    
    closeAddModal();
  };

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanies(companies.map(c => c.id === currentCompany.id ? currentCompany : c));
    setCurrentCompany(initialCompany);
    
    setAlertConfig({
      variant: 'success',
      title: 'Modification réussie',
      message: 'Les informations de l\'entreprise ont été mises à jour.'
    });
    setShowAlert(true);
    
    closeEditModal();
  };

  const handleDeleteCompany = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?")) {
      setCompanies(companies.filter(c => c.id !== id));
      
      setAlertConfig({
        variant: 'success',
        title: 'Entreprise supprimée',
        message: 'L\'entreprise a été supprimée avec succès.'
      });
      setShowAlert(true);
    }
  };

  const handleEditClick = (company: Company) => {
    setCurrentCompany(company);
    openEditModal();
  };

  const handleAddClick = () => {
    setCurrentCompany(initialCompany);
    openAddModal();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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

      {/* Modal d'ajout */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        className="max-w-2xl"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Ajouter une entreprise</h2>
          <form onSubmit={handleAddCompany} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom de l'entreprise</Label>
              <Input
                id="nom"
                name="nom"
                value={currentCompany.nom}
                onChange={handleInputChange}
                placeholder="Ex: Maroc Telecom"
              />
            </div>

            <div>
              <Label htmlFor="secteurActivite">Secteur d'activité</Label>
              <Input
                id="secteurActivite"
                name="secteurActivite"
                value={currentCompany.secteurActivite}
                onChange={handleInputChange}
                placeholder="Ex: Télécommunications"
              />
            </div>

            <div>
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                name="ville"
                value={currentCompany.ville}
                onChange={handleInputChange}
                placeholder="Ex: Casablanca"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentCompany.email}
                onChange={handleInputChange}
                placeholder="contact@entreprise.com"
              />
            </div>

            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                value={currentCompany.telephone}
                onChange={handleInputChange}
                placeholder="Ex: 0522000000"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closeAddModal}>
                Annuler
              </Button>
              <Button onClick={() => handleAddCompany({ preventDefault: () => {} } as any)}>
                Ajouter
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de modification */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        className="max-w-2xl"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Modifier l'entreprise</h2>
          <form onSubmit={handleUpdateCompany} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom de l'entreprise</Label>
              <Input
                id="nom"
                name="nom"
                value={currentCompany.nom}
                onChange={handleInputChange}
                placeholder="Ex: Maroc Telecom"
              />
            </div>

            <div>
              <Label htmlFor="secteurActivite">Secteur d'activité</Label>
              <Input
                id="secteurActivite"
                name="secteurActivite"
                value={currentCompany.secteurActivite}
                onChange={handleInputChange}
                placeholder="Ex: Télécommunications"
              />
            </div>

            <div>
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                name="ville"
                value={currentCompany.ville}
                onChange={handleInputChange}
                placeholder="Ex: Casablanca"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentCompany.email}
                onChange={handleInputChange}
                placeholder="contact@entreprise.com"
              />
            </div>

            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                value={currentCompany.telephone}
                onChange={handleInputChange}
                placeholder="Ex: 0522000000"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={closeEditModal}>
                Annuler
              </Button>
              <Button onClick={() => handleUpdateCompany({ preventDefault: () => {} } as any)}>
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="flex justify-end p-4 gap-2">
        <Button size="sm" startIcon={<FiPlus className="size-5" />} onClick={handleAddClick}>
          Ajouter
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px] px-2">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Entreprise
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Secteur d'activité
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Ville
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <FiHome className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {company.nom}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {company.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {company.secteurActivite}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {company.ville}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        startIcon={<FiEdit2 className="size-5" />} 
                        onClick={() => handleEditClick(company)}
                      >
                        Modifier
                      </Button>
                      <Button 
  size="sm" 
  variant="outline" 
  startIcon={<FiX className="size-5" />} 
  onClick={() => handleDeleteCompany(company.id)}
>
  Désactivé
</Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        startIcon={<FiTrash2 className="size-5" />} 
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
