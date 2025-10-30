import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import api from '../utils/api';
import Toast from '../components/Toast';

const getInitial = name => name ? name.charAt(0).toUpperCase() : '?';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
    currentPassword: '',
    newPassword: ''
  });

  const isOwnProfile = !userId || userId === currentUser.id;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const endpoint = isOwnProfile ? '/users/me/profile' : `/users/${userId}`;
        const response = await api.get(endpoint);
        setProfile(response.data.user);
        setPosts(response.data.posts);
        setFormData({
          name: response.data.user.name,
          bio: response.data.user.bio || '',
          avatar: response.data.user.avatar || '',
          currentPassword: '',
          newPassword: ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile');
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId, isOwnProfile]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/users/profile', formData);
      setProfile(response.data);
      setEditing(false);
      showToast('Profile updated successfully!', 'success');
      // Reset password fields
      setFormData({ ...formData, currentPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(error.response?.data?.msg || 'Failed to update profile', 'error');
    }
  };

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p._id === postId);
      const isLiked = post.likes && post.likes.includes(currentUser.id);
      const endpoint = isLiked ? `/posts/${postId}/unlike` : `/posts/${postId}/like`;
      const response = await api.put(endpoint);
      setPosts(posts.map(p => p._id === postId ? response.data : p));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter(p => p._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleString([], { 
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <p>User not found</p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease-in-out;
            }
            .sidebar.open {
              transform: translateX(0);
            }
            .sidebar-overlay {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 999;
            }
            .sidebar-overlay.open {
              display: block;
            }
            .main-content {
              margin-left: 0 !important;
            }
            .mobile-header {
              display: flex !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-header {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)}
        />
      )}

      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
        width: '260px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border-color)',
        position: 'fixed',
        height: '100vh',
        boxShadow: '2px 0 8px var(--shadow)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Scrollable content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '24px 16px',
          paddingBottom: '16px'
        }}>
          {/* Logo */}
          <div style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--primary-color)',
            marginBottom: 40,
            paddingLeft: 8
          }}>
            LINKOVA
          </div>

        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 8px',
          marginBottom: 24,
          backgroundColor: 'var(--background)',
          borderRadius: 8
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 20
          }}>
            {getInitial(currentUser.name)}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              @{currentUser.name.toLowerCase().replace(/\s+/g, '')}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ marginBottom: 24 }}>
          <button
            onClick={() => navigate('/feed')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              marginBottom: 8,
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: 20 }}>🏠</span>
            <span>Feed</span>
          </button>

          <button
            onClick={() => navigate('/profile')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              marginBottom: 8,
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: 20 }}>👤</span>
            <span>Profile</span>
          </button>
        </nav>
        </div>

        {/* Logout Button - Fixed at bottom */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--surface)'
        }}>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              backgroundColor: 'var(--surface)',
              color: 'var(--danger-color)',
              border: '1.5px solid var(--danger-color)',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              transition: 'all 0.2s',
              width: '100%'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--danger-color)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface)';
              e.currentTarget.style.color = 'var(--danger-color)';
            }}
          >
            <span style={{ fontSize: 20 }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ marginLeft: '260px', flex: 1, padding: '24px', maxWidth: '1000px' }}>
        {/* Mobile Header */}
        <div className="mobile-header" style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--primary-color)',
              fontWeight: 700
            }}
          >
            <span>☰</span>
            <span style={{ fontSize: 20 }}>LINKOVA</span>
          </button>
        </div>

        {/* Profile Card */}
        <div style={{ 
        backgroundColor: 'var(--surface)', 
        padding: '32px', 
        borderRadius: 12, 
        boxShadow: '0 2px 8px var(--shadow)',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          {/* Avatar */}
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 700,
            flexShrink: 0
          }}>
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              getInitial(profile.name)
            )}
          </div>

          {/* Profile Info */}
          <div style={{ flex: 1 }}>
            {editing ? (
              <form onSubmit={handleUpdateProfile}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14,
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Avatar URL</label>
                  <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14
                    }}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Current Password (optional)</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14
                    }}
                    placeholder="Enter current password to change"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>New Password (optional)</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 14
                    }}
                    placeholder="Enter new password"
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: profile.name,
                        bio: profile.bio || '',
                        avatar: profile.avatar || '',
                        currentPassword: '',
                        newPassword: ''
                      });
                    }}
                    style={{
                      backgroundColor: '#ddd',
                      color: '#333',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: 28 }}>{profile.name}</h2>
                    <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>{profile.email}</p>
                    {profile.bio && (
                      <p style={{ margin: '16px 0', fontSize: 15, lineHeight: 1.5 }}>{profile.bio}</p>
                    )}
                    <p style={{ margin: '8px 0 0 0', color: '#999', fontSize: 13 }}>
                      Joined {formatDate(profile.createdAt)}
                    </p>
                  </div>
                  {isOwnProfile && (
                    <button
                      onClick={() => setEditing(true)}
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 20px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 14
                      }}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: 20 }}>
          {isOwnProfile ? 'Your Posts' : `Posts by ${profile.name}`} ({posts.length})
        </h3>

        {posts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '48px', 
            backgroundColor: 'var(--background)', 
            borderRadius: 12 
          }}>
            <p style={{ color: 'var(--text-tertiary)' }}>No posts yet</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post._id} style={{ 
              backgroundColor: 'var(--surface)', 
              padding: 20, 
              marginBottom: 16, 
              borderRadius: 12, 
              boxShadow: '0 2px 4px var(--shadow)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  marginRight: 12
                }}>
                  {getInitial(post.userName)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{post.userName}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>{formatDate(post.createdAt)}</div>
                </div>
                {post.userId === currentUser.id && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--danger-color)',
                      cursor: 'pointer',
                      fontSize: 20,
                      padding: 4
                    }}
                    title="Delete post"
                  >
                    🗑️
                  </button>
                )}
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 12, whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
                {post.content}
              </p>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <button
                  onClick={() => handleLike(post._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: post.likes?.includes(currentUser.id) ? 'var(--danger-color)' : 'var(--text-tertiary)',
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  ❤️ {post.likes?.length || 0}
                </button>
                <span style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>
                  💬 {post.comments?.length || 0}
                </span>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
