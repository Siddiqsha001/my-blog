'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthData, logout } from './lib/auth';
import styles from './homepage.module.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthData();
    setAuthData(auth);
    
    if (!auth || !auth.isAuthenticated) {
      router.push('/login');
      return;
    }
    
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?published=true');
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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Welcome to My Blog</h1>
          <p>Discover amazing stories and insights</p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.welcome}>Welcome, {authData?.username}!</span>
          <div className={styles.actionButtons}>
            {authData?.role === 'admin' && (
              <Link href="/admin" className={styles.adminLink}>
                Admin Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Latest Blog Posts</h2>
          <p>Stay updated with our latest articles and insights</p>
        </section>

        <section className={styles.blogGrid}>
          {blogs.length === 0 ? (
            <div className={styles.noBlogsMessage}>
              <h3>No blogs published yet</h3>
              <p>Check back later for amazing content!</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <article key={blog.id} className={styles.blogCard}>
                <div className={styles.blogContent}>
                  <h3>
                    <Link href={`/blog/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>
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
                  <Link href={`/blog/${blog.id}`} className={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
