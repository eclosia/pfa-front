import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    apogeeNumber: '',
    birthDate: '',
    gender: '',
    field: '',
    studyLevel: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate("/Home");
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto my-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-white transition-colors hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Retour
        </Link>
      </div>

      <div className="p-6 bg-gray-900 rounded-xl shadow-lg">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-white">
            Inscription Étudiant
          </h1>
          <p className="text-gray-400">
            Remplissez les informations requises pour votre compte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Première ligne - Prénom et Nom */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-white">Prénom*</Label>
              <Input
                type="text"
                name="firstName"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
            <div>
              <Label className="text-white">Nom*</Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Votre nom"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label className="text-white">Email*</Label>
            <Input
              type="email"
              name="email"
              placeholder="email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Téléphone et Numéro Apogée */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-white">Téléphone*</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
            <div>
              <Label className="text-white">Numéro Apogée*</Label>
              <Input
                type="text"
                name="apogeeNumber"
                placeholder="Votre numéro"
                value={formData.apogeeNumber}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {/* Date de naissance */}
          <div>
            <Label className="text-white">Date de naissance*</Label>
            <Input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Genre et Filière */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-white">Genre*</Label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" className="text-gray-400">Sélectionnez</option>
                <option value="male" className="text-white">Homme</option>
                <option value="female" className="text-white">Femme</option>
              </select>
            </div>
            <div>
              <Label className="text-white">Filière*</Label>
              <select
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" className="text-gray-400">Sélectionnez</option>
                <option value="GINF" className="text-white">GINF</option>
                <option value="IRSI" className="text-white">IRSI</option>
                <option value="ROC" className="text-white">ROC</option>
                <option value="IA" className="text-white">IA</option>
              </select>
            </div>
          </div>

          {/* Niveau d'étude */}
          <div>
            <Label className="text-white">Niveau d'étude*</Label>
            <select
              name="studyLevel"
              value={formData.studyLevel}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-400">Sélectionnez</option>
              <option value="1" className="text-white">1ère année</option>
              <option value="2" className="text-white">2ème année</option>
              <option value="3" className="text-white">3ème année</option>
              <option value="4" className="text-white">4ème année</option>
              <option value="5" className="text-white">5ème année</option>
            </select>
          </div>

          {/* Mot de passe */}
          <div>
            <Label className="text-white">Mot de passe*</Label>
            <div className="relative">
              <Input
                placeholder="Créez un mot de passe"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeCloseIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Checkbox CGU */}
          <div className="flex items-start pt-2">
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1"
            />
            <label className="ml-2 text-sm text-gray-300">
              J'accepte les <a href="#" className="text-blue-400 hover:underline">Conditions d'utilisation</a> et la <a href="#" className="text-blue-400 hover:underline">Politique de confidentialité</a>
            </label>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Vous avez déjà un compte ?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Connectez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}