import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/contextApi";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { Provider } from "react-redux";
import store from "./utils/Store";

const App = () => {
  return (
    <Provider store={store}>
      <AppContext>
        <BrowserRouter>
          <div className="flex flex-col h-full">
            <div>
              <Header />
            </div>

            <Routes>
              <Route path="/" exact element={<Feed />} />{" "}
              {/* exact means onload pe ye route chlega*/}
              <Route
                path="/searchResult/:searchQuery"
                element={<SearchResult />}
              />
              <Route path="/video/:id" element={<VideoDetails />} />
              {/* <Route path="/channel/:id" element={<ChannelDetails />}/> */}
            </Routes>
          </div>
        </BrowserRouter>
      </AppContext>
    </Provider>
  );
};

export default App;
