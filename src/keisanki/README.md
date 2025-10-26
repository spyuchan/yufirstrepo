# spyuchan Calculator

8セグメントLED風の子供向け計算機アプリ

## 特徴

- 🎨 美しい8セグメントLEDディスプレイ
- ⚡ 即座に反応するボタン
- 📱 iPhoneのChrome向けに最適化
- 🎭 カラフルで子供に喜ばれるデザイン

## ローカル開発

### 必要なもの

- Node.js（12以上）

### 起動方法

```bash
# src/keisankiディレクトリに移動
cd src/keisanki

# サーバー起動
npm start
```

ブラウザで `http://localhost:3000` を開いてください。

### 別のポートで起動したい場合

```bash
npm run serve
```

ポート番号は3000です（変更可能）。

## ビルド

静的ファイルのみなので、ビルドは不要です。そのままデプロイできます。

## デプロイ

### Vercel

```bash
# グローバルにVercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

### GitHub Pages

このディレクトリをルートにしてデプロイしてください。

