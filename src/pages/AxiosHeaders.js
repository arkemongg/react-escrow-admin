
import {apiUrl} from './Urls.js'
import axios from 'axios';
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NzY5ODAzLCJpYXQiOjE2OTU2ODM0MDMsImp0aSI6IjEyODY4MWUwMWJhNzRiOTQ5MmRlYWNiZDgwNjc2Y2IzIiwidXNlcl9pZCI6NH0.SsrYlmZ29NDMyZJwdCHVXo6zvc9LpmMNyU4oRwaoYvk

    export function AxiosInstanceToken() {
      const Token = getCookie("token");
  
      return axios.create({
          baseURL: apiUrl, 
          headers: {
              'Authorization': `Token ${Token}`,
              'Content-Type': 'application/json'
            }
      });
    }
    export function AxiosInstanceImageToken() {
      const Token = getCookie("token");
  
      return axios.create({
          baseURL: apiUrl, 
          headers: {
              'Authorization': `Token ${Token}`,
              'Content-Type': 'multipart/form-data'
            }
      });
    }
 
    // const jwtToken = getCookie("token")
    
    // export const axiosInstanceJWT = axios.create({
    //     baseURL: apiUrl, 
    //     headers: {
    //         'Authorization': `JWT ${jwtToken}`,
    //         'Content-Type': 'application/json'
    //       }
    // });


   export const axiosInstance = axios.create({
        baseURL: apiUrl, 
        headers: {
            'Content-Type': 'application/json'
          }
    });
    
  export function convertToFourDigits(number) {
    if (number < 1000) {
        return ("000" + number).slice(-4);
    } else {
        return number.toString();
    }
}

export function convertDatetimeToDate(datetimeString) {
  const dateObject = new Date(datetimeString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
}


// Handle Cookies

export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
}

export function validatePassword(password) {
  // Regular expressions to check for uppercase, lowercase, and number
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  // Check if the password meets all the requirements
  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  
  // Check if the password length is between 8 and 20 characters
  const isValidLength = password.length >= 8 && password.length <= 20;

  // Return true if all conditions are met
  return hasUppercase && hasLowercase && hasNumber && isValidLength;
}



export const post = async (url,data)=>{
  try{
      const response =  await axiosInstance.post(url,data)
      return response
  }catch(error){
      throw error
  }
}
export const getToken = async (url)=>{
    const axiosInstanceToken = AxiosInstanceToken()
    try{
        const response =  await axiosInstanceToken.get(url)
        return response
    }catch(error){
        throw error
    }
  }

export const postToken = async (url,data)=>{
  const axiosInstanceToken = AxiosInstanceToken()
  try{
      const response =  await axiosInstanceToken.post(url,data)
      return response
  }catch(error){
      throw error
  }
}

export const patchToken = async (url,data)=>{
    const axiosInstanceToken = AxiosInstanceToken()
    try{
        const response =  await axiosInstanceToken.patch(url,data)
        return response
    }catch(error){
        throw error
    }
  }

  

export const deleteToken = async (url)=>{
    const axiosInstanceToken = AxiosInstanceToken()
    try{
        const response =  await axiosInstanceToken.delete(url)
        return response
    }catch(error){
        throw error
    }
  }