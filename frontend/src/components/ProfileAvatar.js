import React from 'react';
import { getAvatarById } from '../utils/defaultAvatars';

const ProfileAvatar = ({ avatarId, userName, size = 48, onClick = null }) => {
  const avatar = getAvatarById(avatarId);
  const getInitial = name => name ? name.charAt(0).toUpperCase() : '?';

  // If no avatar ID, show initial-based avatar
  if (!avatarId) {
    return (
      <div 
        onClick={onClick}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: size * 0.4,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => onClick && (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => onClick && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {getInitial(userName)}
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: avatar.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.5,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.transform = 'scale(1)')}
    >
      <span>{avatar.emoji}</span>
    </div>
  );
};

export default ProfileAvatar;
