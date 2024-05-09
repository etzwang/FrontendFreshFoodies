import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../consants";
import {MaterialCommunityIcons} from '@expo/vector-icons'

const DeletionMenu = ({ foodItems, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (item) => {
    setDeleteConfirmation(true);
    setSelectedItem(item);
  };

  const handleDeleteConfirmed = () => {
    onDelete(selectedItem);
    setDeleteConfirmation(false);
    setSelectedItem(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
    setSelectedItem(null);
  };

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deletion-menu">
      <input
        type="text"
        placeholder="Search food items..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="items-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <button onClick={() => handleDelete(item)}>Delete</button>
          </div>
        ))}
      </div>
      {deleteConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete {selectedItem.name}?</p>
          <button onClick={handleDeleteConfirmed}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default DeletionMenu;

