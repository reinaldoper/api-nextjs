"use client";
import { IMessageSport } from "@/app/types/userType";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function PostDetails({ params }: { params: { id: string } }) {
  const [token, setToken] = useState<string>('');
  const [sports, setSports] = useState<IMessageSport | null>();
  const [error, setError] = useState<string | null>(null);
  const { id } = params;

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

        const response = await fetch(`/api/sports/${id}`, requestOptions);;

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
  }, [token, id]);

  if (error) {
    return <div className="flex justify-center m-auto">Error: {error}</div>;
  }

  if (!sports) {
    return <Loading />;
  }


  const { message } = sports;

  return (
    <div className="flex flex-col items-center mt-10 text-center text-black bg-gradient-to-r from-slate-300 to-slate-400 p-6 rounded-lg shadow-md w-11/12 sm:w-3/4 lg:w-1/2 m-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {message.name}
      </h1>
      <p className="text-lg text-gray-700 mb-1">
        Code: {message.code}
      </p>
      <p className="text-lg text-gray-700">
        Paralympic: {message.paralympic}
      </p>
    </div>
  );
}
