import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // دو تا وضعیت جدید اضافه کردیم:
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true); // وقتی دکمه رو می‌زنی، دوباره در حال لودینگ بشه
    setError(null); // اگر خطایی بوده، پاکش کن
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('مشکلی در دریافت داده‌ها پیش آمد!');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message); // متن خطا رو ذخیره کن
    } finally {
      setLoading(false); // لودینگ تموم شد
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>لیست کاربران</h1>
      
      <button onClick={fetchUsers}>دریافت مجدد داده‌ها</button>
      <input 
        type="text" 
        placeholder="جستجوی کاربر..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      {loading && <p>در حال بارگذاری اطلاعات...</p>}
      {error && <p style={{ color: 'red' }}>خطا: {error}</p>}

      {!loading && !error && (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;l