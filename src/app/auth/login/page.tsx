"use client";

// Importations des dépendances nécessaires
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

// Interface pour typer les données du formulaire
interface FormData {
	email: string;
	password: string;
}

// Interface pour typer les erreurs du formulaire
interface FormErrors {
	email?: string;
	password?: string;
	general?: string;
}

// Composant principal de la page de connexion
export default function Login() {
	// Initialisation du routeur pour la navigation
	const router = useRouter();

	// État pour stocker les données du formulaire
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: ''
	});

	// État pour gérer les erreurs de validation
	const [errors, setErrors] = useState<FormErrors>({});

	// État pour gérer l'affichage du chargement pendant la soumission
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Valide les données du formulaire
	 * @returns true si le formulaire est valide, false sinon
	 */
	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// Validation de l'email
		if (!formData.email) {
			newErrors.email = 'L\'email est requis';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Format d\'email invalide';
		}

		// Validation du mot de passe
		if (!formData.password) {
			newErrors.password = 'Le mot de passe est requis';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
		}

		// Mise à jour des erreurs et retour de la validité
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/**
	 * Gère les changements dans les champs du formulaire
	 * @param e - Événement de changement d'input
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Met à jour les données du formulaire
		setFormData(prev => ({
			...prev,
			[name]: value
		}));

		// Efface l'erreur du champ lorsque l'utilisateur commence à taper
		if (errors[name as keyof FormErrors]) {
			setErrors(prev => ({
				...prev,
				[name]: undefined
			}));
		}
	};

	/**
	 * Gère la soumission du formulaire
	 * @param e - Événement de soumission du formulaire
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Valide le formulaire avant soumission
		if (!validateForm()) return;

		// Active l'état de chargement et réinitialise les erreurs
		setIsLoading(true);
		setErrors({});

		try {
			// Envoi des données de connexion au serveur
			const reponse = await api().post('/auth/login', formData);

			if (reponse.status !== 200) {
				throw new Error('Échec de la connexion');
				setErrors({
					general: 'Échec de la connexion'
				});
				return;
			}

			if (reponse.status === 200) {
				// Redirection vers le tableau de bord après connexion réussie
				router.push('/dashboard');
				return;
			}
		} catch (error) {
			// Gestion des erreurs
			setErrors({
				general: error instanceof Error ? error.message : 'Une erreur est survenue'
			});
		} finally {
			// Désactive l'état de chargement dans tous les cas
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] via-[#1a1a40] to-[#2a2a60] py-12 px-4 sm:px-6 lg:px-8">
			{/* Carte du formulaire avec ombre et espacement */}
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
				{/* En-tête du formulaire */}
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Connectez-vous à votre compte
					</h2>
				</div>

				{/* Affichage des erreurs générales */}
				{errors.general && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
						<p className="text-sm text-red-700">{errors.general}</p>
					</div>
				)}

				{/* Formulaire principal */}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{/* Conteneur des champs du formulaire avec espacement */}
					<div className="rounded-md shadow-sm space-y-4">
						{/* Groupe de champ email */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={formData.email}
								onChange={handleChange}
								className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
								placeholder="Entrez votre adresse mail"
							/>
							{/* Affichage des erreurs de validation pour l'email */}
							{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
						</div>

						{/* Groupe de champ mot de passe */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Mot de passe
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={formData.password}
								onChange={handleChange}
								className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
								placeholder="Entrez votre mot de passe"
							/>
							{/* Affichage des erreurs de validation pour le mot de passe */}
							{errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
						</div>
					</div>

					{/* Conteneur du bouton de soumission */}
					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? 'Connexion en cours...' : 'Se connecter'}
						</button>
					</div>
				</form>

				{/* Séparateur "Ou" avec ligne horizontale */}
				<div className="mt-6">
					<div className="relative">
						{/* Ligne horizontale */}
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						{/* Bloc combiné */}
						<div className="flex flex-col space-y-4">
							{/* Lien "Mot de passe oublié" aligné à droite */}
							<div className="flex items-center justify-end">
								<div className="text-sm">
									<a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
										Mot de passe oublié ?
									</a>
								</div>
							</div>

							{/* Séparateur "Ou" centré */}
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Ou</span>
							</div>

						</div>
					</div>

					{/* Section d'inscription */}
					<div className="mt-6">
						<p className="text-center text-sm text-gray-600">
							Pas encore de compte ?{' '}
							<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
								Commencez un essai gratuit de 14 jours
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
