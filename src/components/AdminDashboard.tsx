import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/SupabaseUserContext';
import { supabase } from '../services/supabaseClient';
import GlassCard from './common/GlassCard';
import { SubscriptionPlan } from '../types';
import * as authService from '../services/authService';
import { PlanService } from '../services/planService';
import { DataContext } from '../contexts/DataContext';

interface AdminStats {
  total_users: number;
  active_users_today: number;
  total_generations: number;
  total_credits_spent: number;
  plan_distribution: Record<string, number>;
  recent_signups: number;
  secret_society_members: number;
  banned_users: number;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  plan: string;
  credits: number;
  is_admin: boolean;
  is_banned: boolean;
  created_at: string;
  last_login: string;
  total_generations: number;
}

const AdminDashboard: React.FC = () => {
  const { user, adminSetBroadcast, adminClearBroadcast, adminGrantCredits, adminResetAchievements } = useContext(UserContext);
  const data = useContext(DataContext);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [broadcastText, setBroadcastText] = useState('');
  const [grantAmount, setGrantAmount] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to get display name for plan
  const getPlanDisplayName = (planValue: string): string => {
    if (!data) return planValue;
    
    const plan = data.plans.find(p => p.id === planValue);
    return plan ? plan.name : planValue;
  };

  // Debug: Log user state
  console.log('AdminDashboard - User state:', user);

  // Redirect if not admin
  if (!user.isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GlassCard className="p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Non Connecté</h2>
          <p className="text-muted-color">Vous devez être connecté pour accéder à cette page.</p>
        </GlassCard>
      </div>
    );
  }

  if (!user.isAdmin && user.plan !== SubscriptionPlan.SecretSociety) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GlassCard className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Accès Refusé</h2>
          <p className="text-muted-color">Vous devez être administrateur ou membre Lyr-IA Society pour accéder à cette page.</p>
        </GlassCard>
      </div>
    );
  }

  useEffect(() => {
    console.log('🚀 AdminDashboard mounted, loading initial data...');
    loadAdminData();
  }, []);

  useEffect(() => {
    if (!autoRefreshEnabled) {
      console.log('⏸️ Auto-refresh disabled');
      return;
    }

    console.log('🔄 Setting up auto-refresh interval (10s)');
    const interval = setInterval(() => {
      console.log('🔄 Auto-refresh admin data...');
      loadAdminData();
    }, 10000);
    
    return () => {
      console.log('🧹 Cleaning up auto-refresh interval');
      clearInterval(interval);
    };
  }, [autoRefreshEnabled]);

  // Fonction de rafraîchissement manuel
  const handleRefresh = async () => {
    console.log('🔄 Manual refresh triggered');
    await loadAdminData();
  };

  const loadAdminData = async () => {
    try {
      console.log('📊 Loading admin data...');
      setIsRefreshing(true);
      setLoading(true);
      
      // Load users first to calculate stats
      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      // Load song history for more accurate generation count
      const { data: historyData, error: historyError } = await supabase
        .from('song_history')
        .select('user_id, credits_used, created_at')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error loading users:', usersError);
        throw usersError;
      }
      
      console.log('Users loaded:', usersData?.length || 0);
      console.log('History loaded:', historyData?.length || 0);
      const allUsers = usersData || [];
      const songHistory = historyData || [];
      
      if (allUsers.length === 0) {
        console.warn('No users found in database');
        setStats({
          total_users: 0,
          active_users_today: 0,
          total_generations: 0,
          total_credits_spent: 0,
          plan_distribution: {},
          recent_signups: 0,
          secret_society_members: 0,
          banned_users: 0
        });
        setUsers([]);
        return;
      }
      
      // Exclure l'admin des statistiques
      const regularUsers = allUsers.filter(u => !u.is_admin);
      console.log('Regular users (excluding admin):', regularUsers.length);
      setUsers(allUsers); // Garder tous les utilisateurs pour la liste, mais calculer les stats sans l'admin

      // Calculate stats from user data (sans l'admin)
      const planDistribution: Record<string, number> = {};
      let secretSocietyMembers = 0;
      let bannedUsers = 0;

      regularUsers.forEach(user => {
        planDistribution[user.plan] = (planDistribution[user.plan] || 0) + 1;
        // Vérifier plusieurs variantes du nom de la Secret Society
        if (user.plan === SubscriptionPlan.SecretSociety) {
          secretSocietyMembers++;
        }
        if (user.is_banned) bannedUsers++;
      });

      // NE PAS ajouter l'admin aux statistiques - il est déjà exclu des regularUsers
      // L'admin n'apparaît que dans la liste des utilisateurs, pas dans les stats
      console.log('Admin plan:', user.plan, 'SecretSociety:', SubscriptionPlan.SecretSociety);

      // Log des plans pour débogage
      console.log('User plans found:', Object.keys(planDistribution));
      console.log('Secret Society members (regular users only):', secretSocietyMembers);
      console.log('Total regular users:', regularUsers.length);

      // Calculer les utilisateurs actifs aujourd'hui (dernière connexion dans les 24h) - sans l'admin
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const activeUsersToday = regularUsers.filter(u => {
        // Si pas de last_login, considérer comme actif si créé récemment (dans les 7 derniers jours)
        if (!u.last_login) {
          const createdAt = new Date(u.created_at);
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return createdAt >= weekAgo;
        }
        const lastLogin = new Date(u.last_login);
        return lastLogin >= yesterday;
      }).length;

      // Calculer les générations totales - méthode 1: basé sur l'historique des chansons
      let totalGenerations = 0;
      if (songHistory.length > 0) {
        // Utiliser l'historique réel des générations
        const regularUserIds = regularUsers.map(u => u.id);
        console.log('Regular user IDs:', regularUserIds);
        console.log('History user IDs:', songHistory.map(h => h.user_id));
        
        const regularUserHistory = songHistory.filter(h => regularUserIds.includes(h.user_id));
        console.log('Filtered history for regular users:', regularUserHistory.length);
        
        // Si le filtrage ne donne rien, utiliser toutes les générations (sauf celles de l'admin)
        if (regularUserHistory.length === 0) {
          const adminId = user.id; // ID de l'admin actuel
          const nonAdminHistory = songHistory.filter(h => h.user_id !== adminId);
          totalGenerations = nonAdminHistory.length;
          console.log('Using all non-admin history:', totalGenerations);
        } else {
          totalGenerations = regularUserHistory.length;
        }
        console.log('Final generations count:', totalGenerations);
      } else {
        // Méthode 2: estimation basée sur les crédits utilisés
        totalGenerations = regularUsers.reduce((sum, u) => {
          const currentCredits = typeof u.credits === 'number' ? u.credits : 150;
          
          // Si pas d'initial_credits, estimer basé sur le plan
          let initialCredits = u.initial_credits;
          if (!initialCredits) {
            switch (u.plan) {
              case 'Free': initialCredits = 150; break;
              case 'Creator': initialCredits = 1000; break;
              case 'Pro': initialCredits = 2000; break;
              case 'Ultimate': initialCredits = 5000; break;
              case 'SecretSociety': initialCredits = 10000; break;
              default: initialCredits = 150;
            }
          }
          
          const creditsUsed = Math.max(0, initialCredits - currentCredits);
          const userGenerations = Math.floor(creditsUsed / 5);
          
          console.log(`User ${u.username}: plan=${u.plan}, credits=${currentCredits}, initial=${initialCredits}, used=${creditsUsed}, generations=${userGenerations}`);
          return sum + userGenerations;
        }, 0);
        console.log('Generations from credits estimation:', totalGenerations);
      }

      console.log('📊 Stats calculation:', {
        totalUsers: regularUsers.length,
        activeUsersToday,
        totalGenerations,
        secretSocietyMembers,
        bannedUsers,
        planDistribution,
        allUsersCount: allUsers.length,
        regularUsersCount: regularUsers.length,
        adminIncluded: allUsers.filter(u => u.is_admin).length
      });

      setStats({
        total_users: regularUsers.length, // Nombre d'utilisateurs sans l'admin
        active_users_today: activeUsersToday,
        total_generations: Math.round(totalGenerations),
        total_credits_spent: regularUsers.reduce((sum, u) => {
          const currentCredits = typeof u.credits === 'number' ? u.credits : 150;
          
          // Si pas d'initial_credits, estimer basé sur le plan
          let initialCredits = u.initial_credits;
          if (!initialCredits) {
            switch (u.plan) {
              case 'Free': initialCredits = 150; break;
              case 'Creator': initialCredits = 1000; break;
              case 'Pro': initialCredits = 2000; break;
              case 'Ultimate': initialCredits = 5000; break;
              case 'SecretSociety': initialCredits = 10000; break;
              default: initialCredits = 150;
            }
          }
          
          return sum + Math.max(0, initialCredits - currentCredits);
        }, 0),
        plan_distribution: planDistribution,
        recent_signups: regularUsers.filter(u => {
          const createdAt = new Date(u.created_at);
          const today = new Date();
          return createdAt.toDateString() === today.toDateString();
        }).length,
        secret_society_members: secretSocietyMembers,
        banned_users: bannedUsers
      });
    } catch (error) {
      console.error('❌ Error loading admin data:', error);
      // Afficher une notification d'erreur à l'utilisateur
      alert('Erreur lors du chargement des données. Vérifiez la connexion.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }
  };

  const banUser = async (userId: string, ban: boolean) => {
    try {
      setActionLoading(true);
      
      // Try using the function first, fallback to direct update
      const { error: funcError } = await supabase
        .rpc('admin_ban_user', {
          target_user_id: userId,
          ban_status: ban,
          reason: ban ? 'Banned by admin' : 'Unbanned by admin'
        });
      
      if (funcError) {
        // Fallback to direct update
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ is_banned: ban })
          .eq('id', userId);
        
        if (updateError) throw updateError;
      }
      
      await loadAdminData();
      setSelectedUser(null);
      
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Erreur lors de la modification du statut de l\'utilisateur');
    } finally {
      setActionLoading(false);
    }
  };

  const upgradePlan = async (userId: string, newPlan: string, credits: number = 0) => {
    try {
      setActionLoading(true);
      
      // Try using the function first, fallback to direct update
      const { error: funcError } = await supabase
        .rpc('admin_upgrade_user_plan', {
          target_user_id: userId,
          new_plan: newPlan,
          credits_to_add: credits
        });
      
      if (funcError) {
        // Fallback to direct update
        const updateData: any = { plan: newPlan };
        if (newPlan === 'SecretSociety') {
          updateData.credits = -1; // unlimited
        } else if (credits > 0) {
          // Get current credits first
          const { data: currentUser } = await supabase
            .from('user_profiles')
            .select('credits')
            .eq('id', userId)
            .single();
          
          if (currentUser) {
            updateData.credits = currentUser.credits + credits;
          }
        }
        
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update(updateData)
          .eq('id', userId);
        
        if (updateError) throw updateError;
      }

      await loadAdminData();
      setSelectedUser(null);

    } catch (error) {
      console.error('Error upgrading plan:', error);
      alert('Erreur lors de la mise à niveau du plan');
    } finally {
      setActionLoading(false);
    }
  };

  const upgradePlanNew = async (userId: string, newPlan: string) => {
    try {
      setActionLoading(true);

      // Utiliser notre nouveau service de gestion des plans
      const { error, transition } = await authService.changePlan(userId, newPlan as SubscriptionPlan);

      if (error) {
        console.error('Error changing plan:', error);
        alert(`Erreur lors du changement de plan: ${error}`);
        return;
      }

      console.log('✅ Plan changed successfully:', transition);

      // Recharger les données admin
      await loadAdminData();
      setSelectedUser(null);

      // Afficher un message de succès
      if (transition) {
        alert(`Plan changé avec succès!\nDe: ${transition.fromPlan}\nVers: ${transition.toPlan}\nNouveaux crédits: ${transition.newCredits}`);
      }
    } catch (error) {
      console.error('Error upgrading plan:', error);
      alert('Erreur lors du changement de plan');
    } finally {
      setActionLoading(false);
    }
  };

  const fixUserCredits = async (userId: string) => {
    try {
      setActionLoading(true);

      // Récupérer le profil utilisateur
      const profile = await authService.getUserProfile(userId);
      if (!profile) {
        alert('Profil non trouvé');
        return;
      }

      // Normaliser les crédits selon le plan
      const normalizedCredits = PlanService.normalizeCreditsToPlan(profile.plan as SubscriptionPlan, profile.credits);

      console.log('🔧 Correction des crédits:', {
        plan: profile.plan,
        currentCredits: profile.credits,
        normalizedCredits
      });

      // Mettre à jour si nécessaire
      if (normalizedCredits !== profile.credits) {
        const { error } = await authService.updateUserProfile(userId, { credits: normalizedCredits });
        if (error) {
          alert(`Erreur lors de la correction: ${error}`);
          return;
        }
        console.log('✅ Crédits corrigés avec succès');
        await loadAdminData();
        setSelectedUser(null);
        alert(`Crédits corrigés!\nPlan: ${profile.plan}\nAnciens crédits: ${profile.credits}\nNouveaux crédits: ${normalizedCredits}`);
      } else {
        alert('Les crédits sont déjà corrects pour ce plan');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la correction des crédits:', error);
      alert('Erreur lors de la correction des crédits');
    } finally {
      setActionLoading(false);
    }
  };

  const createSecretInvitation = async () => {
    if (!inviteEmail) return;
    
    try {
      setActionLoading(true);
      
      const { data, error } = await supabase
        .rpc('create_secret_society_invitation', {
          invitee_email: inviteEmail
        });
      
      if (error) {
        // Fallback: generate simple code
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        alert(`Code d'invitation généré: ${code}\n(Fonctions avancées non disponibles)`);
      } else {
        alert(`Code d'invitation Secret Society créé: ${data}`);
      }
      
      setInviteEmail('');
      
    } catch (error) {
      console.error('Error creating invitation:', error);
      alert('Erreur lors de la création de l\'invitation');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-color">🔧 Panneau d'Administration Lyr-IA</h1>
          {lastUpdate && (
            <p className="text-sm text-muted-color mt-1">
              Dernière mise à jour : {lastUpdate.toLocaleTimeString()}
              {isRefreshing && (
                <span className="ml-2 text-primary animate-pulse">🔄 Actualisation...</span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-color">
            <input
              type="checkbox"
              checked={autoRefreshEnabled}
              onChange={(e) => setAutoRefreshEnabled(e.target.checked)}
              className="rounded"
            />
            Auto-refresh (10s)
          </label>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Chargement...' : isRefreshing ? '🔄 Actualisation...' : '🔄 Actualiser'}
          </button>
        </div>
      </div>
      
      {/* Dashboard Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-base-color mb-2">👥 Utilisateurs Total</h3>
            <p className="text-3xl font-bold text-primary">{stats.total_users}</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-base-color mb-2">🟢 Actifs Aujourd'hui</h3>
            <p className="text-3xl font-bold text-green-400">{stats.active_users_today}</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-base-color mb-2">🎵 Générations Total</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.total_generations}</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-base-color mb-2">🔮 Lyr-IA Society</h3>
            <p className="text-3xl font-bold text-purple-400">{stats.secret_society_members}</p>
          </GlassCard>
        </div>
      )}

      {/* Secret Society Invitations */}
      <GlassCard className="p-6 mb-8">
        <h3 className="text-xl font-semibold text-base-color mb-4">🔮 Invitations Lyr-IA Society</h3>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email à inviter..."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 p-3 bg-black/20 border border-white/10 rounded text-base-color placeholder-muted-color"
          />
          <button
            onClick={createSecretInvitation}
            disabled={actionLoading || !inviteEmail}
            className="px-6 py-3 bg-purple-500/20 text-purple-300 rounded font-medium hover:bg-purple-500/30 disabled:opacity-50"
          >
            Créer Invitation
          </button>
        </div>
      </GlassCard>

      {/* Admin Broadcast & Credits */}
      <GlassCard className="p-6 mb-8">
        <h3 className="text-xl font-semibold text-base-color mb-4">📣 Annonces & Crédits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-color mb-2">Annonce (bannière)</label>
            <textarea
              className="w-full p-3 bg-black/20 border border-white/10 rounded text-base-color placeholder-muted-color min-h-[90px]"
              placeholder="Message d'annonce à afficher pour tous les utilisateurs..."
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button onClick={() => adminSetBroadcast(broadcastText)} disabled={actionLoading || !broadcastText} className="px-4 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 disabled:opacity-50">Publier</button>
              <button onClick={() => adminClearBroadcast()} disabled={actionLoading} className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded hover:bg-gray/30">Effacer</button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted-color mb-2">Donner des crédits (à un utilisateur via modal ci-dessous ou à soi-même)</label>
            <div className="flex items-center gap-2">
              <input type="number" className="flex-1 p-3 bg-black/20 border border-white/10 rounded text-base-color" placeholder="Montant" value={grantAmount} onChange={(e) => setGrantAmount(Number(e.target.value || 0))} />
              <button onClick={() => adminGrantCredits(grantAmount)} disabled={actionLoading || grantAmount <= 0} className="px-4 py-2 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 disabled:opacity-50">Crédits +</button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Plan Distribution */}
      {stats && (
        <GlassCard className="p-6 mb-8">
          <h3 className="text-xl font-semibold text-base-color mb-4">📊 Distribution des Plans</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(stats.plan_distribution).map(([plan, count]) => (
              <div key={plan} className="text-center">
                <p className="text-sm text-muted-color">{plan}</p>
                <p className="text-2xl font-bold text-primary">{count}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Users Management */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-base-color mb-4">👥 Gestion des Utilisateurs</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2">Utilisateur</th>
                <th className="text-left p-2">Plan</th>
                <th className="text-left p-2">Crédits</th>
                <th className="text-left p-2">Statut</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 20).map((userProfile) => (
                <tr key={userProfile.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-2">
                    <div>
                      <p className="font-medium text-base-color">{userProfile.username}</p>
                      <p className="text-xs text-muted-color">{userProfile.email}</p>
                    </div>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      userProfile.plan === SubscriptionPlan.SecretSociety ? 'bg-purple-500/20 text-purple-300' :
                      userProfile.plan === 'Ultimate' ? 'bg-yellow-500/20 text-yellow-300' :
                      userProfile.plan === 'Pro' ? 'bg-blue-500/20 text-blue-300' :
                      userProfile.plan === 'Discovery' ? 'bg-green-500/20 text-green-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {getPlanDisplayName(userProfile.plan)}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className="text-base-color">
                      {userProfile.credits === -1 ? '∞' : userProfile.credits}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col gap-1">
                      {userProfile.is_admin && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">👑 Admin</span>
                      )}
                      {userProfile.is_banned && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">🚫 Banni</span>
                      )}
                    </div>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => setSelectedUser(userProfile)}
                      className="px-3 py-1 bg-primary/20 text-primary rounded text-xs hover:bg-primary/30"
                    >
                      Gérer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* User Management Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassCard className="p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-base-color mb-4">
              Gérer {selectedUser.username}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-color mb-2">Plan actuel: {selectedUser.plan}</label>
                <select
                  className="w-full p-2 bg-black/20 border border-white/10 rounded text-base-color"
                  onChange={(e) => e.target.value && upgradePlanNew(selectedUser.id, e.target.value)}
                  disabled={actionLoading}
                >
                  <option value="">Changer le plan...</option>
                  <option value="Découverte">Découverte</option>
                  <option value="Creator">Creator</option>
                  <option value="Pro">Pro</option>
                  <option value="Ultimate">Ultimate</option>
                  <option value="Business">Business</option>
                  <option value="Lyr-IA Society">Lyr-IA Society</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-color mb-2">Crédits actuels: {selectedUser.credits}</label>
                <button
                  onClick={() => fixUserCredits(selectedUser.id)}
                  disabled={actionLoading}
                  className="w-full py-2 px-4 bg-blue-500/20 text-blue-300 rounded font-medium hover:bg-blue-500/30 disabled:opacity-50"
                >
                  🔧 Corriger les crédits selon le plan
                </button>
                <div className="flex gap-2 mt-2">
                  <input type="number" className="flex-1 p-2 bg-black/20 border border-white/10 rounded text-base-color" placeholder="Montant à donner" onChange={(e) => setGrantAmount(Number(e.target.value || 0))} />
                  <button onClick={() => adminGrantCredits(grantAmount, selectedUser.id)} disabled={actionLoading || grantAmount <= 0} className="px-4 py-2 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 disabled:opacity-50">Donner</button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => banUser(selectedUser.id, !selectedUser.is_banned)}
                  disabled={actionLoading}
                  className={`flex-1 py-2 px-4 rounded font-medium ${
                    selectedUser.is_banned 
                      ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                      : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                  }`}
                >
                  {selectedUser.is_banned ? 'Débannir' : 'Bannir'}
                </button>
                <button
                  onClick={() => adminResetAchievements(selectedUser.id)}
                  disabled={actionLoading}
                  className="flex-1 py-2 px-4 bg-yellow-500/20 text-yellow-300 rounded font-medium hover:bg-yellow-500/30"
                >
                  Réinitialiser Succès
                </button>
                
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 py-2 px-4 bg-gray-500/20 text-gray-300 rounded font-medium hover:bg-gray-500/30"
                >
                  Fermer
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
