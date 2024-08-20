import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json({ message: 'Path is required' }, { status: 400 });
  }

  try {
    // Assuming you have a function to perform revalidation
    await revalidate(path);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}

async function revalidate(path: string) {
  // Implement your revalidation logic here
  // For example, you might use a library or service to revalidate the path
  console.log(`Revalidating path: ${path}`);
}
