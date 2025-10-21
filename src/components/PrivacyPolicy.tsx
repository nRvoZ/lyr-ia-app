import React from 'react';
import GlassCard from './common/GlassCard';

const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

interface PrivacyPolicyProps {
    onExit: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onExit }) => {
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
                    <h2 className="text-2xl font-bold text-base-color">Politique de Confidentialité</h2>
                    <p className="text-sm text-muted-color">Dernière mise à jour : 28 Juillet 2024</p>
                </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4">
                <Section title="1. Introduction">
                    <p>
                        Lyr-IA ("nous", "notre") s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez nos services.
                    </p>
                </Section>

                <Section title="2. Informations que nous collectons">
                    <p>
                        <strong>Informations de compte :</strong> Lors de la création d'un compte, nous collectons votre adresse e-mail, un nom d'utilisateur et un mot de passe chiffré.
                    </p>
                    <p>
                        <strong>Contenu de génération :</strong> Nous stockons votre historique de génération (prompts, textes et images générés) pour que vous puissiez y accéder ultérieurement. Pour les utilisateurs non connectés, ces données sont stockées localement dans votre navigateur.
                    </p>
                    <p>
                        <strong>Données pour l'IA-Training (Profil Perso) :</strong> Si vous utilisez cette fonctionnalité, les descriptions de style et les exemples de paroles que vous fournissez sont sauvegardés dans votre profil personnel.
                    </p>
                </Section>
                
                <Section title="3. Comment nous utilisons vos informations">
                    <p>
                        Vos informations sont utilisées exclusivement pour :
                        <ul className="list-disc list-inside mt-2 ml-4">
                            <li>Fournir, maintenir et améliorer le Service.</li>
                            <li>Personnaliser votre expérience et sauvegarder votre progression.</li>
                            <li>Gérer votre compte, vos crédits et vos abonnements.</li>
                            <li>Transmettre vos requêtes aux API d'IA tierces (Google Gemini) pour générer le contenu.</li>
                        </ul>
                    </p>
                </Section>

                <Section title="4. Confidentialité de l'IA-Training (Profil Perso)">
                    <p>
                        <strong>Votre contenu reste le vôtre.</strong> Les textes et descriptions que vous fournissez pour entraîner vos profils personnels sont considérés comme des données confidentielles.
                    </p>
                     <p>
                        Nous nous engageons à <strong>NE PAS</strong> utiliser ces données pour entraîner des modèles d'IA globaux. Elles ne sont transmises à l'API de Google qu'au moment de votre demande de génération personnelle et ne sont pas stockées ni réutilisées par nous ou nos partenaires pour d'autres fins que la génération de votre contenu.
                    </p>
                </Section>
                
                <Section title="5. Partage d'informations et services tiers">
                    <p>
                        Nous ne vendons, n'échangeons, ni ne louons vos informations personnelles à des tiers. Vos prompts et données d'entraînement sont envoyés à l'API de Google Gemini pour traitement. L'utilisation de ces données par Google est régie par leur propre politique de confidentialité. Nous ne partageons que le strict nécessaire pour que le service fonctionne.
                    </p>
                </Section>
                
                <Section title="6. Sécurité et stockage des données">
                    <p>
                        Les données de votre compte (historique, profils) sont stockées de manière sécurisée. Nous utilisons le stockage local de votre navigateur pour une expérience fluide et pour les utilisateurs non connectés.
                    </p>
                </Section>

                <Section title="7. Vos droits et votre contrôle">
                    <p>
                        Vous avez le contrôle total sur vos données. Vous pouvez à tout moment modifier vos profils personnels, effacer votre historique depuis l'onglet "Mon Espace", ou supprimer votre compte en nous contactant.
                    </p>
                </Section>
                
                <Section title="8. Modifications de cette politique">
                    <p>
                        Nous pouvons mettre à jour cette Politique de Confidentialité. Nous vous notifierons de tout changement en publiant la nouvelle politique sur cette page.
                    </p>
                </Section>
            </div>
        </GlassCard>
    );
};

export default PrivacyPolicy;