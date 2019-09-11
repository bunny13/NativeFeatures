import { SQLite } from 'expo-sqlite';
const db = SQLite.openDatabase("places");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lon REAL NOT NULL);",
            [],
            (_, results) => {
                resolve(results);
            },
            (_, err) => {
                reject(err);
            }
            );
        }) 
    });
    return promise;
}

export const insertPlaces = (title, imageUri, address, lat, lon) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO places (title,imageUri,address,lat,lon) VALUES (?,?,?,?,?);",
            [title, imageUri, address, lat, lon],
            (_, results) => {
                resolve(results);
            },
            (_, error) => {
                reject(error);
            }
            );
        }) 
    });
    return promise;
}

export const loadPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM places;",
            [],
            (_, results) => {
                resolve(results);
            },
            (_, error) => {
                reject(error);
            }
            );
        }) 
    });
    return promise;
}