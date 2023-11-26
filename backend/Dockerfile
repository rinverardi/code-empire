FROM node:21

COPY src /home/node/src
WORKDIR /home/node/src
RUN chown -R node:node .

USER node

RUN npm install
CMD npm start
