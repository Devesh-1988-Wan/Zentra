
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WidgetIcons = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    axios.get('/supabase_icon_config.json')
      .then(response => setIcons(response.data))
      .catch(error => console.error('Error fetching icons:', error));
  }, []);

  return (
    <div className="widget-icons">
      {icons.map(icon => (
        <div key={icon.widget} className="widget-icon">
          <img src={icon.source + '/' + icon.icon_name} alt={icon.widget} />
          <p>{icon.widget}</p>
        </div>
      ))}
    </div>
  );
};

export default WidgetIcons;
