'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Heart,
  Play,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react';
import type { Review } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { getSeriesById, series as allSeries } from '@/lib/mock-data';
import SeriesRow from './SeriesRow';

export default function SeriesDetail() {
  const { currentView, goBack, navigate, toggleWatchlist, watchlist, addReview } = useAppStore();
  const seriesId = currentView.type === 'series' ? currentView.seriesId : '';
  const series = getSeriesById(seriesId);
  const storeReviews = useAppStore((s) => s.reviews.filter((r: Review) => r.seriesId === seriesId));
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40">Series not found</p>
      </div>
    );
  }

  const isWatchlisted = watchlist.has(series.id);
  const currentSeason = series.seasons.find((s) => s.number === selectedSeason);
  const similarSeries = allSeries
    .filter(
      (s) =>
        s.id !== series.id &&
        s.genre.some((g) => series.genre.includes(g))
    )
    .slice(0, 10);

  const statusColor =
    series.status === 'Airing'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : series.status === 'Completed'
        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';

  return (
    <div className="min-h-screen pb-10">
      {/* Backdrop */}
      <div className="relative h-[45vh] min-h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${series.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/50 via-[#0a0a1a]/20 to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-transparent to-transparent" />

        {/* Top Buttons */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-5 pt-14">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
          >
            <ArrowLeft size={18} className="text-white" />
          </motion.button>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
            >
              <Share2 size={16} className="text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => toggleWatchlist(series.id)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10"
            >
              <Heart
                size={16}
                className={
                  isWatchlisted
                    ? 'fill-pink-500 text-pink-500'
                    : 'text-white'
                }
              />
            </motion.button>
          </div>
        </div>

        {/* Poster overlapping */}
        <div className="absolute -bottom-16 left-5 z-10">
          <div className="w-[110px] rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 ring-2 ring-white/10">
            <img
              src={series.poster}
              alt={series.title}
              className="w-full aspect-[2/3] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="px-5 pt-20"
      >
        {/* Title */}
        <h1 className="text-2xl font-extrabold gradient-text leading-tight">
          {series.title}
        </h1>

        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-2 mt-3">
          <span className="text-white/50 text-sm">{series.year}</span>
          <span className="text-white/20">·</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60">
            {series.maturity}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white/50 text-sm">
            {series.seasons.length} Season{series.seasons.length > 1 ? 's' : ''}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white/50 text-sm">
            {series.totalEpisodes} Episodes
          </span>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400">
              {series.rating.toFixed(1)}
            </span>
            <span className="text-white/30 text-xs">
              ({(series.ratingCount / 1000).toFixed(0)}K)
            </span>
          </div>
        </div>

        {/* Genre Pills */}
        <div className="flex items-center flex-wrap gap-2 mt-3">
          {series.genre.map((g) => (
            <span
              key={g}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60"
            >
              {g}
            </span>
          ))}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
            {series.status}
          </span>
        </div>

        {/* Play Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate({ type: 'episode', seriesId: series.id, seasonNumber: 1, episodeNumber: 1 })}
          className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
        >
          <Play size={20} fill="white" />
          Play First Episode
        </motion.button>

        {/* Synopsis */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-white/80 mb-2">Synopsis</h3>
          <p
            className={`text-sm leading-relaxed text-white/50 ${
              synopsisExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {series.description}
          </p>
          <button
            onClick={() => setSynopsisExpanded(!synopsisExpanded)}
            className="flex items-center gap-1 mt-2 text-xs text-purple-400 font-medium"
          >
            {synopsisExpanded ? (
              <>
                Show Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Read More <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>

        {/* Seasons Tabs */}
        {series.seasons.length > 1 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {series.seasons.map((season) => (
                <button
                  key={season.number}
                  onClick={() => setSelectedSeason(season.number)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedSeason === season.number
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Season {season.number}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Episodes List */}
        {currentSeason && (
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-white/80 mb-3">
              Episodes · Season {currentSeason.number} ({currentSeason.year})
            </h3>
            <div className="space-y-3">
              {currentSeason.episodes.map((ep, i) => (
                <EpisodeItem
                  key={ep.id}
                  episodeNumber={ep.number}
                  title={ep.title}
                  description={ep.description}
                  duration={ep.duration}
                  rating={ep.rating}
                  thumbnail={ep.thumbnail}
                  index={i}
                  onClick={() => navigate({ type: 'episode', seriesId: series.id, seasonNumber: selectedSeason, episodeNumber: ep.number })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        {series.cast.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Cast</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {series.cast.map((member) => (
                <motion.button
                  key={member.name}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate({ type: 'cast', castName: member.name, castPhoto: member.photo, castRole: member.role })}
                  className="flex-shrink-0 flex flex-col items-center gap-2 w-20 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 shadow-lg shadow-purple-500/10">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs font-semibold text-white text-center leading-tight truncate w-full">
                    {member.name}
                  </p>
                  <p className="text-[10px] text-white/40 text-center truncate w-full">
                    {member.role}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white/80">Reviews</h3>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-xs font-medium text-purple-400 hover:text-purple-300"
            >
              {showReviewForm ? 'Cancel' : 'Write Review'}
            </button>
          </div>

          {showReviewForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <button key={star} onClick={() => setReviewRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
                    <Star size={24} className={star <= (hoverRating || reviewRating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
                  </button>
                ))}
                <span className="text-xs text-white/40 ml-2">{reviewRating > 0 ? `${reviewRating}/5` : 'Select rating'}</span>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 resize-none h-20 focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={() => {
                  if (reviewRating > 0 && reviewText.trim()) {
                    addReview({
                      id: `r-${Date.now()}`,
                      seriesId: series.id,
                      author: 'CineViewer',
                      rating: reviewRating,
                      text: reviewText,
                      date: new Date().toISOString().split('T')[0],
                    });
                    setReviewRating(0);
                    setReviewText('');
                    setShowReviewForm(false);
                  }
                }}
                disabled={reviewRating === 0 || !reviewText.trim()}
                className="mt-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </motion.div>
          )}

          {storeReviews.length === 0 && !showReviewForm ? (
            <p className="text-sm text-white/30">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-3">
              {storeReviews.map((review) => (
                <div key={review.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{review.author}</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={10} className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-white/30">{review.date}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Series */}
        {similarSeries.length > 0 && (
          <div className="mt-8 mb-6">
            <SeriesRow title="Similar Series" series={similarSeries} emoji="🎬" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function EpisodeItem({
  episodeNumber,
  title,
  description,
  duration,
  rating,
  thumbnail,
  index,
  onClick,
}: {
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  rating: number;
  thumbnail: string;
  index: number;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-[130px] flex-shrink-0 aspect-video rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Play size={14} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-purple-400">{episodeNumber}</span>
          <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center gap-1">
            <Clock size={11} className="text-white/30" />
            <span className="text-xs text-white/40">{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
