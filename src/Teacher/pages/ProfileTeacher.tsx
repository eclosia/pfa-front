import React, { useState, useRef } from 'react';
import { LockIcon, UserIcon, MailIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Avatar from "../../components/ui/avatar/Avatar";

const AcademicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DepartmentIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const SpecialityIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ProfileTeacher = () => {
  const [profile, setProfile] = useState({
    fullName: "Dr. Ahmed Benali",
    email: "ahmed.benali@univ.edu",
    department: "Informatique / GINF",
    grade: "Maître Assistant",
    specialities: "IA, Machine Learning, Sécurité Informatique",
    avatar: "/images/user/user-01.jpg"
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          setProfile(prev => ({ ...prev, avatar: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!password.currentPassword) newErrors.currentPassword = "Ce champ est requis";
    if (!password.newPassword) newErrors.newPassword = "Ce champ est requis";
    else if (password.newPassword.length < 8) newErrors.newPassword = "Le mot de passe doit contenir au moins 8 caractères";
    if (password.newPassword !== password.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Mot de passe mis à jour avec succès");
      setTimeout(() => setSuccessMessage(''), 3000);
      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      {/* Infos personnelles */}
      <div className="rounded-xl p-6 shadow-lg bg-transparent border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
          <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Informations personnelles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avatar */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="relative group">
              <Avatar 
                src={profile.avatar} 
                alt={profile.fullName} 
                size="xl" 
                className="mb-4 ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-white/90 dark:bg-gray-700/90 shadow-md hover:bg-white dark:hover:bg-gray-600"
                  onClick={triggerFileInput}
                >
                  Changer la photo
                </Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Nom complet (non modifiable) */}
          <div className="md:col-span-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <div className="relative">
              <Input
                id="fullName"
                name="fullName"
                value={profile.fullName}
                readOnly
                className="cursor-default bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 pl-10"
                startIcon={<UserIcon className="w-5 h-5 text-gray-400" />}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-600/50 px-2 py-1 rounded">
                Non modifiable
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email institutionnel</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              disabled
              className="bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600"
              startIcon={<MailIcon className="w-5 h-5 text-gray-400" />}
            />
          </div>

          {/* Département */}
          <div>
            <Label htmlFor="department">Département / Filière</Label>
            <Input
              id="department"
              name="department"
              value={profile.department}
              disabled
              className="bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600"
              startIcon={<DepartmentIcon className="w-5 h-5 text-gray-400" />}
            />
          </div>

          {/* Grade */}
          <div>
            <Label htmlFor="grade">Grade académique</Label>
            <Input
              id="grade"
              name="grade"
              value={profile.grade}
              disabled
              className="bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600"
              startIcon={<AcademicIcon className="w-5 h-5 text-gray-400" />}
            />
          </div>

          {/* Spécialités */}
          <div className="md:col-span-2">
            <Label htmlFor="specialities">Spécialités / Domaines d'expertise</Label>
            <Input
              id="specialities"
              name="specialities"
              value={profile.specialities}
              onChange={handleProfileChange}
              className="bg-gray-50/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              startIcon={<SpecialityIcon className="w-5 h-5 text-gray-400" />}
            />
          </div>
        </div>
      </div>

      {/* Section mot de passe */}
      <div className="rounded-xl p-6 shadow-lg bg-transparent border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <LockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>Mettre à jour le mot de passe</span>
        </h2>

        <form onSubmit={handlePasswordSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="currentPassword">Ancien mot de passe</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                error={errors.currentPassword}
                className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                startIcon={<LockIcon className="w-5 h-5 text-gray-400" />}
              />
            </div>

            <div>
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={password.newPassword}
                onChange={handlePasswordChange}
                error={errors.newPassword}
                className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                startIcon={<LockIcon className="w-5 h-5 text-gray-400" />}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                error={errors.confirmPassword}
                className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                startIcon={<LockIcon className="w-5 h-5 text-gray-400" />}
              />
            </div>
          </div>

          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800 transition-all duration-300">
              {successMessage}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Mettre à jour
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTeacher;