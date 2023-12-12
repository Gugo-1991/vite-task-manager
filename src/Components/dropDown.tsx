import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../features/slice";
import { statuses } from "./status";

interface CustomDropdownProps {
  items: {
    id: string,
    status: string,
    rule: string,
  };
}

function CustomDropdown({ items }: CustomDropdownProps): JSX.Element {
  const index = statuses.indexOf(items.status);
  const arr =
    index !== -1
      ? index === 0
        ? [statuses[index], statuses[index + 1]]
        : index !== 0
        ? [statuses[index], statuses[index - 1], statuses[index + 1]]
        : [statuses[index + 1]]
      : [];

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(items.status);

  const handleSelectChange = (newValue: string, id: string) => {
    setSelectedValue(newValue);
    dispatch(
      changeStatus({
        id: id,
        status: newValue,
      })
    );
  };

  const item = statuses.map((e) => (
    <option key={Math.random()} value={e}>
      {e}
    </option>
  ));
  const item2 = arr.map((e) => (
    <option key={Math.random()} value={e}>
      {e}
    </option>
  ));

  return (
    <div key={Math.random()} className="custom-dropdown">
      <select
        key={Math.random()}
        id={items.id}
        defaultValue={selectedValue}
        onChange={(e) => handleSelectChange(e.target.value, items.id)}>
        {items.rule === "Task" ? item : item2}
      </select>
    </div>
  );
}

export default CustomDropdown;
