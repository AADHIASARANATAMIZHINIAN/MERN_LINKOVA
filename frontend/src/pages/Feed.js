import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Toast from '../components/Toast';
import LoadingSkeleton from '../components/LoadingSkeleton';

const getInitial = name => name ? name.charAt(0).toUpperCase() : '?';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/posts', { content: newPost });
      setPosts([response.data, ...posts]);
      setNewPost('');
      showToast('Post created successfully!', 'success');
    } catch {
      setError('Failed to create post');
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

  const formatDate = (d) => new Date(d).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

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
        </div>        {/* User Info */}
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
            {getInitial(user.name)}
          </div>
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
          <button
            onClick={() => navigate('/feed')}
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
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f6f8fa'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
            <span style={{ fontSize: 20 }}>LINKOVA</span>
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px var(--shadow)', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: 22, color: 'var(--text-primary)' }}>What's on your mind?</h2>
          <form onSubmit={handleCreatePost}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: "var(--primary-color)",
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, fontSize: 20
              }}>{getInitial(user.name)}</div>
              <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share something with your network..." rows="3"
                style={{ flex: 1, padding: 12, fontSize: 16, borderRadius: 7, border: "1px solid var(--border-color)", marginBottom: 0, resize: 'vertical' }} />
            </div>
            <div style={{ marginTop: 10, textAlign: 'right' }}>
              <button type="submit" disabled={loading || !newPost.trim()} style={{
                padding: "9px 26px", backgroundColor: loading ? 'var(--text-tertiary)' : 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '22px', fontWeight: 600, fontSize: 15, marginTop: 4, cursor: loading ? 'not-allowed' : 'pointer'
              }}>{loading ? 'Posting...' : 'Post'}</button>
            </div>
            {error && <div style={{ color: 'var(--danger-color)', marginTop: 7 }}>{error}</div>}
          </form>
        </div>

        <div>
          <h3 style={{ color: 'var(--primary-color)', fontWeight: 600, marginBottom: 15 }}>Network Feed</h3>
          {postsLoading ? (
            <LoadingSkeleton count={3} />
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '35px', background: '#f3f3f3', borderRadius: '7px', color: '#666', fontWeight: 600 }}>No posts yet. Start by sharing something!</div>
          ) : (
            posts.map((post) => {
            const isLiked = post.likes && post.likes.includes(user.id);
            const likeCount = post.likes ? post.likes.length : 0;
            return (
              <div key={post._id} className="post-card" style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px 19px', marginBottom: '15px', background: 'var(--surface)', boxShadow: '0 0.5px 2px 0 var(--shadow)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 9 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", background: "var(--background)",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontWeight: 700, fontSize: 19,
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/profile/${post.userId}`)}
                  >{getInitial(post.userName)}</div>
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
                  <button
                    onClick={() => handleLike(post._id)}
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
                    <span>Like</span>
                    {likeCount > 0 && <span>({likeCount})</span>}
                  </button>
                  <button
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
                  </button>
                  {post.userId === user.id && (
                    <button
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
                    </button>
                  )}
                </div>

                {/* Comment Section */}
                {showComments[post._id] && (
                  <div style={{ marginTop: 10, paddingLeft: 20 }}>
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
                        <div key={comment._id} style={{ padding: 4, borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{comment.userName}</span>:
                          <span style={{ color: 'var(--text-primary)' }}>{comment.text}</span>
                          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: 10 }}>{formatDate(comment.createdAt)}</span>
                          {(comment.userId === user.id || post.userId === user.id) &&
                            <button onClick={() => handleDeleteComment(post._id, comment._id)} style={{ marginLeft: 10, color: 'var(--danger-color)', border: 'none', background: 'none', fontSize: 13, cursor: 'pointer' }}>Delete</button>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
