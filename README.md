# covid-school-growth-api
API to build and get data about COVID in a custome format

### ENV variables
- DB_URI=your_MongoDB_connection_string
- PORT=your_API_server_port
- NODE_ENV=production (prod mode)

### Routes:

#### GET /data/createDBmodel
- this route builds the database, from 2020. Sept. 01. to the current date with `Date.now()`
- confirmation header <b>MUST BE</b> included with the value: <i>true</i> or <i>allow</i>, eg.: `'confirmation': 'true'` or `'confirmation': 'allow'`<br>(this is checked by the allowRebuild middleware)

