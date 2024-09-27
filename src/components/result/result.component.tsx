import React from "react";
import { FlexboxGrid } from "rsuite";

const ResultComponent: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => {
  return (
    <FlexboxGrid className="mb-2 text-black">
      <FlexboxGrid.Item colspan={8}>{label}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={1}>:</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12}>{value}</FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default ResultComponent;
