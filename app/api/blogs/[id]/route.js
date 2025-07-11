import { NextResponse } from 'next/server';
import { getBlogById, saveBlog, deleteBlog } from '../../../lib/blogUtils.server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const blog = getBlogById(id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const blogData = await request.json();
    const blogs = saveBlog(blogData);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const blogs = deleteBlog(id);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
