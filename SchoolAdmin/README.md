# Interview Assignment (v2.0.1)

## Prerequisites
- NodeJS v12.13.0
- Docker

## Optional Software
- MySQL Workbench (For easier visualization of data)
- Postman (Use to test API)
<br>

## Package Structure
| S/N | Name | Type | Description |
|-----|------|------|-------------|
| 1 | javascript | dir | This hold the source code  |
| 2 | NodeJS_Assessment.pdf | file | The specification for the assignment |
| 3 | README.md | file | This file |

## Exposed Port
| S/N | Application | Exposed Port |
|-----|-------------|--------------|
| 1 | database | 3306 |
| 2 | application | 3000 |

<br>

## Commands
All the commands listed should be ran in ./javascript directory.

### Installing dependencies
```bash
npm install
```

<br>

### Starting Project
Starting the project in local environment.
This will start all the dependencies services i.e. database.
```bash
npm start
```

<br>

### Running in watch mode
This will start the application in watch mode.
```bash
npm run start:dev
```

<br>

### Check local application is started
You should be able to call (GET) the following endpoint and get a 200 response

```
http://localhost:3000/api/healthcheck
```

<br>

## Extras

### Database
Migration script is place in javascript/database folder. <br>
It will be ran the first time MySQL docker container is first initialised. <br>
If it doesnt run, user can manually copy the script to generate the database and table <br>

<br>

## FAQ

### Error when starting up
If you encounter the following error when running ```npm start```, it is due to the slow startup of your database container.<br>
Please run ```npm start``` again.

```
[server.js]	ERROR	SequelizeConnectionError: Connection lost: The server closed the connection.
[server.js]	ERROR	Unable to start application
```

## Some problems I met along the way, these links might help!
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
https://phoenixnap.com/kb/mysql-docker-container
<br>
Installing Docker software have to be with adminstrator mode
<br>
Use this command for initial set up of MySQL, where "-e MYSQL_ROOT_PASSWORD" will set the password and "-p" for the port
docker run -p 3306:3306 --name=SchoolAdmin -e MYSQL_ROOT_PASSWORD=root -d mysql/mysql-server:latest
<br>

## Assumption made
Data that being post by api/register will always be in the format given by the assignment body


