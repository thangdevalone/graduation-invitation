import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvitationEmail(name: string, email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.FROM_EMAIL ||
        "Graduation Invitation <noreply@yourdomain.com>",
      to: [email],
      subject: "🎓 Lời mời tham dự lễ tốt nghiệp",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 24px;">🎓 Lời mời tham dự lễ tốt nghiệp</h1>
          </div>
          
          <div style="text-align: center; margin-bottom: 25px;">
            <img src="${process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "")}/assets/graduation-invitation.png" alt="Graduation Invitation" style="max-width: 100%; height: auto; border-radius: 8px;" />
          </div>
          
          <div style="margin-bottom: 25px;">
            <p style="font-size: 16px; line-height: 1.6;">
              Chào <strong>${name}</strong>,
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Tôi vô cùng vinh dự được mời bạn tham dự buổi lễ tốt nghiệp của tôi. Sự hiện diện của bạn sẽ là niềm vinh dự lớn lao với tôi.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 25px;">
            <h3 style="margin: 0 0 15px 0; color: #2563eb; font-size: 18px;">Thông tin chi tiết</h3>
            
            <p style="margin: 8px 0; font-size: 15px;"><strong>📍 Địa điểm:</strong> Trường Đại học Thăng Long</p>
            <p style="margin: 8px 0; font-size: 15px;"><strong>🕐 Thời gian:</strong> 10:00 - 12:00 AM</p>
            <p style="margin: 8px 0; font-size: 15px;"><strong>📅 Ngày:</strong> 05/07/2025 (Thứ 7)</p>
            <p style="margin: 8px 0; font-size: 15px;"><strong>📍 Địa chỉ:</strong> Đ. Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội</p>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
              <p style="margin: 5px 0; font-size: 14px; color: #666;"><strong>Dress code:</strong> Trang phục lịch sự</p>
              <p style="margin: 5px 0; font-size: 14px; color: #666;"><strong>Lưu ý:</strong> Sự hiện diện của bạn là món quà quý giá nhất</p>
            </div>
          </div>
          
          <div style="text-align: center; background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-size: 15px;">
              Bạn đã xác nhận tham dự qua website. Rất mong được gặp bạn trong ngày đặc biệt này!
            </p>
            <p style="margin: 10px 0 0 0; font-size: 16px; font-weight: bold; color: #2563eb;">
              Trân trọng cảm ơn! 🎓
            </p>
          </div>
          
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
