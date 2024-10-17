"use client";
import Image from "next/image";
import { IMessageAthlete } from "@/app/types/athleteType";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function AthleteDetails({ params }: { params: { id: string } }) {
  const [token, setToken] = useState<string>('');
  const [athlete, setAthlete] = useState<IMessageAthlete | null>();
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

        const response = await fetch(`/api/athletes/${id}`, requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch athlete');
        }

        const data = await response.json();
        setAthlete(data);
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

  if (!athlete) {
    return <Loading />;
  }


  const { message } = athlete;

  return (
    <div className="flex flex-col items-center mt-10 text-center text-black bg-gradient-to-r from-slate-300 to-slate-400 p-6 rounded-lg shadow-md w-11/12 sm:w-3/4 lg:w-1/2 m-auto">
      <Image
        src={`data:image/jpeg;base64,${message.instagramImageUrl}`}
        alt={message.name}
        width={80}
        height={80}
        priority
        className="rounded-full w-24 h-24 mb-4 shadow-lg"
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {message.name}
      </h1>
      <p className="text-lg text-gray-700 mb-1">
        Bio: {message.instagramBio}
      </p>
      <p className="text-lg text-gray-700 mb-1">
        Instagram: {message.instagramName}
      </p>
      <p className="text-sm text-gray-600">
        Followers: {message.instagramFollowersCount} | Following:{" "}
        {message.instagramFollowingCount} | Posts: {message.instagramPostsCount}
      </p>
      <a
        href={message.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors font-semibold mt-4"
      >
        Visit Instagram Profile
      </a>
      <p className="text-xs text-gray-500 mt-2">
        Last updated: {new Date(message.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
