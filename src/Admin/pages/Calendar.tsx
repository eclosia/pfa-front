import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import PageMeta from "../../components/common/PageMeta";

interface CalendarEvent extends EventInput {
  extendedProps: {
    type: string;
    etudiant: string;
    jury: string[];
    salle: string;
    projet: string;
    groupe: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [titre, setTitre] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [typeSoutenance, setTypeSoutenance] = useState("");
  const [nomEtudiant, setNomEtudiant] = useState("");
  const [membresJury, setMembresJury] = useState("");
  const [salle, setSalle] = useState("");
  const [projet, setProjet] = useState("");
  const [groupe, setGroupe] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const typesSoutenance = {
    "Soutenance de stage": "stage",
    "Soutenance de thèse": "these",
    "Soutenance de mémoire": "memoire",
    "Soutenance de projet": "projet"
  };

  const sallesDisponibles = [
    "Amphithéâtre A",
    "Salle B101",
    "Salle C202",
    "Salle de conférence"
  ];

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Soutenance de stage - Dupont",
        start: new Date().toISOString().split("T")[0] + "T10:00:00",
        end: new Date().toISOString().split("T")[0] + "T12:00:00",
        extendedProps: { 
          type: "Soutenance de stage",
          etudiant: "Jean Dupont",
          jury: ["Prof. Martin", "Dr. Leroy"],
          salle: "Amphithéâtre A",
          projet: "Système de gestion académique",
          groupe: "Groupe A"
        },
      },
      {
        id: "2",
        title: "Soutenance de thèse - Durand",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T14:30:00",
        end: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T16:30:00",
        extendedProps: { 
          type: "Soutenance de thèse",
          etudiant: "Marie Durand",
          jury: ["Prof. Martin", "Dr. Leroy", "Prof. Dubois"],
          salle: "Salle B101",
          projet: "Analyse des algorithmes",
          groupe: "Groupe B"
        },
      },
    ]);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setDateDebut(selectInfo.startStr);
    setDateFin(selectInfo.endStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setTitre(event.title);
    setDateDebut(event.start?.toISOString() || "");
    setDateFin(event.end?.toISOString() || "");
    setTypeSoutenance(event.extendedProps.type);
    setNomEtudiant(event.extendedProps.etudiant);
    setMembresJury(event.extendedProps.jury.join(", "));
    setSalle(event.extendedProps.salle);
    setProjet(event.extendedProps.projet);
    setGroupe(event.extendedProps.groupe);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (!titre || !dateDebut || !typeSoutenance || !nomEtudiant || !membresJury || !salle) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const eventData = {
      id: selectedEvent?.id || Date.now().toString(),
      title: titre,
      start: dateDebut,
      end: dateFin || dateDebut,
      extendedProps: { 
        type: typeSoutenance,
        etudiant: nomEtudiant,
        jury: membresJury.split(",").map(m => m.trim()),
        salle,
        projet,
        groupe
      },
    };

    if (selectedEvent) {
      setEvents(events.map(ev => ev.id === selectedEvent.id ? eventData : ev));
    } else {
      setEvents([...events, eventData]);
    }

    closeModal();
    resetModalFields();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(ev => ev.id !== selectedEvent.id));
      closeModal();
      resetModalFields();
    }
  };

  const resetModalFields = () => {
    setTitre("");
    setDateDebut("");
    setDateFin("");
    setTypeSoutenance("");
    setNomEtudiant("");
    setMembresJury("");
    setSalle("");
    setProjet("");
    setGroupe("");
    setSelectedEvent(null);
  };

  const renderEventContent = (eventInfo: any) => {
    const type = eventInfo.event.extendedProps.type.split(" ").pop().toLowerCase();
    return (
      <div className={`fc-event-main p-2 rounded border-l-4 border-${type}-500 bg-${type}-500/10`}>
        <div className="fc-event-title font-medium text-gray-900 dark:text-white">
          {eventInfo.event.title}
        </div>
        <div className="fc-event-time text-xs text-gray-600 dark:text-gray-300">
          {eventInfo.timeText} • {eventInfo.event.extendedProps.salle}
        </div>
      </div>
    );
  };

  return (
    <>
      <PageMeta
        title="Administration des Soutenances"
        description="Interface de gestion des soutenances académiques"
      />
      
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next addEventButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            customButtons={{
              addEventButton: {
                text: "Ajouter une soutenance +",
                click: openModal,
              },
            }}
            locale="fr"
            buttonText={{
              today: "Aujourd'hui",
              month: "Mois",
              week: "Semaine",
              day: "Jour"
            }}
            height="auto"
          />
        </div>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[800px] p-6 lg:p-10 bg-white dark:bg-gray-800"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar max-h-[80vh]">
            <div>
              <h5 className="mb-2 font-semibold text-gray-900 dark:text-white text-xl lg:text-2xl">
                {selectedEvent ? "Modifier la soutenance" : "Planifier une soutenance"}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedEvent ? "Mettez à jour les détails de cette soutenance" : "Renseignez tous les détails pour planifier une nouvelle soutenance"}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Titre de la soutenance *
                  </label>
                  <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Ex: Soutenance PFE - Dupont"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type de soutenance *
                  </label>
                  <select
                    value={typeSoutenance}
                    onChange={(e) => setTypeSoutenance(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                    required
                  >
                    <option value="" className="text-gray-400">Sélectionner un type</option>
                    {Object.keys(typesSoutenance).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom de l'étudiant *
                  </label>
                  <input
                    type="text"
                    value={nomEtudiant}
                    onChange={(e) => setNomEtudiant(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Nom complet de l'étudiant"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Groupe *
                  </label>
                  <input
                    type="text"
                    value={groupe}
                    onChange={(e) => setGroupe(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Groupe de l'étudiant"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Membres du jury (séparés par des virgules) *
                </label>
                <textarea
                  value={membresJury}
                  onChange={(e) => setMembresJury(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400 dark:placeholder-gray-500"
                  rows={2}
                  placeholder="Prof. Martin, Dr. Leroy, Prof. Dubois"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Projet / Thème *
                </label>
                <input
                  type="text"
                  value={projet}
                  onChange={(e) => setProjet(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Titre du projet ou de la thèse"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Salle *
                  </label>
                  <select
                    value={salle}
                    onChange={(e) => setSalle(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                    required
                  >
                    <option value="" className="text-gray-400">Sélectionner une salle</option>
                    {sallesDisponibles.map(salle => (
                      <option key={salle} value={salle}>{salle}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date et heure de début *
                  </label>
                  <input
                    type="datetime-local"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date et heure de fin *
                  </label>
                  <input
                    type="datetime-local"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                    min={dateDebut}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              {selectedEvent && (
                <button
                  onClick={handleDeleteEvent}
                  type="button"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Supprimer
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddOrUpdateEvent}
                  type="button"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {selectedEvent ? "Enregistrer" : "Planifier"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Calendar;