import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, selectContent } from "../features/slice";
import Card from "./cardCreator";

interface ColumnProps {
  status: string;
}

const Column: React.FC<ColumnProps> = ({ status }): JSX.Element => {
  const dispatch = useDispatch();
  const value = useSelector(selectContent);

  const statusCounts: Record<string, number> = {
    Backlog: 0,
    "In Process": 0,
    "In Review": 0,
    Done: 0,
  };

  value.forEach((item) => {
    const itemStatus = item.status;
    if (statusCounts.hasOwnProperty(itemStatus)) {
      statusCounts[itemStatus]++;
    }
  });

  const statusArray = Object.entries(statusCounts).map(([key, value]) => ({
    status: key,
    count: value,
  }));

  const handleSelectChange = (id: string, itemStatus: string) => {
    dispatch(
      changeStatus({
        id: id,
        status: itemStatus,
      })
    );
  };

  const drop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
    const dragFlag = e.dataTransfer.getData("dragItem");
    handleSelectChange(dragFlag, newStatus);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        key={Math.random()}
        className="column"
        onDrop={(e) => drop(e, status)}
        onDragOver={(e) => dragOver(e)}>
        <div className="statusName" key={Math.random()}>
          {status}
          <div>
            {statusArray.map((e) => {
              if (e.status === status) {
                return e.count;
              }
              return null;
            })}
          </div>
        </div>
        {value.map((item) => {
          if (item.status === status) {
            return <Card key={Math.random()} item={item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Column;
