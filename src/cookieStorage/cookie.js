// Cookie utility functions (assuming you don't have them yet)

export const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };
  console.log(document.cookie)
  export const getCookie = (name) => {
    const nameEq = name + "=";
    const cookies = document.cookie.split(";");
  
    // Loop through cookies and check if any matches the given name
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim(); // Ensure we trim any leading/trailing spaces
      if (c.indexOf(nameEq) === 0) {
        return c.substring(nameEq.length); // Return the value after the name
      }
    }
    return null; // Return null if cookie not found
  };
  
  
  export const deleteCookie = (name) => {
    setCookie(name, "", -1); // Setting the expiration date to a past date deletes the cookie
  };
  