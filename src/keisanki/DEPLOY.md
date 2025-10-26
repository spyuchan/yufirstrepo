# Vercelデプロイ手順

## デプロイ方法

### 1. Vercelにアクセス
[https://vercel.com](https://vercel.com) にアクセス

### 2. GitHubでログイン
"Sign Up" または "Log In" をクリックして、GitHubアカウントでログイン

### 3. プロジェクトをインポート
- "Add New..." → "Project" をクリック
- GitHubリポジトリ一覧から `yufirstrepo` を選択

### 4. プロジェクト設定
以下の設定を行います：

**Root Directory**: `src/keisanki`

画面に「Root Directory」という項目があるので、そこに `src/keisanki` と入力。

### 5. デプロイ！
"Deploy" ボタンをクリック

約30秒後にデプロイ完了のURLが表示されます！

## デプロイ後

自動的に以下のURLが生成されます：
- `https://yufirstrepo-xxxxx.vercel.app`
- またはカスタムドメインを設定可能

## 今後の更新

GitHubにプッシュするだけで自動的に再デプロイされます。

