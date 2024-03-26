// const isAuthorized = userRole && allowedRoles.includes(userRole);
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ name ,component: Component, userRole }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (!userRole && !['home', 'login', 'signup'].includes(Component.name.toLowerCase())) {
      setIsLoading(false);
      navigate('/');
    } else if (userRole === 'user' && Component.name.toLowerCase() === 'admin') {
      setIsLoading(false);
      navigate('/');
    } else if (userRole === 'provider' ) {
      setIsLoading(false);
      switch (Component.name.toLowerCase()) {
        case 'ordersadmin':
          navigate('/admin/orders');
          break;
        case 'categoriesadmin':
          navigate('/admin/categories');
          break;
        case 'menuitemsadmin':
          navigate('/admin/menuitems');
          break;
        default:
          navigate('/admin/orders');
      }
    }
  }, [userRole, Component.name, navigate]);
  console.log(name)

  return isLoading ?  <div className="loader " /> : <Component name={name}/>;
};

export default ProtectedRoute;


