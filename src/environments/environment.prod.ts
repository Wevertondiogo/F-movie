import { key } from './../app/home/key.api';
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyBX3_PMP9wPi7uXJ06rXSONmBukvgxBpjI',
    authDomain: 'users-of-the-f-movie.firebaseapp.com',
    databaseURL: 'https://users-of-the-f-movie.firebaseio.com',
    projectId: 'users-of-the-f-movie',
    storageBucket: 'users-of-the-f-movie.appspot.com',
    messagingSenderId: '355439228377',
    appId: '1:355439228377:web:c85b7c5cef6a03fba195c8',
    measurementId: 'G-8YG6X4S3LG',
  },
  url: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`

};
