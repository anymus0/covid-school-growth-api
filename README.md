## Client
There is an [Angular SPA client](https://github.com/anymus0/covid-school-growth-angular) you can use with this API!

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
- this route needs to be automated! For example with a <b>cronjob</b>:<br>
  - `1 8 * * * /usr/bin/curl --silent -X POST https://your-api-domain.com/datamutate/addLatestStatus >/dev/null 2>&1`

#### PUT /datamutate/updateLatestStatus
- this will **update** the latest *status update* in MongoDB if the COVID API has a newer status
- client has a functionality to access this route
- this route needs to be automated! For example with a <b>cronjob</b>:<br>
  - `1 19 * * * /usr/bin/curl --silent -X PUT https://your-api-domain.com/datamutate/updateLatestStatus >/dev/null 2>&1`

#### GET /clientdata/getAllStatuses
- gets an array of every avaliable statuses found in MongoDB

#### GET /clientdata/getDailyCases
- gets the number of new cases for each day
