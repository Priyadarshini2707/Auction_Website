import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaClock, FaHourglassEnd, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import './Dashboard.css'; // Updated styles in separate file

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5001/auctions');
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };
    fetchItems();
  }, []);

  const getTimeRemaining = (deadline) => {
    const timeLeft = new Date(deadline) - new Date();
    if (timeLeft <= 0) return "Expired";
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">🎯 Live Auctions</h2>
      <Link to="/post-auction">
        <button className="post-btn">
          <FaPlusCircle className="icon" /> Post New Auction
        </button>
      </Link>

      <div className="auction-grid">
        {items.length === 0 ? (
          <p className="no-auctions">🚀 No auctions available. Start one now!</p>
        ) : (
          items.map((item) => {
            const isExpired = new Date(item.deadline) < new Date();
            return (
              <div key={item._id} className={`auction-card ${isExpired ? "expired" : "active"}`}>
                <Link to={`/auction/${item._id}`} className="auction-link">
                  <div className="auction-header">
                    <h3>{item.itemName}</h3>
                    {isExpired ? <FaHourglassEnd className="expired-icon" /> : <FaCheckCircle className="active-icon" />}
                  </div>
                  <p className="bid-amount">💰 Current Bid: <span>${item.currentBid}</span></p>
                  <p className="timer">
                    {isExpired ? "Auction Ended" : `⏳ ${getTimeRemaining(item.deadline)}`}
                  </p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Dashboard;
