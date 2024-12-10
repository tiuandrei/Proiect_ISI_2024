import React, { useEffect, useState } from 'react';
import { getAnnouncements } from '../../network/api'; // Adjust the path as needed
import './ViewAnnouncements.css'; // Import the CSS file

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="announcements">
      <h1 className="announcements-title">Announcements</h1>
      <ul className="announcements-list">
        {announcements.map((announcement) => (
          <li key={announcement._id} className="announcements-item">
            <h2 className="announcements-item-title">{announcement.title}</h2>
            <p className="announcements-item-timestamp">{new Date(announcement.timestamp).toLocaleString()}</p>
            <p className="announcements-item-content">{announcement.content}</p>
            <p className="announcements-item-user">User: {announcement.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
