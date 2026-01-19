🍪 Cookie Clicker Ultimate Automation (v9.1.4)

全方位《Cookie Clicker》自動化託管系統 - JQB Visual Priority Update

Current Version: v9.1.4
Last Updated: 2026

這不僅僅是一個連點器，而是一套針對遊戲後期設計的旗艦級託管系統。本腳本旨在接管遊戲中繁瑣的微操作與複雜策略管理。
v9.1.x 系列 重點在於系統穩定性與狀態完整性，引入了「安全重啟協議」與「智慧鎖定記憶」，並針對花園中最珍貴的 多汁女王甜菜 (JQB) 進行了視覺優先級優化。
🚀 v9.1.4 新版亮點 (What's New)
💎 JQB 視覺優先權 (Visual Priority)

    琥珀金高亮邊框： 針對多汁女王甜菜 (Juicy Queenbeet, JQB)，無論記憶陣型設定為何，強制顯示 金色高亮邊框 (z-index 15) 與光暈特效。

    防覆蓋邏輯： 修復了以往 JQB 可能被紅色異常框 (Anomaly) 覆蓋的問題，確保您一眼就能在花園中看到最珍貴的植物。

🛡️ 安全重啟協議 (Safe Restart Protocol)

    忙碌狀態檢測： 系統現在具備「忙碌意識」。當發生以下情況時，自動推遲排程中的重啟 (F5) 操作：

        Godzamok 戰術執行中： 正在賣出或買回建築時。

        戰鬥狀態 (Combat)： 擁有 Dragonflight、Click Frenzy 或高倍率 Buff 時。

    防存檔損毀： 防止在大量寫入或高收益期間強制刷新，確保數據完整性。

🧠 Godzamok 智慧鎖定 (Smart Locking)

    狀態完整性修復： 徹底修復了「幽靈鎖定」Bug。

    智慧還原： 系統現在會記憶連擊觸發 前 的鎖定狀態。

        若觸發前您手動鎖定了支出，連擊結束後 保持鎖定。

        若觸發前未鎖定，連擊結束後 自動解鎖。

        不再發生連擊結束後意外解除您手動設定的保護鎖。

🛠️ 核心功能模組 (Core Modules)
🌿 花園管理系統 (Garden Manager) v3.1

    JQB 保護協議： 絕對保護 JQB，僅在完全成熟時收割以獲取糖塊，其餘時間給予絕對豁免權。

    藍圖編輯器 (Blueprint Editor)：

        讀取實況： 一鍵讀取當前遊戲盤面至編輯器。

        突變標記： 支援標記未解鎖植物 (紫色)，自動化耕種時會保留這些格子直到成熟。

    自動化耕種：

        突變模式： 側邊欄獨立開關 (變/否)，可單獨保留自動補種但停止鏟除雜物。

        同步播種： 確保資金充足且無 Buff 時才一次性播種，最大化成本效益。

📈 股市自動化 (Stock Market) v2.1

    動態門檻演算法： 依據當前經紀人數量與手續費率 (Overhead)，動態計算最佳買入與賣出係數 (Buy/Sell Multipliers)。

    自動經紀人： 透過 DOM 模擬修復了經紀人購買功能，自動壓低交易手續費。

    憲法級防護： 在「季節打寶 (Farming)」模式下，強制鎖定股市操作。

⚔️ 進階策略 (Advanced Strategy)
Godzamok 戰術連擊

    戒嚴協議 (Martial Law)： 觸發戰術時，強制暫停花園突變與科技研發，防止資金被挪用，確保能全額買回建築。

    戰術核彈 (Tactical Nuke)： 快捷鍵 ^+F9。一鍵賣出建築觸發 Buff，並在 10 秒後自動買回。

    防寫機制： 實作 Immutable Snapshot，防止在高頻連擊下覆蓋使用者的原始支出鎖定設定。

魔法賭徒 (Gambler)

    紅綠燈系統： 視覺化顯示魔法施放結果（綠燈=成功延長 Buff，紅燈=失敗/爛牌）。

    智慧施法： 自動偵測 Dragonflight 或 Click Frenzy，利用「命運之手」+「伸展時間」進行連擊賭注。

⚙️ 基礎設施 (Infrastructure)

    季節管理： 自動購買季節升級，完成目標（如蒐集完所有聖誕餅乾）後自動切換至下一季節。

    皺紋蟲保護： 自動識別並絕對保護 閃光皺紋蟲 (Shiny Wrinkler)，絕不誤戳。

    幸運跑馬燈： 自動偵測並點擊綠色的 Fortune News。

    糖塊收割： 支援成熟度判斷，並防止誤點肉色糖塊 (Meaty)。

📥 安裝與使用 (Installation)

    環境準備： 安裝瀏覽器擴充功能 Tampermonkey 或 Violentmonkey。

    安裝腳本： 點擊安裝本腳本，或將代碼複製到新腳本中。

    啟動遊戲： 進入 Cookie Clicker。

    操作介面： 腳本加載後，畫面將顯示浮動控制面板與 HUD 資訊。

⌨️ 快捷鍵與控制 (Hotkeys)
快捷鍵	功能	說明
F8	全局總開關	暫停/恢復所有自動化運作 (緊急用，顯示為 [🛑] 或 [🟢])
Ctrl+Shift+F9	戰術核彈	賣出指定建築 (預設 Farm) 觸發 Godzamok，隨後自動買回
F10	快速補貨	手動觸發 Godzamok 補貨機制 (修復數量不足時用)
Alt + 拖曳	移動面板	所有懸浮面板 (倒數、日誌、花園網格) 均支援拖曳
📋 進階設定 (Configuration)
資金鎖定模式 (Spending Lock)

在控制面板或花園側邊欄點擊 🔒 (鎖頭圖示)：

    啟用時： 禁止購買建築、升級、花園補種與股市買入（自動購買誓約除外）。

    視覺提示： 按鈕變為紅色，且部分功能 (如花園突變) 會被強制禁用以保護資金。

設定備份

    匯出： 控制面板 -> [設定] -> [📤 匯出設定] (生成 Base64 代碼)。

    匯入： 在新裝置貼上代碼即可還原所有開關與數值。

🛑 常見問題 (FAQ)

Q: 為什麼時間到了卻沒有自動重啟 (F5)？
A: 這是 v9.1.3 新增的 安全重啟協議。若系統偵測到您正處於 Godzamok 連擊中、或擁有高倍率 Buff (如 Dragonflight)，會自動推遲重啟，直到狀態解除。

Q: 花園的 JQB 顯示金色框是什麼意思？
A: 這是 v9.1.4 的新功能。金色框代表該格植物是 多汁女王甜菜 (JQB)。無論您的記憶陣型該格是什麼，JQB 永遠擁有最高視覺優先權，提醒您不要誤鏟。

Q: Godzamok 連擊後，為什麼我的資金鎖定沒有解開？
A: 這是 v9.1.1 的 智慧鎖定 功能。如果您在觸發連擊 之前 就已經手動鎖定了資金，腳本會在連擊結束後 恢復 為鎖定狀態，而不是無腦解鎖。

Q: 股市經紀人為什麼不買了？
A: 請檢查您是否開啟了「存錢模式」。為了防止資金耗盡，存錢模式下禁止僱用經紀人。
⚠️ 免責聲明 (Disclaimer)

This script is for educational purposes. Use at your own risk. Cheated cookies taste awful, but automated cookies taste like efficiency. 🍪
