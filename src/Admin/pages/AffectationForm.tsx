import React, { useState } from "react";

interface Etudiant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  apogeeNumber: string;
  birthDate: string;
  gender: string;
  field: string;
  studyLevel: string;
}

interface Teacher {
  id: number;
  fullName: string;
  email: string;
  department: string;
  grade: string;
  specialities: string;
}

interface Assignment {
  id: number;
  studentIds: number[];
  teacherId: number;
  subject: string;
}

const generateRandomStudents = (): Etudiant[] => {
  const firstNames = ["Mohamed", "Rida", "Sanae", "Youssef", "Fatima", "Karim", "Nora", "Sami", "Leila", "Hassan"];
  const lastNames = ["DERBI", "MIHI", "ELMAHI", "AMRANI", "BENNANI", "BENALI", "OUHSSAIN", "ZAHRA", "TALEB", "HARIR"];
  const fields = ["GINF", "IA", "ROC", "IRSI"];
  const genders = ["Homme", "Femme"];

  let students: Etudiant[] = [];
  for (let i = 1; i <= 20; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    const phone = `06${Math.floor(10000000 + Math.random() * 89999999)}`;
    const apogeeNumber = (2200000 + i).toString();
    const birthDate = `19${90 + Math.floor(Math.random() * 10)}-${(1 + Math.floor(Math.random() * 12))
      .toString()
      .padStart(2, "0")}-${(1 + Math.floor(Math.random() * 28)).toString().padStart(2, "0")}`;
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const field = fields[Math.floor(Math.random() * fields.length)];
    const studyLevel = (1 + Math.floor(Math.random() * 4)).toString();

    students.push({
      id: i,
      firstName,
      lastName,
      email,
      phone,
      apogeeNumber,
      birthDate,
      gender,
      field,
      studyLevel,
    });
  }
  return students;
};

const teachers: Teacher[] = [
  {
    id: 1,
    fullName: "Mme. Fatima Zahra",
    email: "fatima.zahra@univ.edu",
    department: "Informatique / GINF",
    grade: "Maître Assistant",
    specialities: "IA, Machine Learning, Sécurité Informatique",
  },
  {
    id: 2,
    fullName: "M. Karim Bennani",
    email: "karim.bennani@univ.edu",
    department: "Informatique / IA",
    grade: "Professeur",
    specialities: "Deep Learning, Vision par Ordinateur",
  },
  {
    id: 3,
    fullName: "M. Youssef Amrani",
    email: "youssef.amrani@univ.edu",
    department: "Informatique / ROC",
    grade: "Maître de Conférences",
    specialities: "Réseaux, Cloud Computing",
  },
  {
    id: 4,
    fullName: "Mme. Leila Taleb",
    email: "leila.taleb@univ.edu",
    department: "Informatique / GINF",
    grade: "Professeur",
    specialities: "Génie Logiciel, DevOps",
  },
  {
    id: 5,
    fullName: "M. Hassan Ouhssain",
    email: "hassan.ouhssain@univ.edu",
    department: "Informatique / IRSI",
    grade: "Maître Assistant",
    specialities: "Sécurité Réseaux, Cloud",
  },
];

const subjects = ["Projet IA", "Système Réparti", "Sécurité", "Big Data", "Développement Mobile"];

export default function AffectationForm() {
  const [students] = useState<Etudiant[]>(generateRandomStudents());
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | "">("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const handleStudentSelection = (id: number) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter((sid) => sid !== id));
    } else {
      if (selectedStudentIds.length < 4) {
        setSelectedStudentIds([...selectedStudentIds, id]);
      } else {
        setMessage("Vous ne pouvez sélectionner que jusqu'à 4 étudiants.");
        setSuccess(false);
      }
    }
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentIds.length === 0 || selectedTeacherId === "" || selectedSubject === "") {
      setMessage("Veuillez sélectionner jusqu'à 4 étudiants, un professeur et un sujet.");
      setSuccess(false);
      return;
    }

    if (editingAssignment) {
      // Mise à jour de l'affectation existante
      const updatedAssignments = assignments.map(a => 
        a.id === editingAssignment.id 
          ? { ...a, studentIds: selectedStudentIds, teacherId: selectedTeacherId as number, subject: selectedSubject }
          : a
      );
      setAssignments(updatedAssignments);
      setMessage("Affectation mise à jour avec succès !");
    } else {
      // Création d'une nouvelle affectation
      const newAssignment: Assignment = {
        id: Date.now(),
        studentIds: selectedStudentIds,
        teacherId: selectedTeacherId as number,
        subject: selectedSubject
      };
      setAssignments([...assignments, newAssignment]);
      setMessage("Affectation réussie !");
    }

    setSuccess(true);
    setSelectedStudentIds([]);
    setSelectedTeacherId("");
    setSelectedSubject("");
    setEditingAssignment(null);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setSelectedStudentIds(assignment.studentIds);
    setSelectedTeacherId(assignment.teacherId);
    setSelectedSubject(assignment.subject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
    setMessage("Affectation supprimée avec succès !");
    setSuccess(true);
  };

  const handleCancelEdit = () => {
    setEditingAssignment(null);
    setSelectedStudentIds([]);
    setSelectedTeacherId("");
    setSelectedSubject("");
  };

  const getTeacherById = (id: number) => teachers.find(t => t.id === id);
  const getStudentById = (id: number) => students.find(s => s.id === id);

  return (
    <div className="max-w-6xl mx-auto p-8" style={{ background: 'transparent' }}>
      <div className="rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50">
          <h2 className="text-3xl font-bold mb-8 text-white text-center border-b pb-4 border-gray-700">
            {editingAssignment ? "Modifier une affectation" : "Formulaire d'affectation"}
          </h2>
          
          <form onSubmit={handleAssign} className="space-y-8">
            <div>
              <label className="block font-medium mb-3 text-gray-300">Étudiants (max 4) :</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-800/20 rounded-lg border border-gray-700">
                {students.map((s) => {
                  const isSelected = selectedStudentIds.includes(s.id);
                  const fieldColors: Record<string, string> = {
                    GINF: "bg-purple-700",
                    IA: "bg-blue-700",
                    ROC: "bg-emerald-700",
                    SE: "bg-amber-700",
                    RSI: "bg-red-700"
                  };
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStudentSelection(s.id)}
                      className={`cursor-pointer select-none rounded-lg px-3 py-3 text-sm text-center transition-all duration-200 border
                        ${isSelected ? `${fieldColors[s.field]} text-white border-transparent shadow-lg` 
                         : "bg-gray-700/30 hover:bg-gray-700/50 text-gray-200 border-gray-600"}`}
                    >
                      <span className="font-medium block">{s.firstName} {s.lastName}</span>
                      <span className={`text-xs mt-1 px-2 py-1 rounded-full ${fieldColors[s.field]} text-white`}>
                        {s.field}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {selectedStudentIds.length}/4 étudiants sélectionnés
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="teacher" className="block font-medium mb-3 text-gray-300">
                  Professeur
                </label>
                <select
                  id="teacher"
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 text-gray-200 px-4 py-3 
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800">-- Sélectionner un professeur --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id} className="bg-gray-800">
                      {t.fullName} ({t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block font-medium mb-3 text-gray-300">
                  Sujet
                </label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 text-gray-200 px-4 py-3 
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800">-- Choisir un sujet --</option>
                  {subjects.map((s, i) => (
                    <option key={i} value={s} className="bg-gray-800">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-700 hover:bg-blue-600 transition-all duration-300 rounded-lg py-3 
                  font-semibold text-white shadow-lg hover:shadow-xl active:scale-[0.98] border border-blue-800"
              >
                {editingAssignment ? "Mettre à jour" : "Affecter le groupe"}
              </button>
              
              {editingAssignment && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 transition-all duration-300 rounded-lg py-3 
                    font-semibold text-white shadow-lg hover:shadow-xl active:scale-[0.98] border border-gray-600"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          {message && (
            <div
              className={`mt-6 rounded-lg p-4 text-center font-medium shadow-md transition-all duration-300 ${
                success ? "bg-emerald-800/90 text-emerald-100 border border-emerald-700" 
                       : "bg-red-800/90 text-red-100 border border-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Tableau des affectations */}
        <div className="p-8 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
          <h3 className="text-2xl font-semibold mb-6 text-white text-center border-b pb-3 border-gray-700">
            Liste des affectations
          </h3>
          {assignments.length === 0 ? (
            <p className="italic text-gray-400 text-center py-8">Aucune affectation enregistrée</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-gray-300">
                    <th className="py-4 px-6 text-left font-medium border-b border-gray-700">Professeur</th>
                    <th className="py-4 px-6 text-left font-medium border-b border-gray-700">Sujet</th>
                    <th className="py-4 px-6 text-left font-medium border-b border-gray-700">Étudiants</th>
                    <th className="py-4 px-6 text-center font-medium border-b border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => {
                    const teacher = getTeacherById(assignment.teacherId);
                    return (
                      <tr
                        key={assignment.id}
                        className={assignment.id % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800/30"}
                      >
                        <td className="py-4 px-6 border-b border-gray-700 text-gray-200">
                          {teacher ? (
                            <>
                              <div className="font-medium">{teacher.fullName}</div>
                              <div className="text-sm text-gray-400">{teacher.department}</div>
                            </>
                          ) : "Professeur inconnu"}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-700 text-gray-200 font-medium">
                          {assignment.subject}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-700 text-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {assignment.studentIds.map((id) => {
                              const student = getStudentById(id);
                              if (!student) return null;
                              const fieldColors: Record<string, string> = {
                                GINF: "bg-purple-700/30 text-purple-200 border-purple-600/50",
                                IA: "bg-blue-700/30 text-blue-200 border-blue-600/50",
                                ROC: "bg-emerald-700/30 text-emerald-200 border-emerald-600/50",
                                SE: "bg-amber-700/30 text-amber-200 border-amber-600/50",
                                RSI: "bg-red-700/30 text-red-200 border-red-600/50"
                              };
                              return (
                                <span 
                                  key={id} 
                                  className={`text-sm px-3 py-1 rounded-full border ${fieldColors[student.field]}`}
                                >
                                  {student.firstName} {student.lastName}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-4 px-6 border-b border-gray-700 text-gray-200">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditAssignment(assignment)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm transition"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDeleteAssignment(assignment.id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm transition"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}