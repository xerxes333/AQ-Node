/**
* Public Controller
*/
const url     = require('url');
const fetch   = require('node-fetch');
const token   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsImFkbWluIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIm5hbWUiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIkMmEkMDUkVWouZ1lVZWx1bjJQa1pRTnBCTlprdXlKVy9wc1MwdzJocklXMVdKdmZudTF6ZEZoSHJkMHkiLCJuYW1lIjoiSmVyZW15IERyYXhsZXIiLCJjcmVhdGVkQXQiOiIyMDE2LTExLTI5VDIxOjEzOjIyLjQyNVoiLCJ1cGRhdGVkQXQiOiIyMDE2LTExLTI5VDIxOjEzOjIyLjQyNVoiLCJfaWQiOiI1ODNkZWY3MmI5ODMyMjU0ZTBiZWI4MDUifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDgxMjk3MTExLCJleHAiOjE0ODEzODM1MTF9.F_VqCAJ_nycupBT0hogZPZ1lC9TFu_SidN6t3jBqy64";
const baseUrl = "https://node-api-xerxes333.c9users.io/api/";

exports.index = function(req, res) {
    res.locals.msg = "HOME";
    res.render('home');
};

exports.guilds = function(req, res) {
    
    var path    = url.resolve(baseUrl, 'guilds');
    var options = {headers: { "x-access-token": token }};
    
    fetch(path, options).then((response) => {
        return response.json();
    }).then((data) => {
        res.locals.guilds = data;
        res.render('guilds');
    }).catch((err) => {
        console.log(err);
        throw new Error(err);
    });
    
};
exports.getGuild = function(req, res) {
    
    var path    = url.resolve(baseUrl, 'guilds/' + req.params.guild_id);
    var options = {headers: { "x-access-token": token }};
    console.log(path);
    
    fetch(path, options).then((response) => {
        return response.json();
    }).then((data) => {    
        
        res.locals.guild = data;
        res.render('guild');
        
    }).catch((err) => {
        console.log(err);
        throw new Error(err);
    });
};



exports.heroes = function(req, res) {
    res.locals.msg = "HEROES";
    res.render('heroes');
};

exports.items = function(req, res) {
    res.locals.msg = "ITEMS";
    res.render('items');
};

