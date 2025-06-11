import React, { useState, useRef } from 'react';

const Avatar = ({ avatar, fullName }: { avatar?: string; fullName?: string }) => {
  const initials = fullName
    ? fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-400/80 to-indigo-600/80 flex items-center justify-center text-5xl font-bold text-white shadow-lg overflow-hidden backdrop-blur-sm">
      {avatar ? (
        <img src={avatar} alt={fullName} className="object-cover w-full h-full" />
      ) : (
        initials
      )}
    </div>
  );
};

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  readOnly = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean;
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg font-medium text-white/90 mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full px-4 py-3 text-lg bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-4 transition-all text-white placeholder-white/50 ${
        error
          ? 'border-red-300/70 focus:ring-red-100/30'
          : 'focus:border-blue-400/70 focus:ring-blue-100/30'
      } ${readOnly ? 'bg-white/5' : ''}`}
    />
    {error && <p className="text-red-300 text-base mt-2">{error}</p>}
  </div>
);

const ProfileTeacher = () => {
  const [profile, setProfile] = useState({
    fullName: 'M. Youssef Amrani',
    email: 'youssef.amrani@univ.edu',
    department: 'Informatique / GINF',
    grade: 'Maître Assistant',
    specialities: 'IA, Machine Learning, Sécurité Informatique',
    avatar: '',
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile(prev => ({ ...prev, avatar: event.target.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!password.currentPassword) newErrors.currentPassword = 'Ce champ est requis';
    if (!password.newPassword) newErrors.newPassword = 'Ce champ est requis';
    else if (password.newPassword.length < 8) newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    if (password.newPassword !== password.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage('Mot de passe mis à jour avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-10 bg-black/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/10">
      <h2 className="text-4xl font-bold mb-6 text-white">Profil Enseignant</h2>

      <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
        <div className="flex flex-col items-center">
          <Avatar avatar={profile.avatar} fullName={profile.fullName} />
          <button
            type="button"
            onClick={triggerFileInput}
            className="mt-4 px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all shadow-lg hover:shadow-xl text-lg font-semibold border-2 border-white/20"
          >
            Changer l'avatar
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 w-full space-y-4">
          <Input
            label="Nom complet"
            name="fullName"
            value={profile.fullName}
            onChange={handleProfileChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <Input
          label="Département"
          name="department"
          value={profile.department}
          onChange={handleProfileChange}
          readOnly
        />
        <Input
          label="Grade"
          name="grade"
          value={profile.grade}
          onChange={handleProfileChange}
          readOnly
        />
      </div>

      <Input
        label="Spécialités"
        name="specialities"
        value={profile.specialities}
        onChange={handleProfileChange}
      />

      <hr className="my-8 border-t-2 border-white/10" />

      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
        <h3 className="text-3xl font-semibold mb-6 text-white">Changer le mot de passe</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Mot de passe actuel"
            name="currentPassword"
            type="password"
            value={password.currentPassword}
            onChange={handlePasswordChange}
            error={errors.currentPassword}
          />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Input
              label="Nouveau mot de passe"
              name="newPassword"
              type="password"
              value={password.newPassword}
              onChange={handlePasswordChange}
              error={errors.newPassword}
            />
            <Input
              label="Confirmer le nouveau mot de passe"
              name="confirmPassword"
              type="password"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              error={errors.confirmPassword}
            />
          </div>
          {successMessage && (
            <div className="p-3 bg-green-500/20 text-green-200 rounded-xl text-lg">
              {successMessage}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500/90 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTeacher;
