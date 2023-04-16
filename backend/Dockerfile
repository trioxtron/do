FROM golang:1.20.2-alpine

# Initialize /app dir in image as workdir for simplicity
WORKDIR /app

COPY go.mod . 
COPY go.sum .
RUN go mod download


COPY . .

# Build the app into image dir /to-go
RUN go build -o /to-go

# Expose Port 3000 to outside world
EXPOSE 4000

# Run compiled code
CMD [ "/to-go" ]
