import { useState } from "react";
import Print99 from "./Print";
import Screen99 from "./Screen";
import ctx from "./ctx";

export default function App() {
  const [student, setStudent] = useState({
    stdName: "",
    stdClass: "",
    stdSection: "",
    stdRoll: "",
  });

  const [billMeta, setBillMeta] = useState({
    date: new Date(Date.now()).toISOString().slice(0, 10),
    month: "January",
  });

  const [billInfo, setBillInfo] = useState([]); //[[uuid,particulars,amount]]

  return (
    <ctx.Provider
      value={{
        student,
        setStudent,
        billMeta,
        setBillMeta,
        billInfo,
        setBillInfo,
      }}
    >
      <Print99></Print99>
      <Screen99></Screen99>
    </ctx.Provider>
  );
}
