import React, { useState } from 'react';
import { PlusIcon, FileIcon, PencilIcon } from "../../icons";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Textarea from "../../components/form/input/TextArea";

// Nouveau composant Select
const Select = ({ value, onChange, options, className = "", ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default function Evaluations() {
    // Données internes simulées
    const [students, setStudents] = useState([
        {
            id: 1,
            user: {
                image: "/images/user/user-16.jpg",
                name: 'Ali Amine',
                role: 'GINF'
            },
            deliverables: [
                { id: 101, name: 'Rapport Initial', submissionDate: '2025-05-30', status: 'soumis', grade: undefined, comments: '' },
                { id: 102, name: 'Présentation', submissionDate: '2025-06-01', status: 'en attente', grade: undefined, comments: '' }
            ]
        },
        {
            id: 2,
            user: {
                image: "/images/user/user-18.jpg",
                name: 'Kenza Bouzid',
                role: 'GINF'
            },
            deliverables: [
                { id: 201, name: 'Rapport Final', submissionDate: '2025-06-02', status: 'soumis', grade: 17, comments: 'Très bon travail' }
            ]
        }
    ]);

    const [modalData, setModalData] = useState(null);
    const [gradeInput, setGradeInput] = useState('');
    const [commentInput, setCommentInput] = useState('');
    const [statusInput, setStatusInput] = useState('en attente');
    const [error, setError] = useState('');

    const statusOptions = [
        { value: 'en attente', label: 'En attente' },
        { value: 'en progression', label: 'En progression' },
        { value: 'soumis', label: 'Soumis' },
        { value: 'corrigé', label: 'Corrigé' },
        { value: 'validé', label: 'Validé' },
        { value: 'rejeté', label: 'Rejeté' }
    ];

    const openModal = (student, deliverable) => {
        setModalData({ student, deliverable });
        setGradeInput(deliverable.grade !== undefined ? deliverable.grade.toString() : '');
        setCommentInput(deliverable.comments || '');
        setStatusInput(deliverable.status || 'en attente');
        setError('');
    };

    const closeModal = () => {
        setModalData(null);
        setError('');
    };

    const handleSave = () => {
        const gradeNum = parseFloat(gradeInput);
        if (gradeInput !== '' && (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 20)) {
            setError('Veuillez saisir une note valide entre 0 et 20.');
            return;
        }

        // Mettre à jour les données internes
        const updatedStudents = students.map(student => {
            if (student.id === modalData.student.id) {
                return {
                    ...student,
                    deliverables: student.deliverables.map(deliv => {
                        if (deliv.id === modalData.deliverable.id) {
                            return {
                                ...deliv,
                                grade: gradeInput === '' ? undefined : gradeNum,
                                comments: commentInput.trim(),
                                status: statusInput
                            };
                        }
                        return deliv;
                    })
                };
            }
            return student;
        });

        setStudents(updatedStudents);
        closeModal();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleDateString();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            {/* Ajout du titre */}
            <div className="px-6 pt-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Évaluations des Livrables
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Gestion des évaluations et commentaires pour les livrables étudiants
                </p>
            </div>

            <div className="flex justify-between items-center p-4 gap-2">
                <div className="flex-1"></div>
                <Button
                    size="sm"
                    startIcon={<FileIcon className="size-5" />}
                >
                    Exporter
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
                                    Livrable
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Date de soumission
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Statut
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Note
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Commentaire
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {students.map(student =>
                                student.deliverables.map(deliv => (
                                    <TableRow key={`${student.id}-${deliv.id}`}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-full">
                                                    <img
                                                        width={40}
                                                        height={40}
                                                        src={student.user.image}
                                                        alt={student.user.name}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {student.user.name}
                                                    </span>
                                                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                        {student.user.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {deliv.name}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {formatDate(deliv.submissionDate)}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <Badge
                                                variant="light"
                                                color={
                                                    deliv.status === 'soumis' ? 'success' :
                                                    deliv.status === 'en progression' ? 'info' :
                                                    deliv.status === 'corrigé' ? 'primary' :
                                                    deliv.status === 'validé' ? 'success' :
                                                    deliv.status === 'rejeté' ? 'danger' : 'warning'
                                                }
                                            >
                                                {deliv.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 font-bold">
                                            {deliv.grade !== undefined ? deliv.grade : '-'}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {deliv.comments || '-'}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<PencilIcon className="size-5" />}
                                                    onClick={() => openModal(student, deliv)}
                                                >
                                                    Évaluer
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Modal d'évaluation */}
            <Modal isOpen={!!modalData} onClose={closeModal} className="max-w-[500px] m-4">
                <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-6">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Évaluation : {modalData?.student.user.name} - {modalData?.deliverable.name}
                        </h4>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
                            <div className="mt-5">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                                    <div>
                                        <Label>Statut</Label>
                                        <Select
                                            value={statusInput}
                                            onChange={(e) => setStatusInput(e.target.value)}
                                            options={statusOptions}
                                        />
                                    </div>

                                    <div>
                                        <Label>Note (0 à 20)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="20"
                                            step="0.1"
                                            value={gradeInput}
                                            onChange={e => setGradeInput(e.target.value)}
                                            placeholder="Laisser vide si non noté"
                                        />
                                    </div>

                                    <div>
                                        <Label>Commentaires</Label>
                                        <Textarea
                                            value={commentInput}
                                            onChange={e => setCommentInput(e.target.value)}
                                            rows={2}
                                            placeholder="Ajouter un commentaire..."
                                        /> 
                                    </div>

                                    {error && <p className="text-red-600 text-sm">{error}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Annuler
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}