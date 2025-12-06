import React, { useRef, useEffect } from 'react';
import '../css/UserModal.css';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
}

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  /**
   * Esc - закрытие и клик вне
   */
  useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  document.addEventListener('keydown', handleEsc);

  return () => {
    document.removeEventListener('keydown', handleEsc);
  };
}, [onClose]);

  /**
   * Блокируем скроллинг.
   */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  return (
    <>
      {/* 1. Backdrop - ПЕРВЫЙ, закрывает при клике */}
      <div className="modal-backdrop" onClick={onClose}></div>
      <div 
        className="modal-wrapper" 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {/* Заголовок */}
          <div className="modal-header">
            <h2 className="modal-title">{user.name}</h2>
            <button className="modal-close-button" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 1L19 19M19 1L1 19" stroke="black" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          {/* Основная информация */}
          <div className="modal-main-info">
            <div className="info-labels">
              <div className="info-label-item">Телефон:</div>
              <div className="info-label-item">Почта:</div>
              <div className="info-label-item">Дата приема:</div>
              <div className="info-label-item">Должность:</div>
              <div className="info-label-item">Подразделение:</div>
            </div>
            
            <div className="info-values">
              <div className="info-value-item">{user.phone}</div>
              <div className="info-value-item">{user.email}</div>
              <div className="info-value-item">{user.hire_date}</div>
              <div className="info-value-item">{user.position_name}</div>
              <div className="info-value-item">{user.department}</div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="modal-additional-info">
            <h3 className="additional-info-title">Дополнительная информация:</h3>
            <p className="additional-info-text">
              {user.address || 'Разработчики используют текст в качестве заполнителя макета страницы.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;