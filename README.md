# Cookie-Clicker
Cookie Clicker Ultimate Automation - 餅乾點點樂全自動掛機輔助

# Cookie Clicker Ultimate Automation

**Version:** v8.8.9.2 (The Safety Net)  
**Author:** You & AI Architect  
**Environment:** Tampermonkey / UserScript

## 📖 腳本簡介 (Description)

這是一個針對網頁遊戲《Cookie Clicker》開發的全功能自動化輔助腳本。旨在接管遊戲中繁瑣的重複性操作與複雜的迷你遊戲管理，實現從初期點擊到後期策略執行的完全自動化。

### 核心功能 (Core Features)
*   **基礎自動化**：自動點擊大餅乾、自動點擊黃金餅乾/馴鹿、自動購買建築與升級（支援策略優先級）。
*   **花園管理 (Garden Manager)**：
    *   支援自動耕種、收割、與突變（Mutation）邏輯。
    *   內建「藍圖編輯器」，可儲存/讀取/編輯多組花園陣型。
    *   支援智慧補種與資金保護機制。
*   **進階策略**：
    *   **Godzamok 連擊**：自動執行賣出建築觸發 Godzamok Buff 的操作。
    *   **魔法書 (Grimoire)**：自動施放法術、連擊偵測、以及 Gamble 邏輯。
    *   **股市 (Stock Market)**：基於演算法的低買高賣自動交易。
    *   **季節管理**：自動切換季節並收集季節限定升級。
*   **介面增強**：提供視覺化控制面板、倒數計時器、Buff 監控條、操作日誌與花園狀態覆蓋層 (Overlay)。

---

## 📝 版本更新說明 (Changelog v8.8.9.2)

### v8.8.9.2 - 安全網更新 (The Safety Net Patch)

此版本主要針對遊戲啟動初期的競態條件 (Race Condition) 進行修復，並整合了 v8.8.9 系列的花園編輯器功能。

#### 1. 邏輯硬化：季節模糊緩衝 (Seasonal Ambiguity Buffer)
*   **問題描述**：在腳本啟動或網頁刷新時，由於 `Season` 模組的狀態判斷（`isFarming`）可能晚於 `Buy` 模組的執行，導致在打寶季節（如聖誕節、萬聖節）期間，腳本誤買「長者誓約 (Elder Pledge)」，意外清除所有皺紋蟲 (Wrinklers)。
*   **解決方案**：
    *   新增緩衝機制。在全域暖機（Warmup）結束後的 **3 秒內** (T+10s ~ T+13s)，若偵測到當前處於打寶相關季節，強制阻斷購買模組對「長者誓約」的購買請求。
    *   此改動確保了即使瀏覽器卡頓，腳本也能在狀態確認同步後才執行敏感操作。

#### 2. 初始化時序修正 (Startup Timing Fix)
*   將花園暖機計時器 (`Runtime.Timers.GardenWarmup`) 的初始化移至核心啟動流程的最頂端。
*   防止 `Logic.Buy` 或 `Logic.Garden` 在計時器未定義前搶先執行。

#### 3. 花園編輯器 UX 重構 (Garden Editor Overhaul - from v8.8.9)
*   **資料結構升級**：引入 `GardenProfiles` 結構，支援群組化管理存檔。
*   **藍圖編輯器**：
    *   新增「編輯模式」，允許手動輸入植物 ID 規劃陣型。
    *   新增儲存、清空、放棄與群組重新命名功能。
*   **視覺優化**：新增未解鎖種子的鎖頭圖示 (🔒) 與視覺回饋，避免規劃無法種植的陣型。

---

## ⚠️ 注意事項 (Notes)
*   **全域開關 (F8)**：按下 F8 可快速暫停/恢復所有自動化邏輯。
*   **資金鎖定**：切換花園陣型或觸發特定策略時，腳本可能會自動鎖定資金支出，需手動或等待邏輯結束後解除。
