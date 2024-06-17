const express = require('express');
const path = require('path');
const shell = require('shelljs');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// if your local checkouts are in a different location, set this accordingly
const devDir = '~/dev/';

// Set the list of apps you want to scan
const apps = [
  /* apps list here */
];

app.get('/data', function(req, res) {
  const data = {};

  apps.forEach(app => {
    const tags = shell.exec(`cd ${devDir}/${app} && git tag -l '*.final' --format='%(refname:strip=2)|||%(creatordate)'`).trim().split('\n');
    if (tags.length > 0) {
      data[app] = tags.map(tag => ({ tagName: tag.split('|||')[0], date: tag.split('|||')[1] }));
    }
  });

  res.send(data);
});

app.listen(process.env.PORT || 4000);