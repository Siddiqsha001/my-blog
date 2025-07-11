'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthWrapper from '../components/AuthWrapper';
import { getAuthData, logout } from '../lib/auth';
import styles from './admin-new.module.css';

function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthData();
    setAuthData(auth);
    fetchBlogs();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setBlogs(blogs.filter(blog => blog.id !== id));
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const blog = blogs.find(b => b.id === id);
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          published: !currentStatus
        }),
      });
      if (response.ok) {
        setBlogs(blogs.map(blog => 
          blog.id === id ? { ...blog, published: !currentStatus } : blog
        ));
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Admin Dashboard</h1>
          <span className={styles.welcome}>Welcome, {authData?.username}!</span>
        </div>
        <div className={styles.headerRight}>
          <Link href="/admin/create" className={styles.createBtn}>
            Create New Blog
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Blogs</h3>
          <p>{blogs.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Published</h3>
          <p>{blogs.filter(blog => blog.published).length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Drafts</h3>
          <p>{blogs.filter(blog => !blog.published).length}</p>
        </div>
      </div>

      <div className={styles.navigation}>
        <Link href="/" className={styles.navLink}>
          View Public Site
        </Link>
        <Link href="/admin" className={styles.navLink}>
          Dashboard
        </Link>
      </div>

      <div className={styles.blogsSection}>
        <h2>All Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blogs found. <Link href="/admin/create">Create your first blog</Link></p>
        ) : (
          <div className={styles.blogsGrid}>
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.blogCard}>
                <div className={styles.blogHeader}>
                  <h3>{blog.title}</h3>
                  <span className={`${styles.status} ${blog.published ? styles.published : styles.draft}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className={styles.excerpt}>{blog.excerpt}</p>
                <div className={styles.blogMeta}>
                  <span>By {blog.author}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.tags}>
                  {blog.tags?.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.actions}>
                  <Link href={`/admin/edit/${blog.id}`} className={styles.editBtn}>
                    Edit
                  </Link>
                  <button
                    onClick={() => togglePublish(blog.id, blog.published)}
                    className={`${styles.publishBtn} ${blog.published ? styles.unpublish : styles.publish}`}
                  >
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthWrapper requiredRole="admin">
      <AdminDashboard />
    </AuthWrapper>
  );
}
