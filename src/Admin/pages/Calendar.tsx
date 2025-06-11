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
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);
    const { isOpen, openModal, closeModal } = useModal();

    const typesSoutenance = {
        "Soutenance de stage": "primary",
        "Soutenance de thèse": "warning",
        "Soutenance de mémoire": "success",
        "Soutenance de projet": "danger"
    };

    useEffect(() => {
        // Initialisation avec des exemples de soutenances
        setEvents([
            {
                id: "1",
                title: "Soutenance de stage - Dupont",
                start: new Date().toISOString().split("T")[0] + "T10:00:00",
                extendedProps: { 
                    type: "Soutenance de stage",
                    etudiant: "Jean Dupont",
                    jury: ["Prof. Martin", "Dr. Leroy"]
                },
            },
            {
                id: "2",
                title: "Soutenance de thèse - Durand",
                start: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T14:30:00",
                extendedProps: { 
                    type: "Soutenance de thèse",
                    etudiant: "Marie Durand",
                    jury: ["Prof. Martin", "Dr. Leroy", "Prof. Dubois"]
                },
            },
        ]);
    }, []);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        resetModalFields();
        setDateDebut(selectInfo.startStr);
        setDateFin(selectInfo.endStr || selectInfo.startStr);
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
        openModal();
    };

    const handleAddOrUpdateEvent = () => {
        if (selectedEvent) {
            // Mise à jour de la soutenance existante
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === selectedEvent.id
                        ? {
                            ...event,
                            title: titre,
                            start: dateDebut,
                            end: dateFin,
                            extendedProps: { 
                                type: typeSoutenance,
                                etudiant: nomEtudiant,
                                jury: membresJury.split(",").map(m => m.trim())
                            },
                        }
                        : event
                )
            );
        } else {
            // Ajout d'une nouvelle soutenance
            const newEvent: CalendarEvent = {
                id: Date.now().toString(),
                title: titre,
                start: dateDebut,
                end: dateFin,
                extendedProps: { 
                    type: typeSoutenance,
                    etudiant: nomEtudiant,
                    jury: membresJury.split(",").map(m => m.trim())
                },
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
        closeModal();
        resetModalFields();
    };

    const resetModalFields = () => {
        setTitre("");
        setDateDebut("");
        setDateFin("");
        setTypeSoutenance("");
        setNomEtudiant("");
        setMembresJury("");
        setSelectedEvent(null);
    };

    return (
        <>
            <PageMeta
                title="Calendrier des soutenances"
                description="Gestion du calendrier des soutenances académiques"
            />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
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
                            day: "Jour",
                            list: "Liste"
                        }}
                        eventTextColor="#ffffff" // Texte des événements en blanc
                    />
                </div>
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    className="max-w-[700px] p-6 lg:p-10"
                >
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                        <div>
                            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                                {selectedEvent ? "Modifier la soutenance" : "Ajouter une soutenance"}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Planifiez une soutenance académique en précisant tous les détails nécessaires
                            </p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Titre de la soutenance
                                    </label>
                                    <input
                                        type="text"
                                        value={titre}
                                        onChange={(e) => setTitre(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Nom de l'étudiant
                                </label>
                                <input
                                    type="text"
                                    value={nomEtudiant}
                                    onChange={(e) => setNomEtudiant(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>

                            <div className="mt-6">
                                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Type de soutenance
                                </label>
                                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                                    {Object.entries(typesSoutenance).map(([key, value]) => (
                                        <div key={key} className="n-chk">
                                            <div className={`form-check form-check-${value} form-check-inline`}>
                                                <label
                                                    className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                                                    htmlFor={`modal${key}`}
                                                >
                                                    <span className="relative">
                                                        <input
                                                            className="sr-only form-check-input"
                                                            type="radio"
                                                            name="type-soutenance"
                                                            value={key}
                                                            id={`modal${key}`}
                                                            checked={typeSoutenance === key}
                                                            onChange={() => setTypeSoutenance(key)}
                                                        />
                                                        <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                                                            <span className="w-2 h-2 bg-white rounded-full dark:bg-transparent"></span>
                                                        </span>
                                                    </span>
                                                    {key}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Membres du jury (séparés par des virgules)
                                </label>
                                <input
                                    type="text"
                                    value={membresJury}
                                    onChange={(e) => setMembresJury(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>

                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Date et heure de début
                                </label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={dateDebut}
                                        onChange={(e) => setDateDebut(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Date et heure de fin
                                </label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={dateFin}
                                        onChange={(e) => setDateFin(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleAddOrUpdateEvent}
                                type="button"
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                {selectedEvent ? "Enregistrer les modifications" : "Ajouter la soutenance"}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

const renderEventContent = (eventInfo: any) => {
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.type.split(" ").pop().toLowerCase()}`;
    return (
        <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded`}>
            <div className="text-white">
                <div className="fc-event-time">{eventInfo.timeText}</div>
                <div className="fc-event-title">
                    <strong>{eventInfo.event.title}</strong>
                    <div className="text-xs">{eventInfo.event.extendedProps.type}</div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;