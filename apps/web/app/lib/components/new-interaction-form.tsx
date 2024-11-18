'use client';

import { useState } from 'react';

export default function NewInteractionForm() {
  const [formData, setFormData] = useState({
    title: '',
    mentorName: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget)
    const formData = new FormData(e.currentTarget);
    const form = Object.fromEntries(formData.entries())
    console.log(form);
    const result = await fetch("http://localhost:2999/mentorship/logs", { method: "POST", body: JSON.stringify(form) }).then((res) => res.json()) as any
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Log New Interaction</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="mentorName" className="block text-sm font-medium mb-1">Mentor</label>
        <input
          type="text"
          id="mentorName"
          value={formData.mentorName}
          onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded-md h-32"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Save Interaction
      </button>
    </form>
  );
}