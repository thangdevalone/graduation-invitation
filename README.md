# 🎓 Graduation Invitation App

Ứng dụng thiệp mời tốt nghiệp với form đăng ký, gửi email tự động và quản lý danh sách người tham dự.

## ✨ Tính năng

- 📝 **Form đăng ký**: Thu thập họ tên, email và lời chúc
- 📧 **Gửi email tự động**: Sử dụng Resend API để gửi thiệp mời
- 🗃️ **Lưu trữ MongoDB**: Lưu thông tin người tham dự
- 👥 **Danh sách tham dự**: Xem danh sách với email được che (abc***@gmail.com)
- 🎨 **UI đẹp**: Thiết kế hiện đại với Tailwind CSS và Motion
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🚀 Cài đặt

### 1. Clone project
```bash
git clone <repository-url>
cd graduation-invitation
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Thiết lập environment variables
Tạo file `.env.local` dựa trên `.env.example`:

```bash
cp .env.example .env.local
```

Cập nhật các giá trị trong `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/graduation-invitation
# hoặc MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/graduation-invitation

# Resend API Key
RESEND_API_KEY=re_your_resend_api_key

# Next.js URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email settings
FROM_EMAIL=noreply@yourdomain.com
```

### 4. Thiết lập MongoDB
- **Local MongoDB**: Cài đặt MongoDB Community Server
- **MongoDB Atlas**: Tạo cluster miễn phí tại [mongodb.com](https://www.mongodb.com/atlas)

### 5. Thiết lập Resend
1. Đăng ký tại [resend.com](https://resend.com)
2. Tạo API key trong dashboard
3. Thêm domain của bạn (cho production)

### 6. Chạy ứng dụng
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu trúc Project

```
src/
├── app/
│   ├── api/
│   │   └── attendees/
│   │       └── route.ts          # API routes cho attendees
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── hero.tsx                  # Component chính
│   │   └── ui/
│   │       ├── graduation-form.tsx   # Form đăng ký
│   │       ├── attendees-list.tsx    # Danh sách người tham dự
│   │       └── ...
│   └── lib/
│       ├── mongodb.ts               # MongoDB connection
│       ├── email.ts                 # Email service
│       └── utils.ts
```

## 🔧 API Endpoints

### POST `/api/attendees`
Đăng ký người tham dự

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "example@gmail.com",
  "message": "Chúc mừng bạn!" // optional
}
```

**Response:**
```json
{
  "message": "Đăng ký thành công! Giấy mời đã được gửi đến email của bạn.",
  "emailSent": true
}
```

### GET `/api/attendees`
Lấy danh sách người tham dự

**Response:**
```json
{
  "attendees": [
    {
      "_id": "...",
      "name": "Nguyễn Văn A",
      "email": "exa***@gmail.com",
      "message": "Chúc mừng bạn!",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🎨 Customization

### Thay đổi email template
Chỉnh sửa function `sendInvitationEmail` trong `src/lib/email.ts`

### Thay đổi giao diện
- Colors: Chỉnh sửa Tailwind classes trong components
- Layout: Cập nhật `src/components/hero.tsx`
- Animations: Sử dụng Motion components

### Thêm validation
Cập nhật validation trong `src/app/api/attendees/route.ts`

## 🚀 Deploy

### Vercel (Recommended)
1. Push code lên GitHub
2. Connect với Vercel
3. Thêm environment variables
4. Deploy!

### Environment Variables cho Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/graduation-invitation
RESEND_API_KEY=re_your_production_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
FROM_EMAIL=noreply@your-verified-domain.com
```

## 🛠️ Development

### Scripts
- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra code style

### Tech Stack
- **Framework**: Next.js 15
- **Database**: MongoDB
- **Email**: Resend
- **Styling**: Tailwind CSS
- **Animation**: Motion
- **TypeScript**: Type safety

## 📝 License

MIT License

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request
