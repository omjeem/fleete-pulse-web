import SearchBar from "@/components/SearchBar";
import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
        Student Search SPA
      </h1>
      <SearchBar />
    </div>
  );
}
