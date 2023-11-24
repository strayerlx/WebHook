#!/bin/bash
WORK_PATH='/root/projects/nodeProjects/server01'
cd $WORK_PATH
echo "清除旧代码"
git reset --hard origin/master
git clean -f
echo "拉取新代码"
git pull origin master
echo "开始构建"
docker build -t server01 .
echo "停止旧容器并删除旧容器"
docker stop server01-container
docker rm server01-container
echo "启动新容器"
docker container run -p 3000:3000 --name server01-container -d server01