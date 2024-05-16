FROM mongo

ARG MONGO_URI
ENV MONGODB=$MONGO_URI

WORKDIR /app
COPY . .

CMD mongoimport --uri $MONGODB --collection pastries --type json --file ./pastries.json --jsonArray
