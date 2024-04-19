import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import "../../stylesheet/Skapa-annons.css";

const CreateAuctionForm = () => {
  const initialFormData = {
    GroupCode: '2wvu',
    Title: '',
    Description: '',
    StartDate: '',
    StartingPrice: '',
    EndDate: '',
    CreatedBy: '',
    id: uuidv4(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const startBidValue = parseInt(formData.StartingPrice); 
    setFormData({
      ...formData,
      StartingPrice: startBidValue
    });
    
    fetch('https://auctioneer2.azurewebsites.net/auction/2wvu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Auction created:', data);
      
      // Återställer formuläret
      setFormData({          
        ...initialFormData,
        id: uuidv4()           
      });
    })
    .catch(error => {
      console.error('There was an error creating the auction:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="form-label">
        Title:
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Description:
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          className="form-textarea"
        />
      </label>
      <label className="form-label">
        Start Bid:
        <input
          type="number"
          name="StartingPrice"
          value={formData.StartingPrice}
          onChange={handleChange}
          min="0"
          className="form-input"
        />
      </label>
      <label className="form-label">
        Start Date:
        <input
          type="date"
          name="StartDate"
          value={formData.StartDate}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        End Date:
        <input
          type="date"
          name="EndDate"
          value={formData.EndDate}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Created By:
        <input
          type="text"
          name="CreatedBy"
          value={formData.CreatedBy}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <button type="submit" className="form-submit">Submit</button>
    </form>
  );
};

export default CreateAuctionForm;
