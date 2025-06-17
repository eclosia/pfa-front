import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignUpForm() {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [currentStep, setCurrentStep] = useState(1);

    const [showPassword, setShowPassword] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const [isloading, setIsLoading] = useState(false)

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    "firstName": formData.firstName,
                    "lastName": formData.lastName,
                    "birthDate": formData.birthDate,
                    "numAppoge": formData.apogeeNumber,
                    "email": formData.email,
                    "phone": formData.phone,
                    "password": formData.password,
                    "gender": formData.gender,
                    "role": "student",
                    "field": formData.field,
                    "studyLevel": formData.studyLevel
                }),

            });

            // Vérifier si la requête a réussi
            if (!response.ok) {
                setIsLoading(false)
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            } else {
                navigate('/signin');
            }

        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);

            // Retourner une réponse d'erreur standardisée
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Erreur inconnue lors de l\'inscription'
            };
        }
    };

    const nextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const renderStepIndicator = () => {
        const steps = [
            { number: 1, title: "Informations personnelles" },
            { number: 2, title: "Informations académiques" },
            { number: 3, title: "Contact" },
            { number: 4, title: "Validation" }
        ];

        return (
            <div className="flex justify-between mb-8 px-4 sm:px-0">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className={`flex flex-col items-center ${currentStep >= step.number ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= step.number
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            {step.number}
                        </div>
                        <span className="text-sm hidden sm:block">{step.title}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md p-6 rounded-lg border border-white/20 dark:border-gray-700/30">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informations personnelles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-gray-700 dark:text-white">Prénom*</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="Votre prénom"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-white">Nom*</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Votre nom"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-white">Date de naissance*</Label>
                                <Input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-white">Genre*</Label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" className="text-gray-500 dark:text-gray-400">Sélectionnez</option>
                                    <option value="Male" className="text-gray-900 dark:text-white">Homme</option>
                                    <option value="Female" className="text-gray-900 dark:text-white">Femme</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md p-6 rounded-lg border border-white/20 dark:border-gray-700/30">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informations académiques</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-gray-700 dark:text-white">Filière*</Label>
                                <select
                                    name="field"
                                    value={formData.field}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" className="text-gray-500 dark:text-gray-400">Sélectionnez</option>
                                    <option value="GINF" className="text-gray-900 dark:text-white">GINF</option>
                                    <option value="IRSI" className="text-gray-900 dark:text-white">IRSI</option>
                                    <option value="ROC" className="text-gray-900 dark:text-white">ROC</option>
                                    <option value="IA" className="text-gray-900 dark:text-white">IA</option>
                                </select>
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-white">Niveau d'étude*</Label>
                                <select
                                    name="studyLevel"
                                    value={formData.studyLevel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" className="text-gray-500 dark:text-gray-400">Sélectionnez</option>
                                    <option value="1" className="text-gray-900 dark:text-white">1ère année</option>
                                    <option value="2" className="text-gray-900 dark:text-white">2ème année</option>
                                    <option value="3" className="text-gray-900 dark:text-white">3ème année</option>
                                    <option value="4" className="text-gray-900 dark:text-white">4ème année</option>
                                    <option value="5" className="text-gray-900 dark:text-white">5ème année</option>
                                </select>
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-white">Numéro Apogée*</Label>
                                <Input
                                    type="text"
                                    name="apogeeNumber"
                                    placeholder="Votre numéro"
                                    value={formData.apogeeNumber}
                                    onChange={handleChange}
                                    className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md p-6 rounded-lg border border-white/20 dark:border-gray-700/30">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informations de contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-gray-700 dark:text-white">Email*</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="email@exemple.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-white">Téléphone*</Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="06 12 34 56 78"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-md p-6 rounded-lg border border-white/20 dark:border-gray-700/30">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sécurité</h2>
                        <div className="space-y-4">
                            <div>
                                <Label className="text-gray-700 dark:text-white">Mot de passe*</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Créez un mot de passe"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/50 backdrop-blur-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeCloseIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start pt-2">
                                <Checkbox
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    className="mt-1"
                                />
                                <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    J'accepte les <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Conditions d'utilisation</a> et la <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Politique de confidentialité</a>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-700 dark:text-white transition-colors hover:text-gray-900 dark:hover:text-gray-300"
                >
                    <ChevronLeftIcon className="size-5" />
                    Retour
                </Link>
            </div>

            <div className="p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/30">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                        Inscription Étudiant
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Remplissez les informations requises pour votre compte
                    </p>
                </div>

                {renderStepIndicator()}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {renderStep()}

                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 text-gray-700 dark:text-white font-medium rounded-lg transition duration-200 backdrop-blur-sm border border-gray-200 dark:border-gray-600/50"
                            >
                                Précédent
                            </button>
                        )}
                        {currentStep < 4 && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
                            >
                                Suivant
                            </button>
                        )}
                        {currentStep == 4 && (
                            <Button
                                //type="submit"
                                className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
                                disabled={isloading}
                            >
                                {isloading ? "Inscription en cours..." : "S'inscrire"}
                            </Button>
                        )}
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        to="/signin"
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                    >
                        Déjà un compte ? Connectez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
}