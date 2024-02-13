import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "abdias",
    password: "123456",
    database: "gina_database",
    synchronize: false,
    logging: false,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
})
// entities: ["src/entities/**/*.ts"],
// migrations: ["src/migrations/**/*.ts"],
// subscribers: ["src/subscribers/**/*.ts"],
// npm run typeorm_src migration:generate src/migrations/nameOfMyMigration
export const getDataSource = (): Promise<DataSource> => {
   if (AppDataSource.isInitialized){
    console.log("ya fue inicializado")
     return Promise.resolve(AppDataSource);
   }

     return new Promise((resolve, reject) => {
        AppDataSource.initialize()
        .then(async () => {
            // console.log("se hizo una conexión nueva")
            resolve(AppDataSource);
        })
        .catch((error) => reject(error));
      });
}

// export const getDataSource = (delay = 3000): Promise<DataSource> => {
//   if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (AppDataSource.isInitialized) resolve(AppDataSource);
//       else reject("Failed to create connection with database");
//     }, delay);
//   });
// };
