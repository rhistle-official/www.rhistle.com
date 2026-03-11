"use client";

import { useEffect, useState } from "react";

const CountUp = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => {
      clearInterval(timer);
    };
  }, [end, duration]);

  return <p className="text-7xl md:text-8xl xl:text-9xl">{count}</p>;
};
export default CountUp;
