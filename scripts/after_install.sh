#!/bin/bash
cd /home/ec2-user/server
npm install
npm install --only=dev
npm install --save react react-dom react-scripts react-particles-js
npm install pm2 -g