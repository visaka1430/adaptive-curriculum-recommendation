import React from 'react';

export const SkillBridgeLogo: React.FC<{ className?: string; inverted?: boolean }> = ({
  className = 'w-10 h-10',
  inverted = false,
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 32C12 20 20 14 24 14C28 14 36 20 40 32"
      stroke={inverted ? '#FFFFFF' : '#091426'}
      strokeWidth={inverted ? 4 : 3.5}
      strokeLinecap="round"
    />
    <path
      d="M12 36C15 28 20 24 24 24C28 24 33 28 36 36"
      stroke="#EE6356"
      strokeWidth={inverted ? 3 : 2.5}
      strokeDasharray="2 3"
      strokeLinecap="round"
    />
    <circle cx="8" cy="32" r="3.5" fill="#EE6356" />
    <circle cx="24" cy="14" r="3.5" fill={inverted ? '#FFFFFF' : '#091426'} />
    <circle cx="40" cy="32" r="3.5" fill="#EE6356" />
  </svg>
);

export const IllustrationCert: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-cert">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <rect x="36" y="28" width="80" height="96" rx="10" fill="#E0E3E5" opacity="0.6" />
      <path d="M46 44H96" stroke="#BCC7DE" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 54H80" stroke="#BCC7DE" strokeWidth="3" strokeLinecap="round" />
      <rect x="44" y="36" width="82" height="100" rx="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M44 46C44 40.4772 48.4772 36 54 36H116C121.523 36 126 40.4772 126 46V52H44V46Z" fill="#1E293B" />
      <circle cx="56" cy="44" r="2.5" fill="#EE6356" />
      <circle cx="64" cy="44" r="2.5" fill="#CBD5E1" />
      <circle cx="72" cy="44" r="2.5" fill="#CBD5E1" />
      <path d="M58 68H112" stroke="#505F76" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 78H96" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 88H106" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 98H84" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(94, 96)">
        <path d="M7 20L11 36L18 31L25 36L29 20" fill="#EE6356" opacity="0.9" />
        <circle cx="18" cy="16" r="14" fill="#EE6356" />
        <circle cx="18" cy="16" r="11" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M13 16L16.5 19.5L23 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="32" cy="46" r="2" fill="#EE6356" />
      <circle cx="138" cy="62" r="2.5" fill="#1E293B" />
      <circle cx="132" cy="116" r="1.5" fill="#EE6356" />
    </g>
  </svg>
);

export const IllustrationRocket: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-rocket">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <path d="M40 135C48 95 75 70 120 40" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="50" cy="120" r="3" fill="#EE6356" opacity="0.4" />
      <circle cx="78" cy="85" r="3.5" fill="#505F76" opacity="0.6" />
      <circle cx="112" cy="52" r="3" fill="#EE6356" />
      <g transform="translate(85, 45) rotate(45)">
        <path d="M-8 32L-18 42L-8 44" fill="#505F76" />
        <path d="M8 32L18 42L8 44" fill="#505F76" />
        <path d="M0 0C12 12 14 30 10 44H-10C-14 30 -12 12 0 0Z" fill="#1E293B" />
        <circle cx="0" cy="22" r="6" fill="#FFFFFF" />
        <circle cx="0" cy="22" r="4" fill="#EE6356" />
        <path d="M0 0C4 4 6 9 6 12H-6C-6 9 -4 4 0 0Z" fill="#EE6356" />
        <path d="M-5 46C-3 55 0 60 0 60C0 60 3 55 5 46H-5Z" fill="#EE6356" />
        <path d="M-2.5 46C-1 51 0 54 0 54C0 54 1 51 2.5 46H-2.5Z" fill="#FED7AA" />
      </g>
      <path d="M26 65L22 72L26 79" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M134 105L138 112L134 119" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const IllustrationTrophy: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-trophy">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <rect x="62" y="126" width="36" height="12" rx="3" fill="#1E293B" />
      <rect x="68" y="116" width="24" height="10" fill="#505F76" />
      <path d="M50 48C50 78 64 96 80 96C96 96 110 78 110 48H50Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M54 52C55 76 68 90 80 90C92 90 105 76 106 52H54Z" fill="#F8FAFC" />
      <path d="M50 56H40C34 56 32 68 40 76C46 82 54 80 54 80" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M110 56H120C126 56 128 68 120 76C114 82 106 80 106 80" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 62L82.5 69L90 69.5L84.5 74L86.5 81L80 77L73.5 81L75.5 74L70 69.5L77.5 69L80 62Z" fill="#EE6356" />
      <circle cx="44" cy="38" r="3" fill="#EE6356" />
      <path d="M124 38L126 42L130 42.5L127 45L128 49L124 47L120 49L121 45L118 42.5L122 42L124 38Z" fill="#1E293B" />
      <circle cx="32" cy="106" r="2" fill="#505F76" />
    </g>
  </svg>
);

export const IllustrationBook: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-book">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <path d="M80 120C65 112 45 112 30 116V60C45 56 65 56 80 64C95 56 115 56 130 60V116C115 112 95 112 80 120Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M42 74C52 72 65 73 70 76" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 84C52 82 65 83 70 86" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 94C52 92 65 93 70 96" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 76C95 73 108 72 118 74" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 86C95 83 108 82 118 84" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 96C95 93 108 92 118 94" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 64V124L83 118L88 124V64H78Z" fill="#EE6356" />
      <g transform="translate(80, 40)">
        <ellipse cx="0" cy="0" rx="16" ry="6" stroke="#505F76" strokeWidth="1.5" transform="rotate(-30)" />
        <ellipse cx="0" cy="0" rx="16" ry="6" stroke="#EE6356" strokeWidth="1.5" transform="rotate(30)" />
        <circle cx="0" cy="0" r="3" fill="#1E293B" />
      </g>
    </g>
  </svg>
);

export const IllustrationPuzzle: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-puzzle">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <path d="M48 64C48 58 52 54 58 54H74C74 58 77 62 82 62C87 62 90 58 90 54H106C112 54 116 58 116 64V80C112 80 108 83 108 88C108 93 112 96 116 96V112C116 118 112 122 106 122H90C90 118 87 114 82 114C77 114 74 118 74 122H58C52 122 48 118 48 112V96C52 96 56 93 56 88C56 83 52 80 48 80V64Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      <circle cx="82" cy="88" r="16" fill="#EE6356" />
      <circle cx="82" cy="83" r="4.5" fill="#FFFFFF" />
      <path d="M74 95C74 91 78 90 82 90C86 90 90 91 90 95" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="88" r="4" fill="#505F76" />
      <path d="M38 88H48" stroke="#505F76" strokeWidth="2" />
      <circle cx="130" cy="88" r="4" fill="#EE6356" />
      <path d="M116 88H126" stroke="#EE6356" strokeWidth="2" />
      <circle cx="82" cy="38" r="3" fill="#EE6356" />
      <path d="M82 41V54" stroke="#EE6356" strokeWidth="2" strokeDasharray="2 2" />
    </g>
  </svg>
);

export const IllustrationCalendar: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-cal">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <rect x="42" y="44" width="76" height="80" rx="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M42 54C42 48.4772 46.4772 44 52 44H108C113.523 44 118 48.4772 118 54V60H42V54Z" fill="#1E293B" />
      <rect x="56" y="38" width="4" height="12" rx="2" fill="#505F76" />
      <rect x="78" y="38" width="4" height="12" rx="2" fill="#505F76" />
      <rect x="100" y="38" width="4" height="12" rx="2" fill="#505F76" />
      <circle cx="58" cy="74" r="3" fill="#CBD5E1" />
      <circle cx="72" cy="74" r="3" fill="#CBD5E1" />
      <circle cx="86" cy="74" r="3" fill="#CBD5E1" />
      <circle cx="100" cy="74" r="3" fill="#CBD5E1" />
      <circle cx="58" cy="88" r="3" fill="#CBD5E1" />
      <circle cx="72" cy="88" r="7" fill="#EE6356" />
      <circle cx="72" cy="88" r="2.5" fill="#FFFFFF" />
      <circle cx="86" cy="88" r="3" fill="#CBD5E1" />
      <circle cx="100" cy="88" r="3" fill="#CBD5E1" />
      <circle cx="58" cy="102" r="3" fill="#CBD5E1" />
      <circle cx="72" cy="102" r="3" fill="#CBD5E1" />
      <circle cx="86" cy="102" r="3" fill="#EE6356" opacity="0.6" />
      <circle cx="100" cy="102" r="3" fill="#CBD5E1" />
      <circle cx="122" cy="98" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
      <circle cx="122" cy="98" r="2" fill="#EE6356" />
      <path d="M122 92V98L126 101" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

export const IllustrationGrand: React.FC<{ className?: string }> = ({ className = 'w-36 h-36' }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="float-grand">
      <ellipse cx="80" cy="144" rx="42" ry="5" fill="#E2E8F0" />
      <rect x="34" y="122" width="28" height="14" rx="2" fill="#BCC7DE" />
      <text x="48" y="132" fill="#1E293B" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">2</text>
      <rect x="62" y="112" width="36" height="24" rx="2" fill="#1E293B" />
      <text x="80" y="126" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">1</text>
      <rect x="98" y="126" width="28" height="10" rx="2" fill="#E0E3E5" />
      <text x="112" y="134" fill="#505F76" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">3</text>
      <path d="M68 62C68 84 74 94 80 94C86 94 92 84 92 62H68Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
      <path d="M76 94H84V112H76V94Z" fill="#505F76" />
      <path d="M54 68C50 78 54 94 66 102" stroke="#EE6356" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 74C54 75 56 73 57 71" stroke="#EE6356" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M52 86C56 87 58 84 59 82" stroke="#EE6356" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M106 68C110 78 106 94 94 102" stroke="#EE6356" strokeWidth="2" strokeLinecap="round" />
      <path d="M110 74C106 75 104 73 103 71" stroke="#EE6356" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M108 86C104 87 102 84 101 82" stroke="#EE6356" strokeWidth="1.8" strokeLinecap="round" />
      <polygon points="80,48 83,54 90,55 85,60 86,66 80,63 74,66 75,60 70,55 77,54" fill="#EE6356" />
    </g>
  </svg>
);
