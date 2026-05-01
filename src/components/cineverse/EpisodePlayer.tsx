'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Play,
  Clock,
  Star,
  ChevronLeft,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getSeriesById } from '@/lib/mock-data';

export default function EpisodePlayer() {
  const { currentView, goBack, navigate, toggleWatchlist, watchlist, updateProgress } = useAppStore();
  const seriesId = currentView.type === 'episode' ? currentView.seriesId : '';
  const seasonNumber = currentView.type === 'episode' ? currentView.seasonNumber : 1;
  const episodeNumber = currentView.type === 'episode' ? currentView.episodeNumber : 1;

  const series = getSeriesById(seriesId);

  const episode = useMemo(() => {
    if (!series) return null;
    const season = series.seasons.find((s) => s.number === seasonNumber);
    if (!season) return null;
    return season.episodes.find((ep) => ep.number === episodeNumber) ?? null;
  }, [series, seasonNumber, episodeNumber]);

  const hasNextEpisode = useMemo(() => {
    if (!series) return false;
    const currentSeason = series.seasons.find((s) => s.number === seasonNumber);
    if (!currentSeason) return false;
    const nextInSeason = currentSeason.episodes.find((ep) => ep.number === episodeNumber + 1);
    if (nextInSeason) return true;
    const nextSeason = series.seasons.find((s) => s.number === seasonNumber + 1);
    return nextSeason ? nextSeason.episodes.length > 0 : false;
  }, [series, seasonNumber, episodeNumber]);

  const nextSeasonNum = useMemo(() => {
    if (!series) return seasonNumber;
    const currentSeason = series.seasons.find((s) => s.number === seasonNumber);
    if (!currentSeason) return seasonNumber;
    const nextInSeason = currentSeason.episodes.find((ep) => ep.number === episodeNumber + 1);
    if (nextInSeason) return seasonNumber;
    const nextSeason = series.seasons.find((s) => s.number === seasonNumber + 1);
    return nextSeason ? nextSeason.number : seasonNumber;
  }, [series, seasonNumber, episodeNumber]);

  const nextEpisodeNum = useMemo(() => {
    if (!series) return episodeNumber;
    const currentSeason = series.seasons.find((s) => s.number === seasonNumber);
    if (!currentSeason) return episodeNumber;
    const nextInSeason = currentSeason.episodes.find((ep) => ep.number === episodeNumber + 1);
    if (nextInSeason) return nextInSeason.number;
    return 1;
  }, [series, seasonNumber, episodeNumber]);

  const hasPreviousEpisode = useMemo(() => {
    if (!series) return false;
    if (episodeNumber > 1) return true;
    const prevSeason = series.seasons.find((s) => s.number === seasonNumber - 1);
    return prevSeason ? prevSeason.episodes.length > 0 : false;
  }, [series, seasonNumber, episodeNumber]);

  const prevSeasonNum = useMemo(() => {
    if (episodeNumber > 1) return seasonNumber;
    if (!series) return seasonNumber;
    const prevSeason = series.seasons.find((s) => s.number === seasonNumber - 1);
    return prevSeason ? prevSeason.number : seasonNumber;
  }, [series, seasonNumber, episodeNumber]);

  const prevEpisodeNum = useMemo(() => {
    if (episodeNumber > 1) return episodeNumber - 1;
    if (!series) return episodeNumber;
    const prevSeason = series.seasons.find((s) => s.number === seasonNumber - 1);
    if (!prevSeason) return episodeNumber;
    return prevSeason.episodes[prevSeason.episodes.length - 1]?.number ?? episodeNumber;
  }, [series, seasonNumber, episodeNumber]);

  useEffect(() => {
    if (series && episode) {
      updateProgress({
        seriesId,
        seasonNumber,
        episodeNumber,
        progress: Math.floor(Math.random() * 35),
      });
    }
  }, [seriesId, seasonNumber, episodeNumber, series, episode, updateProgress]);

  if (!series || !episode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <p className="text-white/40">Episode not found</p>
      </div>
    );
  }

  const isWatchlisted = watchlist.has(series.id);

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 pt-14 bg-[#0a0a1a]/80 backdrop-blur-xl"
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
        >
          <ArrowLeft size={18} className="text-white" />
        </motion.button>

        <h1 className="text-sm font-semibold gradient-text truncate max-w-[60%] text-center">
          {episode.title}
        </h1>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => toggleWatchlist(series.id)}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
        >
          <Heart
            size={16}
            className={isWatchlisted ? 'fill-pink-500 text-pink-500' : 'text-white'}
          />
        </motion.button>
      </motion.div>

      {/* Video Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative w-full aspect-video overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${episode.thumbnail})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[#0a0a1a]/30" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl shadow-purple-500/20"
          >
            <Play size={32} fill="white" className="text-white ml-1" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '35%' }}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </motion.div>

      {/* Episode Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="px-5 pt-5"
      >
        {/* Episode Number */}
        <p className="text-sm font-bold text-purple-400">
          S{String(seasonNumber).padStart(2, '0')}E{String(episodeNumber).padStart(2, '0')}
        </p>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mt-1">
          {episode.title}
        </h2>

        {/* Metadata Row */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-white/40" />
            <span className="text-sm text-white/50">{episode.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400">
              {episode.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-white/40">
            {new Date(episode.airDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 mt-3 line-clamp-4 leading-relaxed">
          {episode.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 pb-8">
          {hasNextEpisode && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate({
                  type: 'episode',
                  seriesId: series.id,
                  seasonNumber: nextSeasonNum,
                  episodeNumber: nextEpisodeNum,
                })
              }
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
            >
              <Play size={18} fill="white" />
              Play Next Episode
            </motion.button>
          )}

          {hasPreviousEpisode && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate({
                  type: 'episode',
                  seriesId: series.id,
                  seasonNumber: prevSeasonNum,
                  episodeNumber: prevEpisodeNum,
                })
              }
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
              Previous Episode
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
