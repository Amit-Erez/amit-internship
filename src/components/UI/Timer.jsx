import React, { useEffect, useState } from "react";

const Timer = ({ timeleft }) => {
  const [time, setTime] = useState(timeleft);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1000) {
          clearInterval(interval); 
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (ms) => {
    if (ms <= 0) return "EXPIRED";

    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    return `${h}h ${m}m ${s}s`;
  };

  return <div>{format(time)}</div>;
};

export default Timer;
