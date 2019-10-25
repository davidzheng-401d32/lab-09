'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

router.param('model', modelFinder.load);

/**
 * @route GET/models
 * @returns 200 - [{},...]
 * @returns 404 - Resource Not Found
 * @returns 500 - Server Error
 */
router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

/**
 * @route GET/:models /schema
 * @params
 * @returns
 */
router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

/**
 * @route GET /:model
 * @params
 * @returns
 */
router.get('/api/v1/:model', handleGetAll);

/**
 * @route POST /:model
 * @params
 * @returns
 */
router.post('/api/v1/:model', handlePost);

/**
 * @route GET /:model /:id
 * @params
 * @returns
 */
router.get('/api/v1/:model/:id', handleGetOne);

/**
 * @route PUT /:model /:id
 * @params
 * @returns
 */
router.put('/api/v1/:model/:id', handlePut);

/**
 * @route DELETE /:model /:id
 * @params
 * @returns
 */
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
