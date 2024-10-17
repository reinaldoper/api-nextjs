"use client";
import { useEffect, useState } from "react";
import { IAthlete } from "../types/athleteType";
import Image from "next/image";
import Loading from "../components/Loading";

export default function AthletePage() {
  const [token, setToken] = useState<string>('');
  const [athletes, setAthletes] = useState<IAthlete | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<string>('');
  const [olympicId, setOlympicId] = useState<number>(0)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const requestOptions: RequestInit = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(token)
          },
          body: JSON.stringify({ olympicId }),
        };

        const response = await fetch('/api/athletes/athlete', requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch athletes');
        }

        const data = await response.json();
        setAthletes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (token) {
      fetchAthletes();
    }
  }, [token, olympicId]);

  if (error) {
    return <div className="flex justify-center m-auto">Error: {error}</div>;
  }

  if (!athletes) {
    return <Loading />;
  }

  const handleLimit = async () => {
    try {
      const requestOptions: RequestInit = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(token)
        },
        body: JSON.stringify({ olympicId }),
      };

      const response = await fetch(`/api/athletes/athlete?limit=${limit}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch athletes');
      }

      const data = await response.json();
      setAthletes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

  }
  const handleToggleOlympicId = () => {
    setOlympicId((prevOlympicId: number) => (prevOlympicId === 0 ? 1 : 0));
  };

  const { message } = athletes;

  return (
    <div>
      <h1 className="flex flex-col items-center text-3xl font-bold text-purple-700 mb-6 mt-8">
        Olympics Athletes from Brazil
      </h1>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Limit..."
          className="border border-gray-300 rounded-md p-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <button
          type="button"
          onClick={() => handleLimit()}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
          <span>Apply Limit</span>
        </button>
        <button
          type="button"
          onClick={handleToggleOlympicId}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          {olympicId === 0 ? 'Olympic Athletes' : 'Olympic ForOlympics'}
        </button>
      </div>

      <ul className="flex flex-wrap justify-center w-11/12 lg:w-3/4 m-auto gap-6">
        {message.map((athlete) => (
          <li
            key={athlete.id}
            className="flex flex-col items-center bg-gradient-to-r from-gray-300 to-gray-400 p-6 rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2 text-center">
              {athlete.instagramBio}
            </h2>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-700 mb-1">
                Followers: {athlete.instagramFollowersCount}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Following: {athlete.instagramFollowingCount}
              </p>
              <a
                href={`/athlete/${athlete.id}`}
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
              >
                <Image
                  src={`data:image/jpeg;base64,${athlete.instagramImageUrl}`}
                  alt={athlete.name}
                  width={80}
                  height={80}
                  priority
                  className="rounded-full mb-3"
                />
              </a>
              <a
                href={athlete.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
              >
                Instagram Profile
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
}