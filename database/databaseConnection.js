import pg from 'pg';
import sequelize from 'sequelize';


class DbConnection{

    constructor(){
        //moni linux
        this.sequelize = new sequelize ('postgres://postgres:root@localhost:5432/dev_env_db');
        //krystian win
        // this.sequelize = new sequelize ('postgres://postgres:root@localhost:50258/production_en');
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    get_postgresDb_connection(){
        return this.sequelize;
    }
}
const  db = new DbConnection();
export default db;