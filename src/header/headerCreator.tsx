import React, { useReducer, ChangeEvent, KeyboardEvent } from "react";
import "./header.css";
import { useDispatch } from "react-redux";
import { addItem } from "../features/slice";
import { v4 as uuidv4 } from "uuid";
import { rule } from "../Components/status";

interface State {
  title: string;
  description: string;
  rule: string;
}

interface Action {
  type: string;
  payload?: string;
}

const initialState: State = { title: "", description: "", rule: "Task" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload || "" };
    case "description":
      return { ...state, description: action.payload || "" };
    case "rule":
      return { ...state, rule: action.payload || "" };
    case "clear":
      return { ...state, title: "", description: "", rule: "Task" };
    default:
      throw new Error();
  }
}

function Header(): JSX.Element {
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const handleSubmit = (): void => {
    if (state.title) {
      dispatch(
        addItem({
          id: uuidv4(),
          title: state.title,
          description: state.description,
          rule: state.rule,
        })
      );
    }
    dispatchState({ type: "clear" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatchState({ type: event.target.name, payload: event.target.value });
  };

  const handleRuleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    dispatchState({ type: "rule", payload: event.target.value });
  };

  const item = rule.map((e) => (
    <option key={e} value={e}>
      {e}
    </option>
  ));

  return (
    <div className="header">
      <input
        onKeyDown={handleKeyDown}
        value={state.title}
        onChange={handleChange}
        name="title"
        className="titleInput"
        type="text"
        placeholder="Title..."></input>
      <input
        onKeyDown={handleKeyDown}
        value={state.description}
        onChange={handleChange}
        name="description"
        className="titleInput"
        type="text"
        placeholder="Description..."></input>
      <div className="rule">
        <label className="label-for-drp">Select Rule </label>
        <div className="rule-dropdown">
          <select
            key={Math.random()}
            value={state.rule}
            onChange={handleRuleChange}>
            {item}
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} className="addButton">
        Add Card
      </button>
    </div>
  );
}

export default Header;
