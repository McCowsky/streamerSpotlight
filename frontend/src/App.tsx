import { FunctionComponent } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import StreamerView from "./pages/StreamerView/StreamerView";

const App: FunctionComponent = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <div>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/streamerModal" element={<StreamerView />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
