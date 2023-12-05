export default (): any => {
  {
    port: process.env.PORT;
    db_port: process.env.DB_PORT;
    db_host: process.env.DB_HOST;
    db_user: process.env.DB_USER;
    db_password: process.env.DB_PASSWORD;
    db_name: process.env.DB_NAME;
    secret: process.env.SECRET;
    expire_jwt: process.env.EXPIRE_JWT;
  }
};
