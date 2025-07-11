'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthWrapper from '../../components/AuthWrapper';
import styles from './create.module.css';

function CreateBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Admin',
    published: false,
    tags: '',
    excerpt: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        alert('Error creating blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Create New Blog</h1>
        <Link href="/admin" className={styles.backBtn}>
          Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief description of your blog post"
            rows={3}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog content here..."
            rows={15}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas (e.g., technology, tutorial, react)"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            Publish immediately
          </label>
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
          <Link href="/admin" className={styles.cancelBtn}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <AuthWrapper requiredRole="admin">
      <CreateBlog />
    </AuthWrapper>
  );
}
