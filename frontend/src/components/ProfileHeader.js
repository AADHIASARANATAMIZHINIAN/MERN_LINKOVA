// Enhanced Profile Header Component
import React from 'react';
import { motion } from 'framer-motion';
import ProfileAvatar from './ProfileAvatar';
import AvatarSelector from './AvatarSelector';

const ProfileHeader = ({ profile, isOwn, editing, formData, onEdit, onSave, onCancel, onChange, onAvatarSelect }) => {
  const joinedDate = new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px var(--shadow)',
        marginBottom: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Cover Image */}
      <div style={{
        height: '180px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative'
      }} />

      {/* Profile Info */}
      <div style={{ padding: '0 24px 24px', position: 'relative' }}>
        {/* Avatar */}
        <div style={{ marginTop: '-60px', marginBottom: '16px' }}>
          <ProfileAvatar 
            avatarId={editing ? formData.avatar : profile.avatar} 
            userName={profile.name} 
            size={120}
          />
        </div>

        {/* Name and Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginBottom: '8px',
                  width: '300px'
                }}
              />
            ) : (
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {profile.name}
              </h1>
            )}
            <p style={{ margin: '4px 0', color: 'var(--text-secondary)', fontSize: '15px' }}>
              @{profile.name.toLowerCase().replace(/\s+/g, '')}
            </p>
          </div>

          {isOwn && !editing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: '2px solid var(--primary-color)',
                backgroundColor: 'transparent',
                color: 'var(--primary-color)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Edit Profile
            </motion.button>
          )}
        </div>

        {/* Edit Mode - Avatar Selector */}
        {editing && (
          <div style={{ marginBottom: '20px' }}>
            <AvatarSelector 
              selectedAvatar={formData.avatar}
              onSelect={onAvatarSelect}
            />
          </div>
        )}

        {/* Bio */}
        <div style={{ marginBottom: '16px' }}>
          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={onChange}
              placeholder="Tell us about yourself..."
              rows="3"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          ) : (
            <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.6' }}>
              {profile.bio || 'No bio yet.'}
            </p>
          )}
        </div>

        {/* Additional Info Fields in Edit Mode */}
        {editing && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={onChange}
                placeholder="City, Country"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation || ''}
                onChange={onChange}
                placeholder="Your role or title"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website || ''}
                onChange={onChange}
                placeholder="https://yourwebsite.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        )}

        {/* Profile Stats */}
        <div style={{
          display: 'flex',
          gap: '32px',
          padding: '16px 0',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {profile.followers?.length || 0}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {profile.following?.length || 0}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Following</div>
          </div>
        </div>

        {/* Additional Details */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {(profile.location || editing) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span>
              <span>{profile.location || 'Not specified'}</span>
            </div>
          )}
          {(profile.occupation || editing) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💼</span>
              <span>{profile.occupation || 'Not specified'}</span>
            </div>
          )}
          {(profile.website || editing) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔗</span>
              {profile.website ? (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>
                  {profile.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <span>Not specified</span>
              )}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📅</span>
            <span>Joined {joinedDate}</span>
          </div>
        </div>

        {/* Edit Mode Buttons */}
        {editing && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSave}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '20px',
                border: '2px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              Cancel
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
