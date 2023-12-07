export default (): any => {
  return {
    port: process.env.PORT,
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    expire_jwt: process.env.EXPIRE_JWT,
    secret: process.env.SECRET,
  };
};
