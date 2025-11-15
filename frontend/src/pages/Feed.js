import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Toast from '../components/Toast';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PostCreator from '../components/PostCreator';
import ProfileAvatar from '../components/ProfileAvatar';
import { motion, AnimatePresence } from 'framer-motion';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState({});
  const [showComments, setShowComments] = useState({});
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const formatDate = (d) => new Date(d).toLocaleString([], { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      try {
        const response = await api.get('/posts');
        setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse());
      } catch (error) {
        console.error('Error fetching posts:', error);
        showToast('Failed to load posts', 'error');
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (content) => {
    setLoading(true);
    try {
      const response = await api.post('/posts', { content });
      setPosts([response.data, ...posts]);
      showToast('Post created successfully!', 'success');
    } catch {
      showToast('Failed to create post', 'error');
    }
    setLoading(false);
  };

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p._id === postId);
      const isLiked = post.likes && post.likes.includes(user.id);
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
      showToast('Post deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast('Failed to delete post', 'error');
    }
  };

  const handleCommentInput = (postId, value) => {
    setCommentInput({ ...commentInput, [postId]: value });
  };

  const handleAddComment = async (postId, e) => {
    e.preventDefault();
    if (!commentInput[postId] || !commentInput[postId].trim()) return;
    try {
      const response = await api.post(`/posts/${postId}/comments`, { text: commentInput[postId] });
      setPosts(posts.map(p => p._id === postId ? response.data : p));
      setCommentInput({ ...commentInput, [postId]: '' });
      showToast('Comment added!', 'success');
    } catch (error) {
      showToast('Failed to add comment', 'error');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
      setPosts(posts.map(p => p._id === postId ? response.data : p));
    } catch (error) {
      alert('Failed to delete comment');
    }
  };

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 40,
            cursor: 'pointer'
          }}
        >
          <img 
            src="/logo192.png" 
            alt="LINKOVA"
            style={{
              width: 32,
              height: 32,
              borderRadius: '6px'
            }}
          />
          <span style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--primary-color)',
          }}>
            LINKOVA
          </span>
        </motion.div>

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
          <ProfileAvatar 
            avatarId={user.avatar} 
            userName={user.name} 
            size={48}
          />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              @{user.name.toLowerCase().replace(/\s+/g, '')}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ marginBottom: 24 }}>
          <motion.button
            onClick={() => navigate('/feed')}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
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
            <span style={{ fontSize: 20 }}>🏠</span>
            <span>Feed</span>
          </motion.button>

          <motion.button
            onClick={() => navigate('/profile')}
            whileHover={{ scale: 1.02, x: 5, backgroundColor: '#f6f8fa' }}
            whileTap={{ scale: 0.98 }}
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
          >
            <span style={{ fontSize: 20 }}>👤</span>
            <span>Profile</span>
          </motion.button>
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
      <div className="main-content" style={{ marginLeft: '260px', flex: 1, padding: '24px', maxWidth: '800px' }}>
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
            <img 
              src="/logo192.png" 
              alt="LINKOVA"
              style={{
                width: 24,
                height: 24,
                borderRadius: '4px'
              }}
            />
            <span style={{ fontSize: 14 }}>LINKOVA</span>
          </button>
        </div>

        {/* Post Creator */}
        <PostCreator 
          user={user}
          onSubmit={handleCreatePost}
          loading={loading}
        />

        <div>
          <h3 style={{ color: 'var(--primary-color)', fontWeight: 600, marginBottom: 15 }}>Network Feed</h3>
          {postsLoading ? (
            <LoadingSkeleton count={3} />
          ) : posts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '35px', background: '#f3f3f3', borderRadius: '7px', color: '#666', fontWeight: 600 }}
            >
              No posts yet. Start by sharing something!
            </motion.div>
          ) : (
            posts.map((post, index) => {
            const isLiked = post.likes && post.likes.includes(user.id);
            const likeCount = post.likes ? post.likes.length : 0;
            return (
              <motion.div 
                key={post._id} 
                className="post-card" 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }}
                style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px 19px', marginBottom: '15px', background: 'var(--surface)', boxShadow: '0 0.5px 2px 0 var(--shadow)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 9 }}>
                  <ProfileAvatar 
                    avatarId={post.userAvatar} 
                    userName={post.userName} 
                    size={42}
                    onClick={() => navigate(`/profile/${post.userId}`)}
                  />
                  <div>
                    <strong 
                      style={{ color: 'var(--primary-color)', fontSize: '16.7px', cursor: 'pointer' }}
                      onClick={() => navigate(`/profile/${post.userId}`)}
                    >
                      {post.userName}
                    </strong>
                    <div style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 1 }}>{formatDate(post.createdAt)}</div>
                  </div>
                </div>
                <div style={{ fontSize: 15.6, lineHeight: 1.55, color: "var(--text-primary)", fontWeight: 400, marginBottom: 12 }}>{post.content}</div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <motion.button
                    onClick={() => handleLike(post._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 600,
                      color: isLiked ? 'var(--primary-color)' : 'var(--text-secondary)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <motion.span
                      animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      Like
                    </motion.span>
                    {likeCount > 0 && <span>({likeCount})</span>}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      transition: 'background 0.2s'
                    }}
                    onClick={() => setShowComments({ ...showComments, [post._id]: !showComments[post._id] })}
                  >
                    <span>Comment</span>
                    {post.comments && <span>({post.comments.length})</span>}
                  </motion.button>
                  {post.userId === user.id && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(post._id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 4,
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--danger-color)'
                      }}
                    >
                      <span>Delete</span>
                    </motion.button>
                  )}
                </div>

                {/* Comment Section */}
                <AnimatePresence>
                {showComments[post._id] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginTop: 10, paddingLeft: 20 }}
                  >
                    <form onSubmit={e => handleAddComment(post._id, e)} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input
                        value={commentInput[post._id] || ''}
                        onChange={e => handleCommentInput(post._id, e.target.value)}
                        placeholder="Write a comment..."
                        style={{ flex: 1, padding: 6, borderRadius: 4, border: "1px solid var(--border-color)" }}
                      />
                      <button type="submit" style={{ padding: "6px 14px", borderRadius: 4, background: "var(--primary-color)", color: "#fff", border: 'none' }}>Post</button>
                    </form>
                    <div>
                      {(post.comments || []).map(comment => (
                        <div key={comment._id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <ProfileAvatar 
                            avatarId={comment.userAvatar} 
                            userName={comment.userName} 
                            size={32}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: 14 }}>{comment.userName}</span>
                              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{formatDate(comment.createdAt)}</span>
                            </div>
                            <span style={{ color: 'var(--text-primary)', fontSize: 14 }}>{comment.text}</span>
                            {(comment.userId === user.id || post.userId === user.id) &&
                              <button 
                                onClick={() => handleDeleteComment(post._id, comment._id)} 
                                style={{ 
                                  marginTop: 4, 
                                  color: 'var(--danger-color)', 
                                  border: 'none', 
                                  background: 'none', 
                                  fontSize: 12, 
                                  cursor: 'pointer',
                                  padding: '2px 4px',
                                  textDecoration: 'underline'
                                }}
                              >
                                Delete
                              </button>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
        </div>
      </div>
    </div>

    {/* Mobile Responsive Styles */}
    <style>{`
      /* Desktop styles - Sidebar visible */
      .sidebar {
        transform: translateX(0);
        transition: transform 0.3s ease-in-out;
      }
      
      .sidebar-overlay {
        display: none;
      }
      
      .mobile-header {
        display: none !important;
      }

      /* Tablet and Mobile */
      @media (max-width: 1024px) {
        .sidebar {
          transform: translateX(-100%);
          z-index: 1000;
        }
        
        .sidebar.open {
          transform: translateX(0);
        }
        
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          z-index: 999;
        }
        
        .sidebar-overlay.open {
          display: block;
        }
        
        .mobile-header {
          display: flex !important;
        }
        
        .main-content {
          margin-left: 0 !important;
          width: 100% !important;
          padding: 16px !important;
        }
      }

      /* Mobile phones */
      @media (max-width: 768px) {
        .main-content {
          padding: 12px !important;
        }
        
        .sidebar {
          width: 280px !important;
        }
      }

      /* Small phones */
      @media (max-width: 480px) {
        .main-content {
          padding: 8px !important;
        }
        
        .sidebar {
          width: 85vw !important;
          max-width: 320px !important;
        }
        
        .mobile-header button {
          padding: 12px !important;
          min-height: 48px !important;
        }
      }
    `}</style>
    </>
  );
};

export default Feed;
