// Default cartoon avatars for users to choose from
export const defaultAvatars = [
  {
    id: 'avatar-1',
    name: 'Happy Fox',
    emoji: '🦊',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
  },
  {
    id: 'avatar-2',
    name: 'Cool Cat',
    emoji: '😺',
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
  },
  {
    id: 'avatar-3',
    name: 'Smart Owl',
    emoji: '🦉',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)'
  },
  {
    id: 'avatar-4',
    name: 'Playful Dog',
    emoji: '🐶',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'
  },
  {
    id: 'avatar-5',
    name: 'Cute Panda',
    emoji: '🐼',
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)'
  },
  {
    id: 'avatar-6',
    name: 'Wise Monkey',
    emoji: '🐵',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
  },
  {
    id: 'avatar-7',
    name: 'Swift Rabbit',
    emoji: '🐰',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
  },
  {
    id: 'avatar-8',
    name: 'Strong Bear',
    emoji: '🐻',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
  },
  {
    id: 'avatar-9',
    name: 'Elegant Penguin',
    emoji: '🐧',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
  },
  {
    id: 'avatar-10',
    name: 'Magical Unicorn',
    emoji: '🦄',
    color: '#F472B6',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)'
  },
  {
    id: 'avatar-11',
    name: 'Brave Lion',
    emoji: '🦁',
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
  },
  {
    id: 'avatar-12',
    name: 'Friendly Koala',
    emoji: '🐨',
    color: '#14B8A6',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)'
  }
];

export const getAvatarById = (id) => {
  return defaultAvatars.find(avatar => avatar.id === id) || defaultAvatars[0];
};

export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
};
