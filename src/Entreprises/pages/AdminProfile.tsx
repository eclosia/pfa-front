import React, { useState, useRef } from "react";
import { LockIcon, UserIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Avatar from "../../components/ui/avatar/Avatar";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        fullName: "Admin Directeur",
        email: "admin.directeur@univ.edu",
        phone: "+212 6XX-XXXXXX",
        role: "Administrateur Principal",
        department: "Administration Centrale",
        permissions: "Gestion complète du système",
        avatar: "https://ui-avatars.com/api/?name=Admin+Directeur&background=0D8ABC&color=fff",
        address: "123 Rue de l'Université, Ville",
        bio: "Administrateur principal du système de gestion universitaire",
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfile((prev) => ({ ...prev, avatar: event.target.result as string }));
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
        else if (password.newPassword.length < 8)
            newErrors.newPassword = "Le mot de passe doit contenir au moins 8 caractères";
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
            setTimeout(() => setSuccessMessage(""), 3000);
            setPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Intégrer l'API de mise à jour du profil
        setSuccessMessage("Profil mis à jour avec succès");
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <>
            <PageMeta title="Profil Administrateur | Eclosia" description="Gestion du profil administrateur" />
            <PageBreadcrumb pageTitle="Profil Administrateur" />

            <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
                {/* Section infos personnelles */}
                <div className="rounded-xl p-6 shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        Informations Personnelles
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <Avatar src={profile.avatar} alt={profile.fullName} size="xxlarge" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <Button onClick={triggerFileInput} variant="outline" className="text-sm mt-6">
                                Changer la photo
                            </Button>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="fullName">Nom Complet</Label>
                                    <Input id="fullName" name="fullName" value={profile.fullName} onChange={handleProfileChange} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Institutionnel</Label>
                                    <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                                </div>
                                <div>
                                    <Label htmlFor="address">Adresse</Label>
                                    <Input id="address" name="address" value={profile.address} onChange={handleProfileChange} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="bio">Biographie</Label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleProfileChange}
                                    className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-transparent text-gray-800 dark:text-white"
                                    placeholder="Parlez-nous de vous..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" className="w-full sm:w-auto">
                                    Enregistrer les modifications
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Section sécurité du compte */}
                <div className="rounded-xl p-6 shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                        <LockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        Sécurité du compte
                    </h2>

                    <form onSubmit={handlePasswordSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    value={password.currentPassword}
                                    onChange={handlePasswordChange}
                                    error={errors.currentPassword}
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
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" className="w-full sm:w-auto">
                                    Mettre à jour le mot de passe
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                {successMessage && (
                    <div className="text-green-600 text-center font-medium">{successMessage}</div>
                )}
            </div>
        </>
    );
};

export default AdminProfile;