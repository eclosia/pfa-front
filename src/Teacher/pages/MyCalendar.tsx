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
    studentGroup?: string;
    description?: string;
  };
}

const TeacherCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [studentGroup, setStudentGroup] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const studentGroups = [
    "Groupe A", 
    "Groupe B", 
    "Groupe C", 
    "Tous les groupes"
  ];

  useEffect(() => {
    const initialEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "Soutenance Master Info",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { 
          studentGroup: "Groupe A",
          description: "Soutenance des projets de fin d'études"
        },
      },
      {
        id: "2",
        title: "Réunion de suivi",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { 
          studentGroup: "Groupe B",
          description: "Point d'avancement sur les mémoires"
        },
      },
      {
        id: "3",
        title: "Atelier méthodologie",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: { 
          studentGroup: "Tous les groupes",
          description: "Méthodes de recherche avancées"
        },
      },
    ];
    setEvents(initialEvents);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || event.start?.toISOString().split("T")[0] || "");
    setStudentGroup(event.extendedProps.studentGroup || "");
    setEventDescription(event.extendedProps.description || "");
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (!eventTitle || !eventStartDate) {
      alert("Veuillez remplir au moins le titre et la date de début");
      return;
    }

    const eventData = {
      id: selectedEvent?.id || Date.now().toString(),
      title: eventTitle,
      start: eventStartDate,
      end: eventEndDate || eventStartDate,
      allDay: true,
      extendedProps: { 
        studentGroup,
        description: eventDescription
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

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setStudentGroup("");
    setEventDescription("");
    setSelectedEvent(null);
  };

  const renderEventContent = (eventInfo: any) => {
    const group = eventInfo.event.extendedProps.studentGroup || '';
    
    return (
      <div className="fc-event-main p-1 rounded flex items-center bg-blue-500/10 border border-blue-500/30 text-white">
        <div className="fc-event-title truncate">{eventInfo.event.title}</div>
        {group && <span className="text-xs ml-2 opacity-80">({group})</span>}
      </div>
    );
  };

  return (
    <>
      <PageMeta
        title="Calendrier Enseignant"
        description="Gestion des activités pédagogiques"
      />
      
      <div className="rounded-2xl border border-gray-700 bg-gray-900 text-white">
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
                text: "Ajouter un événement +",
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
            themeSystem="standard"
          />
        </div>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10 bg-gray-800 text-white"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-white text-xl lg:text-2xl">
                {selectedEvent ? "Modifier l'événement" : "Ajouter un événement"}
              </h5>
              <p className="text-sm text-gray-400">
                Gestion des activités pédagogiques
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Titre de l'événement *
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400"
                  placeholder="Nom de l'événement"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Groupe d'étudiants
                </label>
                <select
                  value={studentGroup}
                  onChange={(e) => setStudentGroup(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                >
                  <option value="" className="text-gray-400">Sélectionner un groupe</option>
                  {studentGroups.map(group => (
                    <option key={group} value={group} className="bg-gray-700">{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10 placeholder-gray-400"
                  rows={3}
                  placeholder="Description de l'événement"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Date de début *
                  </label>
                  <input
                    type="date"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-600 bg-gray-700 text-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/10"
                    min={eventStartDate}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                type="button"
                className="px-4 py-2.5 text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                type="button"
                className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {selectedEvent ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TeacherCalendar;