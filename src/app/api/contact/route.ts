import { NextRequest, NextResponse } from 'next/server';
import { messageService } from '@/lib/local-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, subject, message, source } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create contact form entry
    const contactData = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      source: source || 'website',
      status: 'new' as const,
      createdAt: new Date(),
    };

    const contactId = await messageService.create(contactData);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: contactId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}