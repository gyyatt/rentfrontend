// src/pages/AdminRentSpaceList.jsx
import React from 'react';
import RentSpaceList from './RentSpaceList';

const AdminRentSpaceList = () => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl mb-8">
        <h2 className="text-3xl font-black text-center">🏠 Admin Space Management</h2>
        <p className="text-center mt-2 opacity-90">Edit/Delete ALL spaces + Owner contact details</p>
      </div>
      <RentSpaceList />
    </div>
  );
};

export default AdminRentSpaceList;
