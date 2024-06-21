import React from "react";
import { Route, Routes } from "react-router-dom";
import RoomDetail from "./components/Rooms/RoomDetail";
import MovieDetail from "./components/Rooms/MovieDetail/MovieDetail";
import Home from "./components/Home";
import RoomList from "./components/Admin/RoomList/RoomList";
import RoomForm from "./components/Admin/RoomForm/RoomForm";
import AdminMovieForm from "./components/Admin/AdminMovieForm/AdminMovieForm";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header/>
    <div className="container">
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/rooms/:roomId" exact element={<RoomDetail />} />
        <Route
          path="/rooms/:roomId/movies/:movieId"
          element={<MovieDetail />}
        />
        <Route path="/admin/rooms" exact element={<RoomList/>} />
        <Route path="/admin/rooms/new" exact element={<RoomForm/>} />
        <Route path="/admin/rooms/:roomId" element={<RoomForm/>} />
        <Route path="/admin/rooms/:roomId/movies/new" element={<AdminMovieForm />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
