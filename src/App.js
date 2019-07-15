import React from "react";
import TechTree from "./TechTree";
import RangeInput from "./RangeInput";
import Block from "./Block";

function App() {
  return (
    <div className="App">
      <TechTree>
        <div className="row">
          <Block name="Trim" parents={[]} />
        </div>
      </TechTree>
      <div className="inputs">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="trim">Pounds of Trim: </label>
            <input type="text" name="trim" />
          </div>
          <RangeInput />
        </form>
      </div>
      <form
        className="outputs"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="trim">
            Market Value of <strong>trim</strong>:{" "}
          </label>
          <input type="text" name="trim" value={`$${100}`} readOnly />
        </div>
        <div>
          <label htmlFor="trim">
            Market Value of <strong>distillate</strong>:{" "}
          </label>
          <input type="text" name="trim" value={`$${1000}`} readOnly />
        </div>
      </form>
    </div>
  );
}

export default App;
