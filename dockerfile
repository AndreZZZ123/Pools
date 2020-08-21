# # Stage 1. Build the go webserver
# FROM golang:alpine as stage1
# WORKDIR /app
# COPY ./go.mod ./
# RUN go mod download
# COPY ./main.go ./
# RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# FROM alpine:latest
# RUN apk update && apk add bash
# RUN apk --no-cache add ca-certificates
# WORKDIR /root/
# # Copy built binary
# COPY --from=stage1 /app/main .
# # Copy built website
# COPY build ./build
# # Copy wait for it
# CMD ["./main"]

FROM golang:alpine as stage1
WORKDIR /app
COPY ./go.mod ./
RUN go mod download
COPY ./main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

#Stage2. Build the website
FROM node:12 as stage2
WORKDIR /app
COPY .package.json .
RUN yarn
COPY ./src ./src
COPY ./public ./public
RUN yarn build

FROM alpine:latest
RUN apk update && apk add bash
RUN apk --no-cache add ca-certificates
WORKDIR /root/
# Copy built binary
COPY --from=stage1 /app/main .
# Copy built website
COPY --from=stage2 /app/build ./build
# Copy wait for it
COPY ./wait-for-it.sh ./
CMD ["./main"]