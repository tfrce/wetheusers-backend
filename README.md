We the Users
==================

Backend services for the We the Users campaign


## Getting started

```
npm install
gulp runServer
```

The server should now be running at 127.0.0.1:3200 by default

### Configuration

App configuration is controlled using the [node-config module](https://github.com/lorenwest/node-config)

The JSON files containing configuration are all under [/config](https://github.com/tfrce/wetheusers-backend/tree/master/config). Production configuration mostly uses the JSON files, with a couple of heroku specific vars picked up via environment variables.

### API

#### POST /api/1/signatures

##### Description

Creates a new signature object on the server and queues it for processing via the We The People API

##### Parameters

See the [signaturePOSTSchema object](https://github.com/tfrce/wetheusers-backend/blob/master/api/validation.js) for the Joi schema definition

- **firstName** _(required)_ - The first name of the petition signatory
- **lastName** _(required)_ - The last name of the petition signatory
- **email** _(required)_ - The email address of the petition signatory, required to validate their signature
- **subscribeToEmails** _(required)_ - The short code (EFF, FFTF etc.) of the organization the wants to join the mailing list of

##### Response

An object with the following keys and values:

- **status** - The request's status, should always be success

##### Example

**Request**

````
POST http://127.0.0.1:3200/api/1/signatures
````

**Return**

``` json

{
  "status": "success"
}

```

#### GET /api/1/signatures/{email}

##### Description

Fetches the signature object matching the supplied email

##### Parameters

See the [signatureGETSchema object](https://github.com/tfrce/wetheusers-backend/blob/master/api/validation.js) for the Joi schema definition

- **email** _(required)_ - The email address of the signatory whose signature should be fetched

##### Response

An object with the following keys and values:

- **firstName** - The first name of the petition signatory
- **lastName** - The last name of the petition signatory
- **email** - The email address of the petition signatory, required to validate their signature
- **subscribeToEmails** - The short code (EFF, FFTF etc.) of the organization the wants to join the mailing list of
- **isValidated** - Whether the signature has been validated
- **sentToWhiteHouse** - Whether the request has been dispatched to the WTP API

##### Example

**Request**

````
GET http://127.0.0.1:3200/api/1/signatures/test%40test.com
````

**Return**

``` json

{
  "firstName": "Leah",
  "lastName": "Jones",
  "email": "test@test.com",
  "subscribeToEmails": "EFF",
  "isValidated": false,
  "sentToWhiteHouse": true
}

```
