'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthWrapper from '../../../components/AuthWrapper';
import styles from './edit.module.css';

function EditBlog({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    published: false,
    tags: '',
    excerpt: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const getBlogId = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.id);
      fetchBlog(resolvedParams.id);
    };
    getBlogId();
  }, [params]);

  const fetchBlog = async (id) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const blog = await response.json();
        setFormData({
          title: blog.title,
          content: blog.content,
          author: blog.author,
          published: blog.published,
          tags: blog.tags ? blog.tags.join(', ') : '',
          excerpt: blog.excerpt || ''
        });
      } else {
        alert('Blog not found');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Error fetching blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const blogData = {
        ...formData,
        id: parseInt(blogId),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        alert('Error updating blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Edit Blog</h1>
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
            Published
          </label>
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={saving} className={styles.submitBtn}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin" className={styles.cancelBtn}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function EditBlogPage({ params }) {
  return (
    <AuthWrapper requiredRole="admin">
      <EditBlog params={params} />
    </AuthWrapper>
  );
}
