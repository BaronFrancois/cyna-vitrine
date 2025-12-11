"use client";

import AppLayoutRegLog from "@/layout/AppLayoutRegLog";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

// Interface pour typer les données du formulaire d'inscription
interface FormData {
	name: string; // Nom complet de l'utilisateur
	email: string; // Adresse email
	password: string; // Mot de passe
	confirmPassword: string; // Confirmation du mot de passe
}

// Interface pour typer les erreurs de validation du formulaire
interface FormErrors {
	name?: string; // Erreur pour le nom
	email?: string; // Erreur pour l'email
	password?: string; // Erreur pour le mot de passe
	confirmPassword?: string; // Erreur pour la confirmation du mot de passe
	terms?: string; // Erreur pour l'acceptation des conditions
	[key: string]: string | undefined; // Index signature pour les erreurs dynamiques
}

export default function Register() {
	const router = useRouter();
	// État pour stocker les données du formulaire
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// État pour gérer les erreurs de validation
	const [errors, setErrors] = useState<FormErrors>({});

	// État pour gérer l'affichage du chargement pendant la soumission
	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Valide le format d'un email
	 * @param email - L'email à valider
	 * @returns true si l'email est valide, false sinon
	 */
	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	/**
	 * Valide la force du mot de passe selon plusieurs critères
	 * @param password - Le mot de passe à valider
	 * @returns Un objet contenant la validité et les erreurs détaillées
	 */
	const validatePassword = (
		password: string
	): {
		isValid: boolean;
		errors: {
			length: string;
			uppercase: string;
			number: string;
			specialChar: string;
		};
	} => {
		// Vérification des différents critères de complexité
		const hasMinLength = password.length >= 10;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		// Retourne la validité globale et les messages d'erreur détaillés
		return {
			isValid:
				hasMinLength && hasUpperCase && hasNumber && hasSpecialChar,
			errors: {
				length: hasMinLength ? "" : "Au moins 10 caractères",
				uppercase: hasUpperCase ? "" : "Au moins une majuscule",
				number: hasNumber ? "" : "Au moins un chiffre",
				specialChar: hasSpecialChar
					? ""
					: "Au moins un caractère spécial (!@#$%^&*)",
			},
		};
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Effacer l'erreur quand l'utilisateur corrige
		if (name in errors) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors: FormErrors = {};

		// Validation du nom
		if (!formData.name.trim()) {
			newErrors.name = "Le nom est requis";
		}

		// Validation de l'email
		if (!formData.email) {
			newErrors.email = "L'email est requis";
		} else if (!validateEmail(formData.email)) {
			newErrors.email = "Veuillez entrer un email valide";
		}

		// Validation du mot de passe
		const passwordValidation = validatePassword(formData.password);
		if (!formData.password) {
			newErrors.password = "Le mot de passe est requis";
		} else if (!passwordValidation.isValid) {
			newErrors.password = "Le mot de passe ne respecte pas les critères";
		}

		// Validation de la confirmation du mot de passe
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword =
				"Les mots de passe ne correspondent pas";
		}

		// Validation des conditions d'utilisation
		const termsCheckbox = e.currentTarget.elements.namedItem(
			"terms"
		) as HTMLInputElement;
		if (!termsCheckbox.checked) {
			newErrors.terms =
				"Vous devez accepter les conditions d'utilisation";
		}

		setErrors(newErrors);

		// Si pas d'erreurs, on peut soumettre
		if (Object.keys(newErrors).length === 0) {
			setIsSubmitting(true);
			try {
				const reponse = await api().post("/auth/register", formData);

				if (reponse.status !== 200) {
					throw new Error('Échec de la connexion');
					setErrors({
						general: "Échec de l'inscription",
					});
					return;
				}

				if (reponse.status === 200) {
					// Redirection vers le tableau de bord après connexion réussie
					router.push('/dashboard');
					return;
				}

				console.log("Formulaire soumis avec succès:", formData);

				// Réinitialiser le formulaire après soumission
				setFormData({
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
				});

				// Réinitialiser les erreurs
				setErrors({});
			} catch (error) {
				console.error("Erreur lors de l'inscription:", error);
				// Gérer les erreurs de l'API ici
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<AppLayoutRegLog>
			{/* Conteneur principal avec fond gris foncé et centrage vertical/horizontal */}
			<div className="min-h-screen flex items-center justify-center p-4">
				{/* Carte blanche du formulaire avec ombre et espacement */}
				<div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
					{/* En-tête du formulaire */}
					<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
						Créez votre compte
					</h2>

					{/* Formulaire principal avec espacement entre les éléments */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Groupe de champ pour le nom complet */}
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
								Nom complet
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
									} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
								placeholder="Votre nom complet"
							/>
							{errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
						</div>

						{/* Groupe de champ pour l'email */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Adresse courriel
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
									} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
								placeholder="votre@email.com"
							/>
							{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
						</div>

						{/* Groupe de champ pour le mot de passe avec indicateurs de complexité */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Mot de passe
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
									} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
								placeholder="••••••••"
							/>
							{/* Affichage conditionnel des erreurs ou des indicateurs de complexité */}
							{errors.password ? (
								<p className="mt-1 text-sm text-red-600">{errors.password}</p>
							) : formData.password && (
								//   {/* Indicateurs visuels des critères de complexité du mot de passe */}
								<div className="mt-2 text-xs text-gray-500">
									Le mot de passe doit contenir :
									<ul className="list-disc pl-5 mt-1">
										{/* Chaque critère devient vert lorsqu'il est satisfait */}
										<li className={formData.password.length >= 10 ? 'text-green-500' : ''}>
											Au moins 10 caractères
										</li>
										<li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>
											Au moins une majuscule
										</li>
										<li className={/[0-9]/.test(formData.password) ? 'text-green-500' : ''}>
											Au moins un chiffre
										</li>
										<li className={/[!@#$%^&*(),.?\":{}|<>]/.test(formData.password) ? 'text-green-500' : ''}>
											Au moins un caractère spécial (!@#$%^&*)
										</li>
									</ul>
								</div>
							)}
						</div>

						{/* Groupe de champ pour la confirmation du mot de passe */}
						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
								Confirmer le mot de passe
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
									} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
								placeholder="••••••••"
								required
							/>
							{/* Case à cocher pour les conditions d'utilisation */}
							<div className="flex items-start mt-4">
								{/* Conteneur pour la case à cocher personnalisée */}
								<div className="flex items-center h-5">
									<input
										id="terms"
										name="terms"
										type="checkbox"
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
										required
										aria-required="true"
										aria-invalid={!!errors.terms}
									/>
								</div>
								{/* Texte des conditions d'utilisation avec liens */}
								<div className="ml-3 text-sm">
									<label htmlFor="terms" className="text-gray-700">
										J'accepte les{' '}
										<a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
											conditions d'utilisation
										</a>{' '}
										et la{' '}
										<a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
											politique de confidentialité
										</a>
										{/* Affichage des erreurs de validation des conditions */}
										{errors.terms && (
											<p className="mt-1 text-sm text-red-600">{errors.terms}</p>
										)}
									</label>
								</div>
							</div>
						</div>
						{/* Bouton de soumission avec état de chargement */}
						<button
							type="submit"
							disabled={isSubmitting}
							className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
								}`}
						>
							{isSubmitting ? 'Inscription en cours...' : "S'inscrire"}
						</button>
					</form>

					{/* Lien vers la page de connexion */}
					<div className="mt-6 text-center text-sm">
						<div className="text-center text-sm text-gray-600 mt-4">
							Déjà un compte ?{' '}
							<Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
								Connectez-vous
							</Link>
						</div>
					</div>
				</div>
			</div>
		</AppLayoutRegLog>
	);
}
