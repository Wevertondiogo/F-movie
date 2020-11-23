import { key } from '../app/shared/key.api';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
