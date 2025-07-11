import fs from 'fs';
import path from 'path';

const blogsFilePath = path.join(process.cwd(), 'app/data/blogs.json');

export function getAllBlogs() {
  try {
    const fileContents = fs.readFileSync(blogsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export function getBlogById(id) {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.id === parseInt(id));
}

export function getPublishedBlogs() {
  const blogs = getAllBlogs();
  return blogs.filter(blog => blog.published);
}

export function saveBlog(blogData) {
  const blogs = getAllBlogs();
  
  if (blogData.id) {
    // Update existing blog
    const index = blogs.findIndex(blog => blog.id === blogData.id);
    if (index !== -1) {
      blogs[index] = { ...blogData, updatedAt: new Date().toISOString() };
    }
  } else {
    // Create new blog
    const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    const newBlog = {
      ...blogData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    blogs.push(newBlog);
  }
  
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
  return blogs;
}

export function deleteBlog(id) {
  const blogs = getAllBlogs();
  const filteredBlogs = blogs.filter(blog => blog.id !== parseInt(id));
  fs.writeFileSync(blogsFilePath, JSON.stringify(filteredBlogs, null, 2));
  return filteredBlogs;
}
