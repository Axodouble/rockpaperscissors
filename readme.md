# emoji rps

a very simple js script to bounce around some emojis in a rock paper scissors game

# preview
try it out at [ax2.sh](https://ax2.sh/)

# how to use

you can run it in 2 ways, either by running it with express js in nodejs, or by using the docker image

## nodejs

1. install nodejs
2. run `npm install`
3. run `node app.js`
4. open your browser and go to `http://localhost:3000`

## docker (self-build)

1. install docker
2. run `docker build -t emoji-rps .`
3. run `docker run -p 3000:3000 emoji-rps`
4. open your browser and go to `http://localhost:3000`

## docker (prebuilt image)
1. install docker
2. run `docker run -p 3000:3000 ghcr.io/axodouble/rockpaperscissors:main`
3. open your browser and go to `http://localhost:3000/`
