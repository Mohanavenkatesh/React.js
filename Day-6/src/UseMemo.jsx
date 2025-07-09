import React, { useState, useMemo } from "react";

function UseMemo() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // 🧠 useMemo to "cache" the doubled number
  const double = useMemo(() => {
    console.log("Calculating...");
    return number * 2;
  }, [number]); // Only recalculates when `number` changes

  const themeStyles = {
    backgroundColor: dark ? "#333" : "#fff",
    color: dark ? "#fff" : "#000",
    padding: "20px",
    marginTop: "10px"
  };

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => setDark(prev => !prev)}>Toggle Theme</button>

      <div style={themeStyles}>
        <h3>Doubled Number: {double}</h3>
      </div>
    </div>
  );
}

export default UseMemo;
