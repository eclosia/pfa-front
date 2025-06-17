import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { Alert } from "../../components/ui/alert/Alert";
import { FiX, FiCheck, FiCalendar, FiMapPin, FiBriefcase, FiUsers, FiClock, FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  niveau_etude: string;
  ecole: string;
}

interface Application {
  id: number;
  etudiant: Student;
  dateCandidature: string;
  statut: string;
}

interface Stage {
  id: number;
  titre: string;
  entreprise: string;
  lieu: string;
  type: string;
  description: string;
  technologies: string;
  remuneration: number;
  duree: string;
  debut: string;
  createdAt: string;
  remote: boolean;
  applications: Application[];
}

interface Meeting {
  title: string;
  description: string;
  date: string;
  time: string;
  studentId: number;
  applicationId: number;
}

export default function EntrepriseJobApplications() {
  const navigate = useNavigate();
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplications, setShowApplications] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [meetingForm, setMeetingForm] = useState<Meeting>({
    title: '',
    description: '',
    date: '',
    time: '',
    studentId: 0,
    applicationId: 0
  });

  const fetchStages = async () => {
    try {
      // Offres statiques avec localisation au Maroc
      const staticStages: Stage[] = [
        {
          id: 1,
          titre: "Développeur Web Full Stack",
          entreprise: "Tech Innovations",
          lieu: "Casablanca, Maroc",
          type: "Stage",
          description: "Nous recherchons un stagiaire pour développer des applications web modernes avec React et Node.js.",
          technologies: "React, Node.js, TypeScript, MongoDB",
          remuneration: 5000,
          duree: "6 mois",
          debut: "01/09/2024",
          createdAt: "2024-05-15",
          remote: true,
          applications: [
            {
              id: 1,
              etudiant: {
                id: 101,
                nom: "Alaoui",
                prenom: "Mehdi",
                email: "mehdi.alaoui@email.com",
                niveau_etude: "4ème année",
                ecole: "ENIAD"
              },
              dateCandidature: "2024-05-20",
              statut: "en_attente"
            },
            {
              id: 2,
              etudiant: {
                id: 102,
                nom: "Benjelloun",
                prenom: "Amina",
                email: "amina.benjelloun@email.com",
                niveau_etude: "3ème année",
                ecole: "ENIAD"
              },
              dateCandidature: "2024-05-18",
              statut: "en_attente"
            },
			{
				id: 3,
				etudiant: {
				  id: 103,
				  nom: "El Filali",
				  prenom: "Karim",
				  email: "karim.elfilali@email.com",
				  niveau_etude: "5ème année",
				  ecole: "ENIAD"
				},
				dateCandidature: "2024-05-22",
				statut: "accepte"
			  }
          ]
        },
        {
          id: 2,
          titre: "Développeur Mobile iOS/Android",
          entreprise: "AppCreators",
          lieu: "Rabat, Maroc",
          type: "Stage",
          description: "Stage en développement d'applications mobiles cross-platform avec Flutter.",
          technologies: "Flutter, Dart, Firebase",
          remuneration: 4500,
          duree: "4 mois",
          debut: "15/07/2024",
          createdAt: "2024-04-20",
          remote: false,
          applications: [
            {
              id: 3,
              etudiant: {
                id: 103,
                nom: "El Mansouri",
                prenom: "Youssef",
                email: "youssef.elmansouri@email.com",
                niveau_etude: "Master 1",
                ecole: "ENSIAS"
              },
              dateCandidature: "2024-05-15",
              statut: "accepte"
            }
          ]
        },
        {
          id: 3,
          titre: "Assistant Ingénieur IA",
          entreprise: "DataFuture",
          lieu: "Marrakech, Maroc",
          type: "Stage",
          description: "Stage en intelligence artificielle avec mise en œuvre de modèles de machine learning.",
          technologies: "Python, TensorFlow, PyTorch, NLP",
          remuneration: 6000,
          duree: "5 mois",
          debut: "01/10/2024",
          createdAt: "2024-06-01",
          remote: true,
          applications: []
        }
      ];

      setStages(staticStages);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors de la récupération des offres:", error);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const handleViewApplications = (stage: Stage) => {
    setSelectedStage(stage);
    setShowApplications(true);
  };

  const handleViewStudentProfile = (studentId: number) => {
    navigate(`/student/StudentProfile`);
  };

  const handleAcceptApplication = (applicationId: number) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        applications: stage.applications.map(app => 
          app.id === applicationId ? { ...app, statut: "accepte" } : app
        )
      }))
    );
    setAlertConfig({
      variant: 'success',
      title: 'Candidature acceptée',
      message: 'La candidature a été acceptée avec succès.'
    });
    setShowAlert(true);
  };

  const handleRejectApplication = (applicationId: number) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        applications: stage.applications.map(app => 
          app.id === applicationId ? { ...app, statut: "refuse" } : app
        )
      }))
    );
    setAlertConfig({
      variant: 'success',
      title: 'Candidature refusée',
      message: 'La candidature a été refusée avec succès.'
    });
    setShowAlert(true);
  };

  const handleScheduleMeeting = (application: Application) => {
    setCurrentApplication(application);
    setMeetingForm({
      title: `Réunion pour le stage ${selectedStage?.titre}`,
      description: '',
      date: '',
      time: '',
      studentId: application.etudiant.id,
      applicationId: application.id
    });
    setShowMeetingModal(true);
  };

  const handleMeetingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitMeeting = () => {
    // Ici vous pouvez ajouter la logique pour envoyer l'invitation de réunion
    console.log('Meeting scheduled:', meetingForm);
    
    setAlertConfig({
      variant: 'success',
      title: 'Réunion planifiée',
      message: `Une invitation de réunion a été envoyée à ${currentApplication?.etudiant.prenom} ${currentApplication?.etudiant.nom}`
    });
    setShowAlert(true);
    setShowMeetingModal(false);
  };

  const [alertConfig, setAlertConfig] = useState<{
    variant: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>({
    variant: 'success',
    title: '',
    message: ''
  });

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
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

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-6">Mes Offres de Stage</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
                  <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Titre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Localisation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Candidatures
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {stages.map((stage) => (
                    <tr key={stage.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{stage.titre}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{stage.entreprise}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${stage.type === "Stage" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"}`}>
                          {stage.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiMapPin className="mr-1 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{stage.lieu}</span>
                        </div>
                        {stage.remote && (
                          <div className="text-xs text-green-600 dark:text-green-400">Télétravail possible</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {stage.applications.length} candidature(s)
                        </div>
                        {stage.applications.length > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {stage.applications.filter(a => a.statut === 'accepte').length} acceptée(s)
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          size="sm"
                          onClick={() => handleViewApplications(stage)}
                          className="mr-2"
                          disabled={stage.applications.length === 0}
                        >
                          <FiUsers className="mr-1" />
                          Voir candidatures
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal pour afficher les candidatures */}
      <Modal 
        isOpen={showApplications} 
        onClose={() => setShowApplications(false)} 
        className="w-full max-w-[1800px] mx-4" 
      >
        <div className="relative w-full bg-white p-6 dark:bg-gray-900 lg:p-8">
          <button
            onClick={() => setShowApplications(false)}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="px-2">
            {selectedStage && (
              <>
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2 w-full">
                    Candidatures pour : {selectedStage.titre}
                  </h4>
                  <div className="flex items-center text-lg text-gray-600 dark:text-gray-400 mb-4">
                    <FiBriefcase className="mr-2" />
                    <span>{selectedStage.entreprise}</span>
                    <span className="mx-2">•</span>
                    <FiMapPin className="mr-2" />
                    <span>{selectedStage.lieu}</span>
                  </div>
                </div>

                {selectedStage.applications.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800 mb-4">
                      <FiBriefcase className="w-10 h-10 text-gray-400" />
                    </div>
                    <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Aucune candidature pour cette offre
                    </h5>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">
                            Étudiant
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[150px]">
                            École
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">
                            Niveau
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[100px]">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">
                            Statut
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[300px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                        {selectedStage.applications.map((application) => (
                          <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <span className="text-gray-600 dark:text-gray-300">
                                    {application.etudiant.prenom.charAt(0)}{application.etudiant.nom.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {application.etudiant.prenom} {application.etudiant.nom}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {application.etudiant.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{application.etudiant.ecole}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{application.etudiant.niveau_etude}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {new Date(application.dateCandidature).toLocaleDateString('fr-FR')}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${application.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  application.statut === 'accepte' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {application.statut === 'en_attente' ? 'En attente' :
                                 application.statut === 'accepte' ? 'Accepté' : 'Refusé'}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewStudentProfile(application.etudiant.id)}
                                  className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:border-blue-600 dark:hover:text-blue-400"
                                >
                                  Profil
                                </Button>
                                {application.statut === 'en_attente' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAcceptApplication(application.id)}
                                      className="hover:bg-green-50 hover:border-green-300 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:border-green-600 dark:hover:text-green-400"
                                    >
                                      <FiCheck className="mr-1" />
                                      Accepter
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRejectApplication(application.id)}
                                      className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-600 dark:hover:text-red-400"
                                    >
                                      <FiX className="mr-1" />
                                      Refuser
                                    </Button>
                                  </>
                                )}
                                {application.statut === 'accepte' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleScheduleMeeting(application)}
                                    className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:border-purple-600 dark:hover:text-purple-400"
                                  >
                                    <FiCalendar className="mr-1" />
                                    Planifier réunion
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal pour planifier une réunion */}
      <Modal 
        isOpen={showMeetingModal} 
        onClose={() => setShowMeetingModal(false)} 
        className="w-full max-w-md mx-4"
      >
        <div className="relative w-full bg-white p-6 dark:bg-gray-900 lg:p-8">
          <button
            onClick={() => setShowMeetingModal(false)}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-2">
              Planifier une réunion
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Avec {currentApplication?.etudiant.prenom} {currentApplication?.etudiant.nom}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={meetingForm.title}
                onChange={handleMeetingFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={meetingForm.description}
                onChange={handleMeetingFormChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={meetingForm.date}
                  onChange={handleMeetingFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Heure
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={meetingForm.time}
                  onChange={handleMeetingFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubmitMeeting}
                className="w-full flex justify-center items-center"
                disabled={!meetingForm.title || !meetingForm.date || !meetingForm.time}
              >
                <FiSend className="mr-2" />
                Envoyer l'invitation
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}