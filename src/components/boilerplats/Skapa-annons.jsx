import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

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
    //console.log('FormData before sending:', formData);
    
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
      
      setFormData({          // Reset form fields after successful submission
        ...initialFormData,
        id: uuidv4()           // Generate new unique id
      });
    })
    .catch(error => {
      console.error('There was an error creating the auction:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
        />
      </label>
      <label>
        Start Bid:
        <input
          type="number"
          name="StartingPrice"
          value={formData.StartingPrice}
          onChange={handleChange}
          min="0"
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          name="StartDate"
          value={formData.StartDate}
          onChange={handleChange}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="EndDate"
          value={formData.EndDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Created By:
        <input
          type="text"
          name="CreatedBy"
          value={formData.CreatedBy}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateAuctionForm;
