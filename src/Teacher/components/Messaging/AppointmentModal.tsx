import { useState } from 'react';
import { Modal } from '../../../components/ui/modal';
import Button from '../../../components/ui/button/Button';
import Input from '../../../components/form/input/InputField';
import Label from '../../../components/form/Label';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestAppointment: (date: Date, time: string, notes: string) => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  onRequestAppointment
}: AppointmentModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!date || !time) {
        throw new Error('Veuillez sélectionner une date et une heure');
      }

      const selectedDate = new Date(date);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        throw new Error('La date sélectionnée ne peut pas être dans le passé');
      }

      // Formater la date en français
      const formattedDate = selectedDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Envoyer la demande de rendez-vous
      await onRequestAppointment(selectedDate, time, notes);

      // Réinitialiser le formulaire
      setDate('');
      setTime('');
      setNotes('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Générer les heures disponibles (9h-17h)
  const availableHours = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px]">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Planifier un rendez-vous
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full"
            />
          </div>

          <div>
            <Label>Heure</Label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              <option value="">Sélectionnez une heure</option>
              {availableHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Notes (optionnel)</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajoutez des détails sur le rendez-vous..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              size="sm" 
              type="submit" 
              disabled={!date || !time || isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 