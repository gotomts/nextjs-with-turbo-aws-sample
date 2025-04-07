FROM --platform=linux/amd64 node:20-slim

WORKDIR /app

# 必要最小限のビルドツール
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# pnpmインストール
RUN npm install -g pnpm

# プロジェクト全体をコピー
COPY . .

# 依存関係インストールとビルド
RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD cd apps/web && pnpm start