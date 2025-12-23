# Cookie Clicker Ultimate Automation

**Version:** v8.9.1  
**Environment:** Tampermonkey / UserScript  
**Target:** [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/)

## 📖 專案簡介 (Overview)

這是一個針對《Cookie Clicker》開發的高階自動化腳本。不同於一般的連點器，本腳本旨在接管遊戲後期的複雜策略管理（如花園突變、股票交易、Godzamok 連擊），並引入了多重安全機制以防止自動化邏輯導致的資源誤損。

v8.9.1 版本引入了更細顆粒度的資源管理（建築上限）與防競態條件（Anti-Race Condition）保護。

## 🚀 核心功能 (Core Features)

### 1. 基礎自動化 (Essentials)
*   **智能點擊**：自動點擊大餅乾、黃金餅乾、馴鹿。
*   **自動購買**：基於 CpS 權重或價格策略自動購買升級與建築。
*   **科技研發**：自動解鎖 Bingo 中心科技。
*   **皺紋蟲管理**：自動戳破（一般模式）或保護（打寶模式/閃光皺紋蟲）。

### 2. 花園管理系統 (Garden Manager)
*   **藍圖編輯器 (Blueprint Editor)**：
    *   內建 GUI，支援視覺化編輯陣型。
    *   支援多組存檔 (Profiles) 與群組管理。
    *   提供「未解鎖種子」的視覺提示 (🔒)。
*   **自動化耕種**：
    *   **突變模式**：自動收割成熟植物，保留未成熟變異株。
    *   **聰明除草 (Smart Weed)** `v8.9.1`：自動鏟除雜草，但會**保留尚未解鎖圖鑑**的真菌/雜草。
*   **介面優化** `v8.9.1`：嵌入式控制按鈕固定於泥土區右側內部，不再受視窗縮放影響。

### 3. 進階策略模組 (Advanced Strategy)
*   **Pantheon (Godzamok)**：
    *   **戰術核彈 (Tactical Nuke)**：一鍵 (F9) 賣出指定建築觸發 Buff。
    *   **安全鎖 (Safety Lock)** `v8.9.1`：新增 1 秒防重入鎖，防止快速操作導致的邏輯衝突。
*   **建築上限管理 (Building Caps)** `v8.9.1`：
    *   可針對**每一種建築**單獨設定購買上限（-1 為無限）。
    *   取代了舊版寫死的 Wizard Tower (800) 限制。
*   **魔法書 (Grimoire)**：自動施放法術、連擊偵測、Gambler 邏輯。
*   **股市 (Stock Market)**：基於演算法的低買高賣自動交易。

### 4. 安全防護機制 (Safety Nets)
*   **季節模糊緩衝 (Ambiguity Buffer)**：啟動初期強制阻斷「長者誓約」購買，防止因遊戲載入延遲導致誤殺皺紋蟲。
*   **資金鎖定 (Spending Lock)**：在執行花園補種或 Godzamok 戰術時，自動鎖定其他支出。

## 🛠️ v8.9.1 更新摘要 (Release Notes)

1.  **[Feature] 建築數量上限 (Building Caps)**：
    *   移除舊版 Wizard Tower 硬限制。
    *   新增全建築自定義上限介面。
2.  **[UI] 花園介面重構**：
    *   控制按鈕組移至花園內部右側 (Top: 50px)，解決遮擋標題問題。
3.  **[Safety] Godzamok 防重入鎖**：
    *   實作 1 秒冷卻鎖，防止手動與自動邏輯同時觸發導致狀態錯亂。
4.  **[Logic] 智慧除草保護**：
    *   邏輯更新：`Unlocked == 0` 的雜草現在會被視為珍貴資源而受到保護。

## ⌨️ 快捷鍵 (Hotkeys)

| 按鍵 | 功能 | 說明 |
| :--- | :--- | :--- |
| **F8** | 全局開關 | 暫停/恢復所有自動化邏輯 |
| **Ctrl+Shift+F9** | 戰術核彈 | 觸發 Godzamok 賣出策略 (可自定義) |
| **F10** | 快速補貨 | 補回 Godzamok 消耗的建築 (可自定義) |

## 📦 安裝 (Installation)

1.  安裝瀏覽器擴充功能 **Tampermonkey**。
2.  點擊 `Create a new script`。
3.  將 `.js` 檔案內容完整複製並貼上。
4.  儲存並刷新 Cookie Clicker 頁面。

---
