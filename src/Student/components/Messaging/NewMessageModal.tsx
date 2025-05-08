import { useState, useRef } from 'react';
import { Modal } from '../../../components/ui/modal';
import Button from '../../../components/ui/button/Button';
import Label from '../../../components/form/Label';

interface RecipientType {
  id: string;
  name: string;
  avatar: string;
}

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (recipientId: string, content: string, attachments?: string[]) => void;
  recipientTypes: RecipientType[];
}

export default function NewMessageModal({
  isOpen,
  onClose,
  onSendMessage,
  recipientTypes
}: NewMessageModalProps) {
  const [recipientType, setRecipientType] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (recipientType && message.trim()) {
      onSendMessage(recipientType, message, attachments);
      setMessage('');
      setAttachments([]);
      setRecipientType('');
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileUrls = files.map(file => URL.createObjectURL(file));
      setAttachments(prev => [...prev, ...fileUrls]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px]">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Nouveau message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Destinataire</Label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              <option value="">Sélectionnez un destinataire</option>
              {recipientTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Message</Label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
              required
            />
          </div>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachments.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Pièce jointe ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Ajouter des pièces jointes
            </span>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={!recipientType || !message.trim()}
            >
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 