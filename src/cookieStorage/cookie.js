// Cookie utility functions (assuming you don't have them yet)

export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};
// console.log(document.cookie);
export const getCookie = (name) => {
  // console.log("All Cookies:", document.cookie); // Debugging
  const cookies = document.cookie.split("; ");
  
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      // console.log("Found Cookie:", key, value);
      return decodeURIComponent(value); // Decode in case of URL encoding
    }
  }
  // console.log("Cookie Not Found");
  return null; // Return null if not found
};


export const deleteCookie = (name) => {
  setCookie(name, "", -1); // Setting the expiration date to a past date deletes the cookie
};
