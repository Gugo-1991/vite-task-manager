import { createSlice } from "@reduxjs/toolkit";
import { ChangeStatus } from "./hooks";

interface Item {
  id: number;
  title: string;
  status: string;
  description: string;
  rule: string;
}

const storedItems = localStorage.getItem("items");
let initialState: ColumnState = [];

if (storedItems) {
  const items: ColumnState = JSON.parse(storedItems);
  initialState = items;
}

export const columnSlice = createSlice({
  name: "column",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const newItem: Item = {
        id: action.payload.id,
        title: action.payload.title,
        status: "Backlog",
        description: action.payload.description,
        rule: action.payload.rule,
      };
      const newState = [...state, newItem];
      localStorage.setItem("items", JSON.stringify(newState));
      return newState;
    },

    changeStatus: (state, action: PayloadAction<Item>) => {
      ChangeStatus(state, action);
    },

    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      const newState = state.filter((item) => item.id !== action.payload.id);

      localStorage.setItem("items", JSON.stringify(newState));

      return newState;
    },
  },
});

export const { addItem, changeStatus, deleteItem } = columnSlice.actions;
export const selectContent = (state: { column: ColumnState }) => state.column;

export default columnSlice.reducer;
