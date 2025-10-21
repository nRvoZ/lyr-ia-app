import React, { useState } from 'react';
import GlassCard from './common/GlassCard';
import Accordion from './common/Accordion';

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

interface FAQProps {
    onExit: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onExit }) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('what-is-lyria');

    const handleToggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const QA: React.FC<{ id: string, q: string, children: React.ReactNode }> = ({ id, q, children }) => (
        <Accordion title={q} isOpen={openAccordion === id} onToggle={() => handleToggleAccordion(id)}>
            <div className="text-sm text-muted-color whitespace-pre-wrap space-y-2">{children}</div>
        </Accordion>
    );

    return (
        <GlassCard className="max-w-4xl mx-auto">
             <div className="flex items-center space-x-3 mb-4">
                <button onClick={onExit} className="p-2 rounded-full hover:bg-white/10 transition-colors"><BackIcon /></button>
                <div>
                    <h2 className="text-2xl font-bold text-base-color">Foire aux Questions (FAQ)</h2>
                    <p className="text-sm text-muted-color">Les réponses à vos questions les plus fréquentes.</p>
                </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-3">
                <h3 className="font-semibold text-primary-light mt-4">Fonctionnalités Clés</h3>
                <QA id="what-is-ia-training" q="Qu'est-ce que l'IA-Training (Profil Perso) ?">
                    <p>C'est une fonctionnalité premium (plan Ultimate et supérieur) qui vous permet "d'entraîner" l'IA à imiter votre propre style d'écriture.</p>
                    <p>Vous pouvez créer jusqu'à 3 profils personnels. Dans chaque profil, vous décrivez votre style et, surtout, vous fournissez des exemples de vos propres paroles. L'IA analyse ces informations pour générer des chansons qui sonnent comme vous.</p>
                    <p><strong>Important :</strong> Vos textes restent votre propriété et ne sont utilisés que pour vos générations personnelles. Ils ne servent pas à entraîner des modèles globaux.</p>
                </QA>
                <QA id="what-is-burst" q="Que sont les 'Chansons en Rafale' et 'Pochettes en Rafale' ?">
                    <p>Ce sont des fonctionnalités premium qui vous font gagner du temps et des crédits.</p>
                    <p><strong>Chansons en Rafale (x3) :</strong> (Plan Ultimate) Génère trois variations uniques d'une chanson (paroles + style) en une seule fois pour un coût réduit. C'est un excellent outil pour le brainstorming.</p>
                    <p><strong>Pochettes en Rafale (x4) :</strong> (Plan Pro) Génère quatre variations de pochettes d'album en une seule fois, vous offrant plus de choix visuels.</p>
                </QA>
                 <QA id="what-is-marketing-kit" q="À quoi sert le 'Kit Marketing' ?">
                    <p>C'est une fonctionnalité exclusive au plan Business. Après avoir généré une chanson, vous pouvez cliquer sur "Générer Kit Marketing".</p>
                    <p>L'IA crée alors un pack complet pour promouvoir votre morceau : des posts pour les réseaux sociaux (Instagram, Twitter, TikTok), un communiqué de presse, une biographie d'artiste contextuelle et des idées de visuels pour un clip. C'est un gain de temps énorme pour les artistes indépendants et les labels.</p>
                </QA>
                
                <h3 className="font-semibold text-primary-light mt-4">Général</h3>
                 <QA id="what-is-lyria" q="Qu'est-ce que Lyr-IA ?">
                    <p>Lyr-IA est une suite créative avancée qui utilise l'intelligence artificielle pour vous aider à générer des paroles, des styles musicaux pour Suno AI, et des pochettes d'album. C'est un outil conçu pour les musiciens, les créateurs et les passionnés.</p>
                </QA>
                <QA id="how-credits-work" q="Comment fonctionnent les crédits ?">
                   <p>Les crédits sont la "monnaie" de Lyr-IA pour utiliser les fonctionnalités de l'IA. Chaque action a un coût en crédits, visible dans le Guide Complet. Vous recevez un pack de départ, et pouvez en obtenir plus via les abonnements, les packs de crédits, ou en débloquant des succès.</p>
                </QA>
                 <QA id="commercial-use" q="Puis-je utiliser le contenu généré commercialement ?">
                    <p>Oui. Vous détenez les droits sur le contenu que vous générez. Vous pouvez l'utiliser pour vos projets personnels et commerciaux.</p>
                    <p>Cependant, il est de votre responsabilité de vous assurer que votre utilisation finale ne viole pas les droits d'auteur de tiers, surtout si vous utilisez des noms d'artistes ou des styles très reconnaissables. Consultez toujours les conditions d'utilisation de la plateforme sur laquelle vous publiez (ex: Suno, YouTube, Spotify).</p>
                </QA>

                <h3 className="font-semibold text-primary-light mt-4">Compte et Dépannage</h3>
                 <QA id="is-data-saved" q="Mes créations et mes profils sont-ils sauvegardés ?">
                    <p>Oui, mais la manière dépend de votre statut.</p>
                    <p>- <strong>En tant qu'invité :</strong> Votre historique est sauvegardé localement dans votre navigateur. Si vous videz le cache ou changez d'appareil, il sera perdu.</p>
                    <p>- <strong>Avec un compte :</strong> Votre historique et vos profils personnels (IA-Training) sont sauvegardés de manière sécurisée sur votre compte, vous permettant d'y accéder depuis n'importe où.</p>
                </QA>
                 <QA id="generation-failed" q="Ma génération a échoué ou est de mauvaise qualité. Suis-je remboursé ?">
                    <p>Si une génération échoue à cause d'une erreur technique, vos crédits ne sont pas décomptés.</p>
                    <p>Si la génération réussit mais que le résultat n'est pas conforme (ex: mauvais formatage des paroles), vous pouvez demander un remboursement depuis l'historique, <strong>à condition que vous n'ayez pas copié le contenu</strong>. Copier un texte ou une image le considère comme "utilisé" et le rend non remboursable.</p>
                </QA>
            </div>
        </GlassCard>
    );
};

export default FAQ;