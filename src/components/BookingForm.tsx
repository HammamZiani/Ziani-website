import React from "react";
import bg from "@/assets/images/hero-bg.jpg";
import { Input } from "./ui/input";
import CustomButton from "./CustomButton";

function BookingForm() {
  return (
    <div className="flex-1">
      <div className=" h-[44rem] flex items-center justify-end">
        <div
          className="bg-no-repeat bg-center bg-cover h-[44rem] w-[35rem] rounded-t-full border border-black p-6"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="h-full w-full bg-[#E5E5DD] rounded-t-full ">
            <div className="pt-50 px-10 gap-3 flex flex-col">
              <Input
                className="border-black rounded-none"
                placeholder="Name..."
              />
              <Input className="border-black rounded-none" />
              <Input className="border-black rounded-none" />
              <Input className="border-black rounded-none" />
              <Input className="border-black rounded-none" />
              <CustomButton>Send </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
