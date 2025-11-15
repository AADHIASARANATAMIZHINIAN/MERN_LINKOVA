import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileAvatar from './ProfileAvatar';

const PostCreator = ({ user, onSubmit, loading }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
    setIsExpanded(false);
  };

  const options = [
    { icon: '📷', label: 'Photo', color: '#10B981', disabled: true },
    { icon: '🎥', label: 'Video', color: '#EF4444', disabled: true },
    { icon: '📄', label: 'Document', color: '#F59E0B', disabled: true },
    { icon: '📊', label: 'Poll', color: '#8B5CF6', disabled: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px var(--shadow)',
        marginBottom: '24px',
        border: '1px solid var(--border-color)'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <ProfileAvatar 
          avatarId={user.avatar} 
          userName={user.name} 
          size={48}
        />
        
        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)';
                setIsExpanded(true);
              }}
              onBlur={(e) => {
                if (!content) {
                  e.target.style.borderColor = 'var(--border-color)';
                }
              }}
              placeholder="What's on your mind?"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid var(--border-color)',
                borderRadius: '24px',
                fontSize: '15px',
                fontFamily: 'inherit',
                resize: 'none',
                minHeight: isExpanded ? '120px' : '48px',
                transition: 'all 0.3s ease',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Quick Actions */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      fontWeight: 600
                    }}>
                      Add to post:
                    </span>
                    
                    {options.map((option, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        disabled={option.disabled}
                        whileHover={!option.disabled ? { scale: 1.05 } : {}}
                        whileTap={!option.disabled ? { scale: 0.95 } : {}}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '20px',
                          backgroundColor: 'transparent',
                          cursor: option.disabled ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: option.disabled ? 'var(--text-secondary)' : 'var(--text-primary)',
                          opacity: option.disabled ? 0.5 : 1,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!option.disabled) {
                            e.currentTarget.style.backgroundColor = 'var(--background)';
                            e.currentTarget.style.borderColor = option.color;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!option.disabled) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                          }
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>{option.icon}</span>
                        <span>{option.label}</span>
                        {option.disabled && <span style={{ fontSize: '10px' }}>(Soon)</span>}
                      </motion.button>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px',
                    marginTop: '16px'
                  }}>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setContent('');
                        setIsExpanded(false);
                      }}
                      style={{
                        padding: '10px 20px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '20px',
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      type="submit"
                      disabled={!content.trim() || loading}
                      whileHover={content.trim() && !loading ? { scale: 1.02 } : {}}
                      whileTap={content.trim() && !loading ? { scale: 0.98 } : {}}
                      style={{
                        padding: '10px 24px',
                        border: 'none',
                        borderRadius: '20px',
                        backgroundColor: content.trim() && !loading ? 'var(--primary-color)' : '#ccc',
                        color: 'white',
                        cursor: content.trim() && !loading ? 'pointer' : 'not-allowed',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span style={{
                            width: '14px',
                            height: '14px',
                            border: '2px solid white',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            display: 'inline-block',
                            animation: 'spin 0.8s linear infinite'
                          }} />
                          Posting...
                        </>
                      ) : (
                        'Post'
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </motion.div>
  );
};

export default PostCreator;
