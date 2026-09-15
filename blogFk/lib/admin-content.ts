export type ContentField = {
  key: string;
  label: string;
  value: string;
  multiline?: boolean;
  type?: 'text' | 'url' | 'number';
};

export type ContentGroup = {
  id: string;
  label: string;
  description: string;
  fields: ContentField[];
};

export const contentGroups: ContentGroup[] = [
  {
    id: 'brand',
    label: 'Brand & profil',
    description: 'Identity, hero copy and profile details shown across the site.',
    fields: [
      { key: 'profile.name', label: 'Name', value: 'FKoko' },
      { key: 'profile.displayName', label: 'Display name', value: 'FKOKO' },
      { key: 'profile.role', label: 'Role', value: 'XC Cyclist | Builder' },
      { key: 'profile.location', label: 'Location', value: 'Poland' },
      { key: 'profile.bio', label: 'Bio', value: 'Student, cross-country cyclist, and builder. Trying to ride fast, learn a lot, and build a life I\'m proud of. This is where I document the journey — every ride, every race, every upgrade.', multiline: true },
      { key: 'profile.quote', label: 'Quote', value: 'Progress, not perfection.' },
      { key: 'profile.avatar', label: 'Avatar URL', value: 'https://images.pexels.com/photos/5807790/pexels-photo-5807790.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', type: 'url' },
      { key: 'profile.cover', label: 'Cover image URL', value: 'https://images.pexels.com/photos/20678000/pexels-photo-20678000.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600', type: 'url' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    description: 'Labels used by the main navigation and primary calls to action.',
    fields: [
      { key: 'nav.home', label: 'Home', value: 'Home' },
      { key: 'nav.rides', label: 'Rides', value: 'Rides' },
      { key: 'nav.training', label: 'Training', value: 'Training' },
      { key: 'nav.races', label: 'Races', value: 'Races' },
      { key: 'nav.bike', label: 'Bike', value: 'Bike' },
      { key: 'nav.gear', label: 'Gear', value: 'Gear' },
      { key: 'nav.blog', label: 'Blog', value: 'Blog' },
      { key: 'nav.about', label: 'About', value: 'About' },
    ],
  },
  {
    id: 'homepage',
    label: 'Homepage sections',
    description: 'Headings and supporting copy visible on the homepage.',
    fields: [
      { key: 'home.heroTitle', label: 'Hero title', value: 'Real Rides. Real Progress.' },
      { key: 'home.heroSubtitle', label: 'Hero subtitle', value: 'XC cycling, training and the work behind getting better.', multiline: true },
      { key: 'home.trainingTitle', label: 'Training section title', value: 'Training Last 7 Days' },
      { key: 'home.trainingSubtitle', label: 'Training section subtitle', value: 'Live activity data from Intervals.icu' },
      { key: 'home.ridesTitle', label: 'Recent rides title', value: 'Recent Rides' },
      { key: 'home.ridesSubtitle', label: 'Recent rides subtitle', value: 'The latest miles, climbs and experiments.' },
      { key: 'home.postsTitle', label: 'Latest posts title', value: 'Latest Posts' },
      { key: 'home.postsSubtitle', label: 'Latest posts subtitle', value: 'Notes from the road, workshop and training plan.' },
    ],
  },
  {
    id: 'stats',
    label: 'Stats bar',
    description: 'The labels and values shown in the homepage stats strip.',
    fields: [
      { key: 'stats.ftp', label: 'FTP', value: '247', type: 'number' },
      { key: 'stats.lthr', label: 'LTHR', value: '183', type: 'number' },
      { key: 'stats.weight', label: 'Weight', value: '68', type: 'number' },
      { key: 'stats.weeklyHours', label: 'Weekly hours', value: '8h 42m' },
      { key: 'stats.monthlyKm', label: 'Monthly kilometres', value: '421', type: 'number' },
      { key: 'stats.ftpChange', label: 'FTP change', value: '+3W' },
      { key: 'stats.lthrChange', label: 'LTHR change', value: '0' },
      { key: 'stats.weightChange', label: 'Weight change', value: '-0.5 kg' },
      { key: 'stats.weeklyChange', label: 'Weekly change', value: '+0.3h' },
      { key: 'stats.monthlyChange', label: 'Monthly change', value: '+12 km' },
    ],
  },
];

export const contentDefaults = Object.fromEntries(
  contentGroups.flatMap((group) => group.fields.map((field) => [field.key, field.value]))
);
