import { useState, useEffect } from "react";
import axios from "axios";

export default function useContacts(selectedStatus) {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    'follow-up': 0,
    closed: 0,
    interested: 0,
    'not interested': 0,
    'not answered': 0
  });
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contact/all");
      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contact/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const fetchContactsByStatus = async (status) => {
    try {
      if (status === 'all') {
        setFilteredContacts(contacts);
      } else {
        const res = await axios.get(`http://localhost:4000/api/contact/status/${status}`);
        setFilteredContacts(res.data);
      }
    } catch (err) {
      console.error("Error fetching contacts by status", err);
    }
  };

  const updateLeadStatus = async (leadId, newStatus, leadNotes = '') => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:4000/api/contact/update-status/${leadId}`, {
        status: newStatus,
        notes: leadNotes
      });
      await fetchContacts();
      await fetchStats();
      await fetchContactsByStatus(selectedStatus);
    } catch (err) {
      console.error("Error updating lead status", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchStats();
    const interval = setInterval(() => {
      fetchContacts();
      fetchStats();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchContactsByStatus(selectedStatus);
  }, [selectedStatus, contacts]);

  return { contacts, stats, filteredContacts, loading, fetchContactsByStatus, updateLeadStatus };
}