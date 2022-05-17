My Sample Application for SQLServer
===========================================

Dockerイメージのビルド
--------------------------
（例）
```shell:example
docker build --tag sampleapp:v1 --build-arg DATABASE_URL="sqlserver://example.net" --build-arg DATABASE_PORT="1433" --build-arg DB_NAME="sampleapp" --build-arg USER="dbuser" --build-arg PASSWORD="passw0rd" .
```    

### --build-argのパラメータについて

 - DATABASE_URL

    SQLServerのホスト名（”sqlserver://”に続く形で設定する。）

 - DATABASE_PORT

    SQLServerの待ち受けポート番号

 - DB_NAME

    接続するDB名

 - USER

    DBにアクセスするユーザー名

 - PASSWORD

    ユーザーのパスワード

    ※以下の文字が含まれる場合、"｛｝"で囲む。   
    `':', '/', '?', '#', '[', ']', '@', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '='`   
    例： p@ss -> p\{@\}ss   

Dockerイメージの実行
---------------------------
(例)
```shell:example
docker run -p "80:8000" sampleapp:v1
```

DockerイメージのPush
---------------------------
(例)
```shell:example
docker login yourregistry.azurecr.io
//　認証情報の入力

docker tag sampleapp:v1 yourregistry.azurecr.io/sampleapp:v1
docker push yourregistry.azurecr.io/sampleapp:v1
```