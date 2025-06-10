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
        MyCalendar: string;
        eventType: string;
    };
}

const MyCalendar: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [eventTitle, setEventTitle] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventLevel, setEventLevel] = useState("Danger");
    const [eventType, setEventType] = useState("Réunion");
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);
    const { isOpen, openModal, closeModal } = useModal();

    const calendarsEvents = {
        Danger: "danger",
        Success: "success",
        Primary: "primary",
        Warning: "warning",
    };

    const eventTypes = {
        Réunion: "Réunion",
        Atelier: "Atelier",
        Conférence: "Conférence",
        Autre: "Autre"
    };

    useEffect(() => {
        setEvents([
            {
                id: "1",
                title: "Conférence annuelle",
                start: new Date().toISOString().split("T")[0],
                extendedProps: { 
                    MyCalendar: "Danger",
                    eventType: "Conférence" 
                },
            },
            {
                id: "2",
                title: "Réunion d'équipe",
                start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
                extendedProps: { 
                    MyCalendar: "Success",
                    eventType: "Réunion" 
                },
            },
            {
                id: "3",
                title: "Atelier de formation",
                start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
                end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
                extendedProps: { 
                    MyCalendar: "Primary",
                    eventType: "Atelier" 
                },
            },
        ]);
    }, []);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        resetModalFields();
        setEventStartDate(selectInfo.startStr);
        setEventEndDate(selectInfo.endStr || selectInfo.startStr);
        openModal();
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        setSelectedEvent(event as unknown as CalendarEvent);
        setEventTitle(event.title);
        setEventStartDate(event.start?.toISOString().split("T")[0] || "");
        setEventEndDate(event.end?.toISOString().split("T")[0] || "");
        setEventLevel(event.extendedProps.MyCalendar);
        setEventType(event.extendedProps.eventType || "Réunion");
        openModal();
    };

    const handleAddOrUpdateEvent = () => {
        if (selectedEvent) {
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === selectedEvent.id
                        ? {
                            ...event,
                            title: eventTitle,
                            start: eventStartDate,
                            end: eventEndDate,
                            extendedProps: { 
                                MyCalendar: eventLevel,
                                eventType: eventType 
                            },
                        }
                        : event
                )
            );
        } else {
            const newEvent: CalendarEvent = {
                id: Date.now().toString(),
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                allDay: true,
                extendedProps: { 
                    MyCalendar: eventLevel,
                    eventType: eventType 
                },
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
        closeModal();
        resetModalFields();
    };

    const resetModalFields = () => {
        setEventTitle("");
        setEventStartDate("");
        setEventEndDate("");
        setEventLevel("Danger");
        setEventType("Réunion");
        setSelectedEvent(null);
    };

    return (
        <>
            <PageMeta
                title="Tableau de bord Calendrier React.js | TailAdmin - Template de tableau de bord Next.js"
                description="Ceci est la page du tableau de bord Calendrier React.js pour TailAdmin - Template de tableau de bord React.js avec Tailwind CSS"
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
                                {selectedEvent ? "Modifier l'événement" : "Ajouter un événement"}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Planifiez votre prochain grand moment : programmez ou modifiez un événement pour rester sur la bonne voie
                            </p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Titre de l'événement
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Type d'événement
                                </label>
                                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                                    {Object.entries(eventTypes).map(([key, value]) => (
                                        <div key={key} className="n-chk">
                                            <div className="form-check form-check-inline">
                                                <label
                                                    className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                                                    htmlFor={`type-${key}`}
                                                >
                                                    <span className="relative">
                                                        <input
                                                            className="sr-only form-check-input"
                                                            type="radio"
                                                            name="event-type"
                                                            value={value}
                                                            id={`type-${key}`}
                                                            checked={eventType === value}
                                                            onChange={() => setEventType(value)}
                                                        />
                                                        <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                                                            <span className="w-2 h-2 bg-white rounded-full dark:bg-transparent"></span>
                                                        </span>
                                                    </span>
                                                    {value}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Couleur de l'événement
                                </label>
                                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                                    {Object.entries(calendarsEvents).map(([key, value]) => (
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
                                                            name="event-level"
                                                            value={key}
                                                            id={`modal${key}`}
                                                            checked={eventLevel === key}
                                                            onChange={() => setEventLevel(key)}
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
                                    Date de début
                                </label>
                                <div className="relative">
                                    <input
                                        id="event-start-date"
                                        type="date"
                                        value={eventStartDate}
                                        onChange={(e) => setEventStartDate(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Date de fin
                                </label>
                                <div className="relative">
                                    <input
                                        id="event-end-date"
                                        type="date"
                                        value={eventEndDate}
                                        onChange={(e) => setEventEndDate(e.target.value)}
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
                                Fermer
                            </button>
                            <button
                                onClick={handleAddOrUpdateEvent}
                                type="button"
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
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

const renderEventContent = (eventInfo: any) => {
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.MyCalendar.toLowerCase()}`;
    return (
        <div
            className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded`}
            title={`${eventInfo.event.title} (${eventInfo.event.extendedProps.eventType})`}
        >
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-time">{eventInfo.timeText}</div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
        </div>
    );
};

export default MyCalendar;