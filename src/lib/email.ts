import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvitationEmail(name: string, email: string) {
  try {
    // Read the graduation invitation image
    const imagePath = path.join(process.cwd(), 'public', 'assets', 'graduation-invitaion.png');
    const imageBuffer = fs.readFileSync(imagePath);

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Graduation Invitation <noreply@yourdomain.com>',
      to: [email],
      subject: '🎓 Lời mời tham dự lễ tốt nghiệp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">🎓 Lời mời tham dự lễ tốt nghiệp</h1>
            <div style="width: 50px; height: 3px; background: linear-gradient(to right, #ef4444, #2563eb); margin: 0 auto;"></div>
          </div>
          
          <!-- Graduation Invitation Image -->
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${process.env.NEXT_PUBLIC_URL}/assets/graduation-invitation.png" alt="Graduation Invitation" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 4px solid #2563eb;">
            <p style="font-size: 18px; color: #334155; margin-bottom: 20px;">Chào <strong style="color: #1e293b; font-size: 20px;">${name}</strong> thân mến,</p>
            
            <p style="font-size: 16px; color: #334155; line-height: 1.8; margin-bottom: 20px;">
              Cảm ơn bạn đã luôn đồng hành và ủng hộ tôi trong suốt chặng đường học tập vừa qua. Tôi vô cùng vinh dự được mời bạn tham dự buổi lễ tốt nghiệp của tôi - một cột mốc quan trọng đánh dấu những nỗ lực và thành quả đã đạt được.
            </p>
            
            <p style="font-size: 16px; color: #334155; line-height: 1.8; margin-bottom: 20px;">
              Sự hiện diện của bạn sẽ là niềm vinh dự lớn lao và là động lực để tôi tiếp tục phấn đấu, chinh phục những mục tiêu mới trong tương lai. Đây không chỉ là ngày của riêng tôi, mà còn là ngày để cùng nhau chia sẻ niềm vui và kỷ niệm đáng nhớ.
            </p>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; margin-bottom: 25px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);">
            <h3 style="margin-bottom: 20px; font-size: 24px;">📅 Thông tin chi tiết</h3>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
              <p style="margin: 8px 0; font-size: 16px;"><strong>📍 Địa điểm:</strong> Trường Đại học Thăng Long</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>🕐 Thời gian:</strong> 10:00 - 12:00 AM</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Ngày:</strong> 05/07/2025 (Thứ 7)</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📍 Địa chỉ:</strong> Đ. Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội 100000</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
              <p style="margin: 5px 0; font-size: 14px;"><strong>👔 Dress code:</strong> Trang phục lịch sự, trang trọng</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>🎁 Lưu ý:</strong> Không cần mang quà, sự hiện diện của bạn là món quà quý giá nhất</p>
            </div>
          </div>
          
          <div style="text-align: center; background: #f1f5f9; padding: 20px; border-radius: 10px; margin-top: 30px;">
            <p style="color: #475569; font-size: 16px; margin-bottom: 15px;">
              💌 Bạn đã xác nhận tham dự bằng cách đăng ký qua website. Tôi rất mong được gặp bạn trong ngày đặc biệt này!
            </p>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 15px;">
              Nếu có bất kỳ thắc mắc nào, đừng ngần ngại liên hệ với tôi nhé.
            </p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0;">
                Trân trọng cảm ơn và hẹn gặp lại! 🎓✨
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
} 