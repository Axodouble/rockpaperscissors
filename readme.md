# emoji rps

a very simple js script to bounce around some emojis in a rock paper scissors game

# how to use

you can run it in 2 ways, either by running it with express js in nodejs, or by using the docker image

## nodejs

1. install nodejs
2. run `npm install`
3. run `node app.js`
4. open your browser and go to `http://localhost:3000`

## docker

1. install docker
2. run `docker build -t emoji-rps .`
3. run `docker run -p 3000:3000 emoji-rps`
4. open your browser and go to `http://localhost:3000`