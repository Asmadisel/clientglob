import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import SearchBar from './components/SearchBar';
import UserModal from './components/UserModal';
import './App.css';

/**
 * Структура данных пользователя.
 */
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

/**
 * Структура ответа от API
 */
interface ApiResponse {
  data: User[];
  success: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]); //Все пользователи.
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); //Отфильтрованные.
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null); //Выбранный пользователь.
  const [loading, setLoading] = useState(true); //Загружается ли данные.
  const [error, setError] = useState<string | null>(null); //Ошибка при запросе.

  /**
   * При загрузке - получаем всех.
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Загружаем 
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === '') {
        fetchUsers(); 
      } else {
        fetchUsersWithSearch(searchTerm); 
      }
    }, 300); // Задержка 300ms для debounce - это, честно принаюсь, подсмотрел у нейронок. 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Функция загрузки всех пользователей
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      // Проверяем структуру ответа
      if (result.success && Array.isArray(result.data)) {
        setUsers(result.data);
        setFilteredUsers(result.data);
      } else {
        throw new Error('Некорректный формат данных от сервера');
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setError('Не удалось загрузить данные с сервера. Проверьте, запущен ли сервер на порту 3001.');
    } finally {
      setLoading(false);
    }
  };

  // Функция поиска пользователей
  const fetchUsersWithSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/?term=${(term)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setFilteredUsers(result.data);
      } else {
        throw new Error('Некорректный формат данных от сервера');
      }
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setError('Ошибка при поиске пользователей');
    } finally {
      setLoading(false);
    }
  };

  // Разбиваем пользователей на строки по 3
  const rows = [];
  for (let i = 0; i < filteredUsers.length; i += 3) {
    rows.push(filteredUsers.slice(i, i + 3));
  }

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка пользователей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="search-container">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {error && (
        <div className="error-message"> 
          {error}
          <button onClick={fetchUsers} className="retry-button">
            Повторить попытку
          </button>
        </div>
      )}

      <div className="users-container">
        {filteredUsers.length === 0 ? 
        (
          /**
           * Если что-то вводили в поисковую строку - выводим сообщение о том, что ничего не найдено, иначе - сообщение о том, что нет пользователей для отобра
           */
          <div className="no-results">
            {searchTerm ? `Пользователи по запросу "${searchTerm}" не найдены` : 'Нет пользователей для отображения'}
          </div>
        ) 
        : 
        (
          rows.map(function(row, rowIndex) {
          return React.createElement(
            'div',
            {
              key: rowIndex,
              className: 'users-row'
            },
            row.map(function(user) {
              return React.createElement(
                UserCard,
                {
                  key: user.id,
                  user: user,
                  onClick: function() {
                    setSelectedUser(user);
                  }
                }
              );
            })
          );
        })
        )}
      </div>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default App;