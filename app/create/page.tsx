"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Create = () => {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Use SWR hook to fetch data
  const { mutate: mutateInterpretations } = useSWR(
    "/api/interpretations",
    fetcher
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill all the fields");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpretations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create new interpretation");
      }

      // Trigger revalidation
      mutateInterpretations();

      router.push("/");
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-[24%] max-w-2xl">
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">
        Add New Interpretation
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="Term"
          value={formData.term}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-lg"
        />

        <textarea
          name="interpretation"
          rows={5}
          placeholder="Interpretation"
          value={formData.interpretation}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-lg resize-none"
        ></textarea>

        <button
          className="bg-gray-900 text-white mt-4 px-4 py-1 rounded-lg cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </div>
  );
};

export default Create;
