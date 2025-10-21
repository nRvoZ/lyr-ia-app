import React from 'react';
import GlassCard from './common/GlassCard';

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

interface CommunityGuidelinesProps {
    onExit: () => void;
}

const CommunityGuidelines: React.FC<CommunityGuidelinesProps> = ({ onExit }) => {
    const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-primary-light mb-2">{title}</h3>
            <div className="space-y-3 text-sm text-muted-color">{children}</div>
        </div>
    );

    return (
        <GlassCard className="max-w-4xl mx-auto">
             <div className="flex items-center space-x-3 mb-4">
                <button onClick={onExit} className="p-2 rounded-full hover:bg-white/10 transition-colors"><BackIcon /></button>
                <div>
                    <h2 className="text-2xl font-bold text-base-color">Règles de la Communauté</h2>
                    <p className="text-sm text-muted-color">Ensemble pour un espace créatif et sûr.</p>
                </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4">
                <Section title="1. Soyez Respectueux">
                    <p>
                       Lyr-IA est un lieu d'expression créative. Nous ne tolérons aucune forme de harcèlement, de discours haineux, d'intimidation ou de discrimination. Traitez chaque membre de la communauté avec respect.
                    </p>
                </Section>

                <Section title="2. Contenu Créatif et Légal">
                    <p>
                        N'utilisez pas Lyr-IA pour créer, partager ou promouvoir du contenu illégal, dangereux, explicitement violent ou sexuellement explicite. Cela inclut, sans s'y limiter, la promotion d'actes d'automutilation, la violence graphique ou l'exploitation.
                    </p>
                </Section>
                
                <Section title="3. Respect de la Propriété Intellectuelle">
                    <p>
                        Bien que Lyr-IA vous permette de vous inspirer du style d'artistes existants, n'utilisez pas le service pour usurper l'identité de quelqu'un d'autre ou pour enfreindre délibérément les droits d'auteur.
                    </p>
                     <p>
                        <strong>Important pour l'IA-Training :</strong> Vous devez détenir les droits d'auteur ou avoir l'autorisation nécessaire pour utiliser les textes que vous fournissez pour entraîner vos profils personnels. Ne téléchargez pas les paroles d'autres artistes sans leur permission.
                    </p>
                </Section>
                
                <Section title="4. Utilisation Malveillante et Spam">
                    <p>
                        Il est interdit d'utiliser Lyr-IA de manière à perturber le service, à exploiter ses fonctionnalités de manière abusive (spam), ou à tenter de contourner les systèmes de crédits ou d'abonnements.
                    </p>
                </Section>
                
                <Section title="5. Contenu Généré par l'IA">
                    <p>
                        Rappelez-vous que le contenu est généré par une intelligence artificielle et peut parfois être imprévisible. Faites preuve de discernement lors de l'utilisation du contenu. Vous êtes responsable du contenu que vous créez et choisissez de partager.
                    </p>
                </Section>

                <Section title="6. Conséquences">
                    <p>
                        Le non-respect de ces règles peut entraîner un avertissement, une limitation des fonctionnalités, ou une suspension permanente de votre compte. Nous nous réservons le droit de prendre les mesures que nous jugeons appropriées.
                    </p>
                </Section>
            </div>
        </GlassCard>
    );
};

export default CommunityGuidelines;