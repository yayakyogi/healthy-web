import ResultComponent from "@components/result/result.component";
import { dateOfBirthAtom, genderAtom } from "@state/introduciton.atom";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, Message } from "rsuite";

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { weight, height, bodyFat, muscleMass, viscealFat, basalMetabolism } =
    location.state;
  const [gender] = useAtom(genderAtom);
  const [dateOfBirth] = useAtom(dateOfBirthAtom);
  const navigate = useNavigate();
  const [bmi, setBmi] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const checkBmi = (bmi: number) => {
    setBmi(+bmi);

    if (+bmi <= 18.5) {
      setMessage("Underweight");
    } else if (+bmi > 18.5 && +bmi < 23.0) {
      setMessage("Normal");
    } else if (+bmi >= 23.0) {
      setMessage("Overweight");
    } else if (+bmi >= 25.0) {
      setMessage("Obesity");
    }
  };

  const result: any = {
    underweight: "info",
    normal: "success",
    overweight: "warning",
    obesity: "error",
  };

  useEffect(() => {
    const roundHeight = Math.round(height);
    const convertHeight = roundHeight / 100;
    const countBmi = weight / (convertHeight * convertHeight);

    checkBmi(+countBmi.toFixed(1));
  }, []);

  return (
    <div className="w-full py-4 px-6">
      <div className="flex gap-2 items-center mb-3">
        <IconButton
          className="bg-white hover:bg-transparent"
          icon={<div className="i-mdi:arrow-back text-xl" />}
          onClick={() => navigate("/weight", { replace: true })}
        />

        <h5 className="">Profile</h5>
      </div>
      <img src="assets/image_profile.png" className="w-full" />
      <Message type={result[message.toLowerCase()]} className="mb-5">
        Your BMI (Body Mass Index) is <strong>{message}!</strong>
      </Message>
      <ResultComponent label="Gender" value={gender} />
      <ResultComponent
        label="Date of birth"
        value={new Date(dateOfBirth as any).toLocaleDateString()}
      />
      <ResultComponent label="BMI" value={bmi} />
      <ResultComponent label="Weight" value={`${weight} kg`} />
      <ResultComponent label="Height" value={`${height} cm`} />
      <ResultComponent
        label="Body Fat"
        value={bodyFat ? `${bodyFat} %` : "-"}
      />
      <ResultComponent
        label="Muscle Mass"
        value={muscleMass ? `${muscleMass} kg` : "-"}
      />
      <ResultComponent label="Visceal Fat" value={viscealFat || "-"} />
      <ResultComponent
        label="Basal Metabolism"
        value={basalMetabolism ? `${basalMetabolism} Kcal` : "-"}
      />
    </div>
  );
};

export default ProfilePage;
