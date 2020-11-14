# covid-school-growth-api
API to build and get data about COVID in a custome format

### ENV variables
- DB_URI=your_MongoDB_connection_string
- PORT=your_API_server_port
- NODE_ENV=production (prod mode)

### Routes:

#### POST /datamutate/createDBmodel
- this route builds the database, from 2020. Sept. 01. to the current date with `Date.now()`
- confirmation header <b>MUST BE</b> included with the value: <i>true</i> or <i>allow</i>, eg.: `'confirmation': 'true'` or `'confirmation': 'allow'`<br>(this is checked by the allowRebuild middleware)

#### POST /datamutate/addLatestStatus
- this will **create** the latest *status update* in MongoDB (daily updates)
- 2 conditions have to be met: it doesn't exist already and the new update is avaliable  

#### PUT /datamutate/updateLatestStatus
- this will **update** the latest *status update* in MongoDB if the COVID API has a newer status
- client will have a functionality to access this route

#### GET /clientdata/getAllStatuses
- gets an array of every avaliable statuses found in MongoDB

#### GET /clientdata/getDailyCases
- gets the number of new cases for each day