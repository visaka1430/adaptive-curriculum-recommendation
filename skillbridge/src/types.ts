export type AppScreen = 
  | 'desktop-auth' 
  | 'mobile-auth' 
  | 'dashboard' 
  | 'zero-data-showcase';

export type UserRole = 'student' | 'institution';

export interface UserProfile {
  name: string;
  email: string;
  major: string;
  classYear: string;
  university: string;
  avatar?: string;
  role: UserRole;
  gpa: string;
  competencyScore: number;
  marketReadiness: string;
  verifiedBadgesCount: number;
  activeCapstonesCount: number;
}

export interface CredentialRecord {
  id: string;
  title: string;
  subtitle: string;
  badgeId: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'Verified' | 'Pending Institutional Verification' | 'Revoked';
  institutionalSignOff: string;
  description: string;
  skills: string[];
  artifactName: string;
  artifactSize: string;
  artifactHash: string;
  blockchainTx: string;
  category: 'certificate' | 'project' | 'competition' | 'publication' | 'activity';
}

export interface ProjectRecord {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  duration: string;
  teamSize: string;
  role: string;
  benchmark: string;
  description: string;
  techStack: string[];
  githubUrl: string;
}

export interface CompetitionRecord {
  id: string;
  title: string;
  rank: string;
  track: string;
  host: string;
  date: string;
  awardingBody: string;
  role: string;
  abstract: string;
  stats: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'verification' | 'placement' | 'competition' | 'system';
}

export interface ZeroStatePattern {
  id: number;
  patternCode: string;
  module: 'student' | 'institution';
  subCategory: string;
  headline: string;
  description: string;
  primaryCta: string;
  primaryIcon: string;
  secondaryCta: string;
  badgeText: string;
  badgeColor?: string;
  svgType: 'cert' | 'rocket' | 'trophy' | 'book' | 'puzzle' | 'calendar' | 'grand';
}
