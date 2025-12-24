# Cookie Clicker Ultimate Automation (v8.9.2)

![Version](https://img.shields.io/badge/version-v8.9.2-blue) ![Game](https://img.shields.io/badge/Game-Cookie%20Clicker-orange)

## 📖 專案簡介 (Overview)

這是一個針對《Cookie Clicker》開發的高階自動化腳本。不同於一般的連點器，本腳本旨在接管遊戲後期的複雜策略管理（如花園突變、股票交易、Godzamok 連擊），並引入了多重安全機制以防止自動化邏輯導致的資源誤損。

**v8.9.2 版本** 引入了 **「戰鬥狀態紀律 (Combat State Discipline)」** 邏輯，大幅優化了在爆發期（如 Dragonflight, Click Frenzy）的 CPU 資源分配與資金保護。

---

## 🚀 核心功能 (Core Features)

### 🔥 v8.9.2 新增功能：戰鬥狀態紀律 (Combat Discipline)
為了應對遊戲後期的極限操作，v8.9.2 引入了全局戰鬥狀態判定 (`isCombatState`)：
*   **爆發期偵測**：當偵測到高倍率 Buff（如 `Dragonflight`, `Click Frenzy`, `Cursed Finger` 或 CpS/Click 倍率 > 1）時，系統判定為「戰鬥狀態」。
*   **資源讓渡**：在戰鬥狀態下，腳本會**自動暫停**低優先級的後勤工作（股市交易、季節切換、科技研發）。
*   **目的**：
    1.  **釋放 CPU 運算力**：確保瀏覽器能全速處理點擊與 Godzamok 邏輯，減少卡頓。
    2.  **資金保護**：防止在需要大量資金進行 Godzamok 買回 (Buyback) 的關鍵時刻，資金被股市或科技研發消耗。

---

### 🌿 花園管理系統 (Garden Manager)
*   **藍圖編輯器 (Blueprint Editor)**：
    *   內建 GUI，支援視覺化編輯與儲存陣型。
    *   支援多組存檔 (Profiles) 與群組管理，方便切換不同策略。
    *   提供「未解鎖種子」的視覺提示 (🔒) 與價格預覽。
*   **自動化耕種**：
    *   **突變模式**：自動收割成熟植物，保留未成熟變異株。
    *   **聰明除草 (Smart Weed)**：自動鏟除有害雜草，但會**智慧保留**尚未解鎖圖鑑的新品種真菌/雜草 (v8.9.1 優化)。
*   **介面優化**：控制面板採用嵌入式設計，固定於泥土區右側，不再受視窗縮放影響位置。

### ⚔️ 進階策略模組 (Advanced Strategy)
*   **Pantheon (Godzamok)**：
    *   **戰術核彈 (Tactical Nuke)**：一鍵 (預設 `F9`) 賣出指定建築觸發 Buff，並支援快速買回 (`F10`)。
    *   **安全鎖 (Safety Lock)**：v8.9.1 新增防競態條件 (Anti-Race Condition) 保護，防止因連點或網路延遲導致的邏輯衝突。
*   **建築上限管理 (Building Caps) (v8.9.0+)**：
    *   移除了舊版寫死的 Wizard Tower 上限，現在可於「進階」面板針對**每一種建築**單獨設定購買上限（-1 為無限）。
    *   這對於控制 Wizard Tower 的魔力上限或 Godzamok 的庫存量至關重要。
*   **魔法賭徒 (Gambler)**：自動判斷 Buff 狀態，利用命運之手 (Hand of Fate) 進行連擊賭注。
*   **股市 (Stock Market)**：基於演算法的低買高賣自動交易 (戰鬥狀態下會自動暫停)。

### 🛡️ 安全防護機制 (Safety Nets)
*   **季節模糊緩衝 (Ambiguity Buffer)**：啟動初期或季節切換時強制阻斷「長者誓約」購買，防止因遊戲載入延遲導致誤殺皺紋蟲。
*   **資金鎖定 (Spending Lock)**：
    *   在執行花園補種或 Godzamok 戰術時，自動鎖定其他支出。
    *   可手動開啟存錢模式 (Saving Mode)，停止購買建築與升級。

### ⚙️ 基礎自動化 (Essentials)
*   **智能點擊**：自動點擊大餅乾、黃金餅乾、馴鹿。
*   **自動購買**：基於 CpS 權重或價格策略自動購買升級與建築。
*   **皺紋蟲管理**：自動戳破（一般模式）或保護（打寶模式/閃光皺紋蟲）。

---

## 🛠️ 安裝與使用 (Installation)

1. 安裝瀏覽器擴充功能：[Tampermonkey](https://www.tampermonkey.net/)。
2. 點擊安裝腳本或將代碼複製到新腳本中。
3. 進入遊戲，腳本將自動加載並顯示控制面板。
4. **快捷鍵**：
    *   `F8`：全局開關 (Pause/Resume)
    *   `Ctrl+Shift+F9` (預設)：Godzamok 戰術核彈 (全賣)
    *   `F10` (預設)：Godzamok 快速補貨

## 📝 更新日誌 (Changelog Highlights)

*   **v8.9.2**: 新增戰鬥狀態紀律 (Combat Discipline)，優化爆發期效能。
*   **v8.9.1**: 修正 Godzamok 競態條件；優化花園除草邏輯；解除巫師塔硬上限。
*   **v8.9.0**: UI 重構，建築上限設定遷移至進階面板。

---
*Disclaimer: This script is for educational purposes only.*
