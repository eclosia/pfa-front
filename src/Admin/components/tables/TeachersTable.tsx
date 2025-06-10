import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { Alert } from "../../../components/ui/alert/Alert";
import { FiUser, FiMail, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import { FiX } from "react-icons/fi";
interface Teacher {
    id: number;
    fullName: string;
    email: string;
    department: string;
    grade: string;
    specialities: string;
    avatar: string;
    status: string;
}

const initialTeacher: Teacher = {
    id: 0,
    fullName: '',
    email: '',
    department: '',
    grade: '',
    specialities: '',
    avatar: '',
    status: 'Actif'
};

const tableData: Teacher[] = [
    {
        id: 1,
        fullName: "Mme. Fatima Zahra",
        email: "youssef.amrani@univ.edu",
        department: "Informatique / GINF",
        grade: "Maître Assistant",
        specialities: "IA, Machine Learning, Sécurité Informatique",
        avatar: "",
        status: "Actif"
    },
    {
        id: 2,
        fullName: "M. Karim Bennani",
        email: "fatima.zahra@univ.edu",
        department: "Informatique / IA",
        grade: "Professeur",
        specialities: "Deep Learning, Vision par Ordinateur",
        avatar: "",
        status: "Actif"
    },
    {
        id: 3,
        fullName: "M. Karim Benali",
        email: "karim.benali@univ.edu",
        department: "Informatique / ROC",
        grade: "Maître de Conférences",
        specialities: "Réseaux, Cloud Computing",
        avatar: "",
        status: "Inactif"
    }
];

export default function TeachersTable() {
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

    const [currentTeacher, setCurrentTeacher] = useState<Teacher>(initialTeacher);
    const [teachers, setTeachers] = useState<Teacher[]>(tableData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentTeacher(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Math.max(...teachers.map(t => t.id), 0) + 1;
        const newTeacher = { ...currentTeacher, id: newId };
        setTeachers([...teachers, newTeacher]);
        setCurrentTeacher(initialTeacher);

        setAlertConfig({
            variant: 'success',
            title: 'Professeur ajouté',
            message: 'Le professeur a été ajouté avec succès.'
        });
        setShowAlert(true);

        closeAddModal();
    };

    const handleUpdateTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        setTeachers(teachers.map(t => t.id === currentTeacher.id ? currentTeacher : t));
        setCurrentTeacher(initialTeacher);

        setAlertConfig({
            variant: 'success',
            title: 'Modification réussie',
            message: 'Les informations du professeur ont été mises à jour.'
        });
        setShowAlert(true);

        closeEditModal();
    };

    const handleDeleteTeacher = (id: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
            setTeachers(teachers.filter(t => t.id !== id));

            setAlertConfig({
                variant: 'success',
                title: 'Professeur supprimé',
                message: 'Le professeur a été supprimé avec succès.'
            });
            setShowAlert(true);
        }
    };

    const handleEditClick = (teacher: Teacher) => {
        setCurrentTeacher(teacher);
        openEditModal();
    };

    const handleAddClick = () => {
        setCurrentTeacher(initialTeacher);
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
                    <h2 className="text-2xl font-semibold mb-4 text-white">Ajouter un professeur</h2>
                    <form onSubmit={handleAddTeacher} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={currentTeacher.fullName}
                                onChange={handleInputChange}
                                placeholder="Ex: M. Youssef Amrani"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={currentTeacher.email}
                                onChange={handleInputChange}
                                placeholder="exemple@univ.edu"
                            />
                        </div>

                        <div>
                            <Label htmlFor="department">Département</Label>
                            <Input
                                id="department"
                                name="department"
                                value={currentTeacher.department}
                                onChange={handleInputChange}
                                placeholder="Ex: Informatique / GINF"
                            />
                        </div>

                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Select
                                options={[
                                    { value: "", label: "Sélectionner" },
                                    { value: "Professeur", label: "Professeur" },
                                    { value: "Maître de Conférences", label: "Maître de Conférences" },
                                    { value: "Maître Assistant", label: "Maître Assistant" }
                                ]}
                                defaultValue={currentTeacher.grade}
                                onChange={(value) => handleInputChange({ target: { name: 'grade', value } } as any)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="specialities">Spécialités</Label>
                            <Input
                                id="specialities"
                                name="specialities"
                                value={currentTeacher.specialities}
                                onChange={handleInputChange}
                                placeholder="Ex: IA, Machine Learning, Sécurité Informatique"
                            />
                        </div>

                        <div>
                            <Label htmlFor="status">Statut</Label>
                            <Select
                                options={[
                                    { value: "Actif", label: "Actif" },
                                    { value: "Inactif", label: "Inactif" }
                                ]}
                                defaultValue={currentTeacher.status}
                                onChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={closeAddModal}>
                                Annuler
                            </Button>
                            <Button onClick={() => handleAddTeacher({ preventDefault: () => { } } as any)}>
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
                    <h2 className="text-2xl font-semibold mb-4 text-white">Modifier le professeur</h2>
                    <form onSubmit={handleUpdateTeacher} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={currentTeacher.fullName}
                                onChange={handleInputChange}
                                placeholder="Ex: M. Youssef Amrani"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={currentTeacher.email}
                                onChange={handleInputChange}
                                placeholder="exemple@univ.edu"
                            />
                        </div>

                        <div>
                            <Label htmlFor="department">Département</Label>
                            <Input
                                id="department"
                                name="department"
                                value={currentTeacher.department}
                                onChange={handleInputChange}
                                placeholder="Ex: Informatique / GINF"
                            />
                        </div>

                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Select
                                options={[
                                    { value: "", label: "Sélectionner" },
                                    { value: "Professeur", label: "Professeur" },
                                    { value: "Maître de Conférences", label: "Maître de Conférences" },
                                    { value: "Maître Assistant", label: "Maître Assistant" }
                                ]}
                                defaultValue={currentTeacher.grade}
                                onChange={(value) => handleInputChange({ target: { name: 'grade', value } } as any)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="specialities">Spécialités</Label>
                            <Input
                                id="specialities"
                                name="specialities"
                                value={currentTeacher.specialities}
                                onChange={handleInputChange}
                                placeholder="Ex: IA, Machine Learning, Sécurité Informatique"
                            />
                        </div>

                        <div>
                            <Label htmlFor="status">Statut</Label>
                            <Select
                                options={[
                                    { value: "Actif", label: "Actif" },
                                    { value: "Inactif", label: "Inactif" }
                                ]}
                                defaultValue={currentTeacher.status}
                                onChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={closeEditModal}>
                                Annuler
                            </Button>
                            <Button onClick={() => handleUpdateTeacher({ preventDefault: () => { } } as any)}>
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
                                    Professeur
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Grade
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
                            {teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <FiUser className="text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {teacher.fullName}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {teacher.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {teacher.grade}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge variant="light" color={teacher.status === "Actif" ? "success" : "error"}>
                                            {teacher.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<FiEdit2 className="size-5" />}
                                                onClick={() => handleEditClick(teacher)}
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
                                                onClick={() => handleDeleteTeacher(teacher.id)}
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
