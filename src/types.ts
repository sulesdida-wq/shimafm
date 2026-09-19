export type Category = 
  | 'burundi'
  | 'politique'
  | 'economie'
  | 'societe'
  | 'culture'
  | 'musique'
  | 'sports'
  | 'international'
  | 'actualites';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: Category;
  subcategory?: string;
  province?: string;
  summary: string;
  content: string[] | string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  date: string;
  time: string;
  readTime: string;
  views: number;
  likes?: number;
  image: string;
  caption?: string;
  tags: string[];
  isHero?: boolean;
  isHeroSecondary?: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
}

export interface Show {
  id: string;
  title: string;
  host: string;
  hostRole?: string;
  hostAvatar?: string;
  time?: string;
  schedule?: string;
  days: string;
  description: string;
  image: string;
  category: string;
  isOnAirNow?: boolean;
}

export interface Host {
  id: string;
  name: string;
  role: string;
  show?: string;
  shows?: string[];
  bio: string;
  schedule: string;
  photo: string;
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
  };
  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
  };
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: 'Burundi' | 'Afrobeat' | 'Amapiano' | 'Hip-Hop' | 'Gospel' | 'R&B' | 'Afro-Fusion' | 'Reggae' | 'Zouk' | string;
  cover: string;
  duration: string;
  likes: number;
  plays: number;
  isTopBurundi?: boolean;
  isTrending?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Actualités' | 'Interviews' | 'Musique' | 'Culture' | 'Sports' | 'Émissions' | string;
  duration: string;
  views: number;
  date: string;
  thumbnail: string;
  youtubeId?: string;
  description: string;
}

export interface SportsMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  league: string;
  status: 'Terminé' | 'En direct' | 'À venir' | string;
  date: string;
  time: string;
}

export interface LeagueStanding {
  rank: number;
  team: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
}
