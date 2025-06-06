// LaunchCountdown.tsx
import React, { useState, useEffect } from 'react';
import {
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

// ✅ Set launch date once, globally (e.g., 2 months from server time)
// const launchDate = addMonths(new Date(), 2);
const launchDate = new Date(2025, 5, 27);
const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      if (now >= launchDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = differenceInDays(launchDate, now);
      const hours = differenceInHours(launchDate, now) % 24;
      const minutes = differenceInMinutes(launchDate, now) % 60;
      const seconds = differenceInSeconds(launchDate, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft(); // Immediate call

    const timer = setInterval(calculateTimeLeft, 1000); // ✅ update every second

    return () => clearInterval(timer);
  }, []); // ✅ Empty dependency array

  const CountdownItem = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-3xl sm:text-4xl font-bold bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-md min-w-[80px] text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="text-sm mt-2 text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center space-x-4 sm:space-x-6">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Minutes" />
      <CountdownItem value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default LaunchCountdown;
