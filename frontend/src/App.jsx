import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="relative w-screen">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
