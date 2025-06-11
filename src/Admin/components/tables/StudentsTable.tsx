import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { Alert } from "../../../components/ui/alert/Alert";
import { FiUser, FiMail, FiPhone, FiCalendar, FiLock, FiEdit2, FiTrash2, FiPlus, FiCheck } from "react-icons/fi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import { FiX } from "react-icons/fi";
interface Etudiant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    apogeeNumber: string;
    birthDate: string;
    gender: string;
    field: string;
    studyLevel: string;
    status: string;
}

const initialEtudiant: Etudiant = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    apogeeNumber: '',
    birthDate: '',
    gender: '',
    field: '',
    studyLevel: '',
    status: 'Actif'
};

const tableData: Etudiant[] = [
    {
        id: 1,
        firstName: "Mohamed-Sadik",
        lastName: "DERBI",
        email: "mohamed@example.com",
        password: "password123",
        phone: "0612345678",
        apogeeNumber: "2256464",
        birthDate: "2000-01-01",
        gender: "male",
        field: "GINF",
        studyLevel: "3",
        status: "Actif"
    },
    {
        id: 2,
        firstName: "Rida",
        lastName: "Mihi",
        email: "ridamihi12@example.com",
        password: "password123",
        phone: "0623456789",
        apogeeNumber: "2256468",
        birthDate: "2001-05-15",
        gender: "male",
        field: "IA",
        studyLevel: "2",
        status: "Actif"
    },
    {
        id: 3,
        firstName: "Sanae",
        lastName: "ELmahi",
        email: "sanae@example.com",
        password: "password123",
        phone: "0634567890",
        apogeeNumber: "2256346",
        birthDate: "1999-11-20",
        gender: "male",
        field: "ROC",
        studyLevel: "4",
        status: "Inactif"
    }
];

export default function StudentsTable() {
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

    const [currentEtudiant, setCurrentEtudiant] = useState<Etudiant>(initialEtudiant);
    const [etudiants, setEtudiants] = useState<Etudiant[]>(tableData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentEtudiant(prev => ({ ...prev, [name]: value }));
    };

    const handleAddEtudiant = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Math.max(...etudiants.map(e => e.id), 0) + 1;
        const newEtudiant = { ...currentEtudiant, id: newId };
        setEtudiants([...etudiants, newEtudiant]);
        setCurrentEtudiant(initialEtudiant);

        setAlertConfig({
            variant: 'success',
            title: 'Étudiant ajouté',
            message: 'L\'étudiant a été ajouté avec succès.'
        });
        setShowAlert(true);

        closeAddModal();
    };

    const handleUpdateEtudiant = (e: React.FormEvent) => {
        e.preventDefault();
        setEtudiants(etudiants.map(e => e.id === currentEtudiant.id ? currentEtudiant : e));
        setCurrentEtudiant(initialEtudiant);

        setAlertConfig({
            variant: 'success',
            title: 'Modification réussie',
            message: 'Les informations de l\'étudiant ont été mises à jour.'
        });
        setShowAlert(true);

        closeEditModal();
    };

    const handleDeleteEtudiant = (id: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
            setEtudiants(etudiants.filter(e => e.id !== id));

            setAlertConfig({
                variant: 'success',
                title: 'Étudiant supprimé',
                message: 'L\'étudiant a été supprimé avec succès.'
            });
            setShowAlert(true);
        }
    };

    const handleEditClick = (etudiant: Etudiant) => {
        setCurrentEtudiant(etudiant);
        openEditModal();
    };

    const handleAddClick = () => {
        setCurrentEtudiant(initialEtudiant);
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
                    <h2 className="text-2xl font-semibold mb-4 text-white">Ajouter un étudiant</h2>
                    <form onSubmit={handleAddEtudiant} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">Prénom</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={currentEtudiant.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Prénom de l'étudiant"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Nom</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={currentEtudiant.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Nom de l'étudiant"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={currentEtudiant.email}
                                    onChange={handleInputChange}
                                    placeholder="email@exemple.com"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={currentEtudiant.phone}
                                    onChange={handleInputChange}
                                    placeholder="06 12 34 56 78"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="apogeeNumber">Numéro Apogée</Label>
                                <Input
                                    id="apogeeNumber"
                                    name="apogeeNumber"
                                    value={currentEtudiant.apogeeNumber}
                                    onChange={handleInputChange}
                                    placeholder="2256464"
                                />
                            </div>
                            <div>
                                <Label htmlFor="birthDate">Date de naissance</Label>
                                <Input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={currentEtudiant.birthDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="gender">Genre</Label>
                                <Select
                                    options={[
                                        { value: "", label: "Sélectionner" },
                                        { value: "male", label: "Homme" },
                                        { value: "female", label: "Femme" }
                                    ]}
                                    defaultValue={currentEtudiant.gender}
                                    onChange={(value) => handleInputChange({ target: { name: 'gender', value } } as any)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="field">Filière</Label>
                                <Select
                                    options={[
                                        { value: "", label: "Sélectionner" },
                                        { value: "GINF", label: "Génie Informatique" },
                                        { value: "IA", label: "Intelligence Artificielle" },
                                        { value: "ROC", label: "Réseaux et Communications" }
                                    ]}
                                    defaultValue={currentEtudiant.field}
                                    onChange={(value) => handleInputChange({ target: { name: 'field', value } } as any)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="studyLevel">Niveau d'études</Label>
                                <Select
                                    options={[
                                        { value: "", label: "Sélectionner" },
                                        { value: "1", label: "1ère année" },
                                        { value: "2", label: "2ème année" },
                                        { value: "3", label: "3ème année" },
                                        { value: "4", label: "4ème année" },
                                        { value: "5", label: "5ème année" }
                                    ]}
                                    defaultValue={currentEtudiant.studyLevel}
                                    onChange={(value) => handleInputChange({ target: { name: 'studyLevel', value } } as any)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Statut</Label>
                                <Select
                                    options={[
                                        { value: "Actif", label: "Actif" },
                                        { value: "Inactif", label: "Inactif" }
                                    ]}
                                    defaultValue={currentEtudiant.status}
                                    onChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={closeAddModal}>
                                Annuler
                            </Button>
                            <Button onClick={() => handleAddEtudiant({ preventDefault: () => { } } as any)}>
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
                    <h2 className="text-2xl font-semibold mb-4 text-white">Modifier l'étudiant</h2>

                    <form onSubmit={handleUpdateEtudiant} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">Prénom</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={currentEtudiant.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Prénom de l'étudiant"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Nom</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={currentEtudiant.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Nom de l'étudiant"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={currentEtudiant.email}
                                    onChange={handleInputChange}
                                    placeholder="email@exemple.com"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={currentEtudiant.phone}
                                    onChange={handleInputChange}
                                    placeholder="06 12 34 56 78"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="apogeeNumber">Numéro Apogée</Label>
                                <Input
                                    id="apogeeNumber"
                                    name="apogeeNumber"
                                    value={currentEtudiant.apogeeNumber}
                                    onChange={handleInputChange}
                                    placeholder="2256464"
                                />
                            </div>
                            <div>
                                <Label htmlFor="birthDate">Date de naissance</Label>
                                <Input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={currentEtudiant.birthDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="gender">Genre</Label>
                                <Select
                                    options={[
                                        { value: "", label: "Sélectionner" },
                                        { value: "male", label: "Homme" },
                                        { value: "female", label: "Femme" }
                                    ]}
                                    defaultValue={currentEtudiant.gender}
                                    onChange={(value) => handleInputChange({ target: { name: 'gender', value } } as any)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="field">Filière</Label>
                                <Select
                                    options={[
                                        { value: "", label: "Sélectionner" },
                                        { value: "GINF", label: "Génie Informatique" },
                                        { value: "IA", label: "Intelligence Artificielle" },
                                        { value: "ROC", label: "Réseaux et Communications" }
                                    ]}
                                    defaultValue={currentEtudiant.field}
                                    onChange={(value) => handleInputChange({ target: { name: 'field', value } } as any)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="studyLevel">Niveau d'études</Label>
                                <Select
                                    options={[
                                        { value: "", label: "Sélectionner" },
                                        { value: "1", label: "1ère année" },
                                        { value: "2", label: "2ème année" },
                                        { value: "3", label: "3ème année" },
                                        { value: "4", label: "4ème année" },
                                        { value: "5", label: "5ème année" }
                                    ]}
                                    defaultValue={currentEtudiant.studyLevel}
                                    onChange={(value) => handleInputChange({ target: { name: 'studyLevel', value } } as any)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Statut</Label>
                                <Select
                                    options={[
                                        { value: "Actif", label: "Actif" },
                                        { value: "Inactif", label: "Inactif" }
                                    ]}
                                    defaultValue={currentEtudiant.status}
                                    onChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={closeEditModal}>
                                Annuler
                            </Button>
                            <Button onClick={() => handleUpdateEtudiant({ preventDefault: () => { } } as any)}>
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
                                    Étudiant
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Numéro Apogée
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Filière
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Niveau
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Statut
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {etudiants.map((etudiant) => (
                                <TableRow key={etudiant.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <FiUser className="text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {etudiant.lastName} {etudiant.firstName}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {etudiant.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {etudiant.apogeeNumber}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {etudiant.field}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {etudiant.studyLevel}ère année
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge variant="light" color={etudiant.status === "Actif" ? "success" : "error"}>
                                            {etudiant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<FiEdit2 className="size-5" />}
                                                onClick={() => handleEditClick(etudiant)}
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<FiX className="size-5" />}

                                            >
                                                Désactivé
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<FiTrash2 className="size-5" />}
                                                onClick={() => handleDeleteEtudiant(etudiant.id)}
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