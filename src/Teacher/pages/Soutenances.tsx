import React, { useState, useEffect } from "react";
import { FiCalendar, FiFileText, FiSearch, FiDownload, FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

interface Student {
  id: number;
  name: string;
  email: string;
  project: string;
  progress: number;
  status: "En cours" | "À corriger" | "Prêt pour soutenance";
  lastSubmission?: string;
}

interface Deliverable {
  id: number;
  name: string;
  submissionDate: string;
  status: "Non soumis" | "Soumis" | "Corrigé";
  grade?: number;
  comments?: string;
}

const mockStudents: Student[] = [
  { 
    id: 1, 
    name: "Mohamed Derbi", 
    email: "m.derbi@ensam-casa.ma",
    project: "Optimisation IA", 
    progress: 80, 
    status: "Prêt pour soutenance",
    lastSubmission: "2023-05-15"
  },
  { 
    id: 2, 
    name: "Achraf Abattouy", 
    email: "a.abattouy@ensam-casa.ma",
    project: "Plateforme E-learning", 
    progress: 60, 
    status: "En cours",
    lastSubmission: "2023-05-10"
  },
];

const mockDeliverables: Record<number, Deliverable[]> = {
  1: [
    { id: 1, name: "Rapport initial", submissionDate: "2023-03-15", status: "Corrigé", grade: 16, comments: "Bon travail, quelques corrections nécessaires" },
    { id: 2, name: "Rapport final", submissionDate: "2023-05-15", status: "Soumis" }
  ],
  2: [
    { id: 1, name: "Rapport initial", submissionDate: "2023-03-10", status: "Corrigé", grade: 14, comments: "Structure à améliorer" },
    { id: 2, name: "Rapport final", submissionDate: "", status: "Non soumis" }
  ]
};

type ModalType = "deliverables" | "schedule" | "grade" | null;

export default function Soutenances() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentDeliverable, setCurrentDeliverable] = useState<Deliverable | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [deliverables, setDeliverables] = useState<Record<number, Deliverable[]>>(mockDeliverables);

  // Form states
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [jury, setJury] = useState("");
  const [grade, setGrade] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setDeliverables(mockDeliverables);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.project.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Prêt pour soutenance":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "En cours":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "À corriger":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const openModal = (type: ModalType, student: Student, deliverable?: Deliverable) => {
    setCurrentStudent(student);
    if (deliverable) setCurrentDeliverable(deliverable);
    setModalOpen(type);
  };

  const closeModal = () => {
    setModalOpen(null);
    setCurrentStudent(null);
    setCurrentDeliverable(null);
    setDate("");
    setTime("");
    setRoom("");
    setJury("");
    setGrade("");
    setComments("");
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Soutenance planifiée pour ${currentStudent?.name}\nDate: ${date} ${time}\nSalle: ${room}\nJury: ${jury}`);
    closeModal();
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent || !currentDeliverable) return;

    const updatedDeliverables = { ...deliverables };
    const studentDeliverables = [...updatedDeliverables[currentStudent.id]];
    const deliverableIndex = studentDeliverables.findIndex((d) => d.id === currentDeliverable.id);

    if (deliverableIndex !== -1) {
      studentDeliverables[deliverableIndex] = {
        ...studentDeliverables[deliverableIndex],
        status: "Corrigé",
        grade: Number(grade),
        comments,
      };

      updatedDeliverables[currentStudent.id] = studentDeliverables;
      setDeliverables(updatedDeliverables);

      alert(`Note ${grade}/20 enregistrée pour ${currentDeliverable.name}`);
      closeModal();
    }
  };

  return (
    <div className="p-6 max-w-[90%] mx-auto font-sans min-h-screen bg-transparent">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6">
        {/* Header Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-sm p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestion des Soutenances</h1>
              <p className="text-gray-600 dark:text-gray-300">Suivi des projets et planification des soutenances</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <div className="relative w-full">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher étudiant ou projet..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
              <button
                onClick={() => alert("Export des données")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors px-5 py-2 rounded-lg font-semibold text-white"
              >
                <FiDownload /> Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full bg-white/5 backdrop-blur-lg rounded-xl shadow-sm p-6 border border-white/10 text-center">
              <p className="text-gray-500 dark:text-gray-400 italic">Aucun étudiant trouvé</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div 
                key={student.id} 
                className="bg-white/5 backdrop-blur-lg rounded-xl shadow-sm p-6 border border-white/10 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 gap-4">
                  {/* Student Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-medium">{student.name}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">{student.email}</div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{student.project}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Dernière soumission: {student.lastSubmission || "N/A"}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Progression</span>
                      <span>{student.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        style={{ width: `${student.progress}%` }}
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => openModal("deliverables", student)}
                      title="Voir livrables"
                      className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 rounded-full transition-colors"
                    >
                      <FiFileText />
                    </button>
                    <button
                      onClick={() => openModal("schedule", student)}
                      title="Planifier soutenance"
                      className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-colors"
                    >
                      <FiCalendar />
                    </button>
                    <button
                      onClick={() => openModal("grade", student)}
                      title="Noter livrable"
                      className="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 rounded-full transition-colors"
                    >
                      <FiEdit />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {modalOpen === "deliverables" && currentStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl max-w-2xl w-full p-6 relative shadow-2xl border border-white/20 max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              aria-label="Fermer"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Livrables - {currentStudent.name}</h2>
            <div className="grid grid-cols-1 gap-4">
              {deliverables[currentStudent.id]?.length ? (
                deliverables[currentStudent.id].map((d) => (
                  <div 
                    key={d.id} 
                    className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-white/10 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <div className="font-semibold text-indigo-600 dark:text-indigo-400">{d.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Soumis le: {d.submissionDate || "Non soumis"}</div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          d.status === "Corrigé" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : 
                          d.status === "Soumis" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" : 
                          "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
                        }`}>
                          {d.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        {d.grade !== undefined && (
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">
                            {d.grade}/20
                          </span>
                        )}
                        {d.status !== "Corrigé" && (
                          <button
                            onClick={() => openModal("grade", currentStudent, d)}
                            className="text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 p-1 rounded-full transition-colors"
                            title="Noter ce livrable"
                          >
                            <FiEdit />
                          </button>
                        )}
                      </div>
                    </div>
                    {d.comments && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <p className="font-medium">Commentaires:</p>
                        <p>{d.comments}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Aucun livrable disponible.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {modalOpen === "schedule" && currentStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleScheduleSubmit}
            className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 w-full max-w-md shadow-2xl border border-white/20 relative"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Fermer"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Planifier la soutenance</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">Étudiant : <span className="font-semibold text-gray-800 dark:text-white">{currentStudent.name}</span></p>

            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Heure</span>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Salle</span>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                  placeholder="Ex : Salle A101"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Membres du jury</span>
                <input
                  type="text"
                  value={jury}
                  onChange={(e) => setJury(e.target.value)}
                  required
                  placeholder="Nom1, Nom2, Nom3"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Planifier
              </button>
            </div>
          </form>
        </div>
      )}

      {modalOpen === "grade" && currentStudent && currentDeliverable && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleGradeSubmit}
            className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 w-full max-w-md shadow-2xl border border-white/20 relative"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Fermer"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Noter un livrable</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Étudiant : <span className="font-semibold text-gray-800 dark:text-white">{currentStudent.name}</span>
              <br />
              Livrable : <span className="font-semibold text-gray-800 dark:text-white">{currentDeliverable.name}</span>
            </p>

            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Note (/20)</span>
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Commentaires</span>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Ajouter des commentaires (optionnel)"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                  rows={4}
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Enregistrer la note
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}