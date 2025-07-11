// Client-side utility functions for blog operations
// These functions make API calls instead of direct file system operations

export async function getAllBlogs() {
  try {
    const response = await fetch('/api/blogs');
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(id) {
  try {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function getPublishedBlogs() {
  try {
    const response = await fetch('/api/blogs?published=true');
    if (!response.ok) throw new Error('Failed to fetch published blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return [];
  }
}

export async function saveBlog(blogData) {
  try {
    const method = blogData.id ? 'PUT' : 'POST';
    const url = blogData.id ? `/api/blogs/${blogData.id}` : '/api/blogs';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    
    if (!response.ok) throw new Error('Failed to save blog');
    return await response.json();
  } catch (error) {
    console.error('Error saving blog:', error);
    throw error;
  }
}

export async function deleteBlog(id) {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete blog');
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}
