FROM node:6.9.2-slim

EXPOSE 5555

ADD ./ /cf-google-auth/
WORKDIR /cf-google-auth/

RUN npm install

CMD ["node", "bin/www"]
