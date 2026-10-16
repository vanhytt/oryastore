import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paths } = body;

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json(
        { error: 'Invalid paths parameter' },
        { status: 400 }
      );
    }

    // Revalidate all specified paths
    paths.forEach((path: string) => {
      revalidatePath(path);
    });

    return NextResponse.json({ 
      revalidated: true, 
      paths,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
