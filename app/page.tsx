"use client";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";

// Define the fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface IInterpretation {
  $id: string;
  term: string;
  interpretation: string;
}

export default function Home() {
  const {
    data: interpretations,
    error,
    mutate,
  } = useSWR<IInterpretation[]>("/api/interpretations", fetcher, {
    // revalidateOnFocus: true,
    // revalidateOnReconnect: true,
    // refreshInterval: 5000, // Refresh every 5 seconds
    // refreshWhenOffline: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await fetch(`/api/interpretations/${id}`, { method: "DELETE" });
      mutate(); // Trigger revalidation
    } catch (error) {
      console.log("Error:", error);
      setDeleteError("Failed to delete the interpretation, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-600">{error.message}</p>}
      {deleteError && <p className="py-4 text-red-600">{deleteError}</p>}
      {isLoading && <p>Loading...</p>}
      {interpretations ? (
        interpretations.length > 0 ? (
          <div>
            {interpretations.map((interpretation) => (
              <div
                key={interpretation.$id}
                className="p-4 my-2 rounded-md border-b leading-8 max-w-3xl items-center justify-center ml-[24%]"
              >
                <div className="font-bold">{interpretation.term}</div>
                <div>{interpretation.interpretation}</div>
                <div className="flex gap-5 mt-4 justify-end">
                  <Link
                    className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-semibold tracking-wider"
                    href={`/edit/${interpretation.$id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(interpretation.$id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-semibold tracking-wider"
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No interpretations found</p>
        )
      ) : (
        <p>Loading interpretations...</p>
      )}
    </div>
  );
}
