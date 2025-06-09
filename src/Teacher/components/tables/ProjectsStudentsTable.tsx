import { useState } from "react";
import {
  FiCalendar,
  FiPlus,
  FiFile,
  FiEdit,
  FiTrash2
} from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "../../../components/ui/table";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

interface StudentProject {
  id: number;
  student: {
    image: string;
    firstName: string;
    lastName: string;
    apogee: string;
    filiere: string;
  };
  projectTitle: string;
  status: "En cours" | "Validé" | "À corriger";
  progress: number;
  lastMeeting: string | null;
}

const projectsData: StudentProject[] = [
  {
    id: 1,
    student: {
      image: "/images/user/user-16.jpg",
      firstName: "Mohamed-Sadik",
      lastName: "DERBI",
      apogee: "2256464",
      filiere: "GINF"
    },
    projectTitle: "Système de gestion des stages",
    status: "En cours",
    progress: 65,
    lastMeeting: "2024-05-15"
  },
  {
    id: 2,
    student: {
      image: "/images/user/user-18.jpg",
      firstName: "Sanae",
      lastName: "ELMAHI",
      apogee: "2256468",
      filiere: "GINF"
    },
    projectTitle: "Application mobile de suivi académique",
    status: "Validé",
    progress: 100,
    lastMeeting: "2024-06-10"
  },
  {
    id: 3,
    student: {
      image: "/images/user/user-17.jpg",
      firstName: "Achraf",
      lastName: "ABATTOUY",
      apogee: "2256346",
      filiere: "GSTR"
    },
    projectTitle: "Plateforme e-learning intelligente",
    status: "À corriger",
    progress: 45,
    lastMeeting: "2024-05-20"
  },
  {
    id: 4,
    student: {
      image: "/images/user/user-20.jpg",
      firstName: "Rida",
      lastName: "MIHI",
      apogee: "2256350",
      filiere: "GINF"
    },
    projectTitle: "Système de recommandation de stages",
    status: "En cours",
    progress: 80,
    lastMeeting: null
  }
];

export default function ProjectsStudentsTable() {
  const { isOpen: isMeetingModalOpen, openModal: openMeetingModal, closeModal: closeMeetingModal } = useModal();
  const [selectedStudent, setSelectedStudent] = useState<StudentProject | null>(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingMode, setMeetingMode] = useState("En présentiel");
  const [meetingObjective, setMeetingObjective] = useState("");

  const handleScheduleMeeting = (student: StudentProject) => {
    setSelectedStudent(student);
    openMeetingModal();
  };

  const handleSubmitMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Réunion planifiée:", {
      student: selectedStudent,
      date: meetingDate,
      time: meetingTime,
      mode: meetingMode,
      objective: meetingObjective
    });
    closeMeetingModal();
    setMeetingDate("");
    setMeetingTime("");
    setMeetingMode("En présentiel");
    setMeetingObjective("");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex justify-end p-4 gap-2">
        <Button size="sm" startIcon={<FiPlus className="size-5" />}>
          Nouveau Projet
        </Button>
        <Button size="sm" startIcon={<FiFile className="size-5" />}>
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
                  N° Apogée
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Projet
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Avancement
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Dernière réunion
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {projectsData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={project.student.image}
                          alt={`${project.student.firstName} ${project.student.lastName}`}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {project.student.firstName} {project.student.lastName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {project.student.filiere}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {project.student.apogee}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
                    {project.projectTitle}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            project.progress < 50 ? 'bg-red-500' : 
                            project.progress < 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{project.progress}%</span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {project.lastMeeting || "Aucune"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        startIcon={<FiCalendar className="size-5" />}
                        onClick={() => handleScheduleMeeting(project)}
                      >
                        Réunion
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        startIcon={<FiEdit className="size-5" />}
                      >
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        startIcon={<FiTrash2 className="size-5" />}
                        className="text-red-500 border-red-500 hover:bg-red-50"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Meeting Modal */}
          <Modal isOpen={isMeetingModalOpen} onClose={closeMeetingModal} className="max-w-[500px] m-4">
            <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
              <div className="px-2">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  Planifier une réunion
                </h4>
                <p className="text-gray-500 mb-6">
                  {selectedStudent && `${selectedStudent.student.firstName} ${selectedStudent.student.lastName}`}
                </p>
              </div>
              <form onSubmit={handleSubmitMeeting}>
                <div className="space-y-4 px-2 pb-3">
                  <div>
                    <Label>Date de la réunion</Label>
                    <Input 
                      type="date" 
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Heure</Label>
                    <Input 
                      type="time" 
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Mode</Label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      value={meetingMode}
                      onChange={(e) => setMeetingMode(e.target.value)}
                      required
                    >
                      <option value="En présentiel">En présentiel</option>
                      <option value="En ligne (Teams)">En ligne (Teams)</option>
                      <option value="En ligne (Zoom)">En ligne (Zoom)</option>
                    </select>
                  </div>
                  <div>
                    <Label>Objectif de la réunion</Label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      rows={3}
                      placeholder="Décrivez l'objectif de cette réunion..."
                      value={meetingObjective}
                      onChange={(e) => setMeetingObjective(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    type="button"
                    onClick={closeMeetingModal}
                  >
                    Annuler
                  </Button>
                  <Button 
                    size="sm" 
                    type="submit"
                  >
                    Confirmer
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
