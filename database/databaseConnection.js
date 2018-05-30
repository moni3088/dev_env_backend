import pg from 'pg';

const dbConnection = {
    host: 'localhost', // server name or IP address;
    port: 5432,        // default port
    database: 'dev_env_db', // database name
    user: 'postgres'        // database user
    /*password: ''*/        // default empty password
};
class DbConnection{

    constructor(){}

    get_postgresDb_connection(){
        return pg(dbConnection)
    }
}
const  db = new DbConnection();
export default db;