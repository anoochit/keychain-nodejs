FROM ubuntu:lastest

# update and install nodejs
RUN \
	apt-get update &&
	apt-get install -y nodejs npm git git-core &&
	apt-get clean

ADD start.sh /tmp/

RUN chmod +x /tmp/start.sh

CMD ./tmp/start.sh