import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
   "type": "mysql", 
   "host": "localhost", 
   "port": 3309, 
   "username": "root", 
   "password": "root", 
   "database": "demoappdb", 
   "synchronize": true, 
   "logging": false, 
   "entities": ["dist/**/*.entity{.ts,.js}"],
   "migrations": [ "src/migration/**/*.js" 
   ], 
   "subscribers": [ "src/subscriber/**/*.ts" 
   ] 
 })