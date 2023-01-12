import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import { gsap } from 'gsap';
import './App.css'

const GridifyItem = ({ i }) => {
  const ctx = useRef();
  const [bgColor, setBgColor] = useState('#FFF');

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => ctx.current.revert();
  }, [ctx])

  // run when `bgColor` changes
  useLayoutEffect(() => {
    ctx.current.add(() => {
      gsap.to(".gridify__item", {
        backgroundColor: bgColor,
        stagger: {
          each: 0.015,
          from: i,
          grid: "auto",
          ease: "power2.inOut",
        }
      });
    });
  }, [bgColor]);

  // generate random hex code for bgColor
  const randomColor = () => {
    const hexCode = Math.floor(Math.random()*16777215).toString(16);
    return `#${hexCode}`;
  }

  const handleStagger = (e) => {
    console.log(e.target.id);
    console.log(randomColor());
    setBgColor(randomColor());
  }

  return (
      <div
        key={`gridifyItem${i}`}
        style={{backgroundColor: bgColor}}
        className="gridify__item"
        id={i}
        onClick={handleStagger}
      ></div>
  );
};

const App = () => {
  const [colNum, setColNum] = useState(0);
  const [rowNum, setRowNum] = useState(0);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    getGridSize();
    window.addEventListener('resize', getGridSize, false)
  }, []);

  const getGridSize = () => {
    const columns = Math.floor(document.body.clientWidth / 50);
    const rows = Math.floor(document.body.clientHeight / 50)

    console.log(`columns: ${columns} rows: ${rows} total: ${rows * columns}`);

    setColNum(columns);
    setRowNum(rows);
    setTotal(rows * columns);
  }

  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <div
        className="gridify"
      >
        {[...Array(total)].map((x, i) => (
          <GridifyItem
            key={i}
            i={i}
          />
        ))}
      </div>
    </div>
  );

};

export default App
