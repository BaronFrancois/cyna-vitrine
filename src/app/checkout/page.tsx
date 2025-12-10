'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Check, Lock } from 'lucide-react';

export default function Checkout() {
  const [step, setStep] = useState(1);

  const StepIndicator = ({ num, title }: { num: number, title: string }) => (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
      step >= num ? 'bg-black text-white' : 'text-gray-400'
    }`}>
       <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
          step >= num ? 'bg-white text-black border-white' : 'bg-transparent border-gray-300'
       }`}>
          {step > num ? <Check size={14} /> : num}
       </div>
       <span className={`text-sm ${step >= num ? 'font-bold' : 'font-medium'}`}>{title}</span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
       <div className="flex justify-center space-x-8 mb-16 border-b border-gray-200 pb-6">
          <StepIndicator num={1} title="Compte" />
          <StepIndicator num={2} title="Facturation" />
          <StepIndicator num={3} title="Paiement" />
       </div>

       {step === 1 && (
         <div className="fade-in flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8 text-center">Connectez-vous pour aller plus vite.</h2>
            <div className="space-y-4 max-w-md w-full">
               <input type="email" placeholder="Adresse Email" className="w-full p-4 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue-500" />
               <input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue-500" />
               <Button className="w-full mt-4" onClick={() => setStep(2)}>Se Connecter</Button>
               <div className="text-center mt-4">
                  <span className="text-gray-500 text-sm">Pas de compte ? </span>
                  <button className="text-blue-600 text-sm hover:underline" onClick={() => setStep(2)}>Continuer en Invité</button>
               </div>
            </div>
         </div>
       )}

       {step === 2 && (
         <div className="fade-in flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8 text-center">Où devons-nous envoyer la facture ?</h2>
            <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
               <input type="text" placeholder="Prénom" className="col-span-1 p-4 rounded-lg bg-gray-100 border-none" />
               <input type="text" placeholder="Nom" className="col-span-1 p-4 rounded-lg bg-gray-100 border-none" />
               <input type="text" placeholder="Nom de l'entreprise" className="col-span-2 p-4 rounded-lg bg-gray-100 border-none" />
               <input type="text" placeholder="Adresse" className="col-span-2 p-4 rounded-lg bg-gray-100 border-none" />
               <input type="text" placeholder="Ville" className="col-span-1 p-4 rounded-lg bg-gray-100 border-none" />
               <input type="text" placeholder="Code Postal" className="col-span-1 p-4 rounded-lg bg-gray-100 border-none" />
            </div>
            <div className="mt-8">
               <Button onClick={() => setStep(3)}>Continuer vers le Paiement</Button>
            </div>
         </div>
       )}

       {step === 3 && (
         <div className="fade-in flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8 text-center">Paiement Sécurisé.</h2>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 max-w-lg w-full mb-8">
               <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold">Carte de Crédit</span>
                  <div className="flex space-x-2">
                     <div className="w-8 h-5 bg-gray-300 rounded"></div>
                     <div className="w-8 h-5 bg-gray-300 rounded"></div>
                  </div>
               </div>
               <div className="space-y-4">
                  <input type="text" placeholder="Numéro de Carte" className="w-full p-3 bg-white border border-gray-200 rounded-md" />
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="MM/AA" className="w-full p-3 bg-white border border-gray-200 rounded-md" />
                     <input type="text" placeholder="CVC" className="w-full p-3 bg-white border border-gray-200 rounded-md" />
                  </div>
               </div>
            </div>
            <Button size="lg" className="w-full max-w-lg flex items-center justify-center space-x-2">
               <Lock size={16} />
               <span>Payer Maintenant</span>
            </Button>
         </div>
       )}
    </div>
  );
}
