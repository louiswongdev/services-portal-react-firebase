import React, { useEffect, useState } from 'react';

import moment from 'moment';

const Timer = ({ seconds, timeoutCB }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (!secondsLeft) {
      return timeoutCB();
    }

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  return (
    <div className="timer">
      {secondsLeft && moment.utc(secondsLeft * 1000).format('HH:mm:ss')}
    </div>
  );
};

export default Timer;
