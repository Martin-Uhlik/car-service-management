FROM node:18

WORKDIR /app
COPY . /app/
RUN rm -rf ./node_nodules

ADD prisma /app/prisma/

#EXPOSE 4000

ENTRYPOINT ["npm", "start"]
