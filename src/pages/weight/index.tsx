import { dateOfBirthAtom, genderAtom } from "@state/introduciton.atom";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Schema } from "rsuite";
import FormGroup from "rsuite/esm/FormGroup";

const WeightPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [gender] = useAtom(genderAtom);
  const [dateOfBirth] = useAtom(dateOfBirthAtom);
  const formRef = useRef<any>(null);
  const [formValue, setFormValue] = useState<any>({
    weight: null,
    height: null,
    bodyFat: null,
    muscleMass: null,
    viscealFat: null,
    basalMetabolism: null,
  });

  useEffect(() => {
    console.log("loc ", location);
  }, []);

  const allowedThreeDigits = (value: any) => {
    const regex = /^\d{1,3}(\.\d{1,2})?$/;
    if (!regex.test(value.toString())) {
      return false;
    }
    return true;
  };

  const allowedTwoDigits = (value: any) => {
    if (value === undefined || value === null || value === "") {
      return true;
    }

    const regex = /^\d{1,2}(\.\d{1,2})?$/;
    if (!regex.test(value.toString())) {
      return false;
    }
    return true;
  };

  const allowedFourDigits = (value: any) => {
    if (value === undefined || value === null || value === "") {
      return true;
    }

    const regex = /^\d{1,4}(\.\d{1,2})?$/;
    if (!regex.test(value.toString())) {
      return false;
    }
    return true;
  };

  const allowedNumber = (value: any) => {
    if (isNaN(value)) {
      return false;
    }
    return true;
  };

  const [formError, setFormError] = useState<any>({
    weight: "",
    height: "",
    bodyFat: "",
    muscleMass: "",
    viscealFat: "",
    basalMetabolism: "",
  });

  const model = Schema.Model({
    // REQUIRED
    weight: Schema.Types.NumberType()
      .isRequired("Weight is required")
      .addRule((value: any) => allowedNumber(value))
      .addRule(
        (value) => allowedThreeDigits(value),
        "Please enter a number with up to 3 digits or decimals (e.g., 75.5kg)"
      ),

    height: Schema.Types.NumberType()
      .isRequired("Height is required")
      .addRule((value: any) => allowedNumber(value))
      .addRule(
        (value) => allowedThreeDigits(value),
        "Please enter a number with up to 3 digits or decimals (e.g., 175.5cm)"
      ),

    // OPTIONAL
    bodyFat: Schema.Types.NumberType()
      .addRule((value: any) => allowedNumber(value))
      .addRule(
        (value) => allowedTwoDigits(value),
        "Please enter a number with up to 2 digits or decimals (e.g., 12.5%)"
      ),

    muscleMass: Schema.Types.NumberType()
      .addRule((value: any) => allowedNumber(value))
      .addRule(
        (value) => allowedTwoDigits(value),
        "Please enter a number with up to 2 digits or decimals (e.g., 12.5%)"
      ),

    viscealFat: Schema.Types.NumberType()
      .range(1, 12, "The value must be between 1 and 12.")
      .addRule((value) => {
        if (Number.isInteger(value)) {
          return false;
        }
        return true;
      }, "The value must be an integer (no decimals)."),

    basalMetabolism: Schema.Types.NumberType().addRule(
      (value) => allowedFourDigits(value),
      "Please enter values in thousands (e.g., 1300 kcal)"
    ),
  });

  const onSubmit = () => {
    if (!formRef.current.check()) {
      console.log("error ", formError);

      return;
    }

    navigate("/profile", {
      replace: true,
      state: { ...location.state, ...formValue },
    });
  };

  return !gender && !dateOfBirth ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full py-4 px-6 overflow-scroll">
      <h5 className="mb-5">Form Weight</h5>
      <div className="flex justify-center">
        <img src="assets/image_weight_form.png" className="w-1/2" />
      </div>
      <Form
        ref={formRef}
        fluid
        model={model}
        formValue={formValue}
        formError={formError}
        onCheck={setFormError}
        onChange={setFormValue}
      >
        <FormGroup>
          <Form.ControlLabel>Weight</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="weight"
            placeholder="e.g., 75.5 kg"
          />
        </FormGroup>
        <FormGroup>
          <Form.ControlLabel>Height</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="height"
            placeholder="e.g., 175.5 cm"
          />
        </FormGroup>
        <FormGroup>
          <Form.ControlLabel>Body Fat</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="bodyFat"
            placeholder="e.g., 12.5%"
          />
        </FormGroup>
        <FormGroup>
          <Form.ControlLabel>Muscle Mass</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="muscleMass"
            placeholder="e.g., 40.2 kg"
          />
        </FormGroup>
        <FormGroup>
          <Form.ControlLabel>Visceal Fat</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="viscealFat"
            placeholder="Values between 1 and 12 (no decimals)"
          />
        </FormGroup>
        <FormGroup>
          <Form.ControlLabel>Basal Metabolism</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="basalMetabolism"
            placeholder="e.g., 1300 kcal"
          />
        </FormGroup>
        <FormGroup>
          <Button
            type="submit"
            size="lg"
            appearance="primary"
            className="w-full"
            onClick={onSubmit}
          >
            Save
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default WeightPage;
