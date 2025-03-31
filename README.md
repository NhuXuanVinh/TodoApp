# TodoApp
## Installation
1. Download PostgreSQL and run this code in your database
```bash
psql -U username -h host -p port -d database_name -f path_to_db.sql
```

2. Create .env file
```
DB_USER = your_username
DB_PASSWORD = your_password
DB_HOST = your_host
DB_PORT = your_port
DB_DATABASE = your_database

PORT = 5000
JWT_SECRET = your_jwt_secret
```

3. Run the client
```bash
cd ./client
npm install
npm run dev
```

4. Run the server
```bash
cd ./servere
npm install
node server
```