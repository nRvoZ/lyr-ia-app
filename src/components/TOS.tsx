import React from 'react';
import GlassCard from './common/GlassCard';

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

interface TOSProps {
    onExit: () => void;
}

const TOS: React.FC<TOSProps> = ({ onExit }) => {
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
                    <h2 className="text-2xl font-bold text-base-color">Conditions Générales d'Utilisation</h2>
                    <p className="text-sm text-muted-color">Dernière mise à jour : 28 Juillet 2024</p>
                </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4">
                <Section title="1. Acceptation des Conditions">
                    <p>
                        Bienvenue sur Lyr-IA ("le Service"). En accédant ou en utilisant notre Service, vous acceptez d'être lié par ces Conditions Générales d'Utilisation ("CGU"). Si vous n'acceptez pas l'ensemble de ces conditions, vous ne pouvez pas utiliser le Service.
                    </p>
                </Section>

                <Section title="2. Description du Service">
                    <p>
                        Lyr-IA est un service web qui utilise des modèles d'intelligence artificielle, notamment l'API Gemini de Google, pour aider les utilisateurs à générer du contenu créatif tel que des paroles de chansons, des "style prompts" musicaux, des pochettes d'album, et des kits marketing.
                    </p>
                </Section>

                <Section title="3. Utilisation du Service et Contenu">
                    <p>
                        <strong>Propriété du Contenu :</strong> Vous conservez les droits sur les prompts et les contenus que vous fournissez au Service. Concernant le contenu généré par l'IA (paroles, images, etc.), vous en êtes propriétaire et pouvez l'utiliser à des fins personnelles et commerciales, sous réserve du respect des conditions des fournisseurs d'IA tiers (Google) et des présentes CGU.
                    </p>
                     <p>
                        <strong>Fonctionnalité d'Entraînement Personnel (IA-Training) :</strong> Si vous utilisez la fonctionnalité "Profil Perso" pour fournir vos propres textes et descriptions, vous déclarez et garantissez que vous possédez tous les droits nécessaires sur ce contenu. Vous restez l'unique propriétaire de ce matériel. Lyr-IA n'acquiert aucun droit sur vos données d'entraînement.
                    </p>
                    <p>
                        <strong>Usage Responsable :</strong> Vous vous engagez à ne pas utiliser le Service pour créer du contenu diffamatoire, haineux, illégal ou qui enfreint les droits d'auteur de tiers. L'utilisation de noms d'artistes a pour but de styliser la génération et ne constitue pas une approbation ou une affiliation. Il est de votre responsabilité de vous assurer que votre utilisation finale du contenu généré respecte les lois sur la propriété intellectuelle.
                    </p>
                </Section>
                
                <Section title="4. Crédits et Abonnements">
                    <p>
                        L'utilisation des fonctionnalités du Service nécessite des "crédits". Les crédits peuvent être obtenus via un abonnement payant, des packs de crédits ou en récompense de succès. Les crédits n'ont aucune valeur monétaire en dehors du Service et ne sont ni remboursables, ni échangeables. Les plans d'abonnement et les prix sont sujets à changement.
                    </p>
                </Section>
                
                <Section title="5. Compte Utilisateur">
                    <p>
                        La création d'un compte est nécessaire pour accéder aux fonctionnalités premium et sauvegarder votre historique. Vous êtes responsable de la sécurité de votre mot de passe et de toutes les activités qui se déroulent sous votre compte.
                    </p>
                </Section>

                <Section title="6. Limitation de Responsabilité">
                    <p>
                        Le Service est fourni "en l'état". Nous ne garantissons pas que le service sera ininterrompu ou sans erreur. Le contenu généré par l'IA peut contenir des imprécisions ou des artefacts. En aucun cas, les créateurs de Lyr-IA ne pourront être tenus responsables des dommages directs ou indirects résultant de l'utilisation du Service.
                    </p>
                </Section>
                
                <Section title="7. Modification des Conditions">
                    <p>
                        Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications seront effectives dès leur publication sur cette page. Il est de votre responsabilité de consulter régulièrement cette page.
                    </p>
                </Section>

                <Section title="8. Contact">
                     <p>
                        Pour toute question concernant ces CGU, veuillez nous contacter à l'adresse lyria.team@gmail.com.
                    </p>
                </Section>
            </div>
        </GlassCard>
    );
};

export default TOS;