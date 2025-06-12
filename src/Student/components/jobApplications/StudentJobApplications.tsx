import { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { Alert } from "../../../components/ui/alert/Alert";
import { FiX, FiCheck, FiCalendar, FiDollarSign, FiMapPin, FiBriefcase, FiClock, FiUser } from "react-icons/fi";
import { useAuth } from "../../../auth/authContext";

interface Application {
	id: number;
	cvPath: string;
	dateCandidature: string;
	entreprise: string;
	entrepriseId: number;
	etudiantId: number;
	motivationPath: string;
	stageId: number;
	statut: string;
	titre: string;
}

interface Stage {
	id: number;
	titre: string;
	entreprise: string;
	lieu: string;
	type: string;
	description: string;
	technologies: string;
	responsibilities?: string[];
	benefits?: string[];
	remuneration: number;
	duree: string;
	debut: string;
	createdAt: string;
	contact_email: string;
	remote: boolean;
}

export default function StudentJobApplications() {

	const { user } = useAuth();

	const [applications, setApplications] = useState<Application[]>([]);

	const [selectedApp, setSelectedApp] = useState<Application | null>(null);

	const [showAlert, setShowAlert] = useState(false);

	const [alertConfig, setAlertConfig] = useState<{
		variant: 'success' | 'error' | 'warning' | 'info';
		title: string;
		message: string;
		doAction?: boolean;
		actionText?: string;
		action?: () => void;
	}>({
		variant: 'success',
		title: '',
		message: '',
		doAction: false,
		actionText: '',
		action: () => { }
	});

	const [isLoading, setIsLoading] = useState(true);

	const [confirmModal, setConfirmModal] = useState(false);

	const [stage, setStage] = useState<Stage | null>(null);

	const fetchApplications = async () => {
		try {
			const response = await fetch(`http://localhost:8082/api/condidature/45`, { // TODO: replace 45 with ${user?.id}
				method: 'GET',
			});

			if (!response.ok) {
				throw new Error();
			} else {
				const data = await response.json();
				console.log("Candidatures récupérées:", data);
				setApplications(data);
				setIsLoading(false);
			}

		} catch (error) {
			setIsLoading(false);
			console.error("Erreur lors de la recuperation des candidatures:", error);
		}
	}

	useEffect(() => {

		setIsLoading(true);
		fetchApplications();

	}, []);

	const handleApplyClick = (app: Application) => {
		setSelectedApp(app);
		setConfirmModal(true);
	};

	const handleViewDetails = async (stage_id: number) => {
		try {
			const response = await fetch(`http://localhost:8082/api/stages/${stage_id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			if (!response.ok) {
				setStage(null);
				setAlertConfig({
					variant: 'error',
					title: 'Erreur',
					message: 'Une erreur est survenue lors de la recuperation des details. Veuillez réessayer plus tard.'
				});
				setShowAlert(true);
				throw new Error('Erreur lors de l\'envoi de la candidature');
			} else {
				const data = await response.json();
				setStage(data);
			}
		} catch (error) {
			setAlertConfig({
				variant: 'error',
				title: 'Erreur',
				message: 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer plus tard.'
			});
			setShowAlert(true);
		}
	};

	const handleAppAnulation = async (id: number | undefined) => {
		try {
			const response = await fetch(`http://localhost:8082/api/condidature/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				setConfirmModal(false);
				setAlertConfig({
					variant: 'error',
					title: 'Erreur',
					message: 'Une erreur est survenue lors de l\'annulation de votre candidature. Veuillez réessayer plus tard.'
				});
				setShowAlert(true);
				throw new Error('Erreur lors de l\'annulation de la candidature');
			} else {
				setConfirmModal(false);
				setAlertConfig({
					variant: 'success',
					title: 'Candidature annulée',
					message: 'Votre candidature a été annulée avec succès !'
				});
				setShowAlert(true);
				fetchApplications(); // Refresh applications list
			}
		} catch (error) {
			setAlertConfig({
				variant: 'error',
				title: 'Erreur',
				message: 'Une erreur est survenue lors de l\'annulation de votre candidature. Veuillez réessayer plus tard.'
			});
			setShowAlert(true);
		}
	}

	const splitString = (input: string): string[] => {

		if (!input || input.trim() === '') {
			return [];
		}

		return input
			.split(',')
			.map(item => item.trim())
			.filter(item => item !== '');

	}

	return (
		<div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-transparent">
			{showAlert && (
				<Alert
					variant={alertConfig.variant}
					title={alertConfig.title}
					message={alertConfig.message}
					onClose={() => setShowAlert(false)}
					autoClose={true}
					duration={5000}
				/>
			)}

			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
						Gérer vos candidatures
					</h4>
				</div>

				<div>
					<div className="flex items-center justify-between mb-4">
						<h5 className="font-medium text-gray-700 dark:text-gray-300">
							{applications.length} {applications.length === 1 ? 'candidature trouvée' : 'candidatures trouvées'}
						</h5>
					</div>

					{isLoading ? (
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
									<div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
									<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-3"></div>
									<div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full mb-2"></div>
									<div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-5/6 mb-2"></div>
									<div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-2/3 mb-3"></div>
									<div className="flex gap-2">
										<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
										<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
									</div>
								</div>
							))}
						</div>
					) : applications.length === 0 ? (
						<div className="text-center py-10">
							<div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800 mb-4">
								<FiBriefcase className="w-10 h-10 text-gray-400" />
							</div>
							<h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
								Aucune candidature ne correspond à vos critères
							</h5>

						</div>
					) : (
						<div className="space-y-4">
							{applications.map((app) => (
								<div
									key={app.id}
									className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:shadow-none"
								>
									<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-start gap-4">
												<div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
													<span className="text-lg font-bold text-gray-500 dark:text-gray-400">
														{app.entreprise.charAt(0)}
													</span>
												</div>
												<div>
													<h5 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-1">
														{app.titre}
													</h5>
													<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
														{app.entreprise} • <FiCalendar className="inline mr-1" />
														{app.dateCandidature}
													</p>
													<div className="flex flex-wrap items-center gap-2 mb-3">
														<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
    														${app.statut === 'en_attente'
																? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
																: app.statut === 'accepte'
																	? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
																	: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
															}`}
														>
															{app.statut === 'en_attente'
																? 'En attente'
																: app.statut === 'accepte'
																	? 'Accepté'
																	: 'Refusé'}
														</span>
													</div>
												</div>
											</div>

										</div>
										<div className="flex flex-col items-end gap-3">
											<Button
												size="sm"
												onClick={() => {
													handleApplyClick(app);
												}}
												className="min-w-[120px]"
											>
												Annuler la candidature
											</Button>
											<button
												onClick={() => handleViewDetails(app.stageId)}
												className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
											>
												Détails du stage
											</button>
										</div>
									</div>
								</div>


							))}
						</div>
					)}
				</div>
			</div>

			{/* Modal de détails de stage  */}
			<Modal isOpen={!!stage} onClose={() => setStage(null)} className="max-w-3xl">
				<div className="no-scrollbar relative w-full overflow-y-auto rounded-2xl bg-white p-6 dark:bg-gray-900 lg:p-8">
					<button
						onClick={() => setStage(null)}
						className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
					>
						<FiX className="w-5 h-5" />
					</button>

					<div className="px-2">
						{stage && (
							<>
								<div className="mb-6">
									<h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
										{stage.titre}
									</h4>
									<p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
										{stage.entreprise} • <FiMapPin className="inline mr-1" />
										{stage.lieu}
										{stage.remote && (
											<span className="ml-2 text-green-600 dark:text-green-400">(Télétravail possible)</span>
										)}
									</p>
									<div className="flex flex-wrap items-center gap-2 mt-3">
										<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stage.type === "Stage" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
											stage.type === "Alternance" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" :
												"bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
											}`}>
											{stage.type}
										</span>
										<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
											<FiClock className="mr-1" /> {stage.duree}
										</span>
										<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
											<FiCalendar className="mr-1" /> Début : {stage.debut}
										</span>
										{stage.remuneration != 0 && (
											<span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
												<FiDollarSign className="mr-1" /> {stage.remuneration}
											</span>
										)}
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
									<div className="col-span-2">
										<div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
											<div className="flex items-center justify-between mb-4">
												<h5 className="text-lg font-semibold text-gray-800 dark:text-white/90">
													Description du poste
												</h5>
												<span className="text-sm text-gray-500 dark:text-gray-400">
													Publié le {new Date(stage.createdAt).toLocaleDateString('fr-FR', {
														day: 'numeric',
														month: 'long',
														year: 'numeric'
													})}
												</span>
											</div>
											<div className="prose dark:prose-invert max-w-none">
												<p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
													{stage.description}
												</p>
											</div>
										</div>

										{stage.responsibilities && stage.responsibilities.length > 0 && (
											<div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
												<h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
													Responsabilités
												</h5>
												<ul className="space-y-3">
													{stage.responsibilities.map((resp, index) => (
														<li key={index} className="flex items-start">
															<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mr-3 flex-shrink-0">
																{index + 1}
															</span>
															<span className="text-gray-700 dark:text-gray-300">{resp}</span>
														</li>
													))}
												</ul>
											</div>
										)}

										<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
											<h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
												Compétences requises
											</h5>
											<div className="flex flex-wrap gap-2">
												{splitString(stage.technologies).map((req, index) => (
													<span
														key={index}
														className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
													>
														{req}
													</span>
												))}
											</div>
										</div>
									</div>

									<div className="col-span-1 space-y-6">
										<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
											<h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
												Détails de l'offre
											</h5>
											<div className="space-y-4">
												<div className="flex items-center">
													<FiBriefcase className="w-5 h-5 text-gray-400 mr-3" />
													<div>
														<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type de contrat</h6>
														<p className="text-gray-800 dark:text-gray-200">{stage.type}</p>
													</div>
												</div>
												<div className="flex items-center">
													<FiClock className="w-5 h-5 text-gray-400 mr-3" />
													<div>
														<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée</h6>
														<p className="text-gray-800 dark:text-gray-200">{stage.duree}</p>
													</div>
												</div>
												<div className="flex items-center">
													<FiCalendar className="w-5 h-5 text-gray-400 mr-3" />
													<div>
														<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de début</h6>
														<p className="text-gray-800 dark:text-gray-200">{stage.debut}</p>
													</div>
												</div>
												<div className="flex items-center">
													<FiClock className="w-5 h-5 text-gray-400 mr-3" />
													<div>
														<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de publication</h6>
														<p className="text-gray-800 dark:text-gray-200">
															{stage.createdAt ? new Date(stage.createdAt).toLocaleDateString('fr-FR', {
																day: 'numeric',
																month: 'long',
																year: 'numeric'
															}) : 'Non spécifiée'}
														</p>
													</div>
												</div>
												{stage.remuneration != 0 && (
													<div className="flex items-center">
														<FiDollarSign className="w-5 h-5 text-gray-400 mr-3" />
														<div>
															<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salaire</h6>
															<p className="text-gray-800 dark:text-gray-200">{stage.remuneration}</p>
														</div>
													</div>
												)}
												<div className="flex items-center">
													<FiMapPin className="w-5 h-5 text-gray-400 mr-3" />
													<div>
														<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Localisation</h6>
														<p className="text-gray-800 dark:text-gray-200">
															{stage.lieu}
															{stage.remote && (
																<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
																	Télétravail possible
																</span>
															)}
														</p>
													</div>
												</div>
												<div className="flex items-center">
													<FiUser className="w-5 h-5 text-gray-400 mr-3" />
													<div>
														<h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h6>
														<p className="text-gray-800 dark:text-gray-200">{stage.contact_email}</p>
													</div>
												</div>
											</div>

											<div className="mt-6">

											</div>
										</div>

										{stage.benefits && stage.benefits.length > 0 && (
											<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
												<h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
													Avantages
												</h5>
												<ul className="space-y-3">
													{stage.benefits.map((benefit, index) => (
														<li key={index} className="flex items-start">
															<FiCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
															<span className="text-gray-700 dark:text-gray-300">{benefit}</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</Modal>

			{/* Modal de confirmation de candidature amélioré */}
			<Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)} className="max-w-md">
				<div className="relative w-full rounded-2xl bg-white p-6 dark:bg-gray-900">
					<button
						onClick={() => setConfirmModal(false)}
						className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
					>
						<FiX className="w-5 h-5" />
					</button>

					<div className="px-2">
						<h4 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-2">Confirmation</h4>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Vous voulez vraiment annuler ?</p>

						<div className="flex justify-end gap-3 pt-2">
							<Button variant="outline" onClick={() => setConfirmModal(false)}>
								Reture
							</Button>
							<Button
								onClick={() => handleAppAnulation(selectedApp?.id)}
								className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
							>
								Confirmer
							</Button>
						</div>
					</div>
				</div>
			</Modal>
			{/* Modal de filtres */}
			{/* <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl">
				<div className="no-scrollbar relative w-full overflow-y-auto rounded-2xl bg-white p-6 dark:bg-gray-900 lg:p-8">
					<button
						onClick={closeModal}
						className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800"
					>
						<FiX className="w-5 h-5" />
					</button>

					<div className="px-2">
						<div className="mb-6">
							<h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
								Filtrer les offres
							</h4>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Affinez votre recherche selon vos critères
							</p>
						</div>

						<div className="space-y-6">
							<div>
								<Label htmlFor="type">Type de contrat</Label>
								<select
									id="type"
									name="type"
									value={filters.type}
									onChange={handleFilterChange}
									className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
								>
									<option value="all">Tous les types</option>
									<option value="Stage">Stage</option>
									<option value="Alternance">Alternance</option>
									<option value="CDI">CDI</option>
									<option value="CDD">CDD</option>
								</select>
							</div>

							<div>
								<Label htmlFor="location">Localisation</Label>
								<select
									id="location"
									name="location"
									value={filters.location}
									onChange={handleFilterChange}
									className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
								>
									<option value="all">Toutes les localisations</option>
									<option value="Casablanca">Casablanca</option>
									<option value="Rabat">Rabat</option>
									<option value="Marrakech">Marrakech</option>
									<option value="Tanger">Tanger</option>
									<option value="Agadir">Agadir</option>
								</select>
							</div>

							<div>
								<Label htmlFor="remote">Télétravail</Label>
								<select
									id="remote"
									name="remote"
									value={filters.remote}
									onChange={handleFilterChange}
									className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
								>
									<option value="all">Tous les modes</option>
									<option value="yes">Télétravail possible</option>
									<option value="no">Présentiel uniquement</option>
								</select>
							</div>
						</div>

						<div className="mt-8 flex justify-end gap-4">
							<Button
								onClick={resetFilters}
								variant="outline"
								className="min-w-[120px]"
							>
								Réinitialiser
							</Button>
							<Button
								onClick={closeModal}
								className="min-w-[120px]"
							>
								Appliquer
							</Button>
						</div>
					</div>
				</div>
			</Modal> */}
		</div>
	);
}