import { Fragment } from "react";
import "./style.css";
import Column from "./columnCreator";
import "react-dropdown/style.css";
import { statuses } from "./status";

function Columns(): JSX.Element {
  return (
    <Fragment>
      <section className="columnsArea" key={Math.random()}>
        <div className="columnsPosition" key={Math.random()}>
          {statuses.map((e) => {
            return <Column key={Math.random()} status={e} />;
          })}
        </div>
      </section>
    </Fragment>
  );
}

export default Columns;
