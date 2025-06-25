import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sendInvitationEmail } from '@/lib/email';

// Retry helper function
async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  throw new Error('Max retries exceeded');
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Họ tên và email là bắt buộc' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Connect to database with retry
    const { db } = await withRetry(async () => {
      return await connectToDatabase();
    });
    
    // Check if email already exists
    const existingAttendee = await db.collection('attendees').findOne({ email });
    if (existingAttendee) {
      return NextResponse.json(
        { error: 'Email này đã được đăng ký trước đó. Mỗi email chỉ có thể đăng ký một lần.' },
        { status: 400 }
      );
    }

    // Save to database
    const attendee = {
      name,
      email,
      message: message || '',
      createdAt: new Date(),
    };

    await db.collection('attendees').insertOne(attendee);

    // Send invitation email
    const emailResult = await sendInvitationEmail(name, email);
    
    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      // Still return success since data was saved
    }

    return NextResponse.json(
      { 
        message: emailResult.success 
          ? 'Đăng ký thành công! Thiệp mời chi tiết đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư (kể cả spam).' 
          : 'Đăng ký thành công! Tuy nhiên có lỗi khi gửi email, vui lòng liên hệ trực tiếp.',
        emailSent: emailResult.success 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API Error:', error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('MongoServerSelectionError') || error.message.includes('SSL')) {
        return NextResponse.json(
          { error: 'Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau.' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to database with retry
    const { db } = await withRetry(async () => {
      return await connectToDatabase();
    });
    
    const attendees = await db.collection('attendees')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Mask email addresses
    const maskedAttendees = attendees.map(attendee => ({
      _id: attendee._id,
      name: attendee.name,
      email: maskEmail(attendee.email),
      message: attendee.message,
      createdAt: attendee.createdAt,
    }));

    return NextResponse.json({ attendees: maskedAttendees });

  } catch (error) {
    console.error('API Error:', error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('MongoServerSelectionError') || error.message.includes('SSL')) {
        return NextResponse.json(
          { error: 'Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau.' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy danh sách' },
      { status: 500 }
    );
  }
}

function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  const visibleChars = Math.min(3, Math.floor(localPart.length / 2));
  const maskedLocal = localPart.substring(0, visibleChars) + '*'.repeat(localPart.length - visibleChars);
  return `${maskedLocal}@${domain}`;
} 