FROM maven:3.9.8-eclipse-temurin-21 AS build

COPY src /app/src

COPY pom.xml /app

WORKDIR /app

RUN mvn clean install -U

FROM openjdk:21-jdk-slim

COPY --from=build /app/target/paraphrase-api-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/app.jar"]