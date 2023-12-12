import React, { Fragment, FC } from "react";
import "./style.css";
import CustomDropdown from "./dropdown";
import { useDispatch } from "react-redux";
import { deleteItem } from "../features/slice";

interface CardProps {
  item: {
    id: number,
    rule: string,
    title: string,
    description?: string,
  };
}

const Card: FC<CardProps> = ({ item }): JSX.Element => {
  const dispatch = useDispatch();

  const handleSubmit = (id: number) => {
    dispatch(deleteItem({ id }));
  };

  const dragstart = (e: React.DragEvent<HTMLDivElement>, itemId: number) => {
    e.dataTransfer.setData("dragItem", String(itemId));
  };

  return (
    <Fragment>
      <div
        draggable={true}
        onDragStart={(e) => {
          dragstart(e, item.id);
        }}
        className={item.rule}
        key={Math.random()}>
        <div className="itemTitle" key={item.id}>
          {item.title}
          <button className="deleteCard" onClick={() => handleSubmit(item.id)}>
            x
          </button>
        </div>

        <div className="description" key={Math.random()}>
          {item.description ? item.description : "no description"}
        </div>
        <CustomDropdown items={item} />
      </div>
    </Fragment>
  );
};

export default Card;
