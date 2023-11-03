import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {

  useEffect(function() {
    console.log("created :)");
    return function() { console.log("destroyed"); }
  }, []);

  return <h1>Hello</h1> ;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello/> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );

  /*    20231101
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  // console.log("i run all the time");

  useEffect(() => {     // 최초 한 번만 실행
    console.log("I run only once.");
  }, []);

  useEffect(() => {     // key word 변화 시에만 실행
    // if(keyword !== "" && keyword.length > 5)  // (최초 실행 X, value 길이 지정)
    console.log("I run when 'keyword' changes");
  }, [keyword]);

  useEffect(() => {     // counter 변화 시에만 실행  
    console.log("I run when 'counter' changes");
  }, [counter]);

  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );*/
}

export default App;
