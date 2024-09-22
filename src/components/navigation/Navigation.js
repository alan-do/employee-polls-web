import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import './Navigation.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticatedUser = useSelector((state) => state.authenticatedUser);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  const [selectedTab, setSelectedTab] = useState('dashboard');
  return (
    <nav className="nav-container">
      <div className="nav-items">
        <Link to="/"
          onClick={() => setSelectedTab('dashboard')}
          className={`nav-item ${selectedTab === 'dashboard' ? 'selected' : ''}`}>Dashboard</Link>
        <Link to="/leaderboard"
          onClick={() => setSelectedTab('leaderboard')}
          className={`nav-item ${selectedTab === 'leaderboard' ? 'selected' : ''}`}>Leaderboard</Link>
        <Link to="/new"
          onClick={() => setSelectedTab('new')}
          className={`nav-item ${selectedTab === 'new' ? 'selected' : ''}`}>New
          Poll</Link>
      </div>
      <div className="user-info">
        <img src={authenticatedUser.avatarURL} alt="User Avatar" className='user-avatar' />
        <span
          className="user-name"
          data-testid="user-information">{authenticatedUser.id}</span>
        <button onClick={onLogout}
          className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;