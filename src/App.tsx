import "./App.css";
import Columns from "./Components/columnsArea";
import Header from "./header/headerCreator";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App(): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className="app-content" key={Math.random()}>
        <Header />
        <Columns />
      </section>
    </DndProvider>
  );
}

export default App;
