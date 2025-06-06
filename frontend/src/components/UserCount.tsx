import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';

type Props = {
  refreshSignal?: boolean;
};
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const UserCount: React.FC<Props> = ({ refreshSignal }) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserCount = async () => {
    try {
      setLoading(true);
      const res = await fetch(`{API_BASE_URL}/count`);
      const data = await res.json();
      setCount(data.totalUsers);
    } catch (error) {
      console.error('Failed to fetch user count:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  useEffect(() => {
    if (refreshSignal !== undefined) {
      fetchUserCount();
    }
  }, [refreshSignal]);

  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-700 dark:text-gray-200 mt-6">
      <FaUsers size={28} className="text-blue-600 dark:text-blue-400 mb-1" />
      <div className="text-lg font-medium">
        {loading ? 'Loading users...' : `${count} user${count === 1 ? '' : 's'} registered`}
      </div>
    </div>
  );
};

export default UserCount;
