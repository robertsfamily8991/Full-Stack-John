// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
const FILE = path.join(__dirname, 'calls.json');

function readCalls(){
  try{ return JSON.parse(fs.readFileSync(FILE,'utf8')||'[]'); } catch(e){ return []; }
}
function writeCalls(data){
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
}

/* CORS for local dev */
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
});

app.get('/api/calls', (req,res)=>{
  const calls = readCalls();
  res.json(calls);
});

app.post('/api/calls', (req,res)=>{
  const calls = readCalls();
  const newCall = req.body;
  // assign an id
  newCall.id = Date.now().toString(36);
  if(!newCall.timestamp) newCall.timestamp = new Date().toISOString();
  calls.push(newCall);
  writeCalls(calls);
  res.status(201).json(newCall);
});

app.put('/api/calls/:id', (req,res)=>{
  const calls = readCalls();
  const id = req.params.id;
  const idx = calls.findIndex(c=>c.id==id);
  if(idx===-1) return res.status(404).json({error:'Not found'});
  calls[idx] = Object.assign(calls[idx], req.body);
  writeCalls(calls);
  res.json(calls[idx]);
});

app.delete('/api/calls/:id', (req,res)=>{
  const calls = readCalls();
  const id = req.params.id;
  const idx = calls.findIndex(c=>c.id==id);
  if(idx===-1) return res.status(404).json({error:'Not found'});
  const removed = calls.splice(idx,1)[0];
  writeCalls(calls);
  res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
