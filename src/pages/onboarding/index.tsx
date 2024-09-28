import React, { useState } from "react";
import { Button, DatePicker, RadioTile, RadioTileGroup } from "rsuite";
import style from "./style.module.less";
import { useAtom } from "jotai";
import { genderAtom, dateOfBirthAtom } from "@state/introduction.atom";
import { useNavigate } from "react-router-dom";

const OnBoardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(0);
  const [gender, setGenderAtom] = useAtom<string>(genderAtom);
  const [dateOfBirth, setDateOfBirthAtom] = useAtom<Date | null>(dateOfBirthAtom);

  return (
    <div className="flex w-full flex-col justify-center gap-3 py-4 px-6">
      <div className="flex-1">
        {current === 0 && (
          <div className={style.content}>
            <img
              src="assets/image_welcome.png"
              alt="welcome"
              className="w-full"
            />
            <h4 className="text-center">
              Welcome to the Healty App, your personal health tracker
            </h4>
          </div>
        )}
        {current === 1 && (
          <div className={style.content}>
            <img
              src="assets/image_gender.png"
              alt="welcome"
              className="w-full"
            />
            <h4 className="text-center">Please select your gender</h4>
            <RadioTileGroup
              value={gender}
              onChange={(val) => setGenderAtom(val.toString())}
              className="w-full"
            >
              <div className="flex items-center gap-3">
                <RadioTile
                  value="male"
                  icon={<div className="i-mdi:gender-male text-sm" />}
                  className="w-1/2"
                >
                  <span className="text-black">Male</span>
                </RadioTile>
                <RadioTile
                  value="female"
                  icon={<div className="i-mdi:gender-female text-sm" />}
                  className="w-1/2"
                >
                  <span className="text-black">Female</span>
                </RadioTile>
              </div>
            </RadioTileGroup>
          </div>
        )}
        {current === 2 && (
          <div className={style.content}>
            <img src="assets/image_date.png" alt="welcome" className="w-full" />
            <h4 className="text-center">Date of your birth</h4>
            <DatePicker
              format="MMMM dd, yyyy"
              className="w-full"
              value={dateOfBirth}
              placement="top"
              onChange={(val) => {
                if (val) {
                  setDateOfBirthAtom(val);
                }
              }}
            />
          </div>
        )}
      </div>
      <Button
        appearance="primary"
        size="lg"
        className="w-full"
        onClick={() => {
          if (current < 2) {
            setCurrent(current + 1);
          } else {
            navigate("/weight", { replace: true });
          }
        }}
        disabled={
          (current === 1 && gender === "") ||
          (current === 2 && dateOfBirth === null)
        }
      >
        {current === 0 ? "Get Started" : current > 1 ? "Save" : "Continue"}
      </Button>
    </div>
  );
};

export default OnBoardingPage;
