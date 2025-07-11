'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuthData, logout } from '../../lib/auth';
import styles from './blog-new.module.css';

export default function BlogPost({ params }) {
  const [blog, setBlog] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthData();
    setAuthData(auth);
    
    if (!auth || !auth.isAuthenticated) {
      router.push('/login');
      return;
    }

    // Handle the params promise
    const getBlogId = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.id);
      fetchBlog(resolvedParams.id);
    };
    getBlogId();
  }, [params, router]);

  const fetchBlog = async (id) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const blogData = await response.json();
        if (blogData.published) {
          setBlog(blogData);
        } else {
          router.push('/404');
        }
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      router.push('/404');
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

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <h2>Blog not found</h2>
        <Link href="/">Go back to homepage</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <div className={styles.navActions}>
          <span className={styles.welcome}>Welcome, {authData?.username}!</span>
          {authData?.role === 'admin' && (
            <Link href="/admin" className={styles.adminLink}>
              Admin Dashboard
            </Link>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{blog.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>By {blog.author}</span>
            <span className={styles.date}>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className={styles.tags}>
              {blog.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.content}>
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <footer className={styles.footer}>
          <div className={styles.updatedInfo}>
            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
              <p className={styles.updated}>
                Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
          <div className={styles.navigation}>
            <Link href="/" className={styles.homeLink}>
              Back to All Posts
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
