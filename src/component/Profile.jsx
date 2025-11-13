// src/pages/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useDocumentTitle from '../useDocomentTitle';

const Profile = () => {
  useDocumentTitle('Profile | MyApp');

  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">You must be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <div className="card w-full max-w-md shadow-lg p-6 bg-white rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Profile</h2>

        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || user.image || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-300"
          />

          <div className="w-full">
            <div className="mb-3">
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">{user.displayName || user.name || 'No Name'}</p>
            </div>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">Login Provider</p>
              <p className="font-medium capitalize">{user.provider || 'email'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
