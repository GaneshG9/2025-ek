import { NextRequest, NextResponse } from 'next/server';
import { leadService } from '@/lib/local-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      address, 
      estimatedBill, 
      roofType, 
      propertyType 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create solar lead entry
    const leadData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      estimatedBill: parseFloat(estimatedBill) || 0,
      roofType: roofType || 'Unknown',
      propertyType: propertyType || 'Unknown',
      status: 'new' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const leadId = await leadService.create(leadData);

    return NextResponse.json({
      success: true,
      message: 'Solar inquiry submitted successfully',
      id: leadId
    });

  } catch (error) {
    console.error('Solar lead error:', error);
    return NextResponse.json(
      { error: 'Failed to submit solar inquiry' },
      { status: 500 }
    );
  }
}