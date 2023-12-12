import { statuses } from "../Components/status";

interface Item {
  id: number;
  rule: string;
  status: string;
}

export const ChangeStatus = (
  state: Item[],
  action: { payload: { id: number, status: string } }
) => {
  const { id, status } = action.payload;
  const itemToUpdate = state.find((item) => item.id === id);

  if (itemToUpdate && itemToUpdate.rule !== "Task") {
    const currentIndex = statuses.indexOf(itemToUpdate.status);
    const targetIndex = statuses.indexOf(status);

    if (
      currentIndex !== -1 &&
      targetIndex !== -1 &&
      (targetIndex === currentIndex + 1 || targetIndex === currentIndex - 1)
    ) {
      itemToUpdate.status = status;
      localStorage.setItem("items", JSON.stringify([...state]));
    }
  }

  if (itemToUpdate && itemToUpdate.rule === "Task") {
    state.forEach((item) => {
      if (item.id === id) {
        item.status = status;
        localStorage.setItem("items", JSON.stringify([...state]));
      }
    });
  }
};
