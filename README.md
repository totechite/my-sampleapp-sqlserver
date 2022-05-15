My Sample Application for SQLServer
===========================================

Dockerイメージのビルド
--------------------------
```shell:example
docker build --build-arg DATABASE_URL=sqlserver://example.net DATABASE_PORT=1433 DB_NAME=sampleapp USER=dbuser PASSWORD=passw0rd
```
※パラメータ”PASSWORD”の値に以下の文字が含まれる場合、"｛｝"で囲む。   
`':', '/', '?', '#', '[', ']', '@', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '='`   
例： @ -> \{@\}

