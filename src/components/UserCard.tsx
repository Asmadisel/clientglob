import React from 'react';
import '../css/UserCard.css';
import {PhoneIcon} from '../icons/PhoneIcon';
import {EmailIcon} from '../icons/EmailIcon';


interface UserCardProps {
  user: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    position_name: string;
    department: string;
    hire_date: string;
  };
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className="user-card" onClick={onClick}>
      <h2 className="user-name">{user.name}</h2>
      
      <div className="contact-info">
        <div className="contact-item">
          <PhoneIcon className="icon phone-icon"></PhoneIcon>
          <span className="contact-text">{user.phone}</span>
        </div>
        
        <div className="contact-item">
          <EmailIcon className="icon email-icon"></EmailIcon>
          <span className="contact-text">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;