import React, { useState, useContext } from "react";
import { DatePicker } from "react-rainbow-components";
import { Context } from "../store/appContext";

export const RainbowDatePicker = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="rainbow-align-content_center rainbow-m_auto">
      <DatePicker
        id="datePicker-1"
        value={store.date}
        onChange={actions.onChange}
        label="Pick a date"
        formatStyle="medium"
      />
    </div>
  );
};
