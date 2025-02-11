'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSWRConfig } from "swr";

export default function NewInteractionForm() {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [formData, setFormData] = useState({
    title: '',
    mentorName: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:2999/mentorship/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        toast.error('Uh oh! We failed to save your interaction. If this error persists, please try again later.');
      } else {
        const result = await response.json();
        console.log('Interaction saved:', result);

        setFormData({
          title: '',
          mentorName: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
        });

        toast.success('Your interaction was successfully logged!');

        mutate('http://localhost:2999/mentorship/logs');

        setTimeout(() => {
          router.push('/mentorship/logs');
        }, 6000);
      }
    } catch (error) {
      console.error('Uh oh! Something went wrong, we had an error saving your interaction:', error);
      toast.error('An error occurred while saving the interaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Interaction'}
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}