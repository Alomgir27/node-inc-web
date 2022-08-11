#!/bin/bash
cd /home/ec2-user/server
sudo yum install -y httpd
# curl -sL https://rpm.nodesource.com/setup_17.x | sudo -E bash -
sudo yum -y install nodejs npm