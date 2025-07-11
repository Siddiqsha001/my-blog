import { NextResponse } from 'next/server';
import { getAllBlogs, saveBlog, getPublishedBlogs } from '../../lib/blogUtils.server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    const blogs = published === 'true' ? getPublishedBlogs() : getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const blogData = await request.json();
    const blogs = saveBlog(blogData);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
