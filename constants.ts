import { Product } from "./src/types/produit";

export const PRODUCTS: Product[] = [
  {
    id: 'cyna-edr-pro',
    name: 'Cyna EDR Pro',
    shortDescription: 'Détection et réponse avancées pour les terminaux.',
    fullDescription: 'Analyse comportementale en temps réel et réponse automatisée pour sécuriser chaque terminal de votre organisation. Cyna EDR Pro utilise l\'apprentissage automatique pour prédire et neutraliser les menaces avant qu\'elles ne s\'exécutent.',
    price: 19.99,
    period: 'monthly',
    category: 'EDR',
    features: ['Surveillance Temps Réel', 'Détection IA', 'Remédiation Auto', 'Rollback Ransomware'],
    status: 'available',
    image: 'https://picsum.photos/id/1/800/600'
  },
  {
    id: 'cyna-xdr-max',
    name: 'Cyna XDR Max',
    shortDescription: 'Détection unifiée inter-couches.',
    fullDescription: 'Intégrez les données des terminaux, réseaux et charges de travail cloud pour une visibilité holistique. Corrélez les incidents à travers toute votre infrastructure.',
    price: 49.99,
    period: 'monthly',
    category: 'XDR',
    features: ['Visibilité Cross-Stack', 'Corrélation Incidents', 'Chasse Avancée', 'Analyse des Causes'],
    status: 'available',
    image: 'https://picsum.photos/id/2/800/600'
  },
  {
    id: 'cyna-soc-managed',
    name: 'SOC Managé',
    shortDescription: 'Service de surveillance expert 24/7.',
    fullDescription: 'Notre équipe d\'analystes d\'élite surveille votre périmètre 24/7/365. Nous gérons les alertes pour que vous puissiez vous concentrer sur votre activité.',
    price: 999.00,
    period: 'monthly',
    category: 'SOC',
    features: ['Surveillance 24/7', 'Analyse Expert', 'Rapports Mensuels', 'Support Prioritaire'],
    status: 'available',
    image: 'https://picsum.photos/id/3/800/600'
  },
  {
    id: 'cyna-cloud-shield',
    name: 'Cloud Shield',
    shortDescription: 'Sécurisez votre environnement multi-cloud.',
    fullDescription: 'Gestion de la configuration et protection contre les menaces pour les charges de travail AWS, Azure et GCP.',
    price: 29.99,
    period: 'monthly',
    category: 'Cloud',
    features: ['CSPM', 'Protection Workload', 'Sécurité Conteneurs', 'Gestion Identité'],
    status: 'available',
    image: 'https://picsum.photos/id/4/800/600'
  },
  {
    id: 'cyna-net-sentry',
    name: 'Net Sentry',
    shortDescription: 'Analyse du trafic réseau nouvelle génération.',
    fullDescription: 'Inspection approfondie des paquets et détection des anomalies pour votre trafic réseau interne et externe.',
    price: 349.00,
    period: 'yearly',
    category: 'Network',
    features: ['Analyse Trafic', 'Protection DDoS', 'Prévention Intrusion', 'Accès Zero Trust'],
    status: 'maintenance',
    image: 'https://picsum.photos/id/5/800/600'
  }
];

export const MOCK_USER = {
  name: "Alexandre Chen",
  email: "alex.chen@example.com",
  company: "TechFlow Inc.",
  activeSubscriptions: 2,
  nextBillingDate: "15 Oct 2023"
};