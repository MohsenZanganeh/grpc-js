FROM node:latest
WORKDIR /app
COPY . .
CMD [ "npm" , "install" ]
