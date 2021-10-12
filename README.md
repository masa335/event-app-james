# 普段、仕事で忙しくても、バンドがしたい人たちを繋ぐアプリです🎸

  アプリURL : https://event-app-james.vercel.app/
<br>
<br>
### 📌**このアプリを作成しようと思ったきっかけ**
  普段は仕事で忙しくて、学生の時のようにバンドを組んで活動していく体力はないけれど、  
  土日限定バンドや週末バンドを気軽に楽しめたらいいなと思い作りました。

### 📌**完全SPA化**
  フロントエンドにReact(tsx)、バックエンドにRails(API)を使用しています。

### 📌**インフラにAWSを使用し、リソースは完全コード化**
  クラウドインフラとしてAWSを採用しており、terraformによってコード化しています。  
  リポジトリ : https://github.com/masa335/event-app-james-infra

### 📌**開発/本番環境ともにDockerを使用してコンテナ化**
  開発環境はMacにDocker Desktopを導入してコンテナ化  
  本番環境はECS(Fargate)にDockerコンテナをデプロイしています。

### 📌**Github Actionsを使ったCI/CDを構築**
  プルリクしたら、自動テスト(Rspec/Rubocop)が走り、mainリポジトリにマージされたら  
  本番環境に自動でデプロイされるようにしました。

### 📌**ホスティングにはVercelを利用**
  フロントエンドのホスティングにはVercelを利用しました。

## インフラ構成図
![image](https://user-images.githubusercontent.com/26037696/136884405-d38d52c3-9565-473c-a915-a2a1c84801c4.png)

## 技術スタック
  * バックエンド  
    - Ruby on Rails 6  
      - devise token auth / RuboCop / RSpec / CarrierWave / byebug etc...
    - Puma
    - Nginx
    - MySQL
<br>
<br>
  * フロントエンド  
    - React  
      - chakra UI / axios / ReactHookForm / Recoil etc...
    - TypeScript
<br>
<br>
  * インフラ  
    - AWS  
      - VPC / ECS(Fargate) / ECR / ALB / Route53 / ACM / RDS / IAM / S3 / CloudWatch
    - Docker
    - Vercel
    - Github Actions

## 機能要件
* ユーザー新規登録・編集・削除機能
* ログイン・ログアウト機能
* ユーザーフォロー・フォロー解除機能
* イベント作成・編集・削除機能
* イベント検索機能
* イベント参加・参加取り消し機能
* コメント投稿・削除機能
* 画像保存機能(ユーザーのアイコンやイベント画像に使用)

## 非機能要件
* 常時SSL化
* レスポンシブデザイン
* シンプルなUI
* マルチAZ構成
* ロードバランサによる負荷分散、ヘルスチェック
