import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE_NAME,
          port: 3306,
          multipleStatements: true,
    },
});

export const createTables = async (): Promise<boolean> => {
    try {
        await connection
            .raw(`
            CREATE TABLE IF NOT EXISTS lama_bands (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                music_genre VARCHAR(255) NOT NULL,
                responsible VARCHAR(255) UNIQUE NOT NULL 
              );
              
              CREATE TABLE IF NOT EXISTS lama_shows (
                id VARCHAR(255) PRIMARY KEY,
                week_day VARCHAR(255) NOT NULL,
                start_time INT NOT NULL,
                end_time INT NOT NULL,
                band_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(band_id) REFERENCES lama_bands(id)
              );
              
              CREATE TABLE IF NOT EXISTS lama_users (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
              );
           `);

        console.log("Tabelas criadas com sucesso!");
        closeConnection()
        //populatTables()
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};


const populatTables = async (): Promise<boolean> => {
    try {
        await connection.raw(`
        INSERT INTO labook_users VALUES (
            "05",
            "Thor",
            "thorrt@gmail.com",
            "$2a$12$LY7WTl2e1STwRMSwr/6VYeDRzHccEM.wxngXsRycgiqY/Pst0daRy"
            ),("07",
            "Thor",
            "thorrrrt@gmail.com",
            "$2a$12$LY7WTl2e1STwRMSwr/6VYeDRzHccEM.wxngXsRycgiqY/Pst0daRy");
            INSERT INTO labook_posts VALUES (
                "001",
                "07",
                "url1",
                "descrição1",
                "data1",
                "NORMAL"
                ),(
                "002",
                "05",
                "url1",
                "descrição1",
                "data1",
                "NORMAL"
                ); 
       `);

        console.log("Usuários e postagens criados com sucesso!");
        closeConnection()
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};

const closeConnection = () => { connection.destroy(); };


createTables()