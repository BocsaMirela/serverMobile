const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});
const fs = require('fs');
const Router = require('koa-router');
const cors = require('koa-cors');
const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const bodyparser = require('koa-bodyparser');


const koaJwtKey = 'mySecretKey';

app.use(bodyparser()); //1
app.use(cors()); //2
app.use(async (ctx, next) => { // logger
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} ${ctx.response.status} - ${ms}ms`);
});

app.use(async (ctx, next) => { // error handler
    try {
        await next();
    } catch (err) {
        ctx.response.body = {issue: [{error: err.message || 'Unexpected error'}]};
        ctx.response.status = 500; // internal server error
    }
});

app.use(koaJwt({secret: koaJwtKey}).unless({path: [/^\/auth/]}));

class Entry {
    constructor({id, body, date, userId, imagePath}) {
        this.id = id;
        this.body = body;
        this.date = date;
        this.userId = userId
        this.imagePath = imagePath
    }
}

const pathToEntriesFile = 'data/entries.json';
const pathToUsersFile = 'data/users.json';

const saveToFile = (jsonObject) => {
    fs.writeFile(pathToEntriesFile, JSON.stringify(jsonObject), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

const usersContent = fs.readFileSync(pathToUsersFile, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

const contents = fs.readFileSync(pathToEntriesFile, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

const entries = (JSON.parse(contents));
const users = JSON.parse(usersContent);
let lastUpdated = entries[entries.length - 1].date;
let lastId = entries.sort((n1, n2) => (n1.id - n2.id))[entries.length - 1].id;

const pageSize = 10;

const broadcast = data => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

const router = new Router();

router.post('/auth', async (ctx) => {
    const user = ctx.request.body;
    console.log(user);
    const found = users.findIndex(obj => obj.email === user.email && obj.password === user.password);
    const idUser = users[found].id
    console.log("idUser" + idUser)
    if (found != -1) {
        ctx.response.body = {outcome: 'Succes'};
        ctx.response.status = 200;
        ctx.body = {
            token: jwt.sign({role: 'admin'}, koaJwtKey), //Should be the same secret key as the one used is ./koaJwt.js
            id: idUser,
            message: "Successfully logged in!"
        };
    } else {
        ctx.response.body = {outcome: 'Succes'};
        ctx.response.status = 200;
        ctx.body = {
            token: "", //Should be the same secret key as the one used is ./koaJwt.js
            id: "",
            message: "Wrong"
        };
    }
});


router.get('/entry', ctx => {
    console.log("daaa")
    const body = ctx.request.query.body;
    const page = parseInt(ctx.request.query.page) || 1;
    ctx.response.set('Last-Modified', new Date(lastUpdated).toUTCString());
    const sortedEntries = entries
        .sort((n1, n2) => -(n1.date - n2.date));
    const offset = (page - 1) * pageSize;
    ctx.response.body = {
        page,
        entries: sortedEntries.slice(offset, offset + pageSize),
        more: offset + pageSize < sortedEntries.length
    };
    ctx.response.status = 200; // OK
});

router.get('/entry/all', ctx => {
    console.log("daaa")
    const sortedEntries = entries.sort((n1, n2) => -(n1.date - n2.date));
    ctx.response.body = sortedEntries
    ctx.response.status = 200; // OK
});

router.get('/entry/check', ctx => {
    console.log("daaa")
    ctx.response.body = "ok"
    ctx.response.status = 200; // OK
});

router.get('/entry/:id', async (ctx) => {
    const entryId = ctx.request.params.id;
    const entry = entries.find(entry => entryId === entry.id);
    if (entry) {
        ctx.response.body = entry;
        ctx.response.status = 200; // ok
    } else {
        ctx.response.body = {issue: [{warning: `Entry with id ${entryId} not found`}]};
        ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
    }
});

const createEntry = async (ctx) => {
    const entry = ctx.request.body;
    console.log("create entru" + entry.body);
    if (!entry.body) { // validation
        console.log("create entru empty body" + entry);
        ctx.response.body = {issue: [{error: 'Entry body is missing'}]};
        ctx.response.status = 400; //  BAD REQUEST
        return;
    }
    console.log("create entru passed" + entry);
    if (!entry.id)
        // entry.id = `${parseInt(lastId) + 1}`;
        entry.id = parseInt(lastId) + 1;
     // lastId = entry.id;
    if (entry.id>lastId){
        lastId=entry.id+1
    }else{
        lastId=lastId+1
    }
    entries.push(entry);
    ctx.response.body = entry;
    ctx.response.status = 201; // CREATED
    broadcast({event: 'created', entry});
};


router.post('/entry', async (ctx) => {
    console.log("add" + ctx.request.body.id)
    const entryE = ctx.request.body
    let id=entryE.id
    await createEntry(ctx);
    saveToFile(entries);
    if(!id){
        id= parseInt(lastId)-1
    }
    const entry = entries.find(entry => entry.id==id);
    if (entry) {
        ctx.response.body = entry;
        ctx.response.status = 200; // ok
    } else {
        ctx.response.body = {issue: [{warning: `Entry with id ${entryId} not found`}]};
        ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
    }
});


router.put('/entry/:id/:userId', async (ctx) => {
    console.log("update" + ctx.request.body.id)
    const id = ctx.params.id;
    const idUser = ctx.params.userId;
    const entry = ctx.request.body;
    const entryId = entry.id;
    console.log("update" + entryId)
    console.log("update user id " + idUser)
    if (id != entry.id) {
        console.log("update not 1  good")
        ctx.response.body = {issue: [{error: `Param id and body id should be the same`}]};
        ctx.response.status = 400; // BAD REQUEST
        return;
    }
    // if (!noteId) {
    //   await createEntry(ctx);
    //   return;
    // }
    const index = entries.findIndex(obj => obj.id == id && obj.userId == idUser);
    if (index === -1) {
        console.log("update not  good")
        ctx.response.body = {issue: [{error: `Entry with id ${id} not found`}]};
        ctx.response.status = 400; // BAD REQUEST
        return;
    }
    // if (noteVersion < entries[index].version) {
    //   ctx.response.body = {issue: [{error: `Version conflict`}]};
    //   ctx.response.status = 409; // CONFLICT
    //   return;
    // }
    entries[index] = entry;
    ctx.response.body = entry;
    ctx.response.status = 200; // OK
    broadcast({event: 'updated', entry});
    console.log("update  good " + entry.body)
    saveToFile(entries);
});

router.del('/entry/:id/:userId', ctx => {
    const id = ctx.params.id;
    const idUser = ctx.params.userId;
    const index = entries.findIndex(entry => id == entry.id && idUser == entry.userId);
    if (index !== -1) {
        const entry = entries[index];
        entries.splice(index, 1);
        lastUpdated = new Date();
        broadcast({event: 'deleted', entry});
    }
    ctx.response.status = 204; // no content
    ctx.response.body = entries[index];
    saveToFile(entries);

});

// setInterval(() => {
//   lastUpdated = new Date();
//   lastId = `${parseInt(lastId) + 1}`;
//   const note = new Note({ id: lastId, text: `Note ${lastId}`, date: lastUpdated, version: 1 });
//   entries.push(note);
//   console.log(`
//    ${note.text}`);
//   broadcast({ event: 'created', note });
// }, 15000);

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(3000);