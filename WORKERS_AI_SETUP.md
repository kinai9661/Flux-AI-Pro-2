# Workers AI 配置說明

## 為 Cloudflare Pages 繫定 Workers AI

### 步驟 1: 登錄 Cloudflare Dashboard
1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇您的帳戶

### 步驟 2: 進入 Pages 設置
1. 點擊左側選單 **Workers & Pages**
2. 選擇您的 Pages 項目：**Flux-AI-Pro-2**

### 步驟 3: 繫定 Workers AI
1. 點擊 **Settings** (設置)
2. 滾動至 **Functions** 區域
3. 找到 **Workers AI Bindings** 或 **AI Bindings**
4. 點擊 **Add binding** (新增繫定)

### 步驟 4: 填寫繫定資訊
輸入以下資訊：

```
Variable name: AI
Value: 選擇 "Workers AI"
```

![Workers AI Binding](https://developers.cloudflare.com/assets/ai-binding_hu8de2ff6f3e2e5d2a9d4d6c8d3e2e5d2a.png)

### 步驟 5: 保存並重新部署
1. 點擊 **Save** (保存)
2. 等待配置生效（通常几秒鐘）
3. 重新部署項目（可選）

---

## 不需要環境變數！

✅ **Workers AI 是完全免費的**
✅ **不需要 API Key**
✅ **不需要設置 Secret**
✅ **只需要繫定 AI**

---

## 驗證配置

繫定完成後，訪問您的網站：

1. 輸入中文提示詞：`一隻可愛的貓咒`
2. 點擊生成
3. 應該會看到翻譯後的提示詞：`a cute cat`

如果沒有顯示翻譯，請檢查：
- 是否正確繫定 AI
- 繫定名稱是否為 `AI` (大寫)
- 是否重新部署

---

## 替代方案：使用 wrangler CLI

如果您喜歡命令行，也可以使用：

```bash
# 安裝 wrangler
npm install -g wrangler

# 登錄
wrangler login

# 部署 (自動繫定 AI)
wrangler pages deploy dist --project-name=flux-ai-pro-2
```

`wrangler.toml` 中已經配置好 AI 繫定：

```toml
[ai]
binding = "AI"
```

---

## 免費額度

Cloudflare Workers AI 免費版：
- 每天 **10,000 次** AI 請求
- 每次請求最大 **10KB**
- 對於個人使用完全足夠

如果需要更多：
- Workers Paid 計劃：$5/月
- 無限 AI 請求

---

## 常見問題

### Q: 翻譯功能不工作？
A: 請確認在 Cloudflare Dashboard 中正確繫定 AI

### Q: 需要付費嗎？
A: 不需要！Workers AI 有每天 10,000 次免費額度

### Q: 支持哪些語言？
A: m2m100-1.2b 模型支持 122 種語言互譯

### Q: 翻譯品質如何？
A: 對於簡單的描述性提示詞，品質很好。複雜句子可能需要手動調整。

---

## 相關文檔

- [Cloudflare Workers AI 官方文檔](https://developers.cloudflare.com/workers-ai/)
- [m2m100 模型說明](https://developers.cloudflare.com/workers-ai/models/m2m100-1.2b/)
- [Cloudflare Pages 繫定說明](https://developers.cloudflare.com/pages/functions/bindings/)
