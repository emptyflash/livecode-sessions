FROM yinlang

RUN apt-get update \
    && apt-get install -y wget inotify-tools unzip \
    && wget -q -O /tmp/websocketd.zip https://github.com/joewalnes/websocketd/releases/download/v0.3.0/websocketd-0.3.0-linux_amd64.zip \
    && mkdir /tmp/websocketd \
    && unzip /tmp/websocketd.zip -d /tmp/websocketd \
    && mv /tmp/websocketd/websocketd /usr/bin \
    && chmod +x /usr/bin/websocketd \
    && rm /tmp/websocketd.zip

COPY watchcat.sh .

CMD ["websocketd", "--port", "9000", "./watchcat.sh"]
