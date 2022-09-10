FROM node:16.15-alpine
#FROM node:17.4.0-alpine

USER node

# 작업 폴더 만들고 해당 디렉토리로 이동
#RUN mkdir ~/frontend
WORKDIR /app

# TIMEZONE 설정
ENV TZ="Asia/Seoul" 

# 컨테이너에서 사용할 port를 지정
#EXPOSE 3010

# package.json을 현재 디렉토리에 복사
# COPY ./frontend/package*.json ./

# npm으로 작업 디렉토리에 필요한 라이브러리 설치
# RUN npm install

RUN alias l='ls -al'
