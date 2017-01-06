var express = require('express');
var router  = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/help.js.');
  next();
});

router.route('/')

    .get(function(req, res) {
       res.status(200).json({success: true, message: {
        'EndPoints': {
            '/help':{
                'GET': 'This menu',
                'Notes': [
                    '(*) denotes required inputs'
                ]
            },
            '/auth':{
                'POST': {
                    'Description': 'Generate a unique token for access to the restricted API end points.',
                    'TokenRequired': false,
                    'Input': ['*name','*password'],
                    'Return': 'Success status along with token.',
                },
            },
            '/users':{
                'GET': {
                    'Description': 'Return all Users.',
                    'TokenRequired': true,
                    'Return': 'An array of User objects.',
                },
                'POST': {
                    'Description': 'Create a new User.',
                    'TokenRequired': true,
                    'Input': ['*name','*password'],
                    'Return': 'Success status along with message.',
                },
                '/users/:user_id':{
                    'GET': {
                        'Description': 'Return requested User.',
                        'TokenRequired': true,
                        'Return': 'Success status along with User object.',
                    }
                },
            },
            '/heroes':{
                'GET': {
                    'Description': 'Return all Heroes.',
                    'TokenRequired': true,
                    'Return': 'An array of Hero objects.',
                },
                '/heroes/:hero_id':{
                    'GET': {
                        'Description': 'Return requested Hero.',
                        'TokenRequired': true,
                        'Return': 'Success status along with Hero object.',
                    }
                },
            },
            '/items':{
                'GET': {
                    'Description': 'Return all Items.',
                    'TokenRequired': true,
                    'Return': 'An array of Item objects.',
                },
                '/items/:item_id':{
                    'GET': {
                        'Description': 'Return requested Item.',
                        'TokenRequired': true,
                        'Return': 'Success status along with Item object.',
                    }
                },
            },
            '/guilds':{
                'GET': {
                    'Description': 'Return all Guilds for the specific user.',
                    'TokenRequired': true,
                    'Return': 'An array of Guild objects.',
                },
                'POST': {
                    'Description': 'Create a new guild.',
                    'TokenRequired': true,
                    'Input': {
                        '*name' : 'User defined Guild name',
                        'description': 'A Brief description of the guild',
                        'heroes': {
                            'hero_id': 'ID of a specific Hero',
                            'items': {
                                'item_id': 'ID of a specific Item',
                            }
                        }
                    },
                    'Return': 'Success status along with message.'
                },
                '/guilds/:guild_id':{
                    'GET': {
                        'Description': 'Return requested Guild.',
                        'TokenRequired': true,
                        'Return': 'Success status along with populated Guild object.'
                    },
                    'PUT': {
                        'Description': 'Update existing Guild.',
                        'TokenRequired': true,
                        'Input': {
                            'name' : 'User defined Guild name',
                            'description': 'A Brief description of the guild',
                            'heroes': {
                                'hero_id': 'ID of a specific Hero',
                                'items': {
                                    'item_id': 'ID of a specific Item',
                                }
                            }
                        },
                        'Return': 'Success status along with message.'
                    },
                    'DELETE': {
                        'Description': 'Remove the specified Guild.',
                        'TokenRequired': true,
                        'Return': 'Success status along with message.'
                    }
                }
            }
        }
    }}); 
    });

module.exports = router;