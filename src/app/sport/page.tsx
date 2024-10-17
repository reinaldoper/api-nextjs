"use client";
import { useState, useEffect } from "react";
import { ISport } from "../types/userType";
import Loading from "../components/Loading";

export default function Sport() {
  const [token, setToken] = useState<string>('');
  const [sports, setSports] = useState<ISport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(token)
          }
        };

        const response = await fetch('/api/sports/sport', requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }

        const data = await response.json();
        setSports(data);
      } catch (err: unknown) { 
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (token) {
      fetchSports();
    }
  }, [token]);

  if (error) {
    return <div className="flex justify-center m-auto">Error: {error}</div>;
  }

  if (!sports) {
    return <Loading />;
  }

  const { message } = sports;

  return (
    <div>
      <h1 className="flex justify-center text-3xl font-bold text-blue-700 mb-4 mt-6">
        Sports
      </h1>
      <ul className="flex flex-wrap justify-center w-11/12 lg:w-3/4 m-auto gap-6">
        {message.map((sport) => (
          <li
            key={sport.id}
            className="flex flex-col items-center bg-gradient-to-r from-slate-300 to-slate-400 p-6 rounded-xl shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sport:{" "}
              <a
                href={`/sport/${sport.id}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {sport.name}
              </a>
            </h3>
            <p className="text-sm text-gray-700">Code: {sport.code}</p>
            <p className="text-sm text-gray-700">Paralympic: {sport.paralympic}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
