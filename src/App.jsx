import React from "react";
import { Route, Routes } from "react-router-dom";

import JoinRoom from "./JoinRoom";
import Chat from "./Chat";
import RequireAuth from "./middleware/RequireAuth";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<JoinRoom />}/>
    </Routes>
  );
}
export default App;
