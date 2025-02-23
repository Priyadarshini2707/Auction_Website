import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostAuction({ onAuctionPosted }) { // Accept function as prop
  const [itemName, setItemName] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [deadline, setDeadline] = useState('');
  const nav = useNavigate();

  const handlePostAuction = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/post-auction', { itemName, startingBid, deadline });
      alert('Auction Posted Successfully!');
      onAuctionPosted(); // Refresh auctions in Dashboard
      nav('/dashboard');
    } catch (err) {
      console.error('Error posting auction:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Post New Auction</h2>
      <form onSubmit={handlePostAuction}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <input type="number" placeholder="Starting Bid" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
        <input type="datetime-local" placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        <button type="submit">Post Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
