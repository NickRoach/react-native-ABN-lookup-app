import { NativeRouter, Route, Routes } from "react-router-native";
import React, { useState } from "react";
import { Search, Results } from "./screens";

export default function App() {
  const [resultsList, setResultsList] = useState();
  const [searchString, setSearchString] = useState();
  const [entityName, setEntityName] = useState("");

  return (
    <NativeRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Search
              setResultsList={setResultsList}
              searchString={searchString}
              setSearchString={setSearchString}
              setEntityName={setEntityName}
              entityName={entityName}
            />
          }
        />
        <Route
          path="/results"
          element={
            <Results resultsList={resultsList} entityName={entityName} />
          }
        />
      </Routes>
    </NativeRouter>
  );
}
