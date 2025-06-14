"use client"
import { useState, useEffect } from "react";

export interface Student {
    name: string;
    class: number;
    rollNumber: number;
}

const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const fetchStudents = debounce(async (q: string) => {
        if (q.length < 3) {
            setStudents([]);
            return;
        }

        const res = await fetch(`/api/students?q=${q}`);
        const data = await res.json();
        setStudents(data);
    }, 300);

    useEffect(() => {
        fetchStudents(query);
    }, [query]);

    const highlightMatch = (name: string, q: string) => {
        const index = name.toLowerCase().indexOf(q.toLowerCase());
        if (index === -1) return name;
        return (
            <>
                {name.slice(0, index)}
                <span className="font-bold text-purple-600">
                    {name.slice(index, index + q.length)}
                </span>
                {name.slice(index + q.length)}
            </>
        );
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search student by name..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedStudent(null);
                }}
            />

            {students.length > 0 && (
                <ul className="mt-2 bg-white border rounded shadow">
                    {students.map((s) => (
                        <li
                            key={s.rollNumber}
                            className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                            onClick={() => {
                                setSelectedStudent(s);
                                setQuery(s.name);
                                setStudents([]);
                            }}
                        >
                            {highlightMatch(s.name, query)}
                        </li>
                    ))}
                </ul>
            )}

            {selectedStudent && (
                <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <p className="text-lg font-semibold text-purple-700">{selectedStudent.name}</p>
                    <p>Class: {selectedStudent.class}</p>
                    <p>Roll No: {selectedStudent.rollNumber}</p>
                </div>
            )}
        </div>
    );
}
