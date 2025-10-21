import React, { useState, useEffect, useContext } from 'react';
import { Playlist, PlaylistSong } from '../../services/playlistService';
import { CommunityPost } from '../../services/communityService';
import * as playlistService from '../../services/playlistService';
import * as communityService from '../../services/communityService';
import { UserContext } from '../../contexts/SupabaseUserContext';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Toast from '../common/Toast';

interface PlaylistManagerProps {
  onClose: () => void;
  onPlaylistCreated?: (playlist: Playlist) => void;
  initialPlaylist?: Playlist;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  onClose,
  onPlaylistCreated,
  initialPlaylist,
}) => {
  const { user } = useContext(UserContext);
  const [playlist, setPlaylist] = useState<Playlist | null>(initialPlaylist || null);
  const [songs, setSongs] = useState<PlaylistSong[]>([]);
  const [availableSongs, setAvailableSongs] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState(initialPlaylist?.name || '');
  const [description, setDescription] = useState(initialPlaylist?.description || '');
  const [isPublic, setIsPublic] = useState(initialPlaylist?.is_public ?? true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialPlaylist) {
      loadPlaylistSongs();
      loadAvailableSongs();
    }
    // Ne pas charger les chansons disponibles pour une nouvelle playlist
    // Elles seront chargées après la création
  }, [initialPlaylist]);

  const loadPlaylistSongs = async () => {
    if (!initialPlaylist) return;
    
    setLoading(true);
    try {
      const { data, error } = await playlistService.getPlaylistSongs(initialPlaylist.id);
      if (error) throw error;
      setSongs(data || []);
    } catch (err) {
      setError('Erreur lors du chargement des chansons');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSongs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await communityService.getCommunityFeed(20, 0, 'recent');
      if (error) throw error;
      setAvailableSongs(data || []);
      
      if (!data || data.length === 0) {
        console.log('ℹ️ Aucune création partagée disponible pour les playlists');
        // Ajouter un message informatif pour l'utilisateur
        setAvailableSongs([]);
      }
    } catch (err) {
      console.error('Error loading available songs:', err);
      // Ne pas afficher d'erreur si c'est juste qu'il n'y a pas de créations
      if (err instanceof Error && err.message.includes('function does not exist')) {
        setError('Les fonctionnalités communautaires ne sont pas encore disponibles. Veuillez d\'abord partager des créations.');
      } else {
        setError('Erreur lors du chargement des chansons disponibles');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Le nom de la playlist est requis');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (initialPlaylist) {
        // Mise à jour
        const { success, error } = await playlistService.updatePlaylist(initialPlaylist.id, {
          name: name.trim(),
          description: description.trim() || undefined,
          is_public: isPublic,
        });

        if (error) throw error;
        setSuccess('Playlist mise à jour avec succès !');
      } else {
        // Création
        const { data, error } = await playlistService.createPlaylist(
          name.trim(),
          description.trim() || undefined,
          isPublic
        );

        if (error) throw error;
        
        // Mettre à jour l'état local avec la playlist créée
        if (data) {
          setPlaylist(data);
          setSuccess('Playlist créée avec succès ! Vous pouvez maintenant ajouter des chansons.');
          
          // Charger les chansons disponibles
          loadAvailableSongs();
          
          if (onPlaylistCreated) {
            onPlaylistCreated(data);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSong = async (postId: string) => {
    if (!playlist) return;

    setLoading(true);
    try {
      const { success, error } = await playlistService.addSongToPlaylist(playlist.id, postId);
      if (error) throw error;
      
      // Recharger les chansons
      await loadPlaylistSongs();
      setSuccess('Chanson ajoutée à la playlist !');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la chanson');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSong = async (postId: string) => {
    if (!playlist) return;

    setLoading(true);
    try {
      const { success, error } = await playlistService.removeSongFromPlaylist(playlist.id, postId);
      if (error) throw error;
      
      // Recharger les chansons
      await loadPlaylistSongs();
      setSuccess('Chanson retirée de la playlist !');
    } catch (err) {
      setError('Erreur lors de la suppression de la chanson');
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    if (!playlist) return;

    const newSongs = [...songs];
    const [movedSong] = newSongs.splice(fromIndex, 1);
    newSongs.splice(toIndex, 0, movedSong);

    // Mettre à jour les positions
    const songPositions = newSongs.map((song, index) => ({
      postId: song.post_id,
      songPosition: index + 1,
    }));

    setLoading(true);
    try {
      const { success, error } = await playlistService.reorderPlaylistSongs(playlist.id, songPositions);
      if (error) throw error;
      
      setSongs(newSongs);
      setSuccess('Ordre mis à jour !');
    } catch (err) {
      setError('Erreur lors de la réorganisation');
    } finally {
      setLoading(false);
    }
  };

  const filteredSongs = availableSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-base-color">
              {initialPlaylist ? 'Modifier la playlist' : 'Créer une playlist'}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-color hover:text-base-color transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
          {success && <Toast message={success} type="success" onClose={() => setSuccess(null)} />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulaire */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-base-color">Informations</h3>
              
              <div>
                <label className="block text-sm font-medium text-muted-color mb-2">
                  Nom de la playlist *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-base-color placeholder-muted-color focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ma super playlist..."
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-color mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-base-color placeholder-muted-color focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Décrivez votre playlist..."
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary"
                />
                <label htmlFor="isPublic" className="text-sm text-muted-color">
                  Playlist publique (visible par tous)
                </label>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleSave}
                  disabled={saving || !name.trim()}
                  className="flex-1"
                >
                  {saving ? 'Sauvegarde...' : initialPlaylist ? 'Mettre à jour' : 'Créer'}
                </Button>
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>

            {/* Gestion des chansons */}
            {!playlist && !initialPlaylist ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🎵</div>
                  <h3 className="text-lg font-semibold text-base-color mb-2">
                    Créez d'abord votre playlist
                  </h3>
                  <p className="text-sm text-muted-color">
                    Remplissez les informations et cliquez sur "Créer" pour commencer à ajouter des chansons
                  </p>
                </div>
              </div>
            ) : playlist && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-base-color">
                  Chansons ({songs.length})
                </h3>

                {/* Recherche */}
                <div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-base-color placeholder-muted-color focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Rechercher une chanson..."
                  />
                </div>

                {/* Liste des chansons */}
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <Loader />
                    </div>
                  ) : availableSongs.length === 0 ? (
                    <div className="text-center py-8 text-muted-color">
                      <div className="text-4xl mb-2">🎵</div>
                      <p className="text-sm">Aucune création partagée disponible</p>
                      <p className="text-xs mt-1">Partagez d'abord des créations pour les ajouter à vos playlists</p>
                    </div>
                  ) : filteredSongs.length === 0 ? (
                    <div className="text-center py-4 text-muted-color">
                      <p className="text-sm">Aucune chanson trouvée pour "{searchQuery}"</p>
                    </div>
                  ) : (
                    filteredSongs.map((song) => {
                      const isInPlaylist = songs.some(s => s.post_id === song.id);
                      
                      return (
                        <div
                          key={song.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            {song.album_art_url && (
                              <img
                                src={song.album_art_url}
                                alt="Album art"
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-base-color truncate">
                                {song.title}
                              </p>
                              <p className="text-xs text-muted-color truncate">
                                par {song.username}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => isInPlaylist ? handleRemoveSong(song.id) : handleAddSong(song.id)}
                            disabled={loading}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              isInPlaylist
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'bg-primary/20 text-primary hover:bg-primary/30'
                            }`}
                          >
                            {isInPlaylist ? 'Retirer' : 'Ajouter'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Chansons actuelles */}
                {songs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-color mb-2">
                      Chansons dans la playlist
                    </h4>
                    <div className="space-y-2">
                      {songs.map((song, index) => (
                        <div
                          key={song.id}
                          className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-color w-6">
                              {index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-base-color truncate">
                                {song.title}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveSong(song.post_id)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            Retirer
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default PlaylistManager;
