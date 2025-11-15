import React from 'react';
import { motion } from 'framer-motion';
import { defaultAvatars } from '../utils/defaultAvatars';

const AvatarSelector = ({ selectedAvatar, onSelect }) => {
  return (
    <div>
      <label style={{ 
        display: 'block', 
        marginBottom: '12px', 
        fontWeight: 600, 
        color: 'var(--text-primary)',
        fontSize: '15px'
      }}>
        Choose Your Avatar
      </label>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {defaultAvatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(avatar.id)}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: avatar.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              cursor: 'pointer',
              border: selectedAvatar === avatar.id ? '4px solid var(--primary-color)' : '3px solid transparent',
              boxShadow: selectedAvatar === avatar.id 
                ? '0 4px 20px rgba(10, 102, 194, 0.4)' 
                : '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            <span>{avatar.emoji}</span>
            {selectedAvatar === avatar.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {selectedAvatar && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Selected: {defaultAvatars.find(a => a.id === selectedAvatar)?.name}
        </motion.div>
      )}
    </div>
  );
};

export default AvatarSelector;
