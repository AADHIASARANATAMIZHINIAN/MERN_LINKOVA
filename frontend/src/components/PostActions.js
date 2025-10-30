// frontend/src/components/PostActions.js

import React from 'react';

const PostActions = ({ post, user, onLike, colors }) => {
  const isLiked = post.likes && post.likes.includes(user.id);
  const likeCount = post.likes ? post.likes.length : 0;

  return (
    <div style={{ 
      borderTop: `1px solid ${colors.border}`, 
      paddingTop: 10,
      marginLeft: 52,
      display: 'flex', 
      alignItems: 'center', 
      gap: 8 
    }}>
      {/* Like Button */}
      <button
        onClick={() => onLike(post._id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          color: isLiked ? colors.primary : colors.lightText,
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span style={{ fontSize: 16 }}>{isLiked ? '👍' : '👍🏻'}</span>
        <span>Like</span>
        {likeCount > 0 && <span style={{ fontSize: 12 }}>({likeCount})</span>}
      </button>

      {/* Comment Button */}
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          color: colors.lightText,
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        // onClick for comment modal/popup (to be added later)
      >
        <span style={{ fontSize: 16 }}>💬</span>
        <span>Comment</span>
      </button>

      {/* Delete Button */}
      {post.userId === user.id && (
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            color: '#ef4444',
            transition: 'all 0.2s',
            marginLeft: 'auto'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fee2e2')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          // onClick for delete logic (to be added)
        >
          <span style={{ fontSize: 16 }}>🗑️</span>
          <span>Delete</span>
        </button>
      )}
    </div>
  );
};

export default PostActions;
