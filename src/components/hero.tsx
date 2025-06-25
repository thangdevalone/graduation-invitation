"use client";
import { BackgroundBeams } from "./ui/background-beams";
import { CustomeInput } from "./ui/custome-input";

export function Hero() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[80vh] w-full bg-white flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <div className="relative overflow-visible">
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-blue-500 text-center font-sans font-bold">
            Join graduation ceremony of me
          </h1>
        </div>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Đây không chỉ là một buổi lễ – mà là cột mốc quan trọng đánh dấu chặng
          đường học tập đầy nỗ lực và đam mê. Dù bạn là người thân, bạn bè hay
          thầy cô, sự hiện diện của bạn sẽ là niềm vinh dự lớn lao. Điền địa chỉ
          email của bạn để nhận lời mời.
        </p>
        <CustomeInput
          placeholder="example@gmail.com"
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
