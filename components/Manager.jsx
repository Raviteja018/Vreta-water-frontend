import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Manager = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/contact/all")
      .then(res => setContacts(res.data))
      .catch(err => console.error("Error fetching contacts:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customer Submissions</h1>
      {contacts.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td className="border p-2">{contact.fullName}</td>
                <td className="border p-2">{contact.email}</td>
                <td className="border p-2">{contact.phone}</td>
                <td className="border p-2">{contact.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Manager;
