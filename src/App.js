import React, { useEffect, useState } from 'react';
import Timeline from './modules/Timeline';

const App = () => {
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(e => {
        setErrors(e.responseText || JSON.stringify(e));
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  if (errors) {
    return this.state.errors;
  }
  if (loading) {
    return <span className="spinner" />;
  }

  return <div className="version-timeline">
      <Timeline data={data} />
    </div>;
};

export default App;