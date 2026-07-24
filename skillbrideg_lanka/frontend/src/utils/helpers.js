// Format salary display
export const formatSalary = (salary) => {
  if (!salary) return 'Not specified';
  
  if (salary >= 100000) {
    return `LKR ${(salary / 1000).toFixed(0)}K`;
  }
  
  return `LKR ${salary.toLocaleString()}`;
};

// Format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Decode a JWT's payload without verifying its signature (verification is the
// backend's job). Used to recover {email, role, id} from a token stored in
// localStorage, since none of the backends expose a "/me" endpoint.
export const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
};