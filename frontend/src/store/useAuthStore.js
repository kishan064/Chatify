import {create } from 'zustand';

export const useAuthStore = create((set) => ({

  authUser:{name:"kishan", _id:23,age:25},
  isLoggedIn:false,

  login: () => {
    console.log("we just logged in ");
    set({isLoggedIn:true});
  }, 
}));