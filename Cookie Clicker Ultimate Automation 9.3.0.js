// ==UserScript==
// @name         Cookie Clicker Ultimate Automation
// @name:zh-TW   餅乾點點樂全自動掛機輔助 (Cookie Clicker)
// @name:zh-CN   餅乾點點樂全自動掛機輔助 (Cookie Clicker)
// @version      9.3.0
// @description  Automated clicker, auto-buy, auto-harvest, garden manager (5 slots), stock market, season manager, Santa evolver, Smart Sugar Lump harvester, Dragon Aura management, and the new Gambler feature.
// @description:zh-TW 全功能自動掛機腳本 v9.3.0 Arcane Vanguard
// @author       You & AI Architect
// @match        https://wws.justnainai.com/*
// @match        https://orteil.dashnet.org/cookieclicker/*
// @icon         https://orteil.dashnet.org/cookieclicker/img/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @license      MIT
// @homepage     https://github.com/wei9133/Cookie-Clicker
// @namespace http://tampermonkey.net/
// @downloadURL https://update.greasyfork.org/scripts/557692/Cookie%20Clicker%20Ultimate%20Automation.user.js
// @updateURL https://update.greasyfork.org/scripts/557692/Cookie%20Clicker%20Ultimate%20Automation.meta.js
// ==/UserScript==

/*
變更日誌 (Changelog):
v9.3.0 Arcane Vanguard (2026):
  -[Feature] 核心: 新增「離線防呆重啟協議 (Pre-Restart Recovery)」，重啟前5分鐘自動恢復掛機狀態。
  - [UI] 視覺: 側邊欄 HUD 支援自訂色彩，可於設定面板自由調整鎖定與突變狀態顏色。
  - [UI] 魔法: 新增「奧術戰術面板 (Grimoire Tactical HUD)」，支援快速拖曳與熱鍵連動。
  - [Logic] 花園: 聰明補種演算法升級，導入「Net-CpS 淨倍率計算」，可於貸款期間準確判定低產期。

v9.2.1 Matrix Sniper System (2026):
  - [Feature] 核心: 重構多重宇宙狙擊手，導入「6x6 矩陣遮罩監聽」。
  - [UI] 花園網格: 新增「🎯 編輯監控區」，支援於 7x7 地圖直觀設定監控目標。
  - [UI] 模組控制: 移除全域目標 ID 設定，將 Sniper 陣型讀寫控制轉移至網格面板。
  - [Logic] 掃描引擎: 改為嚴格比對 SniperGrid 遮罩，支援特定 ID (金) 與未知變異 (紫) 同時監控。

v9.2.0 Sniper System (2026):
  -[Feature] 核心: 導入「多重宇宙狙擊手」系統，跨分頁 S/L 狀態監控。
  - [UI] 花園網格重構: 升級為 A-F/1-6 棋盤座標系統。
  - [UI] Favicon 繪製引擎: 支援根據突變與設定動態渲染頁面標籤圖標。
  - [Security] 憲法級阻斷: Sniper 運作期間自動鎖定安全防護，阻止頁面重啟。

v9.1.10 Polishing & Safety (2026):
  - [Critical] LoanRanger: 銀行貸款重置加入二次確認機制，防止誤觸導致重複購買。
  -[High] Logic: 泥土聯動邏輯優化，增加泥土狀態檢查，防止重複點擊。
  - [Medium] Season: 調整季節購買過濾順序，提升安全性。
  -[Low] UI: HUD 創建時增加父容器檢查，防止錯誤。

v9.1.9 Smart Sleep & HUD (2026):
  - [Logic] LoanRanger: 重寫貸款邏輯。引入盲打策略 (Blind Fire) 與持久化冷卻。
    - 成功購買後進入 40 分鐘長冷卻 (Persistence)，失敗或條件不符進入 20 秒短休眠。
  - [UI] Advanced: 銀行貸款區塊新增「重置冷卻」按鈕。
  - [UI] Garden HUD: 在花園側邊欄新增「陣型名稱顯示」，可於主面板與網格面板切換顯示。
  - [Refactor] Config: 新增 ShowLayoutName 設定。

v9.1.8 Loan Ranger & Unjamming (2026):
  -[Feature] Logic: 新增 `Logic.LoanRanger` 銀行貸款自動化模組。
    - 採用盲打策略 (Blind Fire)，當 CpS 倍率超過設定門檻 (預設 300,000x) 時自動觸發 Loan 2。
    - 內建 2 秒冷卻保護，防止 API 轟炸。
  - [Logic] Godzamok: 解除 F9 (戰術核彈) 的鎖定限制 (Unjamming Protocol)。
    - 現在 F9 擁有最高中斷權，即使在冷卻或鎖定中也可強制重置狀態並再次觸發，確保連擊流暢度。
  - [Logic] Godzamok: F10 (快速補貨) 新增靜默模式 (Silent Mode)。
    - 當建築已達上限時，不再彈出 Game.Notify 警告，避免干擾高頻操作。
  - [UI] Advanced: 在進階分頁新增銀行貸款設定區塊 (開關、門檻)。
  - [Config] Persistence: 新增 `AutoLoan`, `AutoLoanThreshold` 等持久化設定。

v9.1.7 Tactical Consistency Fix (2026):
  - [Logic Fix] Godzamok: 修復戰術核彈 (F9) 結束後未正確還原「支出鎖定」狀態的問題。
  - [Refactor] Core: 統一了自動連擊與手動核彈的狀態快照與回歸邏輯。
v9.1.6 Garden UI Refactor & Soil Sync (2026):
  -[UI] Garden: 全面重構花園控制面板介面，採用標準化降噪樣式 (.cc-garden-panel-standard)，提升可讀性。
  - [Feature] Garden: 新增「強制熱鍵泥土聯動」功能。現在使用 F4 (預設) 強制開啟變異時，可自動切換至指定泥土 (如肥料)，最大化突變效率。
  - [Setting] Config: 新增 ForceMutationHotkey 預設值為 F4。
  - [Logic] Core: 優化 EmergencyForceMutation 執行序列，確保在資金允許時才切換泥土。
v9.1.5 Persistence & Hotkeys (2026):
  - [Feature] Core: 新增持久化變數 `persist_isMartialLawActive` 與 `persist_wasMutationEnabled`，防止網頁刷新導致 Godzamok 戒嚴狀態丟失。
  - [Feature] Logic: 新增 `Logic.EmergencyForceMutation` 強制解除熱鍵系統 (預設 Ctrl+Shift+M)，可一鍵物理粉碎所有鎖定並強制開啟變異。
  - [Logic] Godzamok: 實作狀態記憶，確保戒嚴結束後能正確恢復原本的變異設定 (即使期間經歷過 F5 刷新)。
  - [UI] Garden: 在花園分頁新增「強制開啟變異熱鍵」設定欄位。
v9.1.4 JQB Visual Priority (2026):
  -[Visual] Garden: 新增多汁女王甜菜 (JQB) 專屬視覺優化。無論記憶設定為何，JQB 強制顯示金色高亮邊框 (z-index 15)。
  -[Fix] Garden: 修正視覺覆蓋邏輯，防止 JQB 金框被紅色異常框覆蓋。
v9.1.3.3 State Integrity Fix (2026):
  -[Logic Fix] Godzamok: 修復「幽靈鎖定」Bug。實作狀態記憶防寫機制 (Immutable Snapshot)，防止在高頻連擊下覆蓋使用者的原始支出鎖定設定。
v9.1.3.2 UI Sync Fix (2026):
  - [UI Fix] Godzamok: 修復戒嚴結束後，花園側邊欄「突變管理」按鈕未同步更新顯示（仍顯示為「否」）的視覺 Bug。現在狀態恢復時會強制刷新該按鈕。
v9.1.3.1 UI Event Fix (2026):
  - [UI Fix] Garden Protection: 修復花園側邊欄嵌入式「開/鎖」按鈕點擊無反應的問題，改為直接調用核心邏輯 (Direct Call)，不再依賴大面板事件傳遞。
v9.1.3 Safe Restart Protocol (2026):
  - [Security] Core: 實作安全重啟協議，系統忙碌 (Godzamok/Combat) 時自動推遲重啟，防止存檔損毀。
  - [Architecture] Logic: 導入狀態快取 (State Caching)，分離邏輯運算與 UI 渲染。
  - [Protocol] AHK: 標題前綴標準化為[✅SAFE] 或 [⛔BUSY] 供外部自動化識別。
  - [Fix] Godzamok: 修正變異恢復期 (mutationRestoreTimer) 判定，確保戒嚴期間不中斷。
v9.1.2.1 UI Crash Fix (2026):
  - [Critical Fix] UI: 變數名 `style` 衝突修復，解決 "Unexpected identifier" 導致的 UI 初始化失敗。
v9.1.2 Virtual Lock Hardening (2026):
  - [Critical Logic] Core: 升級憲法級阻斷協議，Godzamok 活躍期間同步阻斷購買邏輯 (防止 Race Condition)。
  - [Logic Fix] Godzamok: 調整 isActive 狀態宣告順序，確保在執行任何賣出或鎖定操作前即刻生效。
v9.1.1 Smart Locking Protocol (2026):
  - [Logic Fix] Godzamok: 修復 Godzamok 戰術結束後強制解除支出鎖定的問題。
  - [Feature] Godzamok: 新增智慧鎖定記憶 (Smart Locking)，現在會記憶觸發前的鎖定狀態，並在結束後準確還原，而非無腦解鎖。
*/

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // 0. 全域配置與狀態 (Configuration & State)
    // ═══════════════════════════════════════════════════════════════
    const Config = {
        // 開關狀態
        Flags: {
            GlobalMasterSwitch: GM_getValue('isGlobalMasterSwitchEnabled', true),
            Click: GM_getValue('isClickEnabled', true),
            Buy: GM_getValue('isBuyEnabled', true),
            Golden: GM_getValue('isGoldenEnabled', true),
            Spell: GM_getValue('isSpellEnabled', true),
            Garden: GM_getValue('isGardenEnabled', true),
            Research: GM_getValue('isResearchEnabled', true),
            AutoWrinkler: GM_getValue('isAutoWrinklerEnabled', true),
            Fortune: GM_getValue('isFortuneEnabled', true),
            Stock: GM_getValue('isStockEnabled', true),
            AutoBroker: GM_getValue('isAutoBrokerEnabled', true),
            SE: GM_getValue('isSEEnabled', true),
            Season: GM_getValue('isSeasonEnabled', true),
            Santa: GM_getValue('isSantaEnabled', true),
            DragonAura: GM_getValue('isDragonAuraEnabled', true),
            GardenOverlay: GM_getValue('isGardenOverlayEnabled', true),
            GardenAvoidBuff: GM_getValue('isGardenAvoidBuff', true),
            GardenMutation: GM_getValue('isGardenMutationEnabled', false),
            SyncPlanting: GM_getValue('isSyncPlantingEnabled', false),
            SavingMode: GM_getValue('isSavingModeEnabled', false),
            SavingReplant: GM_getValue('isSavingReplantEnabled', true),
            AutoPledge: GM_getValue('isAutoPledgeEnabled', true),
            ShowCountdown: GM_getValue('showCountdown', true),
            ShowBuffMonitor: GM_getValue('showBuffMonitor', true),
            ShowGardenProtection: GM_getValue('showGardenProtection', true),
            SpendingLocked: GM_getValue('spendingLocked', false),
            GodzamokCombo: GM_getValue('isGodzamokComboEnabled', false),
            ShowGardenGrid: GM_getValue('isShowGardenGrid', false),
            EditorIncludeMutations: GM_getValue('isEditorIncludeMutations', false),
            ForceSoilEnabled: GM_getValue('isForceSoilEnabled', false),
            AutoLoan: GM_getValue('isAutoLoanEnabled', false),
            ShowLayoutName: GM_getValue('isShowLayoutName', false),
            SniperMode: GM_getValue('isSniperModeEnabled', false),
            PreRestartRecovery: GM_getValue('isPreRestartRecoveryEnabled', false),
            ShowMagicMonitor: GM_getValue('showMagicMonitor', false),
            // [v9.3.0 UI Update]
            AutoRestart: GM_getValue('isAutoRestartEnabled', true)
        },
        // 參數
        Settings: {
            Volume: GM_getValue('gameVolume', 50),
            ClickInterval: GM_getValue('clickInterval', 10),
            BuyStrategy: GM_getValue('buyStrategy', 'smart'),
            BuyIntervalMs: (GM_getValue('buyIntervalHours', 0) * 3600 + GM_getValue('buyIntervalMinutes', 0) * 60 + GM_getValue('buyIntervalSeconds', 10)) * 1000,
            RestartIntervalMs: (GM_getValue('restartIntervalHours', 1) * 3600 + GM_getValue('restartIntervalMinutes', 0) * 60 + GM_getValue('restartIntervalSeconds', 0)) * 1000,
            RestartDelayOnBusy: 30000,
            MaxWizardTowers: 800,
            SugarLumpGoal: 100,
            BuildingLimit: GM_getValue('buildingLimit', {}),
            SpellCooldownSuccess: 60000,
            SpellCooldownFail: 60000,
            GardenBufferTime: 5000,
            GodzamokMinMult: GM_getValue('godzamokMinMult', 1000),
            GodzamokSellAmount: GM_getValue('godzamokSellAmount', 100),
            GodzamokTargetBuilding: GM_getValue('godzamokTargetBuilding', 'Farm'),
            GodzamokCooldown: 15000,
            GodzamokBuyBackTime: 11000,
            GodzamokBuyback: GM_getValue('godzamokBuyback', 400),
            GodzamokHotkey: GM_getValue('godzamokHotkey', '^+F9'),
            GodzamokBuyHotkey: GM_getValue('godzamokBuyHotkey', 'F10'),
            GodzamokRestockAmount: GM_getValue('godzamokRestockAmount', 100),
            ForceMutationHotkey: GM_getValue('forceMutationHotkey', 'F4'),
            ForceSoilID: GM_getValue('forceSoilID', 1),
            AutoLoanThreshold: GM_getValue('autoLoanThreshold', 300000),
            LoanHotkey: GM_getValue('loanHotkey', 'F2'),
            SniperFontSize: GM_getValue('sniperFontSize', 22),
            
            // [v9.3.0] Pre-Restart Recovery Time (Min/Sec)
            RecoveryMin: GM_getValue('recoveryMin', 5),
            RecoverySec: GM_getValue('recoverySec', 0),

            // [v9.3.0] HUD Colors Customization (Hex)
            ColorLockActive: GM_getValue('colorLockActive', '#d32f2f'),
            ColorLockInactive: GM_getValue('colorLockInactive', '#388e3c'),
            ColorMutActive: GM_getValue('colorMutActive', '#9c27b0'),
            ColorMutInactive: GM_getValue('colorMutInactive', '#d84315'),
            ColorSniperActive: GM_getValue('colorSniperActive', '#f57f17'),
            ColorSniperInactive: GM_getValue('colorSniperInactive', '#d32f2f')
        },
        // 記憶
        Memory: {
            GardenProfiles: null,
            SavedGardenPlot: Array(6).fill().map(() => Array(6).fill(-1)),

            GardenSavedPlots: GM_getValue('gardenSavedPlots', ['', '', '', '', '']),
            GardenSelectedSlot: GM_getValue('gardenSelectedSlot', 0),
            GardenSlotNames: GM_getValue('gardenSlotNames',['Layout 1', 'Layout 2', 'Layout 3', 'Layout 4', 'Layout 5']),

            PanelX: GM_getValue('panelX', window.innerWidth / 2 - 200),
            PanelY: GM_getValue('panelY', 100),
            BuffX: GM_getValue('buffX', window.innerWidth - 340),
            BuffY: GM_getValue('buffY', 150),
            CountdownX: GM_getValue('countdownX', window.innerWidth - 170),
            CountdownY: GM_getValue('countdownY', 10),
            ButtonX: GM_getValue('buttonX', 50),
            ButtonY: GM_getValue('buttonY', 50),
            GardenProtectionX: GM_getValue('gardenProtectionX', 10),
            GardenProtectionY: GM_getValue('gardenProtectionY', 10),
            ActionLogX: GM_getValue('actionLogX', window.innerWidth - 420),
            ActionLogY: GM_getValue('actionLogY', window.innerHeight - 350),
            GardenGridX: GM_getValue('gardenGridX', 100),
            GardenGridY: GM_getValue('gardenGridY', 100),

            LastActiveTab: GM_getValue('lastActiveTab', 'core'),
            GardenLeftExpanded: GM_getValue('gardenLeftExpanded', false),
            GardenRightExpanded: GM_getValue('gardenRightExpanded', false),
            LogFontSize: GM_getValue('logFontSize', 12),
            LogOpacity: GM_getValue('logOpacity', 0.95),
            ActionLogHeight: GM_getValue('actionLogHeight', 250),

            SavedSpendingStates: GM_getValue('savedSpendingStates', {
                Buy: true,
                Garden: true,
                Research: true,
                Stock: true
            }),

            GardenProtectionMinimized: GM_getValue('gardenProtectionMinimized', false),
            LastBuffEndTime: GM_getValue('lastBuffEndTime', 0),
            SavingModeExpanded: GM_getValue('savingModeExpanded', false),

            // [v9.2.1] Sniper System Matrix
            SniperGrid: GM_getValue('sniperGrid', Array(6).fill().map(() => Array(6).fill(''))),
            SniperProfiles: GM_getValue('sniperProfiles', [null, null, null, null, null]),
            SniperSlotNames: GM_getValue('sniperSlotNames',['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5']),
            SniperSelectedSlot: GM_getValue('sniperSelectedSlot', 0),

            // [v9.3.0] Magic Monitor Pos
            MagicMonitorX: GM_getValue('magicMonitorX', window.innerWidth / 2 + 100),
            MagicMonitorY: GM_getValue('magicMonitorY', 200)
        }
    };

    // 運行時計時器與緩存
    const Runtime = {
        Cache: { BigCookie: null, hasRecovered: false },
        // [v9.1.3] 系統狀態快取
        SystemStatus: {
            isBusy: false // 快取狀態：是否適合重啟/存檔
        },
        // [v9.2.0/9.2.1] 花園狀態快取 (供 Sniper 系統使用)
        GardenState: {
            sniperActiveCoord: null,
            sniperModeColor: null
        },
        Timers: {
            NextBuy: 0,
            NextRestart: 0,
            NextGarden: 0,
            NextStock: 0,
            NextSeasonCheck: 0,
            NextGodzamokCombo: 0,
            GardenWarmup: 0,
            SeasonBusy: 0,
			NextFortuneCheck: 0,
            LastLoanAttempt: 0 // [v9.1.8] Loan Ranger Cooldown
        },
        Stats: {
            ClickCount: 0,
            BuyUpgradeCount: 0,
            BuyBuildingCount: 0
        },
        GodzamokState: {
            isActive: false,
            soldAmount: 0,
            originalBuyState: true,
            mutationRestoreTimer: null,
            wasMutationEnabled: false,
            lastMartialLawTime: 0,
            wasSpendingLocked: false // [v9.1.1 New] 記憶原始鎖定狀態
        },
        GodzamokTacticalState: {
            status: 'IDLE',
            lock: false,
            reloadTimer: null
        },
        DragonState: {
            isBursting: false,
            lastSwitchTime: 0,
            currentPhase: 'IDLE'
        },
        ModuleFailCount: {},
        OriginalTitle: document.title,
        SeasonState: {
            CurrentStage: 0,
            Roadmap:[
                { id: 'valentines', name: 'Valentines', target: 'Normal' },
                { id: 'christmas', name: 'Christmas', target: 'MaxSanta' },
                { id: 'easter', name: 'Easter', target: 'Normal' },
                { id: 'halloween', name: 'Halloween', target: 'Normal' }
            ],
            //[v8.9.7 Safety] Default set to TRUE to ensure "Secure by Default" behavior at startup
            isFarming: true
        },
        WarmupForceShown: false
    };

    // ═══════════════════════════════════════════════════════════════
    // Logger 模組
    // ═══════════════════════════════════════════════════════════════
    const Logger = {
        log: function(module, message) {
            const formatted = `[${module}] ${message}`;
            console.log(`ℹ️ ${formatted}`);
            if (UI.ActionLog && UI.ActionLog.append) UI.ActionLog.append(formatted, 'info');
        },
        warn: function(module, message) {
            const formatted = `[${module}] ${message}`;
            console.warn(`⚠️ ${formatted}`);
            if (UI.ActionLog && UI.ActionLog.append) UI.ActionLog.append(formatted, 'warn');
        },
        error: function(module, message, error) {
            const formatted = `[${module}] ${message}`;
            console.error(`❌ ${formatted}`, error || '');
            if (UI.ActionLog && UI.ActionLog.append) UI.ActionLog.append(formatted, 'error');
            if (typeof Game !== 'undefined' && Game.Notify) {
                Game.Notify('腳本錯誤', `${module}: ${message}`, [10, 6], 10);
            }
        },
        success: function(module, message) {
            const formatted = `[${module}] ${message}`;
            console.log(`%c✅ ${formatted}`, 'color: #4caf50; font-weight: bold;');
            if (UI.ActionLog && UI.ActionLog.append) UI.ActionLog.append(formatted, 'success');
        },
        critical: function(module, message) {
            const formatted = `[${module}] ⚠️ CRITICAL: ${message}`;
            console.error(`%c❌ ${formatted}`, 'color: #ff0000; font-weight: bold; background: #000; padding: 2px 5px;');
            if (UI.ActionLog && UI.ActionLog.append) UI.ActionLog.append(formatted, 'error');
            if (typeof Game !== 'undefined' && Game.Notify) {
                Game.Notify('功能已停用', `${module}: ${message}`, [10, 6], 10);
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // 1. UI 模組 (v9.1.5 Full Expanded)
    // ═══════════════════════════════════════════════════════════════
    const UI = {
        Elements: {
            Panel: null,
            FloatingBtn: null,
            Countdown: null,
            BuffMonitor: null
        },
        _lastBuffSnapshot: null,

        getLocalizedPlantName: function(gridId) {
            if (!gridId || gridId === 0) return '';
            const plantId = gridId - 1;
            if (typeof Game === 'undefined' || !Game.Objects['Farm'].minigame) return '';
            const plant = Game.Objects['Farm'].minigame.plantsById[plantId];
            return plant ? plant.name : '';
        },

			updateAllLayoutSelectors: function() {
            const selectors = [$('#gardenLayoutSelect'), $('#gardenLayoutSelectGrid')];
            const groupSelector = $('#gardenGroupSelect');

            const profiles = Config.Memory.GardenProfiles;
            if (!profiles) return; // Safety

            const activeGroup = profiles.activeGroup;
            const group = profiles.groups[activeGroup];
            const plots = group.slots;
            const names = group.slotNames;
            const selected = Config.Memory.GardenSelectedSlot;

            // Update Group Select
            if (groupSelector.length) {
                groupSelector.empty();
                profiles.groups.forEach((g, idx) => {
                    const opt = $('<option>').val(idx).text(g.name);
                    if (idx === activeGroup) opt.prop('selected', true);
                    groupSelector.append(opt);
                });
            }

            // Update Layout Selectors
            selectors.forEach(sel => {
                if(sel.length) {
                    sel.empty();
                    // 迭代當前群組的所有 Slot
                    for(let i=0; i<plots.length; i++) {
                        let isEmpty = true;
                        try {
                            if (plots[i] && plots[i] !== '[]' && plots[i] !== '') {
                                const parsed = JSON.parse(plots[i]);
                                if (parsed.length > 0) isEmpty = false;
                            }
                        } catch(e) {}

                        let displayText = names[i];
                        if(isEmpty) displayText += ' (Empty)';
                        const opt = $('<option>').val(i).text(displayText);
                        if(i === selected) opt.prop('selected', true);
                        sel.append(opt);
                    }
                }
            });

            //[v9.1.9] Hook: 立即同步側邊欄 HUD 的陣型名稱
            if (UI.GardenProtection && UI.GardenProtection.updateLayoutNameDisplay) {
                UI.GardenProtection.updateLayoutNameDisplay();
            }
        },

			initStyles: function() {
            const styleEl = document.createElement('style');
            styleEl.type = 'text/css';
            styleEl.innerHTML = `
                /* Ghost Element Fix */
                b[style*="font-weight:bold"] { display: none !important; }
                #gardenField { overflow: visible !important; }

                /*[v9.1.6] 花園面板降噪樣式 */
                .cc-garden-panel-standard {
                    background-color: #f5f7fa !important;
                    color: #333 !important;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 15px;
                }
                .cc-garden-panel-standard label {
                    color: #333 !important;
                    font-weight: bold !important;
                }
                .cc-garden-panel-standard input[type="text"], .cc-garden-panel-standard select {
                    background: #fff !important;
                    color: #000 !important;
                    border: 1px solid #ccc !important;
                }

                /*[v9.1.4] JQB 專屬樣式：琥珀金 */
                .cc-overlay-jqb {
                    border: 3px solid #FFBB00 !important;
                    box-shadow: 0 0 15px #FFBB00, inset 0 0 10px #FFBB00 !important;
                    box-sizing: border-box;
                    z-index: 15;
                }

                .cc-overlay-missing { border: 3px dashed #2196f3 !important; box-sizing: border-box; background: rgba(33, 150, 243, 0.1); }
                .cc-overlay-anomaly { border: 3px solid #ff4444 !important; box-shadow: inset 0 0 15px rgba(255, 0, 0, 0.6) !important; box-sizing: border-box; z-index: 10; }
                .cc-overlay-new { border: 3px solid #9c27b0 !important; box-shadow: inset 0 0 15px rgba(156, 39, 176, 0.8), 0 0 10px rgba(156, 39, 176, 0.5) !important; box-sizing: border-box; z-index: 12; }
                .cc-overlay-correct { border: 1px solid rgba(76, 175, 80, 0.4) !important; box-sizing: border-box; }
                .cc-close-btn { position:absolute; top:5px; right:5px; cursor:pointer; color:#aaa; font-weight:bold; padding:2px 6px; z-index:100; font-family:sans-serif; }
                .cc-close-btn:hover { color:white; background:rgba(255,255,255,0.2); border-radius:4px; }
                .cc-tab-header { display: flex; border-bottom: 2px solid #ddd; background: #f5f7fa; white-space: nowrap; overflow-x: auto; overflow-y: hidden; }
                .cc-tab-btn { flex: 1 0 auto; padding: 12px 5px; border: none; background: transparent; cursor: pointer; font-weight: bold; color: #555; transition: all 0.2s; font-size: 14px; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
                .cc-tab-btn:hover { background: rgba(0,0,0,0.05); color: #333; }
                .cc-tab-btn.active { border-bottom: 3px solid #667eea; color: #667eea; background: #fff; }
                .cc-tab-pane { display: none; padding: 15px; animation: fadeIn 0.2s; }
                .cc-tab-pane.active { display: block; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .cc-log-controls { display: flex; gap: 10px; padding: 5px 10px; background: rgba(0,0,0,0.3); border-bottom: 1px solid #444; font-size: 12px; align-items: center; }
                .cc-range-mini { width: 60px; height: 4px; }
                .cc-embed-container { position: absolute; top: 10px; right: 10px; display: flex; gap: 8px; z-index: 100; }
                .cc-embed-btn-main { width: 32px; height: 32px; border-radius: 50%; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid #555; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
                .cc-embed-btn-main:hover { transform: scale(1.1); }
                .cc-garden-row { display: flex; align-items: flex-start; justify-content: center; }
                .cc-drawer { width: 0px; opacity: 0; overflow: hidden; transition: width 0.3s ease, opacity 0.2s ease; background: rgba(0,0,0,0.3); border-radius: 6px; }
                .cc-drawer.open { width: 220px; opacity: 1; margin: 0 5px; border: 1px solid #555; }

                /*[Hotfix] 將 320px 放寬為 380px 以容納 7x7 網格，讓抽屜順利外推 */
                .cc-center-stage { width: 380px !important; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; z-index: 10; }

                .cc-garden-side ul { list-style: none; padding: 0; margin: 0; }
                .cc-garden-side ul li { padding: 5px 8px; border-bottom: 1px solid #333; transition: background 0.2s; font-size: 13px; }
                .cc-garden-side ul li:hover { background: rgba(255, 255, 255, 0.1); }

                #cc-embed-right {
                    position: absolute; top: 0; right: 0; height: 100%; display: flex; flex-direction: column; justify-content: flex-start; gap: 8px; z-index: 1000; pointer-events: none; padding-top: 4px; padding-right: 2px;
                }
                .cc-embed-btn { pointer-events: auto; width: 32px; height: 32px; background: rgba(0, 0, 0, 0.8); border: 2px solid #81c784; border-radius: 50%; color: white; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.5); }
                .cc-embed-btn:hover { background: rgba(129, 199, 132, 0.9); transform: scale(1.1); box-shadow: 0 0 10px rgba(129, 199, 132, 0.8); }
                .cc-embed-btn:active { transform: scale(0.95); }

                .cc-grid-tile { cursor: default; }
                .cc-dashboard-correct { border: 2px solid #4caf50 !important; }
                .cc-dashboard-weed { border: 2px solid #f44336 !important; }
                .cc-dashboard-new { border: 2px solid #9c27b0 !important; }
                .cc-dashboard-missing { border: 2px solid #2196f3 !important; }
                .cc-dashboard-locked { border: 2px dashed #9e9e9e !important; opacity: 0.7; }
                #cc-tooltip { display: none; position: absolute; background: rgba(0, 0, 0, 0.95); color: white; padding: 12px 15px; border-radius: 8px; border: 1px solid #81c784; font-family: Arial, sans-serif; font-size: 13px; z-index: 2147483647 !important; pointer-events: none; box-shadow: 0 6px 20px rgba(0,0,0,0.7); max-width: 250px; line-height: 1.5; backdrop-filter: blur(3px); }
                #cc-tooltip .tooltip-name { font-weight: bold; color: #81c784; margin-bottom: 8px; font-size: 15px; border-bottom: 1px solid rgba(129, 199, 132, 0.3); padding-bottom: 4px; }
                #cc-tooltip .tooltip-price { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                #cc-tooltip .tooltip-status { font-size: 12px; color: #ccc; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); }
                .price-affordable { color: #4caf50; font-weight: bold; }
                .price-unaffordable { color: #ff5252; font-weight: bold; }
                .status-correct { color: #4caf50; }
                .status-anomaly { color: #9c27b0; }
                .status-missing { color: #2196f3; }
                .status-locked { color: #777; }
                .status-weed { color: #f44336; }
                .status-new { color: #9c27b0; }
                .cc-warmup-shield { animation: warmupPulse 1.5s infinite alternate; }
                @keyframes warmupPulse { 0% { background-color: #ffeb3b; box-shadow: 0 0 10px rgba(255, 235, 59, 0.7); } 100% { background-color: #ff9800; box-shadow: 0 0 15px rgba(255, 152, 0, 0.9); } }
                .cc-garden-list-scroll { max-height: 280px; overflow-y: auto; transition: max-height 0.3s ease; scrollbar-width: thin; scrollbar-color: #555 #222; }
                .cc-garden-list-scroll::-webkit-scrollbar { width: 6px; }
                .cc-garden-list-scroll::-webkit-scrollbar-track { background: #222; }
                .cc-garden-list-scroll::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }
                .cc-garden-list-expanded { max-height: 600px !important; }
                .cc-list-expand-btn { font-size: 10px; padding: 1px 6px; cursor: pointer; background: #444; border: 1px solid #666; color: #ccc; border-radius: 3px; margin-left: 5px; vertical-align: middle; }
                .cc-list-expand-btn:hover { background: #666; color: white; }
                /* Traffic Light */
                #gambler-traffic-light {
                    transition: background 0.3s, opacity 0.5s;
                    box-shadow: 0 0 30px rgba(0,0,0,0.5);
                }
                /* Blueprint Editor */
                .cc-grid-input { width: 100%; height: 100%; text-align: center; border: none; background: #333; color: #fff; font-weight: bold; font-size: 14px; padding: 0; margin: 0; outline: none; }
                .cc-grid-input:focus { background: #444; box-shadow: inset 0 0 5px #000; }
                .cc-grid-input:disabled { background: repeating-linear-gradient(45deg, #111, #111 10px, #222 10px, #222 20px); color: #555; cursor: not-allowed; }

                /* [v8.9.7 New] Mutation Input Style */
                .cc-input-mutation { color: #d500f9 !important; font-weight: bold; }
            `;
            document.head.appendChild(styleEl);
        },

        formatMs: function(ms) {
            if (ms < 0) return '00:00';
            const totalSecs = Math.floor(ms / 1000);
            const h = Math.floor(totalSecs / 3600);
            const m = Math.floor((totalSecs % 3600) / 60);
            const s = totalSecs % 60;
            const pad = (n) => n < 10 ? '0' + n : n;
            return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
        },

        cleanName: function(str) {
            if (!str) return '';
            if (typeof str !== 'string') return String(str);
            return str.replace(/<[^>]*>/g, '').trim();
        },

        createFloatingButton: function() {
            if (this.Elements.FloatingBtn) return;
            this.Elements.FloatingBtn = $(`
                <div id="cookie-floating-button" style="
                    position: fixed; left: ${Config.Memory.ButtonX}px; top: ${Config.Memory.ButtonY}px; width: 50px; height: 50px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 999999;
                    font-size: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: filter 0.3s, background 0.3s;
                ">🍪</div>
            `);

            this.Elements.FloatingBtn.click((e) => { e.stopPropagation(); this.togglePanel(); });

            let isD = false;
            this.Elements.FloatingBtn.mousedown(() => isD = true);
            $(document).mousemove((e) => {
                if(isD) {
                    Config.Memory.ButtonX = e.clientX - 25;
                    Config.Memory.ButtonY = e.clientY - 25;
                    this.Elements.FloatingBtn.css({left: Config.Memory.ButtonX, top: Config.Memory.ButtonY});
                }
            }).mouseup(() => {
                if(isD) { isD = false; GM_setValue('buttonX', Config.Memory.ButtonX); GM_setValue('buttonY', Config.Memory.ButtonY); }
            });
            $('body').append(this.Elements.FloatingBtn);
            this.updateButtonState();
        },

        updateButtonState: function() {
            if (this.Elements.FloatingBtn) {
                if (Config.Flags.GlobalMasterSwitch) {
                    this.Elements.FloatingBtn.css({
                        'filter': Config.Flags.Click ? 'hue-rotate(0deg)' : 'grayscale(100%)',
                        'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }).html('🍪');
                } else {
                    this.Elements.FloatingBtn.css({ 'filter': 'none', 'background': '#f44336' }).html('⏸️');
                }
            }
        },

        // ✅ UI Implementation: Main HUD Update (v8.8.2)
        createRightControls: function() {
            if ($('#cc-embedded-controls').length) return;
            const target = $('#buildingsMaster');
            if (target.length === 0) return;

            // [v8.9.8.1] Initialize Remote Controls
            this.createRemoteControls();

            // Updated Order: [🎰] [空] [🔒][💰]
            const controls = $(`
                <div id="cc-embedded-controls" class="cc-embed-container">
                    <div id="btn-gambler-spin" class="cc-embed-btn-main" title="魔法賭徒: Spin!">🎰</div>
                    <div style="width: 12px;"></div>
                    <div id="btn-embed-lock" class="cc-embed-btn-main">🔒</div>
                    <div id="btn-embed-saving-mode" class="cc-embed-btn-main">💰</div>
                </div>
            `);

            target.append(controls);

            // Bind Gambler
            $('#btn-gambler-spin').on('click', function() {
                Logic.Gambler.spin();
            });

            $('#btn-embed-lock').on('click', function() {
                const newState = !Config.Flags.SpendingLocked;
                UI.GardenProtection.toggle(newState);
                UI.updateEmbeddedState();
                if (UI.GardenProtection && UI.GardenProtection.updateEmbeddedState) {
                    UI.GardenProtection.updateEmbeddedState();
                }
                $('#chk-spending-lock').prop('checked', newState);
            });

            $('#btn-embed-saving-mode').on('click', function() {
                const newState = !Config.Flags.SavingMode;
                Config.Flags.SavingMode = newState;
                GM_setValue('isSavingModeEnabled', newState);
                $('#chk-saving-mode').prop('checked', newState);
                UI.updateEmbeddedState();
                if (newState) Logger.log('Core', '已啟用存錢模式 (暫停購買)');
                else Logger.log('Core', '已停用存錢模式');
            });

            this.updateEmbeddedState();
        },

        createRemoteControls: function() {
            // [v8.9.8.1] Remote Toggle Implementation
            if ($('#btn-remote-dragon').length > 0) return;
            const target = $('#buildingsMaster');
            if (target.length === 0) return;

            // Helper for styles
            const commonStyle = {
                position: 'absolute',
                top: '10px',
                width: '32px',
                height: '32px',
                lineHeight: '32px',
                textAlign: 'center',
                cursor: 'pointer',
                zIndex: 10000,
                pointerEvents: 'auto',
                fontSize: '20px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '4px',
                border: '1px solid #555'
            };

            const btnDragon = $('<div id="btn-remote-dragon" title="切換龍族面板">🐲</div>').css({
                ...commonStyle,
                left: '90px'
            });

            const btnSanta = $('<div id="btn-remote-santa" title="切換聖誕老人面板">🎅</div>').css({
                ...commonStyle,
                left: '130px'
            });

            btnDragon.click((e) => {
                e.stopPropagation();
                const popup = document.getElementById('specialPopup');
                if (Game.specialTab === 'dragon' && popup && popup.classList.contains('onScreen')) {
                    Game.ToggleSpecialMenu(0);
                } else {
                    Game.specialTab = 'dragon';
                    Game.ToggleSpecialMenu(1);
                }
            });

            btnSanta.click((e) => {
                e.stopPropagation();
                const popup = document.getElementById('specialPopup');
                if (Game.specialTab === 'santa' && popup && popup.classList.contains('onScreen')) {
                    Game.ToggleSpecialMenu(0);
                } else {
                    Game.specialTab = 'santa';
                    Game.ToggleSpecialMenu(1);
                }
            });

            target.append(btnDragon).append(btnSanta);
        },

        // ✅ UI Implementation: Grimoire HUD (v8.8.2)
        createGrimoireControls: function() {
            const bar = $('#grimoireBar');
            if (bar.length > 0 && $('#btn-grimoire-spin').length === 0) {
                // 強制樣式：插入按鈕前，必須執行 overflow: visible
                bar.css('overflow', 'visible');

                const btn = $('<div id="btn-grimoire-spin">🎰</div>').css({
                    'position': 'absolute',
                    'top': '18px',       // 現場校準數值
                    'left': '-30px',     // 現場校準數值
                    'right': 'auto',     // 清除衝突
                    'width': '24px',
                    'height': '24px',
                    'fontSize': '18px',
                    'lineHeight': '24px',
                    'textAlign': 'center',
                    'cursor': 'pointer',
                    'zIndex': '1000'
                });

                btn.click((e) => {
                    e.stopPropagation();
                    Logic.Gambler.spin();
                });

                bar.append(btn);
            }
        },

        createStockControls: function() {
            // [Self-Healing] 檢查按鈕是否已存在，若存在則跳過
            if ($('#btn-stock-liquidate').length > 0) return;

            // 檢查目標容器 (股市標題列)
            const target = $('#bankHeader');
            if (target.length === 0) return;

            // 確保父容器有定位基準
            if (target.css('position') === 'static') target.css('position', 'relative');

            // 創建按鈕
            const btn = $('<div id="btn-stock-liquidate" title="一鍵清倉: 賣出所有持股">📉</div>').css({
                position: 'absolute',
                top: '0px',
                right: '50px', // 避開原生靜音按鈕
                width: '24px',
                height: '24px',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                transition: 'all 0.2s'
            });

            // 綁定事件
            btn.hover(
                function() { $(this).css('background', 'rgba(255, 0, 0, 0.4)'); },
                function() { $(this).css('background', 'rgba(0, 0, 0, 0.2)'); }
            );

            btn.click((e) => {
                e.stopPropagation();
                if (confirm('⚠️ 確定要賣出所有股票進行清倉嗎？')) {
                    Logic.Stock.liquidate();
                }
            });

            target.append(btn);
        },

        // ✅ UI Implementation: Tactical Button (v8.8.5)
        createTacticalButton: function() {
            if ($('#btn-tactical-nuke').length > 0) return;
            const master = $('#buildingsMaster');
            if (master.length === 0) return;

            if (master.css('position') === 'static') {
                master.css('position', 'relative');
            }

            const btn = $('<div id="btn-tactical-nuke" title="戰術核彈: 啟動 Godzamok 全賣戰術">☢️</div>').css({
                position: 'absolute',
                // [Fix 3] 樣式微調 top 0px -> 10px
                top: '10px',
                left: '50px',
                width: '32px',
                height: '32px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid #ff0000',
                borderRadius: '4px',
                color: 'red',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1000,
                transition: 'all 0.2s'
            });

            btn.click((e) => {
                e.stopPropagation();
                Logic.GodzamokTactical.fire();
            });

            master.append(btn);
        },

        updateTacticalButton: function(state) {
            const btn = $('#btn-tactical-nuke');
            if (state === 'ACTIVE') {
                btn.css({
                    background: 'rgba(255, 0, 0, 0.3)',
                    boxShadow: '0 0 10px red',
                    color: '#fff'
                });
            } else {
                btn.css({
                    background: 'rgba(0, 0, 0, 0.5)',
                    boxShadow: 'none',
                    color: 'red'
                });
            }
        },

        // ✅ UI Implementation: Traffic Light (v8.8.3 Refactor)
        createTrafficLight: function() {
            if ($('#gambler-traffic-light').length === 0) {
                // Modified: Mount to body, set fixed style
                const light = $('<div id="gambler-traffic-light"></div>').css({
                    'position': 'fixed',
                    'width': '60px',
                    'height': '60px',
                    'borderRadius': '50%',
                    'zIndex': '100000',
                    'pointerEvents': 'none', // 滑鼠穿透
                    'display': 'none',
                    'background': '#000',
                    'opacity': '0'
                });
                $('body').append(light);
            }
        },

        updateEmbeddedState: function() {
            const lockBtn = $('#btn-embed-lock');
            const saveBtn = $('#btn-embed-saving-mode');

            if (lockBtn.length) {
                if (Config.Flags.SpendingLocked) {
                    lockBtn.css({ opacity: 1, filter: 'none', borderColor: '#ffcdd2', background: '#d32f2f' });
                    lockBtn.attr('title', '🔒 資金已鎖定 (點擊解除)');
                } else {
                    lockBtn.css({ opacity: 0.4, filter: 'grayscale(100%)', borderColor: '#555', background: '#000' });
                    lockBtn.attr('title', '🔓 資金未鎖定 (點擊鎖定)');
                }
            }

            if (saveBtn.length) {
                if (Config.Flags.SavingMode) {
                    saveBtn.css({ opacity: 1, filter: 'none', borderColor: '#80cbc4', background: '#00695c' });
                    saveBtn.attr('title', '💰 存錢模式已啟用 (點擊停用)');
                } else {
                    saveBtn.css({ opacity: 0.4, filter: 'grayscale(100%)', borderColor: '#555', background: '#000' });
                    saveBtn.attr('title', '💸 存錢模式已停用 (點擊啟用)');
                }
            }
        },

createControlPanel: function() {
            if (this.Elements.Panel) return;
            const generateOptions = (min, max, sel, unit) => {
                let h=''; for(let i=min; i<=max; i++) h+=`<option value="${i}" ${i === sel?'selected':''}>${i}${unit}</option>`; return h;
            };
            const buyMin = Math.floor(Config.Settings.BuyIntervalMs / 60000);
            const buySec = (Config.Settings.BuyIntervalMs % 60000) / 1000;
            const rstHr = Math.floor(Config.Settings.RestartIntervalMs / 3600000);
            const rstMin = (Config.Settings.RestartIntervalMs % 3600000) / 60000;

            const savingModeDisplay = Config.Memory.SavingModeExpanded ? 'block' : 'none';
            const savingModeIcon = Config.Memory.SavingModeExpanded ? '▲' : '▼';

            this.Elements.Panel = $(`
                <div id="cookie-control-panel" style="
                    position: fixed; left: ${Config.Memory.PanelX}px; top: ${Config.Memory.PanelY}px; width: 420px;
                    max-height: 85vh; background: #fff; border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.4); z-index: 999998;
                    font-family: Arial, sans-serif; display: none; overflow: hidden; color: #333;
                ">
                    <div id="panel-header" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white; padding: 15px; font-weight: bold; font-size: 18px;
                        cursor: move; display: flex; justify-content: space-between; align-items: center;
                    ">
                        <span>🍪 控制面板 v9.3.0 Arcane Vanguard</span>
                        <div class="cc-close-btn" id="main-panel-close">✕</div>
                    </div>
                    <div id="global-status-bar" style="
                        padding: 10px 15px; background: #4caf50; color: white; font-weight: bold;
                        font-size: 14px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;
                    ">
                        <span id="status-icon">🟢</span>
                        <span id="status-text">系統運行中</span>
                        <button id="btn-toggle-master" style="
                            padding: 4px 12px; background: rgba(255, 255, 255, 0.2); color: white;
                            border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 4px; cursor: pointer; font-size: 12px;
                        ">暫停 (F8)</button>
                    </div>

                    <div class="cc-tab-header">
                        <button class="cc-tab-btn active" data-target="core">核心</button>
                        <button class="cc-tab-btn" data-target="finance">資金</button>
                        <button class="cc-tab-btn" data-target="advanced">進階</button>
                        <button class="cc-tab-btn" data-target="garden">花園</button>
                        <button class="cc-tab-btn" data-target="settings">設定</button>
                    </div>

                    <div style="padding-bottom: 20px; overflow-y: auto; max-height: calc(85vh - 165px);">

                        <!-- Core -->
                        <div id="tab-core" class="cc-tab-pane active">
                            <div class="panel-section" style="margin-bottom:15px; padding:10px; background:#f5f7fa; border-radius:8px;">
                                <div style="font-weight:bold; color:#222; margin-bottom:10px; border-bottom:2px solid #ddd; padding-bottom:5px;">🎛️ 核心模組</div>
                                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; color:#333;">
                                    <label><input type="checkbox" id="chk-auto-click" ${Config.Flags.Click?'checked':''}> 👉 自動點擊</label>
                                    <label><input type="checkbox" id="chk-auto-buy" ${Config.Flags.Buy?'checked':''}> 🛒 自動購買</label>
                                    <label><input type="checkbox" id="chk-auto-golden" ${Config.Flags.Golden?'checked':''}> ⭐ 金餅乾/糖塊</label>
                                    <label><input type="checkbox" id="chk-auto-garden" ${Config.Flags.Garden?'checked':''}> 🌻 花園維護</label>
                                    <label><input type="checkbox" id="chk-research" ${Config.Flags.Research?'checked':''}> 🔬 自動科技研發</label>
                                    <label><input type="checkbox" id="chk-wrinkler" ${Config.Flags.AutoWrinkler?'checked':''}> 🐛 自動戳皺紋蟲</label>
                                    <label><input type="checkbox" id="chk-auto-fortune" ${Config.Flags.Fortune?'checked':''}> 🍀 自動幸運跑馬燈</label>
                                </div>
                                <div id="lump-status" style="margin-top: 10px; padding: 6px; background: rgba(0,0,0,0.05); border-radius: 4px; font-size: 12px; color: #666; border-left: 3px solid #ccc;">🍬 糖塊監控：初始化中...</div>
                            </div>
                        </div>

                        <!-- Finance -->
                        <div id="tab-finance" class="cc-tab-pane">
                            <div class="panel-section" style="margin-bottom:15px; padding:10px; background:#ffebee; border-radius:8px; border: 1px solid #ffcdd2;">
                                <div style="font-weight:bold; color:#c62828; margin-bottom:8px;">🔒 緊急停止</div>
                                <label style="display:flex; align-items:center; cursor:pointer;">
                                    <input type="checkbox" id="chk-finance-lock" ${Config.Flags.SpendingLocked?'checked':''}>
                                    <span style="font-weight:bold; margin-left:5px;">立即停止所有支出</span>
                                </label>
                                <div style="font-size:11px; color:#d32f2f; margin-top:4px; margin-left:20px;">
                                    包含：購買、科技、花園、股市
                                </div>
                            </div>

                            <div class="panel-section" style="margin-bottom:15px; padding:10px; background:#e1bee7; border-radius:8px; border: 1px solid #ba68c8;">
                                <div style="font-weight:bold; color:#6a1b9a; margin-bottom:5px;">🛡️ 誓約防護 (Elder Pledge)</div>
                                <label style="display:flex; align-items:center; cursor:pointer;">
                                    <input type="checkbox" id="chk-auto-pledge" ${Config.Flags.AutoPledge?'checked':''}>
                                    <span style="font-weight:bold; margin-left:5px;">🔄 自動購買長者誓約</span>
                                </label>
                                <div style="font-size:11px; color:#4a148c; margin-top:4px; margin-left:20px;">
                                    最高優先級：無視任何鎖定或存錢模式，強制購買以保護 CpS。
                                </div>
                            </div>

                            <div class="panel-section" style="margin-bottom:15px; padding:10px; background:#fff3e0; border-radius:8px;">
                                <div style="font-weight:bold; color:#e65100; margin-bottom:5px;">🛒 購買策略</div>
                                <select id="buy-strategy" style="width:100%; padding:5px;">
                                    <option value="expensive" ${Config.Settings.BuyStrategy==='expensive'?'selected':''}>最貴優先</option>
                                    <option value="cheapest" ${Config.Settings.BuyStrategy==='cheapest'?'selected':''}>最便宜優先</option>
                                    <!-- [v8.9.4] 新增智慧回本策略 -->
                                    <option value="smart" ${Config.Settings.BuyStrategy==='smart'?'selected':''}>智慧回本 (CPP)</option>
                                </select>
                                 <div style="display:flex; gap:5px; align-items:center; margin-top:5px; color:#333;">
                                     <span style="font-size:13px;">間隔:</span>
                                     <select id="buy-min">${generateOptions(0, 59, buyMin, '分')}</select>
                                     <select id="buy-sec">${generateOptions(0, 59, buySec, '秒')}</select>
                                </div>
                            </div>

                            <div class="panel-section" style="margin-bottom:15px; padding:10px; background:#e0f2f1; border-radius:8px;">
                                <div id="header-saving-mode" style="cursor:pointer; font-weight:bold; color:#00695c; display:flex; justify-content:space-between;">
                                    <span>💰 存錢模式 (Saving Mode)</span>
                                    <span id="icon-saving-mode">${savingModeIcon}</span>
                                </div>
                                <div id="content-saving-mode" style="display:${savingModeDisplay}; margin-top:10px;">
                                    <label style="display:block; margin-bottom:5px; font-weight:bold;">
                                        <input type="checkbox" id="chk-saving-mode" ${Config.Flags.SavingMode?'checked':''}> 啟用存錢模式
                                    </label>
                                    <div style="font-size:12px; color:#555; margin-bottom:8px;">(停止購買建築與升級，保留資金)</div>
                                    <div style="margin-left:15px; padding-left:10px; border-left:2px solid #80cbc4;">
                                        <label style="display:block; margin-bottom:5px;">
                                            <input type="checkbox" id="chk-saving-replant" ${Config.Flags.SavingReplant?'checked':''}> 🌱 花園自動補種 (藍色格子)
                                        </label>
                                        <div style="font-size:11px; color:#666; margin-top:4px;">
                                            ℹ️ 變異管理 (挖除紅/紫) 依據花園頁籤設定持續運作
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Advanced -->
                        <div id="tab-advanced" class="cc-tab-pane">
                            <div class="panel-section" style="margin-bottom:15px; padding:10px; background:#e1f5fe; border-radius:8px;">
                                <div style="font-weight:bold; color:#0277bd; margin-bottom:5px;">📈 進階掛機</div>
                                <div style="color:#333; font-size:13px; display:grid; gap:8px;">
                                    <label><input type="checkbox" id="chk-stock" ${Config.Flags.Stock?'checked':''}> 股市自動交易</label>
                                    <label style="margin-left: 20px; font-size: 12px; color: #555; display: block;">
                                        └ <input type="checkbox" id="chk-auto-broker" ${Config.Flags.AutoBroker?'checked':''}> 🕴️ 自動僱用經紀人 (降手續費)
                                    </label>
                                    <label><input type="checkbox" id="chk-se" ${Config.Flags.SE?'checked':''}> 🧙‍♂️ 閒置魔法: 憑空建築</label>
                                    <label><input type="checkbox" id="chk-spell" ${Config.Flags.Spell?'checked':''}> 🧙‍♂️ 基礎魔法連擊</label>
                                    <label><input type="checkbox" id="chk-season" ${Config.Flags.Season?'checked':''}> 🍂 季節管理</label>
                                    <label><input type="checkbox" id="chk-santa" ${Config.Flags.Santa?'checked':''}> 🎅 聖誕老人進化</label>
                                    <label><input type="checkbox" id="chk-dragon" ${Config.Flags.DragonAura?'checked':''}> 🐲 智慧巨龍光環 (Slot2)</label>
                                    <label><input type="checkbox" id="chk-magic-monitor" ${Config.Flags.ShowMagicMonitor?'checked':''}> 🔮 奧術戰術面板</label>
                                </div>
                                <div style="margin-top:10px; padding-top:10px; border-top:1px dashed #bcd; display:block;">
                                    <label style="font-weight:bold; color:#01579b;">
                                        <input type="checkbox" id="chk-godzamok" ${Config.Flags.GodzamokCombo?'checked':''}> 🐲 Godzamok 自動連擊
                                    </label>
                                    <div style="font-size:11px; color:#555; margin-left:20px; margin-top:4px;">
                                        賣出 <input type="number" id="val-godzamok-amount" value="${Config.Settings.GodzamokSellAmount}" style="width:40px;"> 座
                                        <select id="val-godzamok-target" style="width:80px; padding:2px; border-radius:4px; border:1px solid #ccc;">
                                            <option value="Farm" ${Config.Settings.GodzamokTargetBuilding==='Farm'?'selected':''}>Farm (農場)</option>
                                            <option value="Mine" ${Config.Settings.GodzamokTargetBuilding==='Mine'?'selected':''}>Mine (礦坑)</option>
                                            <option value="Factory" ${Config.Settings.GodzamokTargetBuilding==='Factory'?'selected':''}>Factory (工廠)</option>
                                        </select>
                                        (倍率 > <input type="number" id="val-godzamok-min" value="${Config.Settings.GodzamokMinMult}" style="width:50px;">x)
                                    </div>
                                    <div style="font-size:11px; color:#555; margin-left:20px; margin-top:6px; padding-top:6px; border-top:1px dotted #ccc;">
                                        <span style="font-weight:bold; color:#d84315;">☢️ 戰術核彈設定:</span><br>
                                        買回數量: <input type="number" id="val-godzamok-buyback" value="${Config.Settings.GodzamokBuyback}" style="width:50px;"> (-1為最大)<br>
                                        補貨數量: <input type="number" id="val-godzamok-restock" value="${Config.Settings.GodzamokRestockAmount}" style="width:50px; margin-bottom:4px;"><br>
                                        觸發熱鍵: <input type="text" id="val-godzamok-hotkey" value="${Config.Settings.GodzamokHotkey}" style="width:60px;"> (修飾鍵: ^Ctrl, +Shift, !Alt, #Win)<br>
                                        補貨熱鍵: <input type="text" id="val-godzamok-buy-hotkey" value="${Config.Settings.GodzamokBuyHotkey}" style="width:60px;"> (預設 F10)
                                    </div>
                                </div>
                                <!-- [v9.1.9] Loan Ranger UI Updated -->
                                <div class="cc-garden-panel-standard" style="margin-top:10px; border: 1px solid #90caf9; background: #e3f2fd !important;">
                                    <div style="font-weight:bold; color:#1565c0; margin-bottom:8px; border-bottom:1px solid #90caf9; padding-bottom:5px; display:flex; justify-content:space-between; align-items:center;">
                                        <span>🏦 銀行貸款自動化</span>
                                        <button id="btn-reset-loan" style="font-size:10px; padding:2px 6px; cursor:pointer; background:#1565c0; color:white; border:none; border-radius:3px; height: 20px; line-height: 18px;">↻ 重置冷卻</button>
                                    </div>
                                    <div style="display:flex; align-items:center; margin-bottom:5px; justify-content:space-between;">
                                        <label style="display:flex; align-items:center;">
                                            <input type="checkbox" id="chk-auto-loan" ${Config.Flags.AutoLoan?'checked':''}> 啟用自動貸款
                                        </label>
                                        <div style="font-size:11px;">
                                            熱鍵: <input type="text" id="val-loan-hotkey" value="${Config.Settings.LoanHotkey}" style="width:40px; text-align:center;" title="觸發熱鍵 (預設 F2)">
                                        </div>
                                    </div>
                                    <div style="font-size:11px; color:#555; margin-left:20px;">
                                        觸發門檻 (倍率 >): <input type="number" id="val-loan-threshold" value="${Config.Settings.AutoLoanThreshold}" style="width:80px;">x
                                    </div>
                                    <div style="font-size:10px; color:#1565c0; margin-top:5px; margin-left:20px;">
                                        ⚠️ 成功後冷卻 40m (防F5)，失敗休眠 20s
                                    </div>
                                </div>
                                <!-- Building Limit (Moved from Finance to Advanced) -->
                                <div class="panel-section" style="margin-top:10px; padding-top:10px; border-top:1px dashed #bcd;">
                                    <div style="font-weight:bold; color:#ff9800; margin-bottom:5px;">🏗️ 建築數量上限管理</div>
                                    <div style="display:flex; gap:5px; align-items:center;">
                                        <select id="bl-select" style="flex:2; padding:4px; color:#000;"></select>
                                        <input type="number" id="bl-input" value="-1" style="width:60px; padding:4px; color:#000;">
                                        <span style="font-size:12px; color:#555;">(-1 = 無限)</span>
                                    </div>
                                    <div id="bl-status" style="font-size:11px; color:#555; margin-top:4px;">
                                        目前設定：讀取中...
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Garden -->
                        <div id="tab-garden" class="cc-tab-pane">
                            <div class="cc-garden-panel-standard">
                                <div style="font-weight:bold; color:#1b5e20; margin-bottom:8px; border-bottom:1px solid #ccc; padding-bottom:5px;">🌻 花園自動化控制</div>

                                <label style="display:block; margin-bottom:8px;">
                                    <input type="checkbox" id="chk-show-garden-protection" ${Config.Flags.ShowGardenProtection?'checked':''}> 於花園顯示保護介面
                                </label>

                                <div style="margin-bottom: 12px; padding-left: 20px;">
                                    <button id="btn-reset-ui-pos" style="font-size:11px; padding:2px 6px; cursor:pointer; background:#f44336; color:white; border:none; border-radius:3px;">🔄 重置面板位置</button>
                                </div>

                                <!--[v9.1.9] Sidebar Name Sync -->
                                <label style="display:block; margin-bottom:8px;">
                                    <input type="checkbox" class="chk-sync-layout-name" ${Config.Flags.ShowLayoutName?'checked':''}> 於側邊欄顯示陣型名稱
                                </label>

                                <label style="display:block; margin-bottom:8px;">
                                    <input type="checkbox" id="chk-garden-overlay" ${Config.Flags.GardenOverlay?'checked':''}> 顯示陣型輔助網格
                                </label>

                                <div style="display:flex; align-items:center; margin-bottom:8px; gap:5px;">
                                    <label style="display:flex; align-items:center;">
                                        <input type="checkbox" id="chk-garden-mutation" ${Config.Flags.GardenMutation?'checked':''}> 啟用自動突變管理
                                    </label>
                                    <input type="text" id="val-force-mutation-hotkey" value="${Config.Settings.ForceMutationHotkey}"
                                    style="width:40px; font-size:11px; text-align:center;" title="觸發熱鍵 (預設 F4)">
                                </div>

                                <div style="display:flex; align-items:center; margin-bottom:12px; gap:5px; margin-left:20px; font-size:12px; color:#555;">
                                    └ <label style="display:flex; align-items:center; cursor:pointer;">
                                        <input type="checkbox" id="chk-force-soil" ${Config.Flags.ForceSoilEnabled?'checked':''}> <span style="margin-left:4px; color:#333;">觸發熱鍵時一併切換泥土至：</span>
                                    </label>
                                    <select id="val-force-soil" style="font-size:11px; padding:1px; margin-left:5px;">
                                        <option value="0" ${Config.Settings.ForceSoilID==0?'selected':''}>泥土 (Dirt)</option>
                                        <option value="1" ${Config.Settings.ForceSoilID==1?'selected':''}>肥料 (Fertilizer)</option>
                                        <option value="2" ${Config.Settings.ForceSoilID==2?'selected':''}>黏土 (Clay)</option>
                                        <option value="3" ${Config.Settings.ForceSoilID==3?'selected':''}>鵝卵石 (Pebbles)</option>
                                        <option value="4" ${Config.Settings.ForceSoilID==4?'selected':''}>木屑 (Woodchips)</option>
                                    </select>
                                </div>

                                <label style="display:block; margin-bottom:8px;">
                                    <input type="checkbox" id="chk-garden-smart" ${Config.Flags.GardenAvoidBuff?'checked':''}> 🧠 聰明補種 (Buff 期間暫停)
                                </label>

                                <label style="display:block; margin-bottom:12px;">
                                    <input type="checkbox" id="chk-main-sync" ${Config.Flags.SyncPlanting?'checked':''}> 🔄 啟用同步播種
                                </label>

                                <div style="display:flex; gap:5px;">
                                    <button id="garden-save-btn" style="flex:1; padding:6px; background:#2196f3; color:white; border:none; border-radius:4px; cursor:pointer;">💾 記憶陣型</button>
                                    <button id="btn-show-grid" style="flex:1; padding:6px; background:#8d6e63; color:white; border:none; border-radius:4px; cursor:pointer;">🗺️ 顯示記憶</button>
                                </div>
                            </div>
                            <!-- [v9.2.1] Sniper System UI -->
                            <div class="cc-garden-panel-standard" style="margin-top:10px; border: 1px solid #fbc02d; background: #fffde7 !important;">
                                <div style="font-weight:bold; color:#f57f17; margin-bottom:8px; border-bottom:1px solid #fbc02d; padding-bottom:5px;">🎯 多重宇宙狙擊手 (Sniper)</div>
                                <label style="display:block; margin-bottom:8px;">
                                    <input type="checkbox" id="chk-sniper-mode" ${Config.Flags.SniperMode?'checked':''}> 啟動狙擊手系統 (總開關)
                                </label>
                                <div style="display:flex; align-items:center; margin-bottom:8px; gap:5px;">
                                    <span style="font-size:12px;">圖標字體大小:</span>
                                    <input type="number" id="val-sniper-fontsize" value="${Config.Settings.SniperFontSize}" style="width:50px; text-align:center;">
                                    <input type="range" id="slider-sniper-fontsize" min="10" max="30" value="${Config.Settings.SniperFontSize}" style="width:80px;">
                                </div>
                                <div style="font-size:11px; color:#555; margin-top:8px;">
                                    💡 提示：監控陣型的編輯與 S/L，已遷移至「花園網格面板」中。
                                </div>
                            </div>
                        </div>

                        <!-- Settings -->
                        <div id="tab-settings" class="cc-tab-pane">
                            <!-- HUD Colors (Moved to Top) -->
                            <div class="panel-section" style="margin-bottom:10px; padding:10px; background:#e0f7fa; border-radius:8px;">
                                <div style="font-weight:bold; color:#006064; margin-bottom:8px; border-bottom:1px solid #b2ebf2; padding-bottom:4px;">🎨 側邊欄 HUD 色彩自訂</div>
                                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; font-size:12px; color:#333;">
                                    <div style="display:flex; flex-direction:column; gap:2px;">
                                        <label>🔒 鎖定(啟用):</label>
                                        <div style="display:flex; gap:3px;">
                                            <input type="color" id="color-lock-active" value="${Config.Settings.ColorLockActive}" style="width:28px; height:24px; padding:0; border:1px solid #ccc; cursor:pointer;">
                                            <input type="text" id="text-lock-active" value="${Config.Settings.ColorLockActive}" style="width:60px; font-family:monospace; font-size:11px; text-transform:uppercase; text-align:center;">
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:2px;">
                                        <label>🔓 鎖定(停用):</label>
                                        <div style="display:flex; gap:3px;">
                                            <input type="color" id="color-lock-inactive" value="${Config.Settings.ColorLockInactive}" style="width:28px; height:24px; padding:0; border:1px solid #ccc; cursor:pointer;">
                                            <input type="text" id="text-lock-inactive" value="${Config.Settings.ColorLockInactive}" style="width:60px; font-family:monospace; font-size:11px; text-transform:uppercase; text-align:center;">
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:2px;">
                                        <label>🧬 突變(啟用):</label>
                                        <div style="display:flex; gap:3px;">
                                            <input type="color" id="color-mut-active" value="${Config.Settings.ColorMutActive}" style="width:28px; height:24px; padding:0; border:1px solid #ccc; cursor:pointer;">
                                            <input type="text" id="text-mut-active" value="${Config.Settings.ColorMutActive}" style="width:60px; font-family:monospace; font-size:11px; text-transform:uppercase; text-align:center;">
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:2px;">
                                        <label>❌ 突變(停用):</label>
                                        <div style="display:flex; gap:3px;">
                                            <input type="color" id="color-mut-inactive" value="${Config.Settings.ColorMutInactive}" style="width:28px; height:24px; padding:0; border:1px solid #ccc; cursor:pointer;">
                                            <input type="text" id="text-mut-inactive" value="${Config.Settings.ColorMutInactive}" style="width:60px; font-family:monospace; font-size:11px; text-transform:uppercase; text-align:center;">
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:2px;">
                                        <label>🎯 狙擊(監聽):</label>
                                        <div style="display:flex; gap:3px;">
                                            <input type="color" id="color-sniper-active" value="${Config.Settings.ColorSniperActive}" style="width:28px; height:24px; padding:0; border:1px solid #ccc; cursor:pointer;">
                                            <input type="text" id="text-sniper-active" value="${Config.Settings.ColorSniperActive}" style="width:60px; font-family:monospace; font-size:11px; text-transform:uppercase; text-align:center;">
                                        </div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:2px;">
                                        <label>🛑 狙擊(停用):</label>
                                        <div style="display:flex; gap:3px;">
                                            <input type="color" id="color-sniper-inactive" value="${Config.Settings.ColorSniperInactive}" style="width:28px; height:24px; padding:0; border:1px solid #ccc; cursor:pointer;">
                                            <input type="text" id="text-sniper-inactive" value="${Config.Settings.ColorSniperInactive}" style="width:60px; font-family:monospace; font-size:11px; text-transform:uppercase; text-align:center;">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- General UI Settings -->
                            <div class="panel-section" style="margin-bottom:10px; padding:10px; background:#f3e5f5; border-radius:8px;">
                                <div style="font-weight:bold; color:#4a148c; margin-bottom:5px;">⚙️ 介面與顯示</div>
                                <label style="display:block; font-size:13px; color:#333;"><input type="checkbox" id="chk-ui-count" ${Config.Flags.ShowCountdown?'checked':''}> ⏱️ 倒數計時</label>
                                <label style="display:block; font-size:13px; color:#333;"><input type="checkbox" id="chk-ui-buff" ${Config.Flags.ShowBuffMonitor?'checked':''}> 🔥 Buff 監控</label>
                                <label style="display:block; font-size:13px; color:#333;"><input type="checkbox" id="chk-ui-log" checked> 📜 操作日誌面板</label>
                                <label style="display:block; font-size:13px; color:#333;"><input type="checkbox" id="chk-magic-monitor" ${Config.Flags.ShowMagicMonitor?'checked':''}> 🔮 奧術戰術面板</label>

                                <div style="margin-top:12px; color:#333;">
                                    <span style="font-size:13px; font-weight:bold;">點擊速度: <span id="spd-val">${Config.Settings.ClickInterval}</span>ms</span>
                                    <input type="range" id="spd-slider" min="10" max="200" value="${Config.Settings.ClickInterval}" style="width:100%; margin-top: 8px;">
                                </div>
                                 
                                 <!-- Restart Matrix -->
                                 <div style="margin-top:10px; border-top:1px solid #ccc; padding-top:8px; color:#333; font-size:13px;">
                                     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                         <label><input type="checkbox" id="chk-auto-restart" ${Config.Flags.AutoRestart?'checked':''}> 自動重啟:</label>
                                         <div>
                                            <select id="rst-hr">${generateOptions(0, 24, rstHr, '時')}</select>
                                            <select id="rst-min">${generateOptions(0, 59, rstMin, '分')}</select>
                                         </div>
                                         <button id="btn-force-restart" style="background:#ff5252; color:white; border:none; padding:3px 8px; border-radius:4px; cursor:pointer; width:70px;">立即重啟</button>
                                     </div>
                                     <div style="display:flex; justify-content:space-between; align-items:center;">
                                         <label title="重啟前自動恢復魔法與變異設定"><input type="checkbox" id="chk-pre-restart-recovery" ${Config.Flags.PreRestartRecovery?'checked':''}> 防呆恢復:</label>
                                         <div>
                                            <select id="rec-min">${generateOptions(0, 59, Config.Settings.RecoveryMin, '分')}</select>
                                            <select id="rec-sec">${generateOptions(0, 59, Config.Settings.RecoverySec, '秒')}</select>
                                         </div>
                                         <button id="btn-force-recover" style="background:#00bcd4; color:white; border:none; padding:3px 8px; border-radius:4px; cursor:pointer; width:70px; color:#000; font-weight:bold;">立即恢復</button>
                                     </div>
                                </div>

                                <div style="margin-top:10px; border-top:1px solid #ccc; padding-top:8px;">
                                    <div style="font-weight:bold; color:#555; margin-bottom:5px;">設定管理</div>
                                    <div style="display:flex; gap:5px;">
                                        <button id="btn-settings-export" style="flex:1; padding:5px; background:#5c6bc0; color:white; border:none; border-radius:4px; cursor:pointer;">📤 匯出設定</button>
                                        <button id="btn-settings-import" style="flex:1; padding:5px; background:#ef5350; color:white; border:none; border-radius:4px; cursor:pointer;">📥 匯入設定</button>
                                    </div>
                                </div>
                                
                                <div style="margin-top:10px; border-top:1px solid #ccc; padding-top:8px;">
                                    <div style="font-size:12px; text-align:center;">
                                        <a href="https://github.com/wei9133/Cookie-Clicker" target="_blank" style="color:#667eea; text-decoration:none; font-weight:bold;">Github</a>
                                        |
                                        <a href="https://greasyfork.org/scripts/557692" target="_blank" style="color:#667eea; text-decoration:none; font-weight:bold;">GreasyFork</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `);
            this.makeDraggable(this.Elements.Panel, 'panelX', 'panelY', '#panel-header');
            $('body').append(this.Elements.Panel);
            this.bindEvents();
            this.restoreTab();
        },

        restoreTab: function() {
            const lastTab = Config.Memory.LastActiveTab;
            $(`.cc-tab-btn[data-target="${lastTab}"]`).click();
        },

        togglePanel: function() {
            if (!this.Elements.Panel) this.createControlPanel();
            this.Elements.Panel.is(':visible') ? this.Elements.Panel.fadeOut(200) : this.Elements.Panel.fadeIn(200);
        },

        toggleMasterSwitch: function() {
            Config.Flags.GlobalMasterSwitch = !Config.Flags.GlobalMasterSwitch;
            GM_setValue('isGlobalMasterSwitchEnabled', Config.Flags.GlobalMasterSwitch);

            const statusBar = $('#global-status-bar');
            const statusIcon = $('#status-icon');
            const statusText = $('#status-text');
            const btn = $('#btn-toggle-master');

            if (Config.Flags.GlobalMasterSwitch) {
                statusBar.css('background', '#4caf50');
                statusIcon.text('🟢');
                statusText.text('系統運行中');
                btn.text('暫停 (F8)');
                Logger.success('Core', '全局自動化已啟動');
            } else {
                statusBar.css('background', '#f44336');
                statusIcon.text('🔴');
                statusText.text('系統已暫停');
                btn.text('恢復 (F8)');
                Logger.warn('Core', '全局自動化已暫停');
            }
            this.updateButtonState();
        },

        createCountdown: function() {
            if (this.Elements.Countdown) return;
            this.Elements.Countdown = $(`
                <div id="cookie-countdown" style="
                    position: fixed; left: ${Config.Memory.CountdownX}px; top: ${Config.Memory.CountdownY}px; padding: 8px; background: rgba(0,0,0,0.85); color: white;
                    border-radius: 8px; font-family: monospace; font-size: 12px; z-index: 999997; display: ${Config.Flags.ShowCountdown ? 'block' : 'none'};
                    width: 150px; cursor: move; border: 1px solid #444;
                ">
                    <div style="text-align: center; border-bottom: 1px solid #555; margin-bottom: 4px;">
                        ⏱️ 倒數計時
                        <div class="cc-close-btn" id="countdown-close" style="top:2px; right:2px; font-size:10px;">✕</div>
                    </div>
                    <div style="display:flex; justify-content:space-between;"><span>🔄 重啟:</span><span id="txt-rst">--:--</span></div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>🛒 購買:</span><span id="txt-buy">--:--</span></div>
                    <div style="border-top:1px solid #555; padding-top:5px; text-align:center;">
                        <div style="font-size:10px; margin-bottom:2px;">🔊 音量: <span id="vol-disp">${Config.Settings.Volume}</span>%</div>
                        <input type="range" id="volume-slider-mini" min="0" max="100" value="${Config.Settings.Volume}" style="width:90%;">
                    </div>
                </div>
            `);
            this.Elements.Countdown.find('#volume-slider-mini').on('input', function() {
                Config.Settings.Volume = parseInt($(this).val());
                $('#vol-disp').text(Config.Settings.Volume);
                try { if (Game.setVolume) Game.setVolume(Config.Settings.Volume); } catch(e) {}
                GM_setValue('gameVolume', Config.Settings.Volume);
            });
            this.Elements.Countdown.find('#countdown-close').click(() => {
                $('#chk-ui-count').prop('checked', false).trigger('change');
            });
            this.makeDraggable(this.Elements.Countdown, 'countdownX', 'countdownY');
            $('body').append(this.Elements.Countdown);
        },

        createBuffMonitor: function() {
            if (this.Elements.BuffMonitor) return;
            this.Elements.BuffMonitor = $(`
                <div id="cookie-buff-monitor" style="
                    position: fixed; left: ${Config.Memory.BuffX}px; top: ${Config.Memory.BuffY}px; padding: 10px; background: rgba(0,0,0,0.85);
                    color: white; border-radius: 12px; font-family: 'Microsoft YaHei', sans-serif; z-index: 999996;
                    display: ${Config.Flags.ShowBuffMonitor ? 'block' : 'none'}; cursor: move; width: 320px;
                    border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px);
                ">
                    <div style="font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 8px; text-align: center; color: #ffd700;">
                        🔥 Buff 監控
                        <div class="cc-close-btn" id="buff-monitor-close">✕</div>
                    </div>
                    <div id="buff-list-content" style="display: flex; flex-direction: column; gap: 8px;"></div>
                </div>
            `);
            this.Elements.BuffMonitor.find('#buff-monitor-close').click(() => {
                $('#chk-ui-buff').prop('checked', false).trigger('change');
            });
            this.makeDraggable(this.Elements.BuffMonitor, 'buffX', 'buffY');
            $('body').append(this.Elements.BuffMonitor);
        },

        updateBuffDisplay: function() {
            if (!Config.Flags.ShowBuffMonitor || !this.Elements.BuffMonitor) return;

            const buffList = $('#buff-list-content');
            const currentBuffKeys =[];
            let totalCpsMult = 1;
            let totalClickMult = 1;
            let hasBuff = false;

            if (Game.buffs) {
                for (let i in Game.buffs) {
                    hasBuff = true;
                    const buff = Game.buffs[i];
                    currentBuffKeys.push(`${buff.name}_${buff.time}`);

                    if (buff.multCpS > 0) totalCpsMult *= buff.multCpS;
                    if (buff.multClick > 0) totalClickMult *= buff.multClick;
                }
            }

            const needFullRefresh = !this._lastBuffSnapshot ||
                this._lastBuffSnapshot.length !== currentBuffKeys.length ||
                !this._lastBuffSnapshot.every((key, idx) => key === currentBuffKeys[idx]);

            if (needFullRefresh) {
                buffList.empty();

                if (Game.buffs) {
                    for (let i in Game.buffs) {
                        const buff = Game.buffs[i];
                        const iconUrl = 'img/icons.png';
                        const iconX = buff.icon[0] * 48;
                        const iconY = buff.icon[1] * 48;
                        const isPowerful = buff.multCpS > 50 || buff.multClick > 10;
                        const textColor = isPowerful ? '#ff4444' : 'white';
                        const bgColor = isPowerful ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';
                        const buffName = UI.cleanName(buff.dname ? buff.dname : buff.name);

                        let multDisplay = '';
                        if (buff.multCpS > 0 && buff.multCpS !== 1) multDisplay = `產量 x${Math.round(buff.multCpS*10)/10}`;
                        if (buff.multClick > 0 && buff.multClick !== 1) {
                            if(multDisplay) multDisplay += ', ';
                            multDisplay += `點擊 x${Math.round(buff.multClick)}`;
                        }

                        buffList.append(`
                            <div class="buff-entry" data-buff-id="${buff.name}" style="display: flex; align-items: center; padding: 6px; background: ${bgColor}; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                                <div style="width: 48px; height: 48px; background: url(${iconUrl}) -${iconX}px -${iconY}px; margin-right: 12px; flex-shrink: 0; border-radius:4px; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>
                                <div>
                                    <div style="font-size: 14px; font-weight: bold; color: ${textColor}">${buffName}</div>
                                    <div style="font-size: 12px; color: #ffd700;">${multDisplay}</div>
                                    <div class="buff-time" style="font-size: 12px; color: #ccc;">剩餘: ${Math.ceil(buff.time / 30)}s</div>
                                </div>
                            </div>
                        `);
                    }
                }

                if (!hasBuff) {
                    buffList.append('<div style="text-align: center; color: #666; font-size: 13px; padding: 10px;">無活性效果</div>');
                }

                let summaryHtml = '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.3); text-align: right;">';
                let effectiveClickPower = totalCpsMult * totalClickMult;

                if (totalCpsMult !== 1) {
                    let val = totalCpsMult < 1 ? totalCpsMult.toFixed(2) : Math.round(totalCpsMult).toLocaleString();
                    summaryHtml += `<div style="color: #4caf50; font-weight: bold; font-size: 14px;">🏭 總產量: x${val}</div>`;
                }

                if (effectiveClickPower > 1) {
                    let val = Math.round(effectiveClickPower).toLocaleString();
                    summaryHtml += `<div style="color: #ff9800; font-weight: bold; font-size: 16px; margin-top: 2px;">⚡ 點擊倍率: x${val}</div>`;
                }

                if (typeof Game.computedMouseCps !== 'undefined') {
                    let clickVal = Game.computedMouseCps;
                    let formattedClick = typeof Beautify !== 'undefined' ? Beautify(clickVal) : Math.round(clickVal).toLocaleString();
                    summaryHtml += `<div style="margin-top:5px; padding-top:5px; border-top:1px solid rgba(255,255,255,0.1); color:#fff; font-size:15px; font-family:monospace;">👆 點擊力: <span style="color: #ffd700;">+${formattedClick}</span></div>`;
                }

                summaryHtml += '</div>';
                buffList.append(summaryHtml);

                this._lastBuffSnapshot = currentBuffKeys;
            } else {
                if (Game.buffs) {
                    let index = 0;
                    for (let i in Game.buffs) {
                        const buff = Game.buffs[i];
                        const timeElement = buffList.find('.buff-entry').eq(index).find('.buff-time');
                        if (timeElement.length) {
                            timeElement.text(`剩餘: ${Math.ceil(buff.time / 30)}s`);
                        }
                        index++;
                    }
                }
            }
        },

        makeDraggable: function(element, keyX, keyY, handleSelector = null) {
            let isDragging = false, startX = 0, startY = 0;
            const handle = handleSelector ? element.find(handleSelector) : element;
            handle.on('mousedown', function(e) {
                if ($(e.target).is('input, select, button')) return;
                isDragging = true; startX = e.clientX - parseInt(element.css('left')); startY = e.clientY - parseInt(element.css('top'));
            });
            $(document).on('mousemove', function(e) {
                if (isDragging) {
                    element.css({
                        left: (e.clientX - startX) + 'px',
                        top: (e.clientY - startY) + 'px'
                    });
                }
            }).on('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    GM_setValue(keyX, parseInt(element.css('left')));
                    GM_setValue(keyY, parseInt(element.css('top')));
                }
            });
        },

        bindEvents: function() {
            const self = this;

            $('.cc-tab-btn').click(function() {
                const target = $(this).data('target');
                $('.cc-tab-btn').removeClass('active');
                $(this).addClass('active');
                $('.cc-tab-pane').removeClass('active');
                $('#tab-' + target).addClass('active');
                Config.Memory.LastActiveTab = target;
                GM_setValue('lastActiveTab', target);
            });

            const bindChkWithLock = (id, key) => {
                $('#' + id).change(function() {
                    if (Config.Flags.SpendingLocked) {
                        this.checked = Config.Flags[key];
                        Logger.warn('花園保護', '支出鎖定期間無法修改此項目');
                        return false;
                    }
                    Config.Flags[key] = this.checked;
                    GM_setValue('is' + key + 'Enabled', this.checked);
                    if(key==='Click') self.updateButtonState();
                });
            };

            const bindChk = (id, key) => {
                $('#'+id).change(function() {
                    Config.Flags[key] = this.checked;
                    GM_setValue('is'+key+(key.includes('Enabled')?'':'Enabled'), this.checked);
                    if(key==='Click') self.updateButtonState();
                    if(key==='ShowCountdown') self.Elements.Countdown.toggle(this.checked);
                    if(key==='ShowBuffMonitor') self.Elements.BuffMonitor.toggle(this.checked);
                    if(key==='GardenOverlay') Logic.Garden.clearOverlay();
                    if(key==='GardenMutation') {
                        UI.GardenGrid.updateButtonState();
                        // [Fix v9.1.0.1] 同步更新花園側邊欄狀態
                        if (UI.GardenProtection && UI.GardenProtection.updateEmbeddedState) {
                            UI.GardenProtection.updateEmbeddedState();
                        }
                    }
                    if(key==='DragonAura' && this.checked && Runtime.ModuleFailCount['Dragon'] >= 10) {
                        Runtime.ModuleFailCount['Dragon'] = 0;
                        Logger.success('Core', '已重置巨龍光環熔斷計數器');
                    }
                    if(key==='SavingMode') self.updateEmbeddedState();
                });
            };

            bindChk('chk-auto-click', 'Click');
            bindChkWithLock('chk-auto-buy', 'Buy');
            bindChk('chk-auto-golden', 'Golden');
            bindChkWithLock('chk-auto-garden', 'Garden');
            bindChkWithLock('chk-research', 'Research');
            bindChk('chk-wrinkler', 'AutoWrinkler');
            bindChk('chk-auto-fortune', 'Fortune');
            bindChkWithLock('chk-stock', 'Stock');
            bindChk('chk-pre-restart-recovery', 'PreRestartRecovery');

            // [v9.0.0] New Broker Handler
            $('#chk-auto-broker').change(function() {
                Config.Flags.AutoBroker = this.checked;
                GM_setValue('isAutoBrokerEnabled', this.checked);
            });

            bindChk('chk-se', 'SE');
            bindChk('chk-spell', 'Spell');
            bindChk('chk-ui-count', 'ShowCountdown');
            bindChk('chk-ui-buff', 'ShowBuffMonitor');
            bindChk('chk-garden-overlay', 'GardenOverlay');
            bindChk('chk-garden-mutation', 'GardenMutation');
            bindChk('chk-garden-smart', 'GardenAvoidBuff');
            bindChk('chk-season', 'Season');
            bindChk('chk-santa', 'Santa');
            bindChk('chk-dragon', 'DragonAura');

            $('#chk-magic-monitor').change(function() {
                Config.Flags.ShowMagicMonitor = this.checked;
                GM_setValue('showMagicMonitor', this.checked);
                if (UI.MagicMonitor) UI.MagicMonitor.toggle(this.checked);
            });

            $('#chk-main-sync').change(function() {
                const checked = this.checked;
                Config.Flags.SyncPlanting = checked;
                GM_setValue('isSyncPlantingEnabled', checked);
                $('#chk-garden-sync').prop('checked', checked);
                if(!checked) UI.GardenGrid.updateStatus('hide');
            });

            bindChk('chk-saving-mode', 'SavingMode');
            bindChk('chk-saving-replant', 'SavingReplant');
            bindChk('chk-auto-pledge', 'AutoPledge');

            $('#header-saving-mode').click(function() {
                const content = $('#content-saving-mode');
                const icon = $('#icon-saving-mode');
                if (content.is(':visible')) {
                    content.slideUp(200);
                    icon.text('▼');
                    Config.Memory.SavingModeExpanded = false;
                } else {
                    content.slideDown(200);
                    icon.text('▲');
                    Config.Memory.SavingModeExpanded = true;
                }
                GM_setValue('savingModeExpanded', Config.Memory.SavingModeExpanded);
            });

            // [v8.9.0] Building Limit Dropdown Logic
            const blSelect = $('#bl-select');
            const blInput = $('#bl-input');
            const blStatus = $('#bl-status');

            if (blSelect.length) {
                // Populate Dropdown
                if (typeof Game !== 'undefined' && Game.ObjectsById) {
                    Game.ObjectsById.forEach(obj => {
                        const text = `${obj.name} (${obj.dname || obj.name})`;
                        blSelect.append($('<option>', { value: obj.name, text: text }));
                    });
                }

                const updateBLDisplay = () => {
                    const name = blSelect.val();
                    if (!name) return;
                    const limit = (Config.Settings.BuildingLimit && typeof Config.Settings.BuildingLimit[name] !== 'undefined')
                        ? Config.Settings.BuildingLimit[name]
                        : -1;

                    blInput.val(limit);
                    const limitText = limit === -1 ? '無限' : limit;
                    blStatus.text(`目前設定：${name} = ${limitText}`);
                };

                // Events
                blSelect.change(updateBLDisplay);

                blInput.change(function() {
                    const name = blSelect.val();
                    const val = parseInt($(this).val());
                    if (!Config.Settings.BuildingLimit) Config.Settings.BuildingLimit = {};
                    Config.Settings.BuildingLimit[name] = val;
                    GM_setValue('buildingLimit', Config.Settings.BuildingLimit);
                    updateBLDisplay();
                });

                // Initialize
                updateBLDisplay();
            }

            $('#chk-finance-lock').change(function() {
                UI.GardenProtection.toggle(this.checked);
                UI.GardenProtection.updateEmbeddedState();
                $('#chk-spending-lock').prop('checked', this.checked);
                self.updateEmbeddedState();
            });

            $('#chk-ui-log').change(function() { UI.ActionLog.toggle(this.checked); });
            $('#btn-toggle-master').click(function() { UI.toggleMasterSwitch(); });
            $('#btn-toggle-master').hover(
                function() { $(this).css('background', 'rgba(255, 255, 255, 0.3)'); },
                function() { $(this).css('background', 'rgba(255, 255, 255, 0.2)'); }
            );

            $('#chk-show-garden-protection').change(function() {
                Config.Flags.ShowGardenProtection = this.checked;
                GM_setValue('showGardenProtection', this.checked);
                UI.GardenProtection.updateVisibility();
            });

            $('#btn-reset-ui-pos').click(() => {
                Config.Memory.GardenProtectionX = 100;
                Config.Memory.GardenProtectionY = 100;
                Config.Memory.GardenGridX = 100;
                Config.Memory.GardenGridY = 100;
                GM_setValue('gardenProtectionX', 100);
                GM_setValue('gardenProtectionY', 100);
                GM_setValue('gardenGridX', 100);
                GM_setValue('gardenGridY', 100);
                $('#garden-protection-ui').css({left: '100px', top: '100px'});
                $('#garden-grid-panel').css({left: '100px', top: '100px'});
                Logger.success('UI', '所有懸浮面板位置已重置');
            });

            $('#garden-save-btn').click(() => Logic.Garden.saveLayout());
            $('#main-panel-close').click(() => self.togglePanel());

            // [v9.1.0] Main Panel Mutation Toggle Event
            $('#btn-toggle-mutation-panel').click(function() {
                Config.Flags.GardenMutation = !Config.Flags.GardenMutation;
                GM_setValue('isGardenMutationEnabled', Config.Flags.GardenMutation);
                UI.GardenProtection.updateEmbeddedState(); // Update UI
            });

            $('#chk-godzamok').change(function() { Config.Flags.GodzamokCombo = this.checked; GM_setValue('isGodzamokComboEnabled', this.checked); });

            // [v8.9.4 Update] Godzamok Persistence Events
            $('#val-godzamok-amount').change(function() {
                Config.Settings.GodzamokSellAmount = parseInt(this.value);
                GM_setValue('godzamokSellAmount', Config.Settings.GodzamokSellAmount);
            });
            $('#val-godzamok-target').change(function() {
                Config.Settings.GodzamokTargetBuilding = this.value;
                GM_setValue('godzamokTargetBuilding', Config.Settings.GodzamokTargetBuilding);
            });
            $('#val-godzamok-min').change(function() {
                Config.Settings.GodzamokMinMult = parseInt(this.value);
                GM_setValue('godzamokMinMult', Config.Settings.GodzamokMinMult);
            });

            // [v8.9.4 New] Restock Amount Event
            $('#val-godzamok-restock').change(function() {
                let val = parseInt(this.value);
                if(isNaN(val) || val < 1) val = 100; // 防呆
                Config.Settings.GodzamokRestockAmount = val;
                this.value = val; // UI回顯標準化數值
                GM_setValue('godzamokRestockAmount', val);
            });

            // [Fix 2] 重寫買回數量與熱鍵的事件監聽邏輯
            $('#val-godzamok-buyback').change(function() {
                var raw = parseInt(this.value, 10);
                // 防呆：若非數字或小於-1，回退預設值
                if (isNaN(raw) || raw < -1) raw = 400;

                Config.Settings.GodzamokBuyback = raw;
                this.value = raw; // 更新 UI 顯示標準化後的數值
                GM_setValue('godzamokBuyback', raw); // 持久化
            });

            $('#val-godzamok-hotkey').change(function() {
                var val = this.value.trim();
                if (!val) return; // 防空

                Config.Settings.GodzamokHotkey = val;
                GM_setValue('godzamokHotkey', val); // 持久化
            });

            $('#val-godzamok-buy-hotkey').change(function() {
                var val = this.value.trim();
                if (!val) return;
                Config.Settings.GodzamokBuyHotkey = val;
                GM_setValue('godzamokBuyHotkey', val);
            });

            // [v9.1.5] Force Mutation Hotkey Event
            $('#val-force-mutation-hotkey').change(function() {
                var val = this.value.trim();
                if (!val) return;
                Config.Settings.ForceMutationHotkey = val;
                GM_setValue('forceMutationHotkey', val);
            });

            // [v9.1.6] Force Soil Events
            $('#chk-force-soil').change(function() {
                Config.Flags.ForceSoilEnabled = this.checked;
                GM_setValue('isForceSoilEnabled', this.checked);
            });
            $('#val-force-soil').change(function() {
                Config.Settings.ForceSoilID = parseInt(this.value);
                GM_setValue('forceSoilID', Config.Settings.ForceSoilID);
            });

            // [v9.1.8] Loan Ranger Events
            $('#chk-auto-loan').change(function() {
                Config.Flags.AutoLoan = this.checked;
                GM_setValue('isAutoLoanEnabled', this.checked);
            });
            $('#val-loan-threshold').change(function() {
                let val = parseInt(this.value);
                if (isNaN(val) || val < 0) val = 300000;
                Config.Settings.AutoLoanThreshold = val;
                this.value = val;
                GM_setValue('autoLoanThreshold', val);
            });

            // [v9.1.8] Loan Hotkey Change Event
            $('#val-loan-hotkey').change(function() {
                var val = this.value.trim();
                if (!val) return;
                Config.Settings.LoanHotkey = val;
                GM_setValue('loanHotkey', val);
            });

            // [v9.1.9] Reset Loan Cooldown & Layout Name Sync
            $('#btn-reset-loan').click(() => Logic.LoanRanger.resetCooldown());

            $(document).on('change', '.chk-sync-layout-name', function() {
                const val = this.checked;
                Config.Flags.ShowLayoutName = val;
                GM_setValue('isShowLayoutName', val);

                // Sync all checkboxes
                $('.chk-sync-layout-name').prop('checked', val);

                // Update HUD
                if (UI.GardenProtection.updateLayoutNameDisplay) {
                    UI.GardenProtection.createSidebarHUD(); // Ensure it exists
                    UI.GardenProtection.updateLayoutNameDisplay();
                }
            });

            //[v9.2.1] Sniper Events (Main panel)
            $('#chk-sniper-mode').change(function() {
                Config.Flags.SniperMode = this.checked;
                GM_setValue('isSniperModeEnabled', this.checked);
                if (UI.GardenProtection.updateEmbeddedState) UI.GardenProtection.updateEmbeddedState();
            });
            $('#val-sniper-fontsize, #slider-sniper-fontsize').on('input change', function() {
                let val = parseInt($(this).val());
                if (isNaN(val) || val < 10) val = 22;
                Config.Settings.SniperFontSize = val;
                $('#val-sniper-fontsize').val(val);
                $('#slider-sniper-fontsize').val(val);
                GM_setValue('sniperFontSize', val);
            });

// --- 新增自動重啟與防呆開關 ---
            bindChk('chk-auto-restart', 'AutoRestart');

            // --- [v9.3.0] HUD Colors Bidirectional Sync ---
            const bindColorSync = (id, configKey, gmKey) => {
                // Color Picker -> Text
                $(`#color-${id}`).on('input', function() {
                    const val = $(this).val();
                    $(`#text-${id}`).val(val.toUpperCase());
                    Config.Settings[configKey] = val; // 修正：更新運行記憶體 (大寫開頭)
                    GM_setValue(gmKey, val);          // 修正：寫入油猴存檔 (小寫開頭)
                    UI.GardenProtection.updateEmbeddedState(); // 觸發即時渲染
                });
                // Text -> Color Picker
                $(`#text-${id}`).on('change', function() {
                    let val = $(this).val().trim();
                    if(!val.startsWith('#')) val = '#' + val;
                    // 防呆：確保是有效的 6 碼 Hex
                    if(/^#[0-9A-F]{6}$/i.test(val)) {
                        $(this).val(val.toUpperCase());
                        $(`#color-${id}`).val(val);
                        Config.Settings[configKey] = val;
                        GM_setValue(gmKey, val);
                        UI.GardenProtection.updateEmbeddedState();
                    } else {
                        // 無效則復原
                        $(this).val($(`#color-${id}`).val().toUpperCase());
                    }
                });
            };

            // 參數對應：1. DOM ID綴詞, 2. Config.Settings 屬性名, 3. GM_setValue 鍵名
            bindColorSync('lock-active', 'ColorLockActive', 'colorLockActive');
            bindColorSync('lock-inactive', 'ColorLockInactive', 'colorLockInactive');
            bindColorSync('mut-active', 'ColorMutActive', 'colorMutActive');
            bindColorSync('mut-inactive', 'ColorMutInactive', 'colorMutInactive');
            bindColorSync('sniper-active', 'ColorSniperActive', 'colorSniperActive');
            bindColorSync('sniper-inactive', 'ColorSniperInactive', 'colorSniperInactive');

            // --- Restart / Recovery Time Updates ---
            $('#btn-show-grid').click(() => UI.GardenGrid.toggle());
            $('#buy-strategy').change(function() { Config.Settings.BuyStrategy = $(this).val(); GM_setValue('buyStrategy', Config.Settings.BuyStrategy); });
            $('#spd-slider').on('input', function() { Config.Settings.ClickInterval = parseInt($(this).val()); $('#spd-val').text(Config.Settings.ClickInterval); GM_setValue('clickInterval', Config.Settings.ClickInterval); });

            const updateBuyInt = () => {
                const min = parseInt($('#buy-min').val()); const sec = parseInt($('#buy-sec').val());
                Config.Settings.BuyIntervalMs = (min * 60 + sec) * 1000;
                GM_setValue('buyIntervalMinutes', min); GM_setValue('buyIntervalSeconds', sec);
            };
            $('#buy-min, #buy-sec').change(updateBuyInt);

            const updateRstInt = () => {
                const hr = parseInt($('#rst-hr').val()); const min = parseInt($('#rst-min').val());
                Config.Settings.RestartIntervalMs = (hr * 3600 + min * 60) * 1000;
                Core.scheduleRestart();
                GM_setValue('restartIntervalHours', hr); GM_setValue('restartIntervalMinutes', min);
            };
            $('#rst-hr, #rst-min').change(updateRstInt);

            const updateRecoveryInt = () => {
                const min = parseInt($('#rec-min').val()); const sec = parseInt($('#rec-sec').val());
                Config.Settings.RecoveryMin = min; Config.Settings.RecoverySec = sec;
                Config.Settings.RecoveryTimeMs = (min * 60 + sec) * 1000;
                GM_setValue('recoveryMin', min); GM_setValue('recoverySec', sec);
            };
            $('#rec-min, #rec-sec').change(updateRecoveryInt);
            // 頁面載入時先算一次毫秒
            Config.Settings.RecoveryTimeMs = (Config.Settings.RecoveryMin * 60 + Config.Settings.RecoverySec) * 1000;

            $('#btn-force-restart').click(() => { 
                if(confirm('⚠️ 警告：強制重啟將無視當前安全防護（可能中斷 Godzamok 或丟失狙擊變異）！\n\n確定要立刻重啟網頁？')) {
                    Core.performRestart(true); 
                } 
            });
            $('#btn-force-recover').click(() => { 
                if(confirm('確定立刻執行防呆恢復 (開啟魔法與變異)？')) {
                    // Extract execution logic
                    Config.Flags.Spell = true; Config.Flags.SE = true;
                    GM_setValue('isSpellEnabled', true); GM_setValue('isSEEnabled', true);
                    $('#chk-spell, #chk-se').prop('checked', true);
                    const R = Runtime.GodzamokState;
                    if (!Config.Flags.SpendingLocked && !R.isActive && R.mutationRestoreTimer === null) {
                        Config.Flags.GardenMutation = true; GM_setValue('isGardenMutationEnabled', true);
                        $('#chk-garden-mutation').prop('checked', true);
                        if (UI.GardenGrid.updateButtonState) UI.GardenGrid.updateButtonState();
                        if (UI.GardenProtection.updateEmbeddedState) UI.GardenProtection.updateEmbeddedState();
                        Logger.success('Recovery', '已手動執行防呆恢復！');
                    } else {
                        Logger.warn('Recovery', '無法恢復變異：資金正處於鎖定或戒嚴狀態。');
                    }
                } 
            });

            //[v8.9.9.1] Settings Export/Import Handlers
            $('#btn-settings-export').click(() => {
                try {
                    const data = {
                        Flags: Config.Flags,
                        Settings: Config.Settings,
                        // [v9.2.1.1] 追加 Sniper 記憶體匯出
                        Memory: {
                            SniperGrid: Config.Memory.SniperGrid,
                            SniperProfiles: Config.Memory.SniperProfiles,
                            SniperSlotNames: Config.Memory.SniperSlotNames
                        }
                    };
                    const str = btoa(JSON.stringify(data));
                    prompt('請複製以下代碼保存：', str);
                } catch(e) { alert('匯出失敗: ' + e.message); }
            });

            $('#btn-settings-import').click(() => {
                const input = prompt('請貼上設定代碼：');
                if(!input) return;
                try {
                    const data = JSON.parse(atob(input));

                    // Import Flags
                    if(data.Flags) {
                        const flagMap = {
                             GlobalMasterSwitch: 'isGlobalMasterSwitchEnabled',
                             Click: 'isClickEnabled',
                             Buy: 'isBuyEnabled',
                             Golden: 'isGoldenEnabled',
                             Spell: 'isSpellEnabled',
                             Garden: 'isGardenEnabled',
                             Research: 'isResearchEnabled',
                             AutoWrinkler: 'isAutoWrinklerEnabled',
                             Fortune: 'isFortuneEnabled',
                             Stock: 'isStockEnabled',
                             AutoBroker: 'isAutoBrokerEnabled',
                             SE: 'isSEEnabled',
                             Season: 'isSeasonEnabled',
                             Santa: 'isSantaEnabled',
                             DragonAura: 'isDragonAuraEnabled',
                             GardenOverlay: 'isGardenOverlayEnabled',
                             GardenAvoidBuff: 'isGardenAvoidBuff',
                             GardenMutation: 'isGardenMutationEnabled',
                             SyncPlanting: 'isSyncPlantingEnabled',
                             SavingMode: 'isSavingModeEnabled',
                             SavingReplant: 'isSavingReplantEnabled',
                             AutoPledge: 'isAutoPledgeEnabled',
                             ShowCountdown: 'showCountdown',
                             ShowBuffMonitor: 'showBuffMonitor',
                             ShowGardenProtection: 'showGardenProtection',
                             SpendingLocked: 'spendingLocked',
                             GodzamokCombo: 'isGodzamokComboEnabled',
                             ShowGardenGrid: 'isShowGardenGrid',
                             EditorIncludeMutations: 'isEditorIncludeMutations',
                             ForceSoilEnabled: 'isForceSoilEnabled',
                             AutoLoan: 'isAutoLoanEnabled',
                             ShowLayoutName: 'isShowLayoutName',
                             SniperMode: 'isSniperModeEnabled',
                             PreRestartRecovery: 'isPreRestartRecoveryEnabled',
                             ShowMagicMonitor: 'showMagicMonitor',
                             AutoRestart: 'isAutoRestartEnabled' // 🟢 [補上] 自動重啟開關
                        };

                        for(let k in data.Flags) {
                            if (flagMap[k]) {
                                GM_setValue(flagMap[k], data.Flags[k]);
                            }
                        }
                    }

                    // Import Settings
                    if(data.Settings) {
                        const settingMap = {
                            Volume: 'gameVolume',
                            ClickInterval: 'clickInterval',
                            BuyStrategy: 'buyStrategy',
                            BuildingLimit: 'buildingLimit',
                            GodzamokMinMult: 'godzamokMinMult',
                            GodzamokSellAmount: 'godzamokSellAmount',
                            GodzamokTargetBuilding: 'godzamokTargetBuilding',
                            GodzamokBuyback: 'godzamokBuyback',
                            GodzamokHotkey: 'godzamokHotkey',
                            GodzamokBuyHotkey: 'godzamokBuyHotkey',
                            GodzamokRestockAmount: 'godzamokRestockAmount',
                            ForceMutationHotkey: 'forceMutationHotkey',
                            ForceSoilID: 'forceSoilID',
                            AutoLoanThreshold: 'autoLoanThreshold',
                            LoanHotkey: 'loanHotkey',
                            SniperFontSize: 'sniperFontSize',
                            RecoveryMin: 'recoveryMin',                  // 🟢 [補上] 防呆分鐘
                            RecoverySec: 'recoverySec',                  // 🟢 [補上] 防呆秒數
                            ColorLockActive: 'colorLockActive',
                            ColorLockInactive: 'colorLockInactive',
                            ColorMutActive: 'colorMutActive',
                            ColorMutInactive: 'colorMutInactive',
                            ColorSniperActive: 'colorSniperActive',      // 🟢 [補上] 狙擊監聽顏色
                            ColorSniperInactive: 'colorSniperInactive'   // 🟢 [補上] 狙擊停用顏色
                        };

                        for(let k in data.Settings) {
                            if (settingMap[k]) {
                                GM_setValue(settingMap[k], data.Settings[k]);
                            }
                        }

                        // Calculate and save Intervals
                        if (typeof data.Settings.BuyIntervalMs !== 'undefined') {
                            const ms = data.Settings.BuyIntervalMs;
                            const mins = Math.floor(ms / 60000);
                            const secs = (ms % 60000) / 1000;
                            GM_setValue('buyIntervalHours', 0);
                            GM_setValue('buyIntervalMinutes', mins);
                            GM_setValue('buyIntervalSeconds', secs);
                        }

                        if (typeof data.Settings.RestartIntervalMs !== 'undefined') {
                             const ms = data.Settings.RestartIntervalMs;
                             const hours = Math.floor(ms / 3600000);
                             const mins = Math.floor((ms % 3600000) / 60000);
                             GM_setValue('restartIntervalHours', hours);
                             GM_setValue('restartIntervalMinutes', mins);
                        }

                        // 🟢 [補上] 動態換算防呆恢復的毫秒數並存檔
                        if (typeof data.Settings.RecoveryMin !== 'undefined' && typeof data.Settings.RecoverySec !== 'undefined') {
                             GM_setValue('recoveryMin', data.Settings.RecoveryMin);
                             GM_setValue('recoverySec', data.Settings.RecoverySec);
                        }
                    }

                    //[v9.2.1.1] Import Memory (Sniper Data)
                    if (data.Memory) {
                        if (data.Memory.SniperGrid) GM_setValue('sniperGrid', data.Memory.SniperGrid);
                        if (data.Memory.SniperProfiles) GM_setValue('sniperProfiles', data.Memory.SniperProfiles);
                        if (data.Memory.SniperSlotNames) GM_setValue('sniperSlotNames', data.Memory.SniperSlotNames);
                    }

                    alert('匯入成功！頁面將重新載入以套用設定。');
                    location.reload();
                } catch(e) { alert('匯入失敗: ' + e.message); }
            });
        },
    };

// ═══════════════════════════════════════════════════════════════
    // 可視化操作日誌面板
    // ═══════════════════════════════════════════════════════════════
    UI.ActionLog = {
        Elements: {
            Container: null,
            LogList: null,
            Counter: null
        },
        MaxEntries: 100,
        lastMsgContent: null,
        lastMsgCount: 1,
        lastMsgElement: null,

        create: function() {
            if (this.Elements.Container) return;
            const fontSize = Config.Memory.LogFontSize;
            const opacity = Config.Memory.LogOpacity;

            this.Elements.Container = $(`
                <div id="action-log-panel" style="
                    position: fixed; left: ${Config.Memory.ActionLogX}px; top: ${Config.Memory.ActionLogY}px;
                    width: 400px;
                    height: ${Config.Memory.ActionLogHeight}px;
                    resize: vertical;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;

                    background: rgba(0, 0, 0, ${opacity}); color: white;
                    border: 2px solid #2196f3; border-radius: 8px; padding: 0; z-index: 999995;
                    font-family: 'Consolas', 'Monaco', monospace; font-size: ${fontSize}px;
                    box-shadow: 0 4px 20px rgba(33, 150, 243, 0.5); cursor: move;

                    display: none;
                ">
                    <div style="padding: 10px; font-weight: bold; font-size: 14px; text-align: center; border-bottom: 1px solid #2196f3; display: flex; justify-content: space-between; align-items: center; background: rgba(33, 150, 243, 0.2);">
                        <span>📜 操作日誌</span>
                        <div>
                            <span id="log-counter" style="font-size: 11px; color: #64b5f6; margin-right: 15px;">0 條</span>
                            <div class="cc-close-btn" id="action-log-close">✕</div>
                        </div>
                    </div>
                    <div class="cc-log-controls">
                        <span>A</span>
                        <input type="range" class="cc-range-mini" id="log-font-slider" min="10" max="30" value="${fontSize}">
                        <span>A</span>
                        <span style="border-left:1px solid #555; height:12px; margin:0 5px;"></span>
                        <span>👁️</span>
                        <input type="range" class="cc-range-mini" id="log-opacity-slider" min="30" max="100" value="${opacity * 100}">
                    </div>
                    <div id="log-list" style="
                        flex: 1;
                        overflow-y: auto;
                        overflow-x: hidden;
                        padding: 5px;
                        min-height: 0;
                    ">
                        <div style="text-align: center; color: #999; padding: 20px;">尚無日誌</div>
                    </div>
                    <div style="padding: 6px; border-top: 1px solid #444; display: flex; gap: 5px; background: rgba(0,0,0,0.2);">
                        <button id="btn-clear-log" style="flex: 1; padding: 4px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">🗑️ 清空</button>
                    </div>
                </div>
            `);

            // 在 create 函數末端加入事件監聽：
            this.Elements.Container.on('mouseup', function() {
                const h = $(this).height();
                // 只有高度改變時才寫入，減少 I/O
                if (h !== Config.Memory.ActionLogHeight) {
                    Config.Memory.ActionLogHeight = h;
                    GM_setValue('actionLogHeight', h);
                }
            });

            $('body').append(this.Elements.Container);
            this.Elements.LogList = $('#log-list');
            this.Elements.Counter = $('#log-counter');
            this.bindEvents();

            this.Elements.Container.css('display', 'none');

            UI.makeDraggable(this.Elements.Container, 'actionLogX', 'actionLogY');
        },

        bindEvents: function() {
            $('#btn-clear-log').click(() => this.clear());
            $('#btn-clear-log').hover(
                function() { $(this).css('background', '#d32f2f'); },
                function() { $(this).css('background', '#f44336'); }
            );
            this.Elements.Container.find('#action-log-close').click(() => {
                this.toggle(false);
            });

            $('#log-font-slider').on('input', function() {
                const size = $(this).val();
                $('#action-log-panel').css('font-size', size + 'px');
                Config.Memory.LogFontSize = size;
                GM_setValue('logFontSize', size);
            });

            $('#log-opacity-slider').on('input', function() {
                const opacity = $(this).val() / 100;
                $('#action-log-panel').css('background', `rgba(0, 0, 0, ${opacity})`);
                Config.Memory.LogOpacity = opacity;
                GM_setValue('logOpacity', opacity);
            });
        },

        append: function(message, level = 'info') {
            if (!this.Elements.LogList) return;
            const colors = { info: '#2196f3', warn: '#ff9800', error: '#f44336', success: '#4caf50' };
            const icons = { info: 'ℹ️', warn: '⚠️', error: '❌', success: '✅' };
            const color = colors[level] || colors.info;
            const icon = icons[level] || icons.info;
            const cleanMsg = UI.cleanName(message);

            if (this.lastMsgContent === cleanMsg && this.lastMsgElement && this.Elements.LogList.has(this.lastMsgElement).length) {
                this.lastMsgCount++;
                const timestamp = new Date().toLocaleTimeString('zh-TW', { hour12: false });
                this.lastMsgElement.find('.log-time').text(timestamp);

                let countBadge = this.lastMsgElement.find('.log-count');
                if (countBadge.length === 0) {
                    this.lastMsgElement.append(`<span class="log-count" style="float:right; background:#ffd700; color:#000; padding:0 4px; border-radius:4px; font-size:10px; font-weight:bold;">x${this.lastMsgCount}</span>`);
                } else {
                    countBadge.text(`x${this.lastMsgCount}`);
                }
                this.Elements.LogList.prepend(this.lastMsgElement);
                return;
            }

            this.lastMsgContent = cleanMsg;
            this.lastMsgCount = 1;
            const timestamp = new Date().toLocaleTimeString('zh-TW', { hour12: false });

            const entry = $(`
                <div style="padding: 4px; margin-bottom: 2px; background: rgba(255, 255, 255, 0.05); border-left: 3px solid ${color}; border-radius: 4px; line-height: 1.4; word-break: break-word;">
                    <span class="log-time" style="color: #999;">${timestamp}</span>
                    <span style="color: ${color}; margin: 0 4px;">${icon}</span>
                    <span class="log-content" style="color: #fff;">${cleanMsg}</span>
                </div>
            `);

            this.lastMsgElement = entry;
            this.Elements.LogList.find('div:contains("尚無日誌")').remove();
            this.Elements.LogList.prepend(entry);

            const entries = this.Elements.LogList.children();
            if (entries.length > this.MaxEntries) entries.last().remove();
            this.Elements.Counter.text(`${entries.length} 條`);
        },

        clear: function() {
            if (!this.Elements.LogList) return;
            this.Elements.LogList.html(`<div style="text-align: center; color: #999; padding: 20px;">尚無日誌</div>`);
            this.Elements.Counter.text('0 條');
            this.lastMsgContent = null;
            this.lastMsgElement = null;
        },

        toggle: function(visible) {
            if (!this.Elements.Container) return;
            if (visible) {
                this.Elements.Container.css('display', 'flex').hide().fadeIn(200);
            } else {
                this.Elements.Container.fadeOut(200);
            }
            $('#chk-ui-log').prop('checked', visible);
        }
    };

    // ═══════════════════════════════════════════════════════════════
    //[v9.3.0] 奧術戰術面板 (Grimoire Tactical HUD)
    // ═══════════════════════════════════════════════════════════════
    UI.MagicMonitor = {
        Elements: { Container: null, Stats: null, BtnGambler: null, BtnHoF: null, BtnCBG: null },
        create: function() {
            if (this.Elements.Container) return;
            this.Elements.Container = $(`
                <div id="cookie-magic-monitor" style="
                    position: fixed; left: ${Config.Memory.MagicMonitorX}px; top: ${Config.Memory.MagicMonitorY}px; padding: 10px; background: rgba(0,0,0,0.85);
                    color: white; border-radius: 8px; font-family: monospace; font-size: 13px; z-index: 999996;
                    display: ${Config.Flags.ShowMagicMonitor ? 'block' : 'none'}; cursor: move; border: 1px solid #9c27b0; box-shadow: 0 4px 15px rgba(156, 39, 176, 0.4);
                    min-width: 180px;
                ">
                    <div style="text-align: center; border-bottom: 1px solid #9c27b0; margin-bottom: 8px; padding-bottom: 4px; font-weight: bold; color: #e1bee7; display: flex; justify-content: space-between; align-items: center;">
                        <span style="display:flex; align-items:center; gap:5px;">🔮 奧術戰術面板 <span id="magic-monitor-stats" style="color:#00e676; font-size:11px; background:rgba(255,255,255,0.1); padding:2px 4px; border-radius:3px;">--/--</span></span>
                        <div class="cc-close-btn" id="magic-monitor-close" style="position: static; font-size:12px;">✕</div>
                    </div>
                    <div style="display:flex; flex-direction: column; gap: 6px;">
                        <button id="btn-magic-gambler" style="padding: 6px; background: #4a148c; color: white; border: 1px solid #7b1fa2; border-radius: 4px; cursor: pointer; font-weight: bold;">🎰 Gambler Spin</button>
                        <button id="btn-magic-hof" style="padding: 6px; background: #006064; color: white; border: 1px solid #0097a7; border-radius: 4px; cursor: pointer; font-weight: bold;">✨ 命運之手</button>
                        <button id="btn-magic-cbg" style="padding: 6px; background: #e65100; color: white; border: 1px solid #f57c00; border-radius: 4px; cursor: pointer; font-weight: bold;">🥐 召喚烘焙食品</button>
                    </div>
                </div>
            `);

            this.Elements.Stats = this.Elements.Container.find('#magic-monitor-stats');
            this.Elements.BtnGambler = this.Elements.Container.find('#btn-magic-gambler');
            this.Elements.BtnHoF = this.Elements.Container.find('#btn-magic-hof');
            this.Elements.BtnCBG = this.Elements.Container.find('#btn-magic-cbg');
            
            this.Elements.Container.find('#magic-monitor-close').click(() => {
                $('#chk-magic-monitor').prop('checked', false).trigger('change');
            });

            this.Elements.BtnGambler.click(() => Logic.Gambler.spin());
            this.Elements.BtnHoF.click(() => {
                const Tower = Game.Objects['Wizard tower'];
                if (Tower && Tower.minigameLoaded) Tower.minigame.castSpell(Tower.minigame.spells['hand of fate']);
            });
            this.Elements.BtnCBG.click(() => {
                const Tower = Game.Objects['Wizard tower'];
                if (Tower && Tower.minigameLoaded) Tower.minigame.castSpell(Tower.minigame.spells['conjure baked goods']);
            });

            UI.makeDraggable(this.Elements.Container, 'magicMonitorX', 'magicMonitorY');
            $('body').append(this.Elements.Container);
        },
        update: function() {
            if (!this.Elements.Container || !this.Elements.Container.is(':visible')) return;
            const Tower = Game.Objects['Wizard tower'];
            if (!Tower || !Tower.minigameLoaded) return; // 沒解鎖魔法塔直接退出
            
            const M = Tower.minigame;
            
            // 更新狀態
            this.Elements.Stats.text(`${Math.floor(M.magic)}/${Math.floor(M.magicM)}`);
            
            // 計算消耗
            const hofCost = Math.floor(M.getSpellCost(M.spells['hand of fate']));
            const stretchCost = Math.floor(M.getSpellCost(M.spells['stretch time']));
            const cbgCost = Math.floor(M.getSpellCost(M.spells['conjure baked goods']));
            
            this.Elements.BtnGambler.text(`🎰 Gambler Spin (${hofCost + stretchCost})`);
            this.Elements.BtnHoF.text(`✨ 命運之手 (${hofCost})`);
            this.Elements.BtnCBG.text(`🥐 召喚烘焙食品 (${cbgCost})`);
        },
        toggle: function(show) {
            if (!this.Elements.Container) this.create();
            if (show) this.Elements.Container.fadeIn(200);
            else this.Elements.Container.fadeOut(200);
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // 花園陣型可視化 (v9.2.1 Sniper Matrix Editor)
    // ═══════════════════════════════════════════════════════════════
    UI.GardenGrid = {
        Elements: { Container: null },
        isEditing: false,       // 編輯藍圖模式旗標
        isSniperEditing: false, // [v9.2.1] 編輯監控區模式旗標

        // [v9.2.1] 更新狙擊手陣型下拉選單與 (Empty) 狀態
        updateSniperSelector: function() {
            const sel = $('#grid-sel-sniper-slot');
            if (sel.length) {
                sel.empty();
                const names = Config.Memory.SniperSlotNames ||['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5'];
                const selected = Config.Memory.SniperSelectedSlot;
                const profiles = Config.Memory.SniperProfiles;
                for (let i = 0; i < 5; i++) {
                    let isEmpty = true;
                    if (profiles[i]) {
                        try {
                            const data = JSON.parse(profiles[i]);
                            if (Array.isArray(data) && data.length === 6) {
                                for(let y = 0; y < 6; y++) {
                                    for(let x = 0; x < 6; x++) {
                                        if (data[y][x] !== '') isEmpty = false;
                                    }
                                }
                            }
                        } catch(e) {}
                    }

                    let displayText = names[i];
                    if (isEmpty) displayText += ' (Empty)';
                    const opt = $('<option>').val(i).text(displayText);
                    if (i === selected) opt.prop('selected', true);
                    sel.append(opt);
                }
            }
        },

        create: function() {
            if (this.Elements.Container) return;

            // Layout Reorganization for v8.8.9 & v9.2.1
            this.Elements.Container = $(`
                <div id="garden-grid-panel" style="
                    position: fixed; left: ${Config.Memory.GardenGridX}px; top: ${Config.Memory.GardenGridY}px;
                    background: rgba(0,0,0,0.95); color: white; border: 2px solid #8d6e63;
                    border-radius: 8px; padding: 15px; z-index: 999997; display: none;
                    cursor: move; font-family: Arial;
                    width: fit-content; transition: all 0.3s ease;
                    max-height: 85vh; overflow-y: auto;
                ">
                    <div style="font-weight:bold; font-size:15px; margin-bottom:10px; border-bottom:1px solid #8d6e63; padding-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
                        <span id="garden-grid-title">🗺️ 記憶陣型預覽</span>
                        <div class="cc-close-btn" id="garden-grid-close" style="font-size:14px;">✕</div>
                    </div>

                    <!-- Top Controls (v8.8.9) -->
                    <div id="grid-top-controls" style="margin-bottom: 8px; padding: 0 5px;">
                        <div style="display:flex; gap:2px; align-items:center; margin-bottom:5px;">
                             <select id="gardenGroupSelect" style="
                                flex-grow: 1; padding: 4px; background: #333; color: #fff;
                                border: 1px solid #555; border-radius: 4px; font-size: 12px;
                             "></select>
                             <button id="btn-rename-group" style="
                                padding: 4px 8px; background: #444; color: white; border: 1px solid #555;
                                border-radius: 4px; cursor: pointer; font-size: 13px;
                             ">✏️</button>
                        </div>
                        <select id="gardenLayoutSelectGrid" style="
                            width: 100%; padding: 4px; background: #333; color: #fff;
                            border: 1px solid #555; border-radius: 4px; font-size: 12px;
                        "></select>
                    </div>

                    <div id="grid-action-bar" style="margin-bottom: 12px; display: flex; gap: 5px; padding: 0 5px; justify-content: flex-end; align-items: center; flex-wrap: wrap;">
                         <!-- View Mode Only -->
                         <button id="btn-rename-layout" style="
                            padding: 2px 8px; background: #444; color: white; border: 1px solid #555;
                            border-radius: 4px; cursor: pointer; font-size: 13px;
                        ">✏️ 重命名</button>

                         <!-- Edit Mode Only (v8.9.7 UX Updated) -->
                         <label id="lbl-include-mutation" style="display:none; margin-right: 5px; font-size: 12px; color: #d500f9; font-weight: bold; cursor: pointer;">
                             <input type="checkbox" id="chk-editor-mutation" ${Config.Flags.EditorIncludeMutations ? 'checked' : ''}> 包含變異
                         </label>
                         <button id="btn-load-live" style="
                            display:none; padding: 2px 8px; background: #00897b; color: white; border: 1px solid #00695c;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                        ">📥 讀取盤面</button>
                         <button id="btn-clear-layout" style="
                            display:none; padding: 2px 8px; background: #d32f2f; color: white; border: 1px solid #b71c1c;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                        ">🗑️ 清空</button>
                         <button id="btn-save-layout" style="
                            display:none; padding: 2px 8px; background: #4caf50; color: white; border: 1px solid #388e3c;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                        ">💾 儲存</button>

                         <!-- Toggles -->
                         <button id="btn-toggle-edit-mode" style="
                            padding: 2px 8px; background: #444; color: white; border: 1px solid #555;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                        ">📝 編輯模式</button>
                         <!-- [v9.2.1] Sniper Edit Mode -->
                         <button id="btn-toggle-sniper-edit" style="
                            padding: 2px 8px; background: #673ab7; color: white; border: 1px solid #512da8;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                        ">🎯 編輯監控區</button>
                    </div>

                    <div class="cc-garden-row">
                        <div id="drawer-left" class="cc-drawer cc-garden-side">
                            <div style="padding: 10px; width: 220px; box-sizing: border-box;">
                                <div style="text-align:center; font-weight:bold; color:#81c784; font-size:14px; border-bottom:1px solid #444; margin-bottom:5px; padding-bottom:3px;">
                                    已解鎖圖鑑
                                    <button id="btn-expand-unlocked" class="cc-list-expand-btn">▼</button>
                                </div>
                                <div id="container-unlocked" class="cc-garden-list-scroll">
                                    <ul id="cc-garden-list-unlocked" style="font-size:13px;"></ul>
                                </div>
                            </div>
                        </div>

                        <div class="cc-center-stage">
                            <div style="display:flex; justify-content:center; align-items:center; gap:10px; margin-bottom:12px; width:100%;">
                                <button id="cc-btn-expand-left" style="
                                    padding: 4px 10px; background: #333; color: white; border: 1px solid #555;
                                    border-radius: 4px; cursor: pointer; font-size: 13px; font-weight:bold;
                                ">◀ 展開</button>

                                <span id="cc-garden-progress" style="
                                    font-size: 18px; font-weight: bold; color: #ffd700;
                                    min-width: 80px; text-align: center;
                                ">--/--</span>

                                <button id="cc-btn-expand-right" style="
                                    padding: 4px 10px; background: #333; color: white; border: 1px solid #555;
                                    border-radius: 4px; cursor: pointer; font-size: 13px; font-weight:bold;
                                ">展開 ▶</button>
                            </div>

                            <div id="garden-grid-content" style="
                                display: grid; grid-template-columns: 24px repeat(6, 48px); grid-template-rows: 24px repeat(6, 48px);
                                gap: 4px; justify-content: center; background: #111; padding: 10px;
                                border: 2px solid #8d6e63; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.5);
                            "></div>
                        </div>

                        <div id="drawer-right" class="cc-drawer cc-garden-side">
                            <div style="padding: 10px; width: 220px; box-sizing: border-box;">
                                <div style="text-align:center; font-weight:bold; color:#ffcc80; font-size:14px; border-bottom:1px solid #444; margin-bottom:5px; padding-bottom:3px;">
                                    未解鎖清單
                                    <button id="btn-expand-locked" class="cc-list-expand-btn">▼</button>
                                </div>
                                <div id="container-locked" class="cc-garden-list-scroll">
                                    <ul id="cc-garden-list-locked" style="font-size:13px;"></ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="margin: 5px 0; text-align: right; padding-right: 10px; display: flex; gap: 8px; justify-content: flex-end;">
                         <button id="btn-grid-toggle-mutation" style="
                            padding: 4px 12px;
                            font-size: 12px;
                            cursor: pointer;
                            background: #444;
                            color: white;
                            border: 1px solid #777;
                            border-radius: 4px;
                            font-weight: bold;
                        ">🧬 突變管理: 關</button>
                        <button id="btn-grid-manual-refresh" style="
                            padding: 4px 12px;
                            font-size: 12px;
                            cursor: pointer;
                            background: #555;
                            color: white;
                            border: 1px solid #777;
                            border-radius: 4px;
                        ">🔄 立即刷新狀態</button>
                    </div>

                    <div style="margin: 5px 10px; padding: 8px; background: rgba(0,0,0,0.2); border: 1px solid #444; border-radius: 4px;">
                        <label style="display:flex; align-items:center; justify-content:space-between; cursor:pointer; margin-bottom: 4px;">
                            <span style="font-weight:bold; font-size:13px; color:#fff;">🔄 啟用同步播種 (Sync Planting)</span>
                            <input type="checkbox" id="chk-garden-sync" ${Config.Flags.SyncPlanting ? 'checked' : ''}>
                        </label>
                        <!-- [v9.1.9] Sidebar Name Sync -->
                        <label style="display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
                             <span style="font-weight:bold; font-size:13px; color:#fff;">於側邊欄顯示陣型名稱</span>
                             <input type="checkbox" class="chk-sync-layout-name" ${Config.Flags.ShowLayoutName ? 'checked' : ''}>
                        </label>
                        <div id="sync-status-bar" style="margin-top: 6px; padding: 4px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; text-align: center; color: white; display: none;"></div>
                    </div>

                    <div style="margin-top: 5px; padding-top: 10px; border-top: 2px solid #8d6e63; width: 100%;">
                        <div id="grid-layout-title" style="text-align:center; font-weight:bold; color:#64b5f6; font-size:14px; margin-bottom:8px;">
                            📋 當前陣型清單
                        </div>
                        <ul id="cc-garden-current-layout" style="
                            list-style: none; padding: 0; margin: 0;
                            display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;
                            font-size: 13px; color: #ccc;
                        "></ul>
                        <div id="cc-garden-empty-hint" style="text-align: center; color: #777; font-size: 13px; padding: 10px; display: none;">
                            尚未記憶任何陣型
                        </div>
                    </div>

                    <!-- [v9.2.1] Sniper Controls transferred here -->
                    <div id="sniper-module-controls" style="display:none; margin-top: 10px; padding-top: 10px; border-top: 2px dashed #D500F9; width: 100%;">
                        <div style="text-align:center; font-weight:bold; color:#D500F9; font-size:14px; margin-bottom:8px;">
                            🎯 矩陣狙擊手陣型 (Slot)
                        </div>
                        <div style="display:flex; gap:5px; align-items:center; justify-content:center;">
                            <select id="grid-sel-sniper-slot" style="flex:1; padding:4px; max-width: 120px;"></select>
                            <button id="grid-btn-rename-sniper" style="padding:4px 8px; background:#444; color:white; border:1px solid #555; border-radius:3px; cursor:pointer;" title="重命名陣型">✏️</button>
                            <button id="grid-btn-sniper-load" style="padding:4px 12px; background:#2196f3; color:white; border:none; border-radius:3px; cursor:pointer; font-weight:bold;">讀取</button>
                            <button id="grid-btn-sniper-save" style="padding:4px 12px; background:#4caf50; color:white; border:none; border-radius:3px; cursor:pointer; font-weight:bold;">儲存</button>
                            <button id="grid-btn-sniper-clear" style="padding:4px 12px; background:#f44336; color:white; border:none; border-radius:3px; cursor:pointer; font-weight:bold;">清空</button>
                        </div>
                    </div>
                </div>
            `);

            $('body').append(this.Elements.Container);
            this.Elements.Container.find('#garden-grid-close').click(() => this.toggle());

            // 確保下拉選單初始化
            this.updateSniperSelector();

            $('#btn-grid-manual-refresh').click(() => UI.GardenGrid.update());

            $('#btn-grid-toggle-mutation').click(() => {
                Config.Flags.GardenMutation = !Config.Flags.GardenMutation;
                GM_setValue('isGardenMutationEnabled', Config.Flags.GardenMutation);
                $('#chk-garden-mutation').prop('checked', Config.Flags.GardenMutation);
                this.updateButtonState();
            });

            $('#chk-garden-sync').change(function() {
                const checked = this.checked;
                Config.Flags.SyncPlanting = checked;
                GM_setValue('isSyncPlantingEnabled', checked);
                $('#chk-main-sync').prop('checked', checked);
                if (!checked) {
                    UI.GardenGrid.updateStatus('hide');
                }
            });

            // v8.8.9 Group Select Listener
            $('#gardenGroupSelect').change(function() {
                const newGroupIdx = parseInt($(this).val());
                if (!Config.Memory.GardenProfiles) return;

                Config.Memory.GardenProfiles.activeGroup = newGroupIdx;
                GM_setValue('gardenProfiles', Config.Memory.GardenProfiles);

                UI.updateAllLayoutSelectors(); // Refresh layout options based on new group
                $('#gardenLayoutSelectGrid').trigger('change'); // Trigger layout load
            });

            // v8.8.9 Group Rename
            $('#btn-rename-group').click(function() {
                const profiles = Config.Memory.GardenProfiles;
                if (!profiles) return;

                const activeGroup = profiles.activeGroup;
                const oldName = profiles.groups[activeGroup].name;

                let newName = prompt('重新命名此群組:', oldName);
                if (newName === null) return;
                newName = newName.trim();
                if (newName === '') newName = `Group ${activeGroup + 1}`;
                if (newName.length > 20) newName = newName.substring(0, 20);

                profiles.groups[activeGroup].name = newName;
                GM_setValue('gardenProfiles', profiles);

                UI.updateAllLayoutSelectors();
                Logger.success('UI', `已將群組 ${activeGroup+1} 重新命名為 "${newName}"`);
            });

            $('#gardenLayoutSelectGrid').change(function() {
                const newSlot = parseInt($(this).val());
                Config.Memory.GardenSelectedSlot = newSlot;
                GM_setValue('gardenSelectedSlot', newSlot);

                // ✅ Safety Patch: Disable Mutation & Lock Spending
                Config.Flags.GardenMutation = false;
                GM_setValue('isGardenMutationEnabled', false);
                $('#chk-garden-mutation').prop('checked', false);
                UI.GardenGrid.updateButtonState();
                Logger.warn('花園保護', '切換陣型：已自動關閉突變管理');

                if (!Config.Flags.SpendingLocked) {
                    $('#chk-spending-lock').prop('checked', true).trigger('change');
                    Logger.warn('花園保護', `[Grid] 切換至 Slot ${newSlot + 1}，已啟用資金鎖定`);
                }

                Logic.Garden.loadLayout();
                Logic.Garden.updateOverlay();
                UI.GardenGrid.update();
                UI.updateAllLayoutSelectors();
            });

            $('#btn-rename-layout').click(function() {
                const profiles = Config.Memory.GardenProfiles;
                if (!profiles) return;

                const activeGroup = profiles.activeGroup;
                const slot = Config.Memory.GardenSelectedSlot;
                const group = profiles.groups[activeGroup];

                const oldName = group.slotNames[slot];

                let newName = prompt('重新命名此陣型:', oldName);
                if (newName === null) return;
                newName = newName.trim();
                if (newName === '') newName = `Layout ${slot + 1}`;
                if (newName.length > 20) newName = newName.substring(0, 20);

                // Update memory and save
                profiles.groups[activeGroup].slotNames[slot] = newName;
                GM_setValue('gardenProfiles', profiles);

                UI.updateAllLayoutSelectors();
                Logger.success('UI', `已將 Slot ${slot+1} 重新命名為 "${newName}"`);
            });

            // v8.8.9 & v9.2.1 Editing Modes Toggles
            const refreshEditingUI = () => {
                const title = $('#garden-grid-title');
                const btnEdit = $('#btn-toggle-edit-mode');
                const btnSniper = $('#btn-toggle-sniper-edit');
                const btnClear = $('#btn-clear-layout');
                const btnSave = $('#btn-save-layout');
                const btnRename = $('#btn-rename-layout');
                const btnLoad = $('#btn-load-live');
                const chkMutation = $('#lbl-include-mutation');
                const sniperControls = $('#sniper-module-controls');
                const topControls = $('#grid-top-controls');

                if (UI.GardenGrid.isEditing) {
                    btnEdit.text('❌ 放棄').css('background', '#f44336');
                    btnSniper.text('🎯 編輯監控區').css('background', '#673ab7').show();
                    btnClear.show(); btnSave.show(); btnLoad.show(); chkMutation.show(); btnRename.hide();
                    sniperControls.hide();
                    topControls.show();

                    const profiles = Config.Memory.GardenProfiles;
                    const groupName = profiles.groups[profiles.activeGroup].name;
                    const layoutName = profiles.groups[profiles.activeGroup].slotNames[Config.Memory.GardenSelectedSlot];
                    title.text(`[編輯藍圖] - ${groupName} / ${layoutName}`).css('color', '#ff9800');
                } else if (UI.GardenGrid.isSniperEditing) {
                    btnSniper.text('❌ 放棄').css('background', '#f44336');
                    btnEdit.text('📝 編輯模式').css('background', '#444').show();
                    btnClear.hide(); btnSave.hide(); btnLoad.hide(); chkMutation.hide(); btnRename.hide();
                    sniperControls.show();
                    topControls.hide(); // Hide normal layout selectors during sniper editing
                    title.text('🎯 [編輯中] - 矩陣狙擊手').css('color', '#D500F9');
                } else {
                    btnEdit.text('📝 編輯模式').css('background', '#444').show();
                    btnSniper.text('🎯 編輯監控區').css('background', '#673ab7').show();
                    btnClear.hide(); btnSave.hide(); btnLoad.hide(); chkMutation.hide(); btnRename.show();
                    sniperControls.hide();
                    topControls.show();
                    title.text('🗺️ 記憶陣型預覽').css('color', 'white');
                }
            };

            $('#btn-toggle-edit-mode').click(function() {
                if (UI.GardenGrid.isEditing) {
                    UI.GardenGrid.isEditing = false;
                } else {
                    UI.GardenGrid.isEditing = true;
                    UI.GardenGrid.isSniperEditing = false;
                }
                refreshEditingUI();
                UI.GardenGrid.update();
            });

            $('#btn-toggle-sniper-edit').click(function() {
                if (UI.GardenGrid.isSniperEditing) {
                    UI.GardenGrid.isSniperEditing = false;
                } else {
                    UI.GardenGrid.isSniperEditing = true;
                    UI.GardenGrid.isEditing = false;
                }
                refreshEditingUI();
                UI.GardenGrid.update();
            });

            $('#btn-save-layout').click(function() {
                // Call saving logic, which handles writing to profile and updating UI state
                Logic.Garden.saveLayout();
            });

            $('#btn-clear-layout').click(function() {
                if (confirm('確定要清空當前編輯的藍圖嗎？(此操作不可撤銷)')) {
                    $('#garden-grid-content input:not(:disabled)').val('').removeClass('cc-input-mutation');
                }
            });

            // [v9.2.1] Sniper Matrix Editor Logic (Added Rename feature)
            $('#grid-sel-sniper-slot').change(function() {
                Config.Memory.SniperSelectedSlot = parseInt(this.value);
                GM_setValue('sniperSelectedSlot', Config.Memory.SniperSelectedSlot);
                UI.GardenGrid.updateSniperSelector();
            });

            $('#grid-btn-rename-sniper').click(function() {
                const slot = Config.Memory.SniperSelectedSlot;
                const names = Config.Memory.SniperSlotNames;
                const oldName = names[slot];
                let newName = prompt('重新命名此監控陣型:', oldName);
                if (newName === null) return;
                newName = newName.trim();
                if (newName === '') newName = `Slot ${slot + 1}`;
                if (newName.length > 20) newName = newName.substring(0, 20);

                names[slot] = newName;
                GM_setValue('sniperSlotNames', names);
                UI.GardenGrid.updateSniperSelector();
                Logger.success('Sniper', `已將監控陣型 Slot ${slot+1} 重新命名為 "${newName}"`);
            });

            $('#grid-btn-sniper-save').click(function() {
                const slot = Config.Memory.SniperSelectedSlot;
                Config.Memory.SniperProfiles[slot] = JSON.stringify(Config.Memory.SniperGrid);
                GM_setValue('sniperProfiles', Config.Memory.SniperProfiles);
                UI.GardenGrid.updateSniperSelector(); // Refresh (Empty) status
                Logger.success('Sniper', `監控陣型已儲存至 Slot ${slot + 1}`);
            });

            $('#grid-btn-sniper-load').click(function() {
                const slot = Config.Memory.SniperSelectedSlot;
                const str = Config.Memory.SniperProfiles[slot];
                if (str && str !== '[]' && str !== '""') {
                    try {
                        const data = JSON.parse(str);
                        if (Array.isArray(data) && data.length === 6) {
                            Config.Memory.SniperGrid = data;
                            GM_setValue('sniperGrid', Config.Memory.SniperGrid);
                            if (UI.GardenGrid.isSniperEditing) UI.GardenGrid.update();
                            Logger.success('Sniper', `已載入 Slot ${slot + 1} 的監控陣型`);
                        }
                    } catch(e) { Logger.error('Sniper', '解析錯誤', e); }
                } else {
                    Logger.warn('Sniper', `Slot ${slot + 1} 是空的`);
                }
            });

            $('#grid-btn-sniper-clear').click(function() {
                if(confirm('確定要清空當前編輯的監控矩陣嗎？')) {
                    Config.Memory.SniperGrid = Array(6).fill().map(() => Array(6).fill(''));
                    GM_setValue('sniperGrid', Config.Memory.SniperGrid);
                    if (UI.GardenGrid.isSniperEditing) UI.GardenGrid.update();
                }
            });

            // v8.9.7 New Handlers
            $('#chk-editor-mutation').change(function() {
                Config.Flags.EditorIncludeMutations = this.checked;
                GM_setValue('isEditorIncludeMutations', this.checked);
            });

            $('#btn-load-live').click(function() {
                if (confirm('確定要讀取當前遊戲中的花園狀態嗎？(這將覆蓋編輯器中的內容)')) {
                    UI.GardenGrid.loadFromLive();
                }
            });

            $('#cc-btn-expand-left').click(() => this.toggleSide('left'));
            $('#cc-btn-expand-right').click(() => this.toggleSide('right'));

            $('#btn-expand-unlocked').click(function() {
                const c = $('#container-unlocked');
                c.toggleClass('cc-garden-list-expanded');
                $(this).text(c.hasClass('cc-garden-list-expanded') ? '▲' : '▼');
            });

            $('#btn-expand-locked').click(function() {
                const c = $('#container-locked');
                c.toggleClass('cc-garden-list-expanded');
                $(this).text(c.hasClass('cc-garden-list-expanded') ? '▲' : '▼');
            });

            if (Config.Memory.GardenLeftExpanded) this.toggleSide('left', true);
            if (Config.Memory.GardenRightExpanded) this.toggleSide('right', true);

            UI.makeDraggable(this.Elements.Container, 'gardenGridX', 'gardenGridY');

            this.updateButtonState();

            $(document).on('mouseenter', '#garden-grid-content > div.cc-grid-tile', function() {
                // Tooltip only in view mode
                if (UI.GardenGrid.isEditing || UI.GardenGrid.isSniperEditing) return;

                const normalizedId = $(this).data('normalized-id');
                if (typeof Game !== 'undefined' && Game.Objects['Farm'].minigame) {
                    const M = Game.Objects['Farm'].minigame;
                    let plant = null;
                    if (normalizedId > -1) {
                         plant = M.plantsById[normalizedId];
                    }
                    const savedId = $(this).data('saved-id');
                    if (plant || savedId > -1) {
                        const refPlant = plant || (savedId > -1 ? M.plantsById[savedId] : null);
                         if (refPlant) {
                            UI.Tooltip.show(this, refPlant, normalizedId, savedId);
                         }
                    }
                }
            }).on('mouseleave', '#garden-grid-content > div.cc-grid-tile', function() {
                UI.Tooltip.hide();
            });
        },

        updateButtonState: function() {
            const btn = $('#btn-grid-toggle-mutation');
            if (btn.length) {
                if (Config.Flags.GardenMutation) {
                    btn.text('🧬 突變管理: 開')
                       .css({ 'background': '#2e7d32', 'border-color': '#4caf50' });
                } else {
                    btn.text('🧬 突變管理: 關')
                       .css({ 'background': '#c62828', 'border-color': '#ff5252' });
                }
            }
        },

        updateStatus: function(type, value) {
            const barGrid = $('#sync-status-bar');
            const barProt = $('#prot-sync-status');

            if (!Config.Flags.SyncPlanting) {
                barGrid.hide();
                barProt.hide();
                return;
            }

            let bg = '', text = '';
            let show = true;

            if (type === 'funds') {
                bg = '#ff9800';
                text = `💰 資金不足: 缺 ${(value - Game.cookies).toLocaleString()}`;
            } else if (type === 'buff') {
                bg = '#9c27b0';
                text = '⛔ 暫停: 等待 Buff 結束';
            } else if (type === 'ready') {
                bg = '#4caf50';
                text = '✅ 同步播種運行中';
            } else {
                show = false;
            }

            if (show) {
                const style = { background: bg, display: 'block' };
                barGrid.css(style).text(text);
                barProt.css(style).text(text);
                barProt.css('font-size', '11px');
            } else {
                barGrid.hide();
                barProt.hide();
            }
        },

        toggle: function() {
            if (!this.Elements.Container) this.create();
            if (this.Elements.Container.is(':visible')) {
                this.Elements.Container.fadeOut(200);
            } else {
                this.update();
                this.updateButtonState();
                this.Elements.Container.fadeIn(200);
            }
        },

        toggleSide: function(side, forceOpen = null) {
            const drawer = $(`#drawer-${side}`);
            const btn = $(`#cc-btn-expand-${side}`);
            const container = this.Elements.Container;
            const drawerWidth = 220;
            const currentX = parseInt(container.css('left')) || Config.Memory.GardenGridX;

            let newX = currentX;

            const isOpen = forceOpen !== null ? forceOpen : !drawer.hasClass('open');

            if (isOpen) {
                if (side === 'left') {
                    newX = Math.max(0, currentX - drawerWidth);
                    container.css('left', newX + 'px');
                    Config.Memory.GardenGridX = newX;
                    GM_setValue('gardenGridX', newX);
                }
                drawer.addClass('open');
                btn.text(side === 'left' ? '▶ 收起' : '收起 ◀');
                Config.Memory[side === 'left' ? 'GardenLeftExpanded' : 'GardenRightExpanded'] = true;
                GM_setValue(side === 'left' ? 'gardenLeftExpanded' : 'gardenRightExpanded', true);
            } else {
                if (side === 'left') {
                    newX = currentX + drawerWidth;
                    container.css('left', newX + 'px');
                    Config.Memory.GardenGridX = newX;
                    GM_setValue('gardenGridX', newX);
                }
                drawer.removeClass('open');
                btn.text(side === 'left' ? '◀ 展開' : '展開 ▶');
                Config.Memory[side === 'left' ? 'GardenLeftExpanded' : 'GardenRightExpanded'] = false;
                GM_setValue(side === 'left' ? 'gardenLeftExpanded' : 'gardenRightExpanded', false);
            }
        },

        loadFromLive: function() {
            if (typeof Game === 'undefined' || !Game.Objects['Farm'].minigame) return;
            const M = Game.Objects['Farm'].minigame;

            for (let y = 0; y < 6; y++) {
                for (let x = 0; x < 6; x++) {
                    const input = $(`#garden-grid-content input[data-x="${x}"][data-y="${y}"]`);
                    if (input.length && !input.prop('disabled')) {
                        let newVal = '';
                        let addMutationClass = false;

                        if (M.isTileUnlocked(x, y)) {
                            const tile = M.plot[y][x];
                            if (tile[0] > 0) {
                                const plantId = tile[0] - 1;
                                const plant = M.plantsById[plantId];

                                if (plant) {
                                    if (plant.unlocked) {
                                        newVal = plantId;
                                    } else {
                                        // Mutation or Locked
                                        if (Config.Flags.EditorIncludeMutations) {
                                            newVal = plantId;
                                            addMutationClass = true;
                                        } else {
                                            newVal = ''; // Filter out
                                        }
                                    }
                                }
                            }
                        }

                        input.val(newVal);
                        if (addMutationClass) {
                            input.addClass('cc-input-mutation');
                        } else {
                            input.removeClass('cc-input-mutation');
                        }
                    }
                }
            }
            Logger.log('GardenEditor', '已讀取當前遊戲盤面');
        },

        update: function() {
            const gridContent = $('#garden-grid-content');
            gridContent.empty();

            // [v9.2.0] 添加座標表頭
            gridContent.append('<div></div>');['A', 'B', 'C', 'D', 'E', 'F'].forEach(l => {
                gridContent.append(`<div style="display:flex; align-items:center; justify-content:center; color:#8d6e63; font-weight:bold;">${l}</div>`);
            });

            const plot = Config.Memory.SavedGardenPlot;
            const unlockedList = $('#cc-garden-list-unlocked').empty();
            const lockedList = $('#cc-garden-list-locked').empty();
            const currentLayoutList = $('#cc-garden-current-layout').empty();
            const emptyHint = $('#cc-garden-empty-hint');
            const listTitle = $('#grid-layout-title'); // 取得標題元素

            let plantStats = {};

            if (typeof Game !== 'undefined' && Game.Objects['Farm'].minigame) {
                const M = Game.Objects['Farm'].minigame;
                const totalPlants = 34;
                let unlockedCount = 0;

                for (let y = 0; y < 6; y++) {
                    // [v9.2.0] 添加行號
                    gridContent.append(`<div style="display:flex; align-items:center; justify-content:center; color:#8d6e63; font-weight:bold;">${y + 1}</div>`);
                    for (let x = 0; x < 6; x++) {
                        const savedId = plot[y][x];

                        // [v9.2.1] Sniper Matrix Editor Logic
                        if (this.isSniperEditing) {
                            const mask = Config.Memory.SniperGrid[y][x];
                            const val = mask || '';
                            let colorStyle = '';
                            if (val === '21') colorStyle = 'color: #FFD700; font-weight: bold;';
                            else if (val === '*') colorStyle = 'color: #D500F9; font-weight: bold;';


                            const input = $(`
                                <input type="text" class="cc-grid-input"
                                    style="${colorStyle}"
                                    value="${val}"
                                    data-x="${x}" data-y="${y}"
                                >
                            `);

                            input.change(function() {
                                let rawVal = $(this).val().trim();
                                if (rawVal === '*') {
                                    Config.Memory.SniperGrid[y][x] = '*';
                                    $(this).css('color', '#D500F9').css('font-weight', 'bold');
                                } else if (rawVal !== '') {
                                    let v = parseInt(rawVal, 10);
                                    if (!isNaN(v) && v >= 0 && v <= 33) {
                                        Config.Memory.SniperGrid[y][x] = v.toString();
                                        if (v === 21) $(this).css('color', '#FFD700').css('font-weight', 'bold');
                                        else $(this).css('color', '#fff').css('font-weight', 'normal');
                                        $(this).val(v);
                                    } else {
                                        Config.Memory.SniperGrid[y][x] = '';
                                        $(this).val('').css('color', '#fff').css('font-weight', 'normal');
                                    }
                                } else {
                                    Config.Memory.SniperGrid[y][x] = '';
                                    $(this).css('color', '#fff').css('font-weight', 'normal');
                                }
                                GM_setValue('sniperGrid', Config.Memory.SniperGrid);
                            });

                            const wrapper = $('<div>').css({
                                width: '48px', height: '48px', border: '1px solid #D500F9'
                            }).append(input);

                            gridContent.append(wrapper);

                        } else if (this.isEditing) {
                            // v8.8.9 Edit Mode Rendering & Input Logic
                            const isUnlocked = M.isTileUnlocked(x, y);
                            const val = savedId > -1 ? savedId : '';
                            const disabledAttr = isUnlocked ? '' : 'disabled';

                            // v8.9.7 Style initialization
                            let mutationClass = '';
                            if (savedId > -1) {
                                const p = M.plantsById[savedId];
                                if (p && !p.unlocked) mutationClass = 'cc-input-mutation';
                            }

                            const input = $(`
                                <input type="text" class="cc-grid-input ${mutationClass}"
                                    value="${val}"
                                    data-x="${x}" data-y="${y}"
                                    data-saved-val="${savedId}"
                                    ${disabledAttr}
                                >
                            `);

                            // v8.8.9 Optimized Input Validation & v8.9.7 Dynamic Feedback
                            input.change(function() {
                                let rawVal = $(this).val().trim();

                                // Support clearing input
                                if (rawVal === '') {
                                    $(this).removeClass('cc-input-mutation');
                                    return;
                                }

                                let v = parseInt(rawVal, 10);
                                if (isNaN(v) || v < 0 || v > 33) {
                                    // Revert if invalid (not empty, not number, or out of bounds)
                                    const orig = $(this).data('saved-val');
                                    $(this).val(orig > -1 ? orig : '');

                                    // Restore style based on reverted value
                                    if (orig > -1) {
                                        const p = M.plantsById[orig];
                                        if (p && !p.unlocked) $(this).addClass('cc-input-mutation');
                                        else $(this).removeClass('cc-input-mutation');
                                    } else {
                                        $(this).removeClass('cc-input-mutation');
                                    }
                                } else {
                                    // Standardize format (e.g. "01" -> "1")
                                    $(this).val(v);

                                    // v8.9.7 Dynamic Visual Feedback
                                    const p = M.plantsById[v];
                                    if (p && !p.unlocked) {
                                        $(this).addClass('cc-input-mutation');
                                    } else {
                                        $(this).removeClass('cc-input-mutation');
                                    }
                                }
                            });

                            const wrapper = $('<div>').css({
                                width: '48px', height: '48px', border: '1px solid #555'
                            }).append(input);

                            gridContent.append(wrapper);

                        } else {
                            // Standard View Mode
                            const realTile = M.plot[y]?.[x] || [0, 0];
                            const gameId = realTile[0];

                            const normalizedId = (gameId === 0) ? -1 : gameId - 1;

                            let bg = '#111';
                            let stateClass = '';
                            let text = '';
                            let isUnlocked = M.isTileUnlocked(x, y);

                            if (isUnlocked) {
                                if (normalizedId > -1) {
                                    if (normalizedId === savedId) {
                                        bg = '#4caf50';
                                        stateClass = 'cc-dashboard-correct';
                                        text = normalizedId;
                                    } else {
                                        const plant = M.plantsById[normalizedId];
                                        if (plant && plant.unlocked) {
                                            bg = '#f44336';
                                            stateClass = 'cc-dashboard-weed';
                                        } else {
                                            bg = '#9c27b0';
                                            stateClass = 'cc-dashboard-new';
                                        }
                                        text = normalizedId;
                                    }
                                } else {
                                    if (savedId > -1) {
                                        // v8.8.9: 檢查是否已解鎖，提供視覺回饋
                                        const seed = M.plantsById[savedId];
                                        if (seed && !seed.unlocked) {
                                            bg = '#616161';
                                            stateClass = 'cc-dashboard-locked';
                                            text = '🔒';
                                        } else {
                                            bg = '#1565c0';
                                            stateClass = 'cc-dashboard-missing';
                                            text = savedId;
                                        }
                                    } else {
                                        text = '';
                                    }
                                }
                            } else {
                                bg = '#000';
                                text = '';
                            }

                            if (savedId > -1) {
                                const localName = UI.getLocalizedPlantName(savedId + 1);
                                if (localName) {
                                    if (!plantStats[savedId]) plantStats[savedId] = { name: localName, count: 0 };
                                    plantStats[savedId].count++;
                                }
                            }

                            gridContent.append(`
                                <div class="cc-grid-tile ${stateClass}" style="
                                    background:${bg}; border:1px solid #444; border-radius:4px;
                                    display:flex; align-items:center; justify-content:center;
                                    font-size:14px; font-weight:bold; color:white;
                                    transition: transform 0.2s; cursor: default;
                                " data-x="${x}" data-y="${y}" data-normalized-id="${normalizedId}" data-saved-id="${savedId}">
                                    ${text}
                                </div>
                            `);
                        }
                    }
                }

                for (let i = 0; i < totalPlants; i++) {
                    const plant = M.plantsById[i];
                    const localName = UI.getLocalizedPlantName(plant.id + 1);
                    if (plant && plant.unlocked) {
                        unlockedCount++;
                        unlockedList.append(`
                            <li><span style="color:#aaa; display:inline-block; width:24px;">[${plant.id}]</span> ${localName}</li>
                        `);
                    }
                }
                if (unlockedCount === 0) unlockedList.append('<li style="color:#777;">(無)</li>');

                let lockedCount = 0;
                for (let i = 0; i < totalPlants; i++) {
                    const plant = M.plantsById[i];
                    const localName = UI.getLocalizedPlantName(plant.id + 1);
                    if (plant && !plant.unlocked) {
                        lockedCount++;
                        lockedList.append(`
                            <li><span style="color:#aaa; display:inline-block; width:24px;">[${plant.id}]</span> ${localName}</li>
                        `);
                    }
                }
                if (lockedCount === 0) lockedList.append('<li style="color:#4caf50;">✓ 全解鎖!</li>');

                //[v9.2.1] 動態插入/更新教學區塊
                let sniperHint = $('#sniper-instruction-hint');
                if (sniperHint.length === 0) {
                    $('#cc-garden-empty-hint').after(`
                        <div id="sniper-instruction-hint" style="display: none; padding: 10px; background: rgba(103, 58, 183, 0.2); border-left: 4px solid #D500F9; border-radius: 4px; font-size: 13px; color: #ddd; line-height: 1.6; margin-top: 5px;">
                            <div style="color: #D500F9; font-weight: bold; margin-bottom: 5px; font-size: 14px;">💡 矩陣狙擊手設定說明：</div>
                            1. <b>A1:F6</b> 網格為監控儲存格，點擊空格輸入目標。<br>
                            2. 輸入 <b style="color:#FFD700;">ID (0~33)</b>：若該格長出指定植物，會觸發 <span style="color:#FFD700; font-weight:bold;">金色警報</span> (如 JQB=21)。<br>
                            3. 輸入 <b style="color:#D500F9;">* (星號)</b>：若該格長出任何<span style="text-decoration:underline;">未解鎖變異</span>，會觸發 <span style="color:#D500F9; font-weight:bold;">紫色警報</span>。<br>
                            <i style="color:#aaa;">(警報觸發時，頁籤會動態改變圖示，並自動啟動防護阻止腳本重啟)</i>
                        </div>
                    `);
                    sniperHint = $('#sniper-instruction-hint');
                }

                if (this.isSniperEditing) {
                    // 監控模式：隱藏陣型清單，顯示教學
                    listTitle.hide();
                    currentLayoutList.hide();
                    emptyHint.hide();
                    sniperHint.show();
                } else {
                    // 編輯藍圖/檢視模式：顯示陣型清單，隱藏教學
                    listTitle.show();
                    sniperHint.hide();

                    const sortedIds = Object.keys(plantStats).map(Number).sort((a, b) => a - b);
                    if (sortedIds.length > 0) {
                        emptyHint.hide();
                        currentLayoutList.show();
                        sortedIds.forEach(id => {
                            const data = plantStats[id];
                            currentLayoutList.append(`
                                <li style="
                                    padding: 6px 10px; background: rgba(13, 71, 161, 0.3);
                                    border-left: 4px solid #42a5f5; border-radius: 4px;
                                    display: flex; justify-content: space-between; align-items: center;
                                ">
                                    <div><span style="color:#aaa;">[${id}]</span> ${data.name}</div>
                                    <b style="color:#ffd700;">x${data.count}</b>
                                </li>
                            `);
                        });
                    } else {
                        currentLayoutList.hide();
                        emptyHint.show();
                    }
                }

                const progressColor = unlockedCount === totalPlants ? '#4caf50' : '#ffd700';
                $('#cc-garden-progress').text(`${unlockedCount}/${totalPlants}`).css('color', progressColor);

            } else {
                gridContent.html('<div style="grid-column:1/-1; text-align:center; color:#999; padding:20px;">花園未加載</div>');
                emptyHint.show();
                currentLayoutList.hide();
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // Rich Tooltip 模組
    // ═══════════════════════════════════════════════════════════════
    UI.Tooltip = {
        Elements: { Container: null },

        create: function() {
            if (this.Elements.Container) return;

            this.Elements.Container = $(`
                <div id="cc-tooltip"></div>
            `);

            $('body').append(this.Elements.Container);
        },

        show: function(element, plant, normalizedId, savedId) {
            if (!this.Elements.Container) this.create();

            const M = Game.Objects['Farm'].minigame;

            let displayPlant = plant;
            if (!displayPlant && savedId > -1) {
                displayPlant = M.plantsById[savedId];
            }

            if (!displayPlant) {
                this.hide();
                return;
            }

            const plantName = UI.cleanName(displayPlant.name);

            let price = 0;
            try {
                price = M.getCost(displayPlant);
            } catch(e) {
                price = 0;
            }

            const affordable = Game.cookies >= price;
            const priceText = typeof Beautify !== 'undefined' ? Beautify(price) : Math.round(price).toLocaleString();

            let statusText = '';
            let statusClass = '';

            if (normalizedId === -1 && savedId > -1) {
                statusText = '🔵 缺種子';
                statusClass = 'status-missing';
            } else if (normalizedId === savedId) {
                statusText = '🟢 正確';
                statusClass = 'status-correct';
            } else if (normalizedId > -1) {
                const realPlant = M.plantsById[normalizedId];
                if (realPlant) {
                    if (realPlant.unlocked) {
                        statusText = `🔴 異常: ${UI.cleanName(realPlant.name)}`;
                        statusClass = 'status-weed';
                    } else {
                        statusText = `🟣 變異: ${UI.cleanName(realPlant.name)}`;
                        statusClass = 'status-new';
                    }
                } else {
                    statusText = '🟣 異常';
                    statusClass = 'status-new';
                }
            } else if (savedId === -1) {
                statusText = '⚫ 未設定';
                statusClass = 'status-locked';
            }

            this.Elements.Container.empty();

            const $name = $('<div>').addClass('tooltip-name').text(plantName);

            const $priceVal = $('<span>')
                .addClass(affordable ? 'price-affordable' : 'price-unaffordable')
                .text(priceText + ' 🍪');

            const $priceDiv = $('<div>').addClass('tooltip-price')
                .append($('<span>').text('價格: '))
                .append($priceVal);

            const $status = $('<div>').addClass('tooltip-status ' + statusClass).text(statusText);

            this.Elements.Container.append($name).append($priceDiv).append($status);

            const rect = element.getBoundingClientRect();
            const tooltipWidth = this.Elements.Container.outerWidth();
            const tooltipHeight = this.Elements.Container.outerHeight();

            let left = rect.right + 10;
            let top = rect.top;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - 10;
            }

            if (top + tooltipHeight > window.innerHeight) {
                top = window.innerHeight - tooltipHeight - 10;
            }
            if (top < 10) {
                top = 10;
            }

            this.Elements.Container.css({
                left: left + 'px',
                top: top + 'px',
                display: 'block'
            });
        },

        hide: function() {
            if (this.Elements.Container) {
                this.Elements.Container.hide();
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // [v9.2.0] Favicon 繪製引擎
    // ═══════════════════════════════════════════════════════════════
    UI.Favicon = {
        lastText: null,
        lastType: null,
        originalIcon: 'https://orteil.dashnet.org/cookieclicker/img/favicon.ico',
        generate: function(text, type) {
            if (this.lastText === text && this.lastType === type) return;
            this.lastText = text;
            this.lastType = type;
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            if (type === 'Gold') {
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(0, 0, 32, 32);
                ctx.fillStyle = '#000000';
            } else {
                ctx.fillStyle = '#D500F9';
                ctx.fillRect(0, 0, 32, 32);
                ctx.fillStyle = '#FFFFFF';
            }
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `bold ${Config.Settings.SniperFontSize}px Arial`;
            ctx.fillText(text, 16, 16 + 2); // 稍微下調對齊
            const dataUrl = canvas.toDataURL('image/png');
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            if (link.rel === 'icon' || !document.querySelector("link[rel*='icon']")) link.rel = 'icon';
            link.href = dataUrl;
            document.head.appendChild(link);
        },
        restore: function() {
            if (this.lastText === null) return;
            this.lastText = null;
            this.lastType = null;
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'icon';
            link.href = this.originalIcon;
            document.head.appendChild(link);
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // 花園保護模組
    // ═══════════════════════════════════════════════════════════════
    UI.GardenProtection = {
        Elements: {
            Container: null,
            EmbeddedControls: null
        },
        SavedStates: { Buy: null, Garden: null, Research: null, Stock: null },
        _cachedGardenPanel: null,

        create: function() {
            if (this.Elements.Container) return;
            const Farm = Game.Objects['Farm'];
            if (!Farm || !Farm.minigameLoaded) return;

            const checkGardenPanel = () => {
                const gardenPlot = document.getElementById('gardenPlot');
                if (!gardenPlot) {
                    setTimeout(checkGardenPanel, 500);
                    return;
                }

                this.createProtectionUI(gardenPlot);
                this.createEmbeddedControls(gardenPlot);
            };

            checkGardenPanel();
        },

        createProtectionUI: function(gardenPanel) {
            this.Elements.Container = $(`
                <div id="garden-protection-ui" style="
                    position: absolute; left: ${Config.Memory.GardenProtectionX}px; top: ${Config.Memory.GardenProtectionY}px;
                    width: 260px; background: rgba(0, 0, 0, 0.9); color: white; border: 2px solid #81c784;
                    border-radius: 8px; padding: 12px; z-index: 10000; font-family: Arial, sans-serif;
                    box-shadow: 0 4px 20px rgba(129, 199, 132, 0.5); cursor: move; display: none;
                ">
                    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px; text-align: center; border-bottom: 1px solid #81c784; padding-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <span>🛡️ 花園保護模式</span>
                        <div class="cc-close-btn" id="garden-prot-minimize">_</div>
                    </div>

                    <div style="margin-bottom: 8px;">
                        <select id="gardenLayoutSelect" style="
                            width: 100%; padding: 5px; background: #333; color: #fff;
                            border: 1px solid #555; border-radius: 4px; font-size: 13px;
                        "></select>
                    </div>

                    <label id="spending-lock-label" style="display: flex; align-items: center; font-size: 13px; cursor: pointer; padding: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; transition: background 0.3s;">
                        <input type="checkbox" id="chk-spending-lock" style="margin-right: 8px; width: 16px; height: 16px;">
                        <span style="flex: 1;">🔒 立刻停止支出</span>
                    </label>

                    <div id="prot-sync-status" style="margin-top: 6px; padding: 4px 8px; border-radius: 3px; font-size: 11px; font-weight: bold; text-align: center; color: white; display: none;"></div>

                    <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                        <button id="btn-toggle-mutation-panel" style="
                            width: 100%; padding: 6px; margin-bottom: 8px;
                            background: #d84315; color: white; border: none;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                        ">🧬 突變管理: 關</button>

                        <button id="btn-save-garden-layout" style="
                            flex: 1; padding: 8px; background: #2196f3; color: white; border: none;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                            transition: background 0.3s;
                        ">💾 記憶陣型</button>
                        <button id="btn-show-grid" style="
                            flex: 1; padding: 8px; background: #8d6e63; color: white; border: none;
                            border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;
                            transition: background 0.3s;
                        ">🗺️ 顯示記憶</button>
                    </div>

                    <div style="margin-top: 10px; font-size: 11px; color: #ffcccc; text-align: center; line-height: 1.4;">
                        勾選後將鎖定：<br>購買 (誓約除外) | 花園 | 科技 | 股市
                    </div>
                </div>
            `);

            $(gardenPanel).append(this.Elements.Container);

            this.Elements.Container.find('#garden-prot-minimize').click(() => {
                this.minimize();
            });

            $('#spending-lock-label').hover(
                function() { $(this).css('background', 'rgba(255, 255, 255, 0.2)'); },
                function() { $(this).css('background', 'rgba(255, 255, 255, 0.1)'); }
            );
            $('#btn-save-garden-layout').hover(
                function() { $(this).css('background', '#1976d2'); },
                function() { $(this).css('background', '#2196f3'); }
            );
            $('#btn-show-grid').hover(
                function() { $(this).css('background', '#795548'); },
                function() { $(this).css('background', '#8d6e63'); }
            );

            this.bindEvents();
            UI.updateAllLayoutSelectors();
            UI.makeDraggable(this.Elements.Container, 'gardenProtectionX', 'gardenProtectionY');
        },

        createEmbeddedControls: function(gardenPlot) {
            if (this.Elements.EmbeddedControls) return;

            // 🟢 Critical Fix: Mount to #gardenField (as requested)
            const target = $('#gardenField');
            if (target.length === 0) return;

            // 🟢 Fix: Apply inline style overriding to ensure correct positioning (top: 50px)
            this.Elements.EmbeddedControls = $(`
                <div id="cc-embed-right" style="position: absolute; top: 50px; right: 0; height: calc(100% - 50px); display: flex; flex-direction: column; justify-content: flex-start; gap: 8px; z-index: 1000; pointer-events: none; padding-top: 4px; padding-right: 2px;">
                    <button class="cc-embed-btn" id="btn-embed-restore" title="恢復大面板">🔼</button>
                    <div style="height: 2px;"></div>
                    <button class="cc-embed-btn" id="btn-embed-toggle-lock" title="狀態切換">
                    </button>
                    <button class="cc-embed-btn" id="btn-embed-toggle-mutation" title="突變管理">變</button>
                    <button class="cc-embed-btn" id="btn-embed-toggle-sniper" title="多重宇宙狙擊手">監</button>
                    <div style="height: 2px;"></div>
                    <button class="cc-embed-btn" id="btn-embed-save" title="記憶">💾</button>
                    <button class="cc-embed-btn" id="btn-embed-show" title="顯示">🗺️</button>
                </div>
            `);

            target.append(this.Elements.EmbeddedControls);

            this.bindEmbeddedEvents();
            this.updateEmbeddedState();
            this.updateEmbeddedVisibility();
        },

//[v9.1.9] Create Sidebar HUD (Fix: Absolute Position, No Layout Shift)
        createSidebarHUD: function() {
            const parent = document.getElementById('cc-embed-right');
            if (!parent) return; // 安全檢查

            // 避免重複創建
            if (document.getElementById('cc-layout-name-display')) return;

            const div = document.createElement('div');
            div.id = 'cc-layout-name-display';

            div.style.cssText = `
                font-size: 22px;          /* 字型大小 */
                color: #ffd700;           /* 金色文字 */

                /* [關鍵修正] 絕對定位：脫離 Flex 隊伍，獨立浮動 */
                position: absolute;
                bottom: 15px;              /* 固定在容器最底部 (紅框處) */
                right: 2px;               /* 靠右對齊 */

                writing-mode: horizontal-tb; /* 橫向書寫 */
                text-shadow: 1px 1px 2px #000;
                cursor: default;
                pointer-events: none;
                font-weight: bold;
                display: none;            /* 預設隱藏，由 Flag 控制 */

                white-space: nowrap;      /* 強制不換行 */
                text-align: right;        /* 文字內容靠右 */
                line-height: 1.1;
                z-index: 1001;            /* 確保在最上層 */
            `;

            parent.appendChild(div);
        },

        //[v9.1.9] Update Display Text
        updateLayoutNameDisplay: function() {
            const el = document.getElementById('cc-layout-name-display');
            if (!el) {
                if (Config.Flags.ShowLayoutName) this.createSidebarHUD();
                return;
            }

            if (!Config.Flags.ShowLayoutName) {
                el.style.display = 'none';
                return;
            }

            // 獲取當前陣型名稱
            const profiles = Config.Memory.GardenProfiles;
            const slot = Config.Memory.GardenSelectedSlot;
            let name = "Unknown";
            if (profiles && profiles.groups) {
                const group = profiles.groups[profiles.activeGroup];
                if (group && group.slotNames) {
                    name = group.slotNames[slot] || `Slot ${slot+1}`;
                }
            }

            el.innerText = name;
            el.style.display = 'block';
        },

			bindEmbeddedEvents: function() {
            const self = this;

            $('#btn-embed-restore').click(() => {
                this.restore();
            });

            // [v9.1.3.1] 改為直接調用 toggle，修復點擊無反應的問題
            $('#btn-embed-toggle-lock').click(() => {
                const newState = !Config.Flags.SpendingLocked;

                // 1. 直接執行核心切換 (不依賴 Checkbox 事件)
                self.toggle(newState);

                // 2. 立即更新自身按鈕外觀 (紅/綠)
                self.updateEmbeddedState();

                // 3. 反向同步大面板的 Checkbox 狀態 (視覺同步)
                $('#chk-spending-lock').prop('checked', newState);
            });

            // [v9.1.0] Embedded Mutation Toggle
            $('#btn-embed-toggle-mutation').click(() => {
                Config.Flags.GardenMutation = !Config.Flags.GardenMutation;
                GM_setValue('isGardenMutationEnabled', Config.Flags.GardenMutation);
                $('#chk-garden-mutation').prop('checked', Config.Flags.GardenMutation);
                self.updateEmbeddedState();
            });

            // [v9.2.1] Embedded Sniper Toggle
            $('#btn-embed-toggle-sniper').click(() => {
                Config.Flags.SniperMode = !Config.Flags.SniperMode;
                GM_setValue('isSniperModeEnabled', Config.Flags.SniperMode);
                $('#chk-sniper-mode').prop('checked', Config.Flags.SniperMode);
                self.updateEmbeddedState();
            });

            $('#btn-embed-save').click(() => {
                this.saveCurrentLayout();
            });

            $('#btn-embed-show').click(() => {
                UI.GardenGrid.toggle();
            });
        },

        updateEmbeddedState: function() {
            const btn = $('#btn-embed-toggle-lock');
            const mutBtn = $('#btn-embed-toggle-mutation');
            const mainMutBtn = $('#btn-toggle-mutation-panel');
            const sniperBtn = $('#btn-embed-toggle-sniper');

            // [v9.3.0] Task B: Apply user customized colors
            if (btn.length) {
                if (Config.Flags.SpendingLocked) {
                    btn.html('鎖').css({
                        'background': Config.Settings.ColorLockActive,
                        'border-color': '#ffcdd2'
                    }).attr('title', '目前已停止支出，點擊以恢復');
                } else {
                    btn.html('開').css({
                        'background': Config.Settings.ColorLockInactive,
                        'border-color': '#c8e6c9'
                    }).attr('title', '目前允許支出，點擊以鎖定');
                }
            }

            if (mutBtn.length) {
                if (Config.Flags.SpendingLocked) {
                    mutBtn.css({ opacity: 0.5, 'pointer-events': 'none', filter: 'grayscale(100%)' });
                } else {
                    mutBtn.css({ opacity: 1, 'pointer-events': 'auto', filter: 'none' });
                    if (Config.Flags.GardenMutation) {
                        mutBtn.text('變').css({'background': Config.Settings.ColorMutActive, 'border-color': '#ba68c8'});
                    } else {
                        mutBtn.text('否').css({'background': Config.Settings.ColorMutInactive, 'border-color': '#ffab91'});
                    }
                }
            }

            // [v9.3.0] Sniper Colors Update
            if (sniperBtn.length) {
                if (Config.Flags.SniperMode) {
                    sniperBtn.text('監').css({'background': Config.Settings.ColorSniperActive, 'border-color': '#ffd700'});
                } else {
                    sniperBtn.text('停').css({'background': Config.Settings.ColorSniperInactive, 'border-color': '#ffcdd2'});
                }
            }

            if (mainMutBtn.length) {
                if (Config.Flags.SpendingLocked) {
                     mainMutBtn.prop('disabled', true).css('opacity', '0.5');
                } else {
                     mainMutBtn.prop('disabled', false).css('opacity', '1');
                     if (Config.Flags.GardenMutation) {
                         mainMutBtn.text('🧬 突變管理: 開').css({'background': '#4caf50'});
                     } else {
                         mainMutBtn.text('🧬 突變管理: 關').css({'background': '#d84315'});
                     }
                }
            }

            this.updateLayoutNameDisplay();
        },

        updateEmbeddedVisibility: function() {
            if (!this.Elements.EmbeddedControls) return;

            if (Config.Memory.GardenProtectionMinimized) {
                this.Elements.EmbeddedControls.show();
            } else {
                this.Elements.EmbeddedControls.hide();
            }
        },

        bindEvents: function() {
            $('#chk-spending-lock').change(function() {
                UI.GardenProtection.toggle(this.checked);
                UI.GardenProtection.updateEmbeddedState();
            });
            $('#btn-save-garden-layout').click(function() { UI.GardenProtection.saveCurrentLayout(); });
            $('#btn-show-grid').click(function() { UI.GardenGrid.toggle(); });

            // [v9.1.0] Main Panel Mutation Toggle
            $('#btn-toggle-mutation-panel').click(function() {
                Config.Flags.GardenMutation = !Config.Flags.GardenMutation;
                GM_setValue('isGardenMutationEnabled', Config.Flags.GardenMutation);
                $('#chk-garden-mutation').prop('checked', Config.Flags.GardenMutation);
                UI.GardenProtection.updateEmbeddedState();
            });

            $('#gardenLayoutSelect').change(function() {
                const newSlot = parseInt($(this).val());
                Config.Memory.GardenSelectedSlot = newSlot;
                GM_setValue('gardenSelectedSlot', newSlot);

                // ✅ Safety Patch: Disable Mutation & Lock Spending
                Config.Flags.GardenMutation = false;
                GM_setValue('isGardenMutationEnabled', false);
                $('#chk-garden-mutation').prop('checked', false);
                UI.GardenGrid.updateButtonState();
                Logger.warn('花園保護', '切換陣型：已自動關閉突變管理');

                if (!Config.Flags.SpendingLocked) {
                    $('#chk-spending-lock').prop('checked', true).trigger('change');
                    Logger.warn('花園保護', `[Panel] 切換至 Slot ${newSlot + 1}，已啟用資金鎖定`);
                }

                Logic.Garden.loadLayout();
                Logic.Garden.updateOverlay();
                if ($('#garden-grid-panel').is(':visible')) {
                    UI.GardenGrid.update();
                }
                UI.updateAllLayoutSelectors();
            });
        },

        minimize: function() {
            if (this.Elements.Container) {
                this.Elements.Container.hide();
            }

            if (this.Elements.EmbeddedControls) {
                this.Elements.EmbeddedControls.show();
            }

            Config.Memory.GardenProtectionMinimized = true;
            GM_setValue('gardenProtectionMinimized', true);

            Logger.log('花園保護', '面板已最小化（使用右側嵌入式控制台）');
        },

        restore: function() {
            if (this.Elements.EmbeddedControls) {
                this.Elements.EmbeddedControls.hide();
            }

            if (this.Elements.Container && Config.Flags.ShowGardenProtection) {
                this.Elements.Container.show();
            }

            Config.Memory.GardenProtectionMinimized = false;
            GM_setValue('gardenProtectionMinimized', false);

            Logger.log('花園保護', '面板已恢復');
        },

        toggle: function(enabled, uiOnly = false) {
            if (enabled) {
                if (!uiOnly) {
                    this.SavedStates.Buy = Config.Flags.Buy;
                    this.SavedStates.Garden = Config.Flags.Garden;
                    this.SavedStates.Research = Config.Flags.Research;
                    this.SavedStates.Stock = Config.Flags.Stock;
                    this.SavedStates.GardenMutation = Config.Flags.GardenMutation; // ✅ Include Mutation

                    Config.Memory.SavedSpendingStates = { ...this.SavedStates };
                    GM_setValue('savedSpendingStates', Config.Memory.SavedSpendingStates);
                    GM_setValue('spendingLocked', true);
                }

                // ✅ Safety Patch: Disable Mutation when Locking
                Config.Flags.GardenMutation = false;
                GM_setValue('isGardenMutationEnabled', false);
                $('#chk-garden-mutation').prop('checked', false);
                UI.GardenGrid.updateButtonState();

                Config.Flags.Garden = false;
                Config.Flags.Research = false;
                Config.Flags.Stock = false;

                const buyChk = $('#chk-auto-buy');
                if (this.SavedStates.Buy) {
                    buyChk.prop('checked', true).prop('disabled', true).css('opacity', '0.5').parent().attr('title', '資金保護中：僅允許購買誓約');
                } else {
                    buyChk.prop('checked', false).prop('disabled', true).css('opacity', '0.5');
                }

                $('#chk-auto-garden').prop('checked', false).prop('disabled', true).css('opacity', '0.5');
                $('#chk-research').prop('checked', false).prop('disabled', true).css('opacity', '0.5');
                $('#chk-stock').prop('checked', false).prop('disabled', true).css('opacity', '0.5');

                // Mutation Checkbox Visual Update
                $('#chk-garden-mutation').prop('disabled', true).css('opacity', '0.5');

                this.showLockWarning();
                if (!uiOnly) Logger.log('花園保護', '已啟用支出鎖定 (允許誓約)');

            } else {
                Config.Flags.Buy = this.SavedStates.Buy !== null ? this.SavedStates.Buy : true;
                Config.Flags.Garden = this.SavedStates.Garden !== null ? this.SavedStates.Garden : true;
                Config.Flags.Research = this.SavedStates.Research !== null ? this.SavedStates.Research : true;
                Config.Flags.Stock = this.SavedStates.Stock !== null ? this.SavedStates.Stock : true;
                Config.Flags.GardenMutation = this.SavedStates.GardenMutation !== null ? this.SavedStates.GardenMutation : false; // ✅ Restore Mutation

                $('#chk-auto-buy').prop('checked', Config.Flags.Buy).prop('disabled', false).css('opacity', '1').parent().removeAttr('title');
                $('#chk-auto-garden').prop('checked', Config.Flags.Garden).prop('disabled', false).css('opacity', '1');
                $('#chk-research').prop('checked', Config.Flags.Research).prop('disabled', false).css('opacity', '1');
                $('#chk-stock').prop('checked', Config.Flags.Stock).prop('disabled', false).css('opacity', '1');

                // Restore Mutation Checkbox
                $('#chk-garden-mutation').prop('checked', Config.Flags.GardenMutation).prop('disabled', false).css('opacity', '1');
                GM_setValue('isGardenMutationEnabled', Config.Flags.GardenMutation);
                UI.GardenGrid.updateButtonState();

                this.hideLockWarning();
                if (!uiOnly) {
                    GM_setValue('spendingLocked', false);
                    this.SavedStates = { Buy: null, Garden: null, Research: null, Stock: null, GardenMutation: null };
                    Logger.log('花園保護', '已解除支出鎖定');
                }
            }
            Config.Flags.SpendingLocked = enabled;

            if ($('#chk-finance-lock').length) {
                $('#chk-finance-lock').prop('checked', enabled);
            }

            if (UI.updateEmbeddedState) UI.updateEmbeddedState();
        },

        showLockWarning: function() {
            const panel = $('#cookie-control-panel');
            if (panel.length && !$('#spending-lock-warning').length) {
                const warning = $(`
                    <div id="spending-lock-warning" style="
                        background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%); color: white; padding: 12px;
                        text-align: center; font-weight: bold; font-size: 14px; border-bottom: 2px solid rgba(255,255,255,0.3);
                        animation: pulse 2s infinite;
                    ">🔒 支出已鎖定 | 花園保護模式啟用中</div>
                    <style>@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }</style>
                `);
                panel.prepend(warning);
            }
        },

        hideLockWarning: function() { $('#spending-lock-warning').remove(); },

        updateVisibility: function() {
            if (!this.Elements.Container || !this.Elements.EmbeddedControls) return;

            const gardenPanel = $('#gardenPanel');
            const isGardenOpen = gardenPanel.length > 0 && gardenPanel.is(':visible');
            const now = Date.now();
            const warmupRemaining = Runtime.Timers.GardenWarmup - now;

            if (isGardenOpen && Config.Flags.ShowGardenProtection) {
                if (warmupRemaining > 0) {
                    const container = this.Elements.Container;

                    if (Config.Memory.GardenProtectionMinimized) {
                        Runtime.WarmupForceShown = true;
                    }

                    container.show();
                    container.addClass('cc-warmup-shield');
                    this.Elements.EmbeddedControls.hide();

                    const title = container.find('span').first();
                    const remainingSeconds = Math.ceil(warmupRemaining / 1000);
                    title.text(`🛡️ 暖機保護 (${remainingSeconds}s)`);

                } else {
                    this.Elements.Container.removeClass('cc-warmup-shield');
                    const title = this.Elements.Container.find('span').first();
                    title.text('🛡️ 花園保護模式');

                    if (Runtime.WarmupForceShown) {
                        this.minimize();
                        Runtime.WarmupForceShown = false;
                        Logger.log('花園保護', '暖機結束，自動化已就緒');
                    } else {
                        if (Config.Memory.GardenProtectionMinimized) {
                            this.Elements.Container.hide();
                            this.Elements.EmbeddedControls.show();
                        } else {
                            this.Elements.Container.fadeIn(200);
                            this.Elements.EmbeddedControls.hide();
                        }
                    }
                }
            } else {
                this.Elements.Container.fadeOut(200);
                this.Elements.EmbeddedControls.hide();
                this.Elements.Container.removeClass('cc-warmup-shield');
            }
        },

        saveCurrentLayout: function() {
            Logic.Garden.saveLayout();
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // 2. 核心邏輯模組 (Logic Fix v9.2.1 Matrix Sniper)
    // ═══════════════════════════════════════════════════════════════
    const Logic = {
        // [v9.1.3] 系統狀態檢查
        checkBusyState: function() {
            // [v9.2.0/9.2.1] Sniper System 安全防護：狙擊到目標時，自動啟動防護，阻止頁面重啟
            if (Runtime.GardenState && Runtime.GardenState.sniperActiveCoord !== null) {
                return true;
            }

            // 1. Godzamok 檢查 (憲法級防護)
            // isActive: 正在執行買賣 (資金變動中)
            // mutationRestoreTimer: 戒嚴恢復期 (變異開關暫時關閉中) -> 最關鍵檢查點！
            if (Runtime.GodzamokState.isActive || Runtime.GodzamokState.mutationRestoreTimer !== null) {
                return true;
            }

            // 2. 戰鬥狀態檢查 (保護大 Buff)
            // 若處於 Dragonflight, Click Frenzy 等狀態，視為忙碌，不應重啟
            if (Logic.isCombatState()) {
                return true;
            }

            return false;
        },

        // [v8.9.2] 戰鬥狀態判定：區分「爆發增益」與「一般狀態」
        // 目的：在 Dragonflight, Cursed Finger, Cookie Storm 等高負載/高收益期間，暫停低優先級後勤
        isCombatState: function() {
            if (!Game.buffs) return false;
            for (let i in Game.buffs) {
                const b = Game.buffs[i];
                // 判定標準：任何讓產量或點擊變強的 Buff 都視為戰鬥
                // 包含：Frenzy(x7), Storm(x7), Dragonflight(x1111), Cursed Finger(Click^)
                // 排除：Clot(x0.5), Loans(CpS-), Haggler's(Cost+)
                if ((b.multCpS > 1) || (b.multClick > 1)) {
                    return true;
                }
            }
            return false;
        },

        // ✅ Feature: Gambler (v8.8.3 Updated)
        Gambler: {
            spin: function() {
                const M = Game.Objects['Wizard tower'].minigame;
                if (!M) {
                    Logger.error('Gambler', '魔法塔小遊戲尚未解鎖');
                    return;
                }

                const spellHoF = M.spells['hand of fate'];
                const spellStretch = M.spells['stretch time'];
                const cost = M.getSpellCost(spellHoF) + M.getSpellCost(spellStretch);

                if (M.magic < cost) {
                    Logger.warn('Gambler', `魔力不足! 需要 ${Math.round(cost)} (當前: ${Math.round(M.magic)})`);
                    this.updateLight('Red');
                    return;
                }

                Logger.log('Gambler', '🎲 命運輪盤轉動中...');
                M.castSpell(spellHoF);

                // Auto-click the generated Golden Cookie
                if (Game.shimmers.length > 0) {
                    const cookie = Game.shimmers[Game.shimmers.length - 1];
                    cookie.pop(); // Immediate click
                } else {
                    Logger.error('Gambler', '找不到生成的餅乾!');
                    this.updateLight('Red');
                    return;
                }

                // Check Buff Result Strategy
                let bestBuff = null;
                // Priority Check: Dragonflight > Click frenzy > Others
                if (Game.buffs['Dragonflight']) bestBuff = Game.buffs['Dragonflight'];
                else if (Game.buffs['Click frenzy']) bestBuff = Game.buffs['Click frenzy'];
                else {
                    // Fallback to searching all buffs
                    for (let i in Game.buffs) {
                         const buff = Game.buffs[i];
                         if (buff.multCpS > 7 || buff.multClick > 2) {
                             bestBuff = buff;
                             break;
                         }
                    }
                }

                if (!bestBuff) {
                    Logger.log('Gambler', '結果: 爛牌 (無有效 Buff)');
                    this.updateLight('Red');
                    return;
                }

                // Determine Tier
                let tier = 'Low'; // Default
                if (bestBuff.name === 'Click frenzy' || bestBuff.name === 'Dragonflight') tier = 'High';
                else if (bestBuff.name === 'Frenzy') tier = 'Mid';

                if (tier === 'Low') {
                     Logger.log('Gambler', `結果: 普通 (${bestBuff.name}), 跳過 Stretch`);
                     this.updateLight('Red');
                     return;
                }

                // Execute Stretch Time
                const oldTime = bestBuff.time;
                M.castSpell(spellStretch);

                // Re-fetch buff to check time (Game objects update in place usually)
                let newTime = bestBuff.time;
                // Double check if buff still exists
                if (Game.buffs[bestBuff.name]) {
                    newTime = Game.buffs[bestBuff.name].time;
                }

                const isSuccess = newTime > oldTime;
                let color = 'Red';

                if (tier === 'High') {
                    color = isSuccess ? 'Green' : 'Yellow';
                    Logger.success('Gambler', `✨ Jackpot! ${bestBuff.name} (${isSuccess ? '延長成功' : '縮短'})`);
                } else if (tier === 'Mid') {
                    color = isSuccess ? 'Yellow' : 'Red';
                    Logger.log('Gambler', `✨ Mid-Tier: ${bestBuff.name} (${isSuccess ? '延長成功' : '縮短'})`);
                }

                this.updateLight(color);
            },

            updateLight: function(color) {
                const light = $('#gambler-traffic-light');
                if (light.length === 0) return;

                // Position Update Logic (v8.8.3)
                const btn = $('#statsButton');
                if (btn.length > 0) {
                    const rect = btn[0].getBoundingClientRect();
                    const top = rect.top + (rect.height / 2) - 30; // Center - Radius (30)
                    const left = rect.right + 0; // Right side
                    light.css({
                        'top': top + 'px',
                        'left': left + 'px',
                        'display': 'block'
                    });
                } else {
                    // Fallback center
                    light.css({
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'display': 'block'
                    });
                }

                let hex = '#000';
                if (color === 'Green') hex = '#4caf50';
                else if (color === 'Yellow') hex = '#ffeb3b';
                else if (color === 'Red') hex = '#f44336';

                light.css({
                    'background': hex,
                    'box-shadow': `0 0 40px ${hex}`,
                    'opacity': '0.8'
                });

                // Flash animation
                light.stop(true, true).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

                // Auto hide after 3 seconds
                setTimeout(() => {
                    light.animate({ opacity: 0 }, 500, function() { $(this).hide(); });
                }, 3000);
            }
        },

        //[v9.1.9] Loan Ranger (Blind Fire & Persistent Cooldown)
        LoanRanger: {
            // 定義冷卻常數
            COOLDOWN_SUCCESS: 2400000, // 40 分鐘
            COOLDOWN_FAIL: 20000,      // 20 秒 (大於 Click Frenzy 持續時間)

            update: function(now, currentMult) {
                // 1. 全域檢查
                if (!Config.Flags.GlobalMasterSwitch || !Config.Flags.AutoLoan) return;

                // 2. 持久化冷卻檢查 (40分鐘大冷卻)
                const cooldownEnd = GM_getValue('persist_loanCooldownEnd', 0);
                if (now < cooldownEnd) return;

                // 3. 短期休眠檢查 (20秒小冷卻)
                if (now - Runtime.Timers.LastLoanAttempt < this.COOLDOWN_FAIL) return;

                // 4. 倍率門檻檢查
                if (currentMult < Config.Settings.AutoLoanThreshold) return;

                // 5. 銀行 Minigame 檢查
                const Bank = Game.Objects['Bank'];
                if (!Bank || !Bank.minigameLoaded) return;
                const M = Bank.minigame;

                // 6. Buff 狀態檢查 (防止重複購買)
                const hasLoan = Object.values(Game.buffs).some(b =>
                    b.name.includes('Loan 2') || b.name.includes('贷款 2') || b.name.includes('貸款 2')
                );

                // 若 Buff 存在，直接進入短休眠，不需嘗試購買
                if (hasLoan) {
                    Runtime.Timers.LastLoanAttempt = now;
                    return;
                }

                // 7. 執行購買並捕捉結果 (Blind Fire with Feedback)
                const isSuccess = M.takeLoan(2);

                if (isSuccess) {
                    // 成功：設定 40 分鐘超長冷卻並寫入存檔
                    const endT = now + this.COOLDOWN_SUCCESS;
                    GM_setValue('persist_loanCooldownEnd', endT);
                    Runtime.Timers.LastLoanAttempt = now; // 同步內存計時器
                    Logger.success('LoanRanger', `💰 貸款成功！倍率達標 (${Math.round(currentMult)}x)，進入 40 分鐘休眠。`);
                } else {
                    // 失敗：設定 20 秒冷卻 (錯開本次 Buff 窗口)
                    Runtime.Timers.LastLoanAttempt = now;
                    // 靜默失敗，不寫 Log
                }
            },

            // 手動熱鍵觸發 (F2)
            manualCast: function() {
                 const Bank = Game.Objects['Bank'];
                 if (Bank && Bank.minigameLoaded) {
                     const isSuccess = Bank.minigame.takeLoan(2);
                     const now = Date.now();

                     if (isSuccess) {
                         const endT = now + this.COOLDOWN_SUCCESS;
                         GM_setValue('persist_loanCooldownEnd', endT);
                         Logger.success('LoanRanger', '按鍵觸發：貸款 2 購買成功 (40m 休眠)');
                     } else {
                         Logger.warn('LoanRanger', '按鍵觸發：購買失敗 (冷卻中或餘額不足)');
                     }
                 }
            },

            // 重置功能 (給按鈕用)
            resetCooldown: function() {
                if (!confirm('⚠️ 警告：手動重置冷卻可能會導致腳本在無 Buff 狀態下重複購買貸款。\n\n您確定要強制歸零嗎？')) {
                    return;
                }
                GM_setValue('persist_loanCooldownEnd', 0);
                Runtime.Timers.LastLoanAttempt = 0;
                Logger.log('LoanRanger', '♻️ 已手動重置貸款冷卻計時器');
                if(Game.Notify) Game.Notify('貸款重置', '冷卻時間已歸零',[1, 33], 2);
            }
        },

        Fortune: {
            update: function() {
                // F8 總開關檢查
                if (!Config.Flags.GlobalMasterSwitch || !Config.Flags.Fortune) return;

                // [v8.9.5 Optimization] 500ms 冷卻檢查
                const now = Date.now();
                if (now < Runtime.Timers.NextFortuneCheck) return;
                Runtime.Timers.NextFortuneCheck = now + 500;

                // 核心邏輯檢查：確認跑馬燈特效存在且類型為 fortune (綠色幸運新聞)
                if (typeof Game !== 'undefined' && Game.TickerEffect && Game.TickerEffect.type === 'fortune') {
                    // 確認 DOM 元素可交互
                    if (Game.tickerL && typeof Game.tickerL.click === 'function') {
                        Game.tickerL.click();
                        Logger.success('Fortune', '✨ 已自動點擊跑馬燈，獲得幸運升級！');
                        // 點擊後可延長冷卻，避免重複點擊同一則新聞 (雖然新聞點擊後通常會消失)
                        Runtime.Timers.NextFortuneCheck = now + 2000;
                    }
                }
            }
        },

        Magic: {
            Timers: {
                NextSE: 0,
                NextCombo: 0
            },

            update: function(now) {
                if (!Config.Flags.GlobalMasterSwitch) return;

                const Tower = Game.Objects['Wizard tower'];
                if (!Tower || !Tower.minigameLoaded) return;
                const M = Tower.minigame;

                if (Config.Flags.Spell) {
                    this.handleCombo(now, M);
                }

                if (Config.Flags.SE && now >= this.Timers.NextSE) {
                    this.handleSE(now, M);
                }
            },

            handleCombo: function(now, M) {
                if (now < this.Timers.NextCombo) return;

                let shouldCast = false;
                for (let i in Game.buffs) {
                    const buff = Game.buffs[i];
                    const name = buff.name.toLowerCase();
                    if (name === 'click frenzy' || name === 'dragonflight' || name === 'cursed finger') {
                        shouldCast = true;
                        break;
                    }
                    if (buff.multCpS > 7 || buff.multClick > 10) {
                        shouldCast = true;
                        break;
                    }
                }

                const spell = M.spells['hand of fate'];
                const spellCost = M.getSpellCost(spell);

                if (shouldCast && M.magic >= spellCost) {
                    M.castSpell(spell);
                    Logger.log('AutoSpell', '觸發連擊：施放 Hand of Fate');
                    this.Timers.NextCombo = now + 1000;
                }
            },

            handleSE: function(now, M) {
                if (Object.keys(Game.buffs).length > 0) return;
                if (M.magic < M.magicM * 0.95) return;

                const spell = M.spells['spontaneous edifice'];
                const spellCost = M.getSpellCost(spell);

                if (M.magic < spellCost) return;

                const preCount = Game.BuildingsOwned;
                M.castSpell(spell);

                if (Game.BuildingsOwned > preCount) {
                    Logger.success('AutoSpell', '閒置期：免費召喚了一座建築 (SE Success)');
                    this.Timers.NextSE = now + Config.Settings.SpellCooldownSuccess;
                } else {
                    Logger.warn('AutoSpell', 'SE 施法無效 (條件不符)，進入靜默模式 60s');
                    this.Timers.NextSE = now + Config.Settings.SpellCooldownFail;
                }
            }
        },

        Click: {
            handlePrompts: function() {
                // Level 0: 引擎旗標速查 (最快)
                if (typeof Game === 'undefined' || Game.promptOn === 0) return;

                // Level 1: DOM 可見性
                const promptBox = document.getElementById('prompt');
                if (!promptBox || promptBox.style.display === 'none') return;

                // Level 2: 冷卻 (2000ms)
                const now = Date.now();
                if (Runtime.Cache.lastPromptClick && (now - Runtime.Cache.lastPromptClick < 2000)) return;

                // 執行
                const content = document.querySelector('#promptContent');
                const yesButton = document.querySelector('#promptOption0');

                if (content && yesButton) {
                    const txt = content.textContent || "";
                    const whitelist =['One Mind', 'revoke', 'Research', '合一思想', '撤销', '不好的结果'];
                    if (whitelist.some(k => txt.includes(k))) {
                        Logger.log('Safe', `Auto-confirming prompt: ${txt.substring(0, 20)}...`);
                        yesButton.click();
                        Runtime.Cache.lastPromptClick = now;
                    }
                }
            },
        },

        Dragon: {
            State: Runtime.DragonState,
            Auras: {
                RadiantAppetite: 15,
                Dragonflight: 18,
                BreathOfMilk: 5
            },

            update: function(now) {
                if (!Config.Flags.GlobalMasterSwitch || !Config.Flags.DragonAura) return;
                if (typeof Game.dragonLevel === 'undefined' || Game.dragonLevel < 25) return;
                if (now - this.State.lastSwitchTime < 5000) return;

                let currentMult = 1;
                let hasClickBuff = false;
                for (let i in Game.buffs) {
                    const b = Game.buffs[i];
                    if (b.multCpS > 0) currentMult *= b.multCpS;
                    if (b.multClick > 0) currentMult *= b.multClick;
                    if (b.name === 'Click frenzy' || b.name === 'Dragonflight') {
                        hasClickBuff = true;
                    }
                }

                const currentAura2 = Game.dragonAuras[1];

                if (hasClickBuff) {
                    if (this.State.currentPhase !== 'BURST') {
                        const multDisplay = currentMult > 1000 ? (currentMult/1000).toFixed(1)+'k' : Math.round(currentMult);
                        Logger.log('Dragon', `🔥 爆發開始 (倍率 x${multDisplay})。切換光環：飛龍 -> 牛奶`);
                        this.State.currentPhase = 'BURST';
                        if (currentAura2 !== this.Auras.BreathOfMilk) this._setAura(1, this.Auras.BreathOfMilk);
                        this.State.lastSwitchTime = now;
                    } else {
                        if (currentAura2 !== this.Auras.BreathOfMilk) {
                            this._setAura(1, this.Auras.BreathOfMilk);
                            this.State.lastSwitchTime = now;
                        }
                    }
                } else {
                    if (this.State.currentPhase !== 'IDLE') {
                        Logger.log('Dragon', `🎣 爆發結束。切換光環：牛奶 -> 飛龍`);
                        this.State.currentPhase = 'IDLE';
                        if (currentAura2 !== this.Auras.Dragonflight) this._setAura(1, this.Auras.Dragonflight);
                        this.State.lastSwitchTime = now;
                    } else {
                        if (currentAura2 !== this.Auras.Dragonflight) {
                            this._setAura(1, this.Auras.Dragonflight);
                            this.State.lastSwitchTime = now;
                        }
                    }
                }
            },

            _setAura: function(slot, id) {
                try {
                    if (typeof Game.setDragonAura === 'function') {
                        Game.setDragonAura(slot, id);
                        Game.recalculateGains = 1;
                    }
                } catch(e) {
                    Logger.error('Dragon', '光環切換失敗', e);
                }
            }
        },

        GodzamokCombo: {
            // [v8.8.8] 戒嚴協議助手
            enforceMartialLaw: function() {
                const R = Runtime.GodzamokState;
                const now = Date.now(); // 新增時間戳

                // 🔒 [Fix] 防重入保護 (1秒內不重複執行)
                if (R.lastMartialLawTime && (now - R.lastMartialLawTime < 1000)) {
                    Logger.warn('Godzamok', '⚠️ 戒嚴鎖定中，跳過重複呼叫 (防止競態條件)');
                    return;
                }
                R.lastMartialLawTime = now;

                if (R.mutationRestoreTimer) {
                    clearTimeout(R.mutationRestoreTimer);
                    R.mutationRestoreTimer = null;
                    // [PM Hotfix] 若使用者在冷卻期間手動開啟了突變，這裡必須更新記憶
                    if (Config.Flags.GardenMutation) {
                        R.wasMutationEnabled = true;
                    }
                } else {
                    if (Config.Flags.GardenMutation) {
                        R.wasMutationEnabled = true;
                    }
                }

                if (Config.Flags.GardenMutation) {
                    // [v9.1.5] Persistence Update
                    GM_setValue('persist_wasMutationEnabled', true);
                    GM_setValue('persist_isMartialLawActive', true);

                    Config.Flags.GardenMutation = false;
                    GM_setValue('isGardenMutationEnabled', false);
                    $('#chk-garden-mutation').prop('checked', false);
                    if (UI.GardenGrid && UI.GardenGrid.updateButtonState) UI.GardenGrid.updateButtonState();
                    Logger.log('Godzamok', '⚠️ 戒嚴模式：花園突變已暫時關閉 (保留資金)');
                }
            },

            scheduleRestoration: function() {
                const R = Runtime.GodzamokState;
                if (R.mutationRestoreTimer) clearTimeout(R.mutationRestoreTimer);

                Logger.log('Godzamok', '⏳ 戒嚴解除倒數：60秒後恢復花園突變...');
                R.mutationRestoreTimer = setTimeout(function() {
                    if (R.wasMutationEnabled) {
                        Config.Flags.GardenMutation = true;
                        GM_setValue('isGardenMutationEnabled', true);
                        $('#chk-garden-mutation').prop('checked', true);

                        // [v9.1.5] Clear Persistence
                        GM_setValue('persist_isMartialLawActive', false);
                        GM_setValue('persist_wasMutationEnabled', false);

                        // 1. 更新 Grid 面板按鈕
                        if (UI.GardenGrid && UI.GardenGrid.updateButtonState) UI.GardenGrid.updateButtonState();

                        // 2. [v9.1.3.2 Fix] 關鍵修復：強制同步側邊欄 (Embedded) 按鈕狀態
                        if (UI.GardenProtection && UI.GardenProtection.updateEmbeddedState) {
                            UI.GardenProtection.updateEmbeddedState();
                        }

                        Logger.success('Godzamok', '🕊️ 戒嚴結束：花園突變已自動恢復');
                        R.wasMutationEnabled = false;
                    }
                    R.mutationRestoreTimer = null;
                }, 60000);
            },

            update: function(now) {
                if (!Config.Flags.GlobalMasterSwitch || !Config.Flags.GodzamokCombo) return;
                if (now < Runtime.Timers.NextGodzamokCombo) return;

                const Temple = Game.Objects['Temple'];
                if (!Temple || !Temple.minigameLoaded) return;
                const M = Temple.minigame;
                if (M.slot[0] !== 2) return;

                let totalMult = 1;
                for (let i in Game.buffs) {
                    const b = Game.buffs[i];
                    const mCps = (typeof b.multCpS !== 'undefined') ? b.multCpS : 1;
                    const mClick = (typeof b.multClick !== 'undefined') ? b.multClick : 1;
                    totalMult *= (mCps * mClick);
                }

                // 安全防護
                if (isNaN(totalMult)) totalMult = 0;

                if (totalMult < Config.Settings.GodzamokMinMult) return;

                const targetName = Config.Settings.GodzamokTargetBuilding;
                const building = Game.Objects[targetName];
                if (!building || building.amount < Config.Settings.GodzamokSellAmount) return;

                // 傳遞數值
                this.trigger(targetName, building, now, totalMult);
            },

            trigger: function(targetName, building, now, currentMult) {
                //[v8.8.8] 啟動戒嚴協議
                this.enforceMartialLaw();

                //[v9.1.3.3 Fix] 狀態記憶防護：僅在非活躍(第一層觸發)時記錄原始意圖
                // 必須在 isActive = true 之前執行，否則每次都會被視為活躍中
                if (!Runtime.GodzamokState.isActive) {
                    Runtime.GodzamokState.wasSpendingLocked = Config.Flags.SpendingLocked;
                }

                //[v9.1.2 Fix] 立即宣告活躍狀態 (同步阻斷 Logic.Buy)
                Runtime.GodzamokState.isActive = true;

                const obj = Game.Objects[targetName];
                if (!obj) {
                    Logger.error('Godzamok', `目標建築 ${targetName} 不存在`);
                    Runtime.GodzamokState.isActive = false; // Safety reset
                    return false;
                }
                if (![2, 3, 4].includes(obj.id)) {
                    Logger.error('Godzamok', `非法目標 ${targetName} (ID check failed)。僅允許 Farm, Mine, Factory。`);
                    Runtime.GodzamokState.isActive = false; // Safety reset
                    return false;
                }

                const costToBuyBack = building.price * Config.Settings.GodzamokSellAmount * 1.5;
                if (Game.cookies < costToBuyBack) {
                    Logger.warn('Godzamok', `觸發失敗：資金不足以買回 (需 ${costToBuyBack})`);
                    Runtime.Timers.NextGodzamokCombo = now + 5000;
                    Runtime.GodzamokState.isActive = false; // Safety reset
                    return;
                }

                const displayMult = currentMult ? Math.round(currentMult).toLocaleString() : "???";
                Logger.log('Godzamok', `觸發連擊！倍率滿足 (當前: ${displayMult}x > 設定: ${Config.Settings.GodzamokMinMult}x)`);

                if (!Config.Flags.SpendingLocked) {
                     $('#chk-spending-lock').prop('checked', true).trigger('change');
                }

                building.sell(Config.Settings.GodzamokSellAmount);
                Runtime.GodzamokState.soldAmount = Config.Settings.GodzamokSellAmount;

                setTimeout(() => {
                    this.buyBack(targetName);
                }, Config.Settings.GodzamokBuyBackTime);

                Runtime.Timers.NextGodzamokCombo = now + Config.Settings.GodzamokCooldown;
            },

            buyBack: function(targetName) {
                const building = Game.Objects[targetName];
                //[v8.9.8.1] Fix: Cap Logic
                const limit = (Config.Settings.BuildingLimit && typeof Config.Settings.BuildingLimit[targetName] !== 'undefined')
                              ? Config.Settings.BuildingLimit[targetName]
                              : -1;

                let targetAmount = building.amount + Runtime.GodzamokState.soldAmount;

                // Truncate target
                if (limit !== -1 && targetAmount > limit) {
                    targetAmount = limit;
                }

                Logger.log('Godzamok', `開始買回 ${targetName}...`);

                let bought = 0;
                let loops = 0;
                // Add safe lock to loop
                while (building.amount < targetAmount && building.price <= Game.cookies && loops < 1000 && (limit === -1 || building.amount < limit)) {
                    building.buy(1);
                    bought++;
                    loops++;
                }

                // Log logic
                if (limit !== -1 && building.amount >= limit && bought < Runtime.GodzamokState.soldAmount) {
                     Logger.warn('Godzamok', `買回中止：已達建築上限 (${limit})`);
                } else if (bought >= Runtime.GodzamokState.soldAmount) {
                    Logger.success('Godzamok', `已買回 ${bought} 座建築`);
                } else {
                    Logger.warn('Godzamok', `資金不足/迴圈限制，僅買回 ${bought}/${Runtime.GodzamokState.soldAmount}`);
                }

                Runtime.GodzamokState.isActive = false;
                Runtime.GodzamokState.soldAmount = 0;

                //[v9.1.1] 智慧鎖定還原
                // 只有在「原本沒鎖 (was == false)」且「現在鎖著」的情況下，才執行解鎖
                if (Config.Flags.SpendingLocked && !Runtime.GodzamokState.wasSpendingLocked) {
                     $('#chk-spending-lock').prop('checked', false).trigger('change');
                     Logger.log('Godzamok', '已解除支出鎖定 (還原原始狀態)');
                } else if (Runtime.GodzamokState.wasSpendingLocked) {
                     // 如果原本就是鎖的，保持鎖定，不動作
                     Logger.log('Godzamok', '保持支出鎖定 (使用者原始設定)');
                }

                //[v8.8.8] 排程恢復
                this.scheduleRestoration();
            }
        },

        // ✅ Feature: Godzamok Tactical Nuke (v8.8.5)
        GodzamokTactical: {
            fire: function() {
                // New Safety Check (v8.8.5.3)
                const T = Game.Objects['Temple'];
                if (!T || !T.minigameLoaded || !T.minigame || T.minigame.slot[0] !== 2) {
                    Logger.error('Tactical', '戰術中止：未裝備 Godzamok');
                    return;
                }

                // [v9.1.8] Unjamming Protocol: F9 擁有最高中斷權，強制重置狀態
                Runtime.GodzamokTacticalState.lock = false;
                if (Runtime.GodzamokTacticalState.reloadTimer) {
                    clearTimeout(Runtime.GodzamokTacticalState.reloadTimer);
                    Runtime.GodzamokTacticalState.reloadTimer = null;
                }
                UI.updateTacticalButton('ACTIVE');

                //[v9.1.7] Step 1: 狀態快照 (必須在任何修改前執行)
                Runtime.GodzamokState.wasSpendingLocked = Config.Flags.SpendingLocked;

                // [v9.1.7] Step 2: 強制鎖定支出 (保護賣出期間的資金)
                if (!Config.Flags.SpendingLocked) {
                    // 使用現有的 toggle 函數處理邏輯與 Config 變更
                    UI.GardenProtection.toggle(true);
                    // 確保 UI 視覺同步
                    $('#chk-spending-lock').prop('checked', true);
                }

                // [v8.8.8] 啟動戒嚴協議
                Logic.GodzamokCombo.enforceMartialLaw();

                const targetName = Config.Settings.GodzamokTargetBuilding;
                const obj = Game.Objects[targetName];

                // Whitelist check
                if (!obj || ![2, 3, 4].includes(obj.id)) {
                    Logger.error('Tactical', `非法目標 ${targetName}。僅允許 Farm, Mine, Factory`);
                    return;
                }

                Runtime.GodzamokTacticalState.lock = true;
                Runtime.GodzamokTacticalState.status = 'COOLDOWN';
                UI.updateTacticalButton('ACTIVE');

                const amount = obj.amount;
                obj.sell(amount); // Sell all using native API, strictly no loop
                Logger.log('Tactical', `☢️ 戰術核彈啟動！賣出 ${amount} 座 ${targetName}...`);

                // 10s delay with stored timer for Rapid Fire [Fix v8.8.8.2]
                Runtime.GodzamokTacticalState.reloadTimer = setTimeout(() => {
                    Logic.GodzamokTactical.reload();
                    Runtime.GodzamokTacticalState.reloadTimer = null; // Clean up ref
                }, 10000);
            },
			reload: function() {
                const targetName = Config.Settings.GodzamokTargetBuilding;
                const obj = Game.Objects[targetName];
                const setting = Config.Settings.GodzamokBuyback;
                const current = obj.amount;

                // [v8.8.9.3] Building Cap Check
                const limit = (Config.Settings.BuildingLimit && Config.Settings.BuildingLimit[targetName]) ? Config.Settings.BuildingLimit[targetName] : 0;

                if (limit > 0 && current >= limit) {
                    Logger.warn('Tactical', `自動買回取消：已達建築上限 (${limit})`);
                } else {
                    // Phase 3 - Buy Back
                    let amountToBuy = 0;
                    if (setting === -1) {
                         amountToBuy = 10000;
                    } else if (setting > current) {
                         amountToBuy = setting - current;
                    }

                    if (limit > 0 && (current + amountToBuy) > limit) {
                        amountToBuy = limit - current;
                    }

                    if (amountToBuy > 0) {
                        obj.buy(amountToBuy);
                    }
                }

                // [v9.1.7 Fix] 智慧解鎖回歸 (Smart Unlock) & UI 強制同步
                // 檢查快照：如果現在是鎖的，但原本沒鎖 -> 解鎖
                if (Config.Flags.SpendingLocked && !Runtime.GodzamokState.wasSpendingLocked) {
                    // 1. 核心解鎖 (Logic & Storage)
                    UI.GardenProtection.toggle(false);

                    // 2. 視覺同步 (Main Panel Checkbox)
                    $('#chk-spending-lock').prop('checked', false);

                    // 3. 視覺同步 (Sidebars & HUD Buttons) - 確保變回綠色
                    if (UI.GardenProtection.updateEmbeddedState) UI.GardenProtection.updateEmbeddedState();
                    if (UI.updateEmbeddedState) UI.updateEmbeddedState();

                    Logger.success('Tactical', '☢️ 戰術結束：已還原原始支出狀態 (解鎖)');
                }

                Runtime.GodzamokTacticalState.lock = false;
                Runtime.GodzamokTacticalState.status = 'IDLE';
                UI.updateTacticalButton('IDLE');
                Logger.log('Tactical', `🔄 戰術重裝完成`);

                // [v8.8.8] 排程恢復 (戒嚴結束後恢復變異)
                Logic.GodzamokCombo.scheduleRestoration();
            },
            //[v8.8.8.3] 快速補貨
            buyAmmo: function() {
                const targetName = Config.Settings.GodzamokTargetBuilding;
                // [v8.9.4] 使用獨立設定，不再與 SellAmount 掛鉤
                let amountToBuy = Config.Settings.GodzamokRestockAmount;
                const obj = Game.Objects[targetName];

                // 白名單檢查
                if (obj && [2, 3, 4].includes(obj.id)) {
                    //[v8.9.4] Building Cap Check (整合 v8.9.0 建築上限邏輯)
                    // 注意：BuildingLimit 是以 Name 為 Key 儲存的
                    const limitMap = Config.Settings.BuildingLimit || {};
                    const limit = (typeof limitMap[targetName] !== 'undefined') ? limitMap[targetName] : -1;

                    if (limit !== -1) {
                        const currentAmount = obj.amount;
                        const spaceLeft = limit - currentAmount;

                        if (spaceLeft <= 0) {
                            // [v9.1.8] Silent Mode: 滿倉時靜默返回，不干擾高頻點擊節奏
                            return;
                        }

                        if (amountToBuy > spaceLeft) {
                            if(Game.Notify) Game.Notify('補貨修正', `受限於上限，購買量從 ${amountToBuy} 修正為 ${spaceLeft}`,[10, 6], 2);
                            Logger.log('Tactical', `補貨量修正: ${amountToBuy} -> ${spaceLeft} (上限: ${limit})`);
                            amountToBuy = spaceLeft;
                        }
                    }

                    const cost = obj.getSumPrice(amountToBuy);

                    if (Game.cookies >= cost) {
                        obj.buy(amountToBuy);
                        Logger.log('Tactical', `➕ 快速補貨: ${amountToBuy} ${targetName}`);

                        // 解除 F9 鎖定狀態 (若有的話)
                        const T = Runtime.GodzamokTacticalState;
                        if (T.reloadTimer) {
                             clearTimeout(T.reloadTimer);
                             T.reloadTimer = null;
                             Logger.log('Tactical', '⚡ 自動重裝已取消 (手動介入)');
                        }
                        T.lock = false;
                        T.status = 'IDLE';
                        UI.updateTacticalButton('IDLE');

                        // [Safety] 雖然手動補貨，仍需確保花園突變恢復排程 (戒嚴協議)
                        Logic.GodzamokCombo.scheduleRestoration();
                    } else {
                        const costStr = typeof Beautify !== 'undefined' ? Beautify(cost) : Math.round(cost);
                        Logger.warn('Tactical', `快速補貨失敗: 資金不足 (需 ${costStr})`);
                        if(Game.Notify) Game.Notify('補貨失敗', '資金不足', [10, 6], 2);
                    }
                }
            }
        },

        SugarLump: {
            update: function(now) {
                const statusEl = $('#lump-status');
                if (!Config.Flags.Golden) {
                    if (statusEl.length) statusEl.text('🍬 糖塊監控：已停用').css('color', '#999').css('border-left-color', '#999');
                    return;
                }
                if (typeof Game === 'undefined' || !Game.canLumps()) {
                    if (statusEl.length) statusEl.text('🍬 糖塊監控：未解鎖').css('color', '#999').css('border-left-color', '#999');
                    return;
                }
                const age = Date.now() - Game.lumpT;
                const type = Game.lumpCurrentType;
                const ripeAge = Game.lumpRipeAge;
                let statusText = ''; let statusColor = '#666'; let borderColor = '#ccc'; let action = '';
                switch (type) {
                    case 3:
                        statusText = '⛔ [肉色糖塊] 啟動保護：等待自然掉落'; statusColor = '#d32f2f'; borderColor = '#d32f2f'; action = 'SKIP';
                        break;
                    case 2: case 4:
                        if (age >= ripeAge) action = 'HARVEST_NOW';
                        else { statusText = `💎 [稀有糖塊] 等待成熟 (${UI.formatMs(ripeAge - age)})`; statusColor = '#e65100'; borderColor = '#ffd700'; }
                        break;
                    case 1:
                        if (age >= ripeAge) {
                            if ((Game.lumps / Config.Settings.SugarLumpGoal) > 0.9) action = 'HARVEST_NOW';
                            else action = 'HARVEST_NOW';
                        } else { statusText = `🌿[雙倍糖塊] 等待成熟 (${UI.formatMs(ripeAge - age)})`; statusColor = '#2e7d32'; borderColor = '#4caf50'; }
                        break;
                    default:
                        if (age >= ripeAge) action = 'HARVEST_NOW';
                        else { statusText = `🍬 [普通糖塊] 等待成熟 (${UI.formatMs(ripeAge - age)})`; statusColor = '#555'; borderColor = '#ccc'; }
                        break;
                }
                if (action === 'HARVEST_NOW') {
                    if (Config.Flags.GlobalMasterSwitch) {
                        if (Game.lumpCurrentType !== 3) {
                            Game.clickLump();
                            Logger.log('SmartLump', `自動收割糖塊 (Type: ${type})`);
                            statusText = '⚡ 正在收割...'; statusColor = '#4caf50'; borderColor = '#4caf50';
                        } else {
                            Logger.warn('SmartLump', '攔截危險操作：試圖點擊肉色糖塊！');
                        }
                    }
                }
                if (statusEl.length) { statusEl.text(statusText).css({ 'color': statusColor, 'border-left-color': borderColor }); }
            }
        },

        Buy: {
            update: function(now) {
                // 🛡️ [CONSTITUTION LEVEL 0]: 憲法級絕對防護 (最優先執行)
                // [v9.1.3.3 Polish] 將阻斷移至最頂層，優先於暖機與總開關
                // 防止在 Godzamok 活躍或打寶期間發生任何購買行為 (防止 Race Condition)
                if (Runtime.SeasonState.isFarming || Runtime.GodzamokState.isActive) {
                     return;
                }

                //[v9.1.3] 戒嚴恢復期：防止買回後立即耗盡資金，導致花園突變無法恢復
                if (Runtime.GodzamokState.mutationRestoreTimer !== null) {
                    return;
                }

                // [v8.8.8.1] 誓約暖機阻斷
                if (now < Runtime.Timers.GardenWarmup) {
                    return;
                }

                // 前置條件檢查
                if (!Config.Flags.GlobalMasterSwitch || !Game) {
                    return;
                }

                const pledge = Game.Upgrades['Elder Pledge'];
                const isPledgeExpired = (typeof Game.pledgeT === 'undefined' || Game.pledgeT <= 0);

                // [v8.9.9.1 Safety] Elder Pledge Double-Check
                if (Config.Flags.AutoPledge && pledge && pledge.unlocked && pledge.canBuy() && isPledgeExpired) {
                    // 1. Constitution Check: Farming Mode (Redundant but safe)
                    if (Runtime.SeasonState.isFarming) return;

                    // 2. [Hotfix] Ownership Check (The "Missing Drops" Guard)
                    // Directly verify if we own the cookies required for the current season.
                    if (Game.season && Logic.Season.Config && Logic.Season.Config[Game.season]) {
                        const targetIDs = Logic.Season.Config[Game.season];
                        const missingAny = targetIDs.some(id => {
                            const u = Game.UpgradesById[id];
                            // If upgrade exists (valid ID) and we haven't bought it yet -> BLOCK PLEDGE
                            return u && !u.bought;
                        });

                        if (missingAny) {
                            if (Math.random() < 0.05) Logger.warn('Buy', `🛑 誓約攔截：季節收集未完成 (Drops check)`);
                            return;
                        }
                    }

                    // 3. Store Safety Buffer (Legacy)
                    if (Game.UpgradesInStore.some(u => u.season === Game.season && u.pool !== 'toggle')) return;

                    // All Pass -> Buy
                    pledge.buy();
                    return; // 🟢 購買後立即退出
                }

                // [Level 1]: 用戶緊急鎖定 (SpendingLocked)
                if (Config.Flags.SpendingLocked) {
                    return;
                }
                // [Level 2]: 存錢模式 (SavingMode)
                if (Config.Flags.SavingMode) {
                    return;
                }
                // [Level 3]: 常規購買邏輯 (僅當通過以上所有檢查後執行)

                if (!Config.Flags.Buy || now < Runtime.Timers.NextBuy) {
                    return;
                }

                if (Config.Flags.Research) {
                    // [v8.9.2] 戰鬥紀律：暫停研發，保留資金給戰術核彈
                    if (Logic.isCombatState()) {
                        return;
                    }

                    const research = document.querySelectorAll('#techUpgrades .crate.upgrade.enabled');
                    if (research.length > 0) {
                        const item = research[0];
                        let resName = "未知科技";
                        const dataId = item.getAttribute('data-id');
                        if (dataId && Game.UpgradesById[dataId]) {
                            resName = Game.UpgradesById[dataId].dname || Game.UpgradesById[dataId].name;
                        } else {
                            const onMouseOver = item.getAttribute('onmouseover');
                            if (onMouseOver) {
                                 const match = /<div class="name">(.+?)<\/div>/.exec(onMouseOver);
                                 if (match) resName = match[1];
                            }
                        }
                        Logger.log('自動購買', `研發科技：${UI.cleanName(resName)}`);
                        item.click();
                        Runtime.Timers.NextBuy = now + Config.Settings.BuyIntervalMs;
                        return;
                    }
                }

                let affordable = Game.UpgradesInStore.filter(u => u.canBuy());
                affordable = affordable.filter(u => {
                    if (u.id === 84) return false;
                    if (u.id === 85) return false;
                    if (u.id === 74) return false;
                    // [v8.9.9.1 Safety] Strict Toggle Exclusion
                    if (u.pool === 'toggle') return false;

                    return true;
                });
                if (affordable.length > 0) {
                    if (Config.Settings.BuyStrategy === 'expensive') affordable.sort((a, b) => b.getPrice() - a.getPrice());
                    else affordable.sort((a, b) => a.getPrice() - b.getPrice());
                    const target = affordable[0];
                    let upName = target.dname || target.name;
                    Logger.log('自動購買-升級', UI.cleanName(upName));
                    target.buy();
                    Runtime.Stats.BuyUpgradeCount++;
                    Runtime.Timers.NextBuy = now + Config.Settings.BuyIntervalMs;
                    return;
                }

                if (Config.Flags.Garden) {
                    const Farm = Game.Objects['Farm'];
                    if (Farm.minigameLoaded && Farm.minigame) {
                        const M = Farm.minigame;
                        let needsSeeds = false;
                        outerLoop:
                        for (let y = 0; y < 6; y++) {
                            for (let x = 0; x < 6; x++) {
                                if (M.isTileUnlocked(x, y)) {
                                    const savedId = Config.Memory.SavedGardenPlot[y][x];
                                    const currentTile = M.plot[y][x];
                                    if (savedId > -1 && currentTile[0] === 0) {
                                        const seed = M.plantsById[savedId];
                                        if (seed && seed.unlocked) {
                                            needsSeeds = true;
                                            break outerLoop;
                                        }
                                    }
                                }
                            }
                        }
                        if (needsSeeds) {
                            if (Math.random() < 0.1) Logger.log('Resource', '資金保護中：優先保留給花園種子');
                            return;
                        }
                    }
                }

                let affordableBuildings =[];
                for (let i in Game.ObjectsById) {
                    const obj = Game.ObjectsById[i];
                    if (obj.locked) continue;

                    // [v8.8.9.3] Building Cap
                    if (Config.Settings.BuildingLimit && Config.Settings.BuildingLimit[obj.name] > 0) {
                        if (obj.amount >= Config.Settings.BuildingLimit[obj.name]) continue;
                    }

                    if (obj.price <= Game.cookies) affordableBuildings.push(obj);
                }
                if (affordableBuildings.length > 0) {
                    if (Config.Settings.BuyStrategy === 'expensive') {
                        affordableBuildings.sort((a, b) => b.price - a.price);
                    } else if (Config.Settings.BuyStrategy === 'cheapest') {
                        affordableBuildings.sort((a, b) => a.price - b.price);
                    } else if (Config.Settings.BuyStrategy === 'smart') {
                        // [v8.9.4] Smart Buy Strategy (CPP: Cost Per Production)
                        // 排序：回本時間 (Price / CpS) 由小到大。數值越小代表回本越快 (CP值高)。
                        affordableBuildings.sort((a, b) => {
                            // 取得單體 CpS (防呆：若 CpS <= 0 視為無限大，排到最後)
                            const cpsA = (a.storedCps && a.storedCps > 0) ? a.storedCps : 0.000001;
                            const cpsB = (b.storedCps && b.storedCps > 0) ? b.storedCps : 0.000001;

                            const cppA = a.price / cpsA;
                            const cppB = b.price / cpsB;

                            return cppA - cppB;
                        });
                    }

                    const targetB = affordableBuildings[0];
                    let buildName = targetB.displayName || targetB.name;
                    const domElement = document.getElementById('productName' + targetB.id);
                    if (domElement) buildName = domElement.innerText;
                    Logger.log('自動購買-建築', UI.cleanName(buildName));
                    targetB.buy(1);
                    Runtime.Stats.BuyBuildingCount++;
                    Runtime.Timers.NextBuy = now + Config.Settings.BuyIntervalMs;
                }
            }
        },

        Wrinkler: {
            hasLoggedShiny: false,
            update: function(now) {
                if (!Config.Flags.AutoWrinkler) return;
                for (let i in Game.wrinklers) {
                    let w = Game.wrinklers[i];
                    // 1. 保護閃光皺紋蟲 (Shiny, type === 1)
                    if (w.type === 1) {
                         if (!this.hasLoggedShiny) {
                            Logger.success('Wrinkler', '發現閃光皺紋蟲！已啟動保護機制！');
                            this.hasLoggedShiny = true;
                        }
                        continue; // ✅ 絕對保護
                    }
                    // 2. 策略選擇
                    if (Runtime.SeasonState.isFarming) {
                        w.hp = 0; // 🔴 打寶模式：即時戳破 (Insta-Pop)
                    } else {
                        if (w.close === 1) w.hp = 0; // 🟡 一般模式：養肥後戳破
                    }
                }
                if (!Game.wrinklers.some(w => w.phase > 0 && w.type === 1)) {
                    this.hasLoggedShiny = false;
                }
            }
        },

        Garden: {
            //[v9.2.0] 座標轉換 (0,0) -> "A1"
            getGridCoord: function(x, y) {
                const col = String.fromCharCode(65 + x);
                const row = y + 1;
                return `${col}${row}`;
            },

            update: function(now) {
                if (!Config.Flags.GlobalMasterSwitch) return;

                //[v8.8.9 Safety] Editing Mode Block
                if (UI.GardenGrid && UI.GardenGrid.isEditing) return;
                // [v9.2.1 Safety] Sniper Edit Mode Block
                if (UI.GardenGrid && UI.GardenGrid.isSniperEditing) return;

                //[v9.2.0/9.2.1 Fix] 即使關閉花園自動化，也必須允許 Sniper 系統掃描
                const allowGardenAuto = Config.Flags.Garden && (now >= Runtime.Timers.NextGarden);
                const allowSniperScan = Config.Flags.SniperMode;

                if (!allowGardenAuto && !allowSniperScan) return;
                if (typeof Game === 'undefined') return;
                const Farm = Game.Objects['Farm'];
                if (!Farm || !Farm.minigameLoaded) return;

                const M = Farm.minigame;
                if (!M) return;

                // ===[v9.2.1] Matrix Sniper 雙色矩陣掃描引擎 ===
                if (allowSniperScan) {
                    let hitCoord = null;
                    let hitColor = null;

                    for (let y = 0; y < 6; y++) {
                        for (let x = 0; x < 6; x++) {
                            const mask = Config.Memory.SniperGrid[y][x];
                            if (!mask || mask === '') continue; // 該格未設定監控

                            const isUnlocked = M.isTileUnlocked(x, y);
                            if (!isUnlocked) continue;

                            const tile = M.plot[y][x];
                            if (tile[0] === 0) continue; // 空地

                            const plantId = tile[0] - 1;
                            const plant = M.plantsById[plantId];

                            // 檢查 1: 星號 (*) 變異監控 (紫框)
                            if (mask === '*' && plant && !plant.unlocked) {
                                hitCoord = this.getGridCoord(x, y);
                                hitColor = 'Purple';
                                break;
                            }

                            // 檢查 2: 指定 ID 監控 (如金框 JQB 21)
                            const targetId = parseInt(mask, 10);
                            if (!isNaN(targetId) && plantId === targetId) {
                                hitCoord = this.getGridCoord(x, y);
                                hitColor = 'Gold'; // 預設給目標 ID 金色反饋
                                break;
                            }
                        }
                        if (hitCoord) break;
                    }

                    if (hitCoord) {
                        Runtime.GardenState.sniperActiveCoord = hitCoord;
                        Runtime.GardenState.sniperModeColor = hitColor;
                        UI.Favicon.generate(hitCoord, hitColor);
                    } else {
                        Runtime.GardenState.sniperActiveCoord = null;
                        Runtime.GardenState.sniperModeColor = null;
                        UI.Favicon.restore();
                    }
                } else {
                    if (Runtime.GardenState.sniperActiveCoord !== null) {
                        Runtime.GardenState.sniperActiveCoord = null;
                        Runtime.GardenState.sniperModeColor = null;
                        UI.Favicon.restore();
                    }
                }

                // 若花園自動化未啟動，直接返回
                if (!allowGardenAuto) return;

                const isWarmup = Date.now() < Runtime.Timers.GardenWarmup;
                if (isWarmup) {
                    if (Math.random() < 0.05) Logger.warn('花園保護', '暖機緩衝中：跳過鏟除操作');
                    Runtime.Timers.NextGarden = now + 2500;
                    return;
                }

                let isCpsBuffActive = false;
                let shouldSkipPlanting = false;

                if (Config.Flags.GardenAvoidBuff) {
                    // [ENG 實作 Task D: Net-CpS]
                    let netMult = 1;
                    if (Game.buffs) {
                        for (let i in Game.buffs) {
                            let m = Game.buffs[i].multCpS;
                            // 🛡️ NaN 與未定義防護
                            if (typeof m !== 'undefined' && !isNaN(m)) {
                                netMult *= m;
                            }
                        }
                    }
                    // 淨倍率大於 1.05 才判定為加成狀態（吃著貸款利息時 netMult < 1，將會允許補種）
                    isCpsBuffActive = (netMult > 1.05);

                    if (isCpsBuffActive) {
                        Config.Memory.LastBuffEndTime = 0;
                    } else {
                        const currentTime = Date.now();
                        const buffEndTime = Config.Memory.LastBuffEndTime || 0;
                        const bufferTime = Config.Settings.GardenBufferTime || 5000;

                        if (currentTime - buffEndTime < bufferTime) {
                            shouldSkipPlanting = true;
                        }
                    }
                }

                if (!isCpsBuffActive && Config.Memory.LastBuffEndTime === 0) {
                    Config.Memory.LastBuffEndTime = Date.now();
                    GM_setValue('lastBuffEndTime', Config.Memory.LastBuffEndTime);
                }

                for (let y = 0; y < 6; y++) {
                    for (let x = 0; x < 6; x++) {
                        if (!M.isTileUnlocked(x, y)) continue;
                        const tile = M.plot[y][x];
                        const tileId = tile[0];
                        const tileAge = tile[1];
                        const savedId = Config.Memory.SavedGardenPlot[y][x];

                        const normalizedId = (tileId === 0) ? -1 : tileId - 1;

                        // [v9.1.4] JQB 收割與保護協議
                        if (normalizedId === 21) {
                            if (tileAge >= M.plantsById[normalizedId].mature + 1) {
                                Logger.success('花園', '👑 收割多汁女王甜菜 (獲取糖塊)');
                                M.harvest(x, y);
                            }
                            continue; // 強制保護，跳過後續鏟除邏輯
                        }

                        if (normalizedId > -1) {
                            const plant = M.plantsById[normalizedId];
                            const isAnomaly = (savedId !== -1 && normalizedId !== savedId) || (savedId === -1);
                            const plantName = UI.getLocalizedPlantName(tileId);

                            if (!isAnomaly) {
                                if (tileAge >= 98 && tileAge >= plant.mature) M.harvest(x, y);
                                continue;
                            }

                            if (Config.Flags.GardenMutation) {
                                if (plant.unlocked) {
                                    M.harvest(x, y);
                                    Logger.log('花園', `鏟除雜物/已知變異 (紅框): ${plantName}`);
                                } else {
                                    //[v8.9.5.2 Fix] 未解鎖植物 (紫框)：增加 1.0 tick 的強力緩衝
                                    // 確保植物完全熟透，防止因浮點數邊界問題導致收割失敗(不掉種子)
                                    if (tileAge >= plant.mature + 1) {
                                        M.harvest(x, y);
                                        Logger.success('花園', `成功收割新品種種子 (紫框): ${plantName}`);
                                    }
                                }
                            } else {
                                // [v8.8.9.3 Fix] Improved Meddleweed Protection
                                if (plant.weed && plant.unlocked) M.harvest(x, y);
                            }
                        }
                    }
                }

                let allowPlanting = true;
                if (Config.Flags.SavingMode && !Config.Flags.SavingReplant) {
                    allowPlanting = false;
                }

                if (allowPlanting) {
                    if (Config.Flags.SyncPlanting) {
                        let totalCost = 0;
                        let missingPlants =[];

                        for (let y = 0; y < 6; y++) {
                            for (let x = 0; x < 6; x++) {
                                if (!M.isTileUnlocked(x, y)) continue;
                                const tile = M.plot[y][x];
                                const normalizedId = (tile[0] === 0) ? -1 : tile[0] - 1;
                                const savedId = Config.Memory.SavedGardenPlot[y][x];

                                if (savedId > -1 && normalizedId === -1) {
                                    const seed = M.plantsById[savedId];
                                    if (seed && seed.unlocked && M.canPlant(seed)) {
                                        totalCost += M.getCost(seed);
                                        missingPlants.push({x, y, id: seed.id});
                                    }
                                }
                            }
                        }

                        if (Game.cookies < totalCost) {
                            UI.GardenGrid.updateStatus('funds', totalCost);
                            Runtime.Timers.NextGarden = now + 2500;
                            return;
                        }

                        if (isCpsBuffActive) {
                            UI.GardenGrid.updateStatus('buff');
                            Runtime.Timers.NextGarden = now + 2500;
                            return;
                        }

                        if (missingPlants.length > 0) {
                            UI.GardenGrid.updateStatus('ready');
                            for (let p of missingPlants) {
                                M.useTool(p.id, p.x, p.y);
                            }
                        } else {
                            UI.GardenGrid.updateStatus('ready');
                        }
                    } else {
                        UI.GardenGrid.updateStatus('hide');

                        for (let y = 0; y < 6; y++) {
                            for (let x = 0; x < 6; x++) {
                                if (!M.isTileUnlocked(x, y)) continue;

                                const tile = M.plot[y][x];
                                const normalizedId = (tile[0] === 0) ? -1 : tile[0] - 1;
                                const savedId = Config.Memory.SavedGardenPlot[y][x];

                                if (normalizedId === -1) {
                                    if (savedId !== -1 && savedId !== null) {
                                        const seed = M.plantsById[savedId];
                                        if (seed && seed.unlocked && M.canPlant(seed)) {
                                            if (Config.Flags.GardenAvoidBuff && (isCpsBuffActive || shouldSkipPlanting)) continue;
                                            M.useTool(seed.id, x, y);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                Runtime.Timers.NextGarden = now + 2500;
            },
            updateOverlay: function() {
                if (!Config.Flags.GardenOverlay) return;
                if (typeof Game === 'undefined' || !Game.Objects['Farm'].minigameLoaded) return;
                const M = Game.Objects['Farm'].minigame;
                if (!M) return;
                for (let y = 0; y < 6; y++) {
                    for (let x = 0; x < 6; x++) {
                        const tileDiv = document.getElementById(`gardenTile-${x}-${y}`);
                        if (!tileDiv) continue;
                        tileDiv.classList.remove('cc-overlay-missing', 'cc-overlay-anomaly', 'cc-overlay-correct', 'cc-overlay-new', 'cc-overlay-jqb');
                        if (!M.isTileUnlocked(x, y)) continue;

                        const savedId = Config.Memory.SavedGardenPlot[y][x];
                        const gameId = M.plot[y][x][0];
                        const normalizedId = (gameId === 0) ? -1 : gameId - 1;

                        // [v9.1.4 New] JQB 絕對視覺優先權 (Level 5 Visual Priority)
                        // 無論記憶設定為何，只要長出的是 JQB (ID 21)，強制顯示金色並跳過後續檢查
                        if (normalizedId === 21) {
                            tileDiv.classList.add('cc-overlay-jqb');
                            continue; // ⛔ 阻斷後續的紅綠藍判斷，確保金色不被覆蓋
                        }

                        if (normalizedId === -1 && savedId !== -1) tileDiv.classList.add('cc-overlay-missing');
                        else if (normalizedId > -1) {
                            const plant = M.plantsById[normalizedId];
                            const isAnomaly = (savedId !== -1 && normalizedId !== savedId) || (savedId === -1);
                            if (isAnomaly) {
                                if (plant.unlocked) tileDiv.classList.add('cc-overlay-anomaly');
                                else tileDiv.classList.add('cc-overlay-new');
                            } else if (normalizedId === savedId) tileDiv.classList.add('cc-overlay-correct');
                        }
                    }
                }
            },
            clearOverlay: function() {
                // [v9.1.4] 追加 .cc-overlay-jqb 至移除清單
                $('.cc-overlay-missing, .cc-overlay-anomaly, .cc-overlay-correct, .cc-overlay-new, .cc-overlay-jqb')
                    .removeClass('cc-overlay-missing cc-overlay-anomaly cc-overlay-correct cc-overlay-new cc-overlay-jqb');
            },

            saveLayout: function() {
                if (typeof Game === 'undefined' || !Game.Objects['Farm'].minigame) { alert('花園未就緒！'); return; }

                let newLayout =[];
                let savedCount = 0;

                // v8.8.9: Branch logic based on Edit Mode
                if (UI.GardenGrid.isEditing) {
                    // Save from Inputs
                    for (let y = 0; y < 6; y++) {
                        let row =[];
                        for (let x = 0; x < 6; x++) {
                            const input = $(`#garden-grid-content input[data-x="${x}"][data-y="${y}"]`);
                            if (input.length && !input.prop('disabled')) {
                                let rawVal = input.val().trim();
                                let val = -1;
                                if (rawVal !== '') {
                                    let parsed = parseInt(rawVal, 10);
                                    if (!isNaN(parsed)) val = parsed;
                                }
                                row.push(val);
                                if (val > -1) savedCount++;
                            } else {
                                row.push(-1);
                            }
                        }
                        newLayout.push(row);
                    }
                    // Auto-exit Edit Mode (Cancel button logic will flip isEditing)
                    $('#btn-toggle-edit-mode').click();
                } else if (UI.GardenGrid.isSniperEditing) {
                    // Sniper Editing save logic is handled on its own module button.
                    Logger.warn('Sniper', '請使用狙擊手模組區的儲存按鈕來保存矩陣設定。');
                    return;
                } else {
                    // Save from Actual Garden
                    const M = Game.Objects['Farm'].minigame;
                    for (let y = 0; y < 6; y++) {
                        let row =[];
                        for (let x = 0; x < 6; x++) {
                            if (M.isTileUnlocked(x, y)) {
                                const tile = M.plot[y][x];
                                const gameId = tile[0];
                                if (gameId === 0) {
                                    row.push(-1);
                                } else {
                                    const plantIndex = gameId - 1;
                                    const plant = M.plantsById[plantIndex];
                                    if (plant && plant.unlocked) {
                                        row.push(plantIndex);
                                        savedCount++;
                                    } else {
                                        row.push(-1);
                                    }
                                }
                            } else row.push(-1);
                        }
                        newLayout.push(row);
                    }
                }

                Config.Memory.SavedGardenPlot = newLayout;

                //[v8.8.9] Logic Update: Save to GardenProfiles
                const currentSlot = Config.Memory.GardenSelectedSlot;
                const profiles = Config.Memory.GardenProfiles;
                if (profiles) {
                    const activeGroup = profiles.activeGroup;
                    const slotData = JSON.stringify(newLayout);

                    profiles.groups[activeGroup].slots[currentSlot] = slotData;
                    GM_setValue('gardenProfiles', profiles);

                    const btn = $('#garden-save-btn');
                    const originalText = btn.text();
                    btn.text('✅ 已儲存！').css('background', '#4caf50');

                    UI.updateAllLayoutSelectors();
                    // Force refresh grid to show newly saved data (especially if saved from editor)
                    if ($('#garden-grid-panel').is(':visible')) UI.GardenGrid.update();

                    if (typeof Game !== 'undefined' && Game.Notify) Game.Notify('花園陣型已記憶', `已儲存至 Slot ${currentSlot + 1} (${savedCount} 種植物)`,[10, 6], 4);
                    Logger.success('花園保護', `花園陣型已儲存至 Slot ${currentSlot + 1} (v8.8.9 Profile)`);
                    setTimeout(() => btn.text(originalText).css('background', '#2196f3'), 1500);
                }
            },

            loadLayout: function() {
                const currentSlot = Config.Memory.GardenSelectedSlot;
                // [v8.8.9] Logic Update: Load from GardenProfiles
                let slotString = '';
                const profiles = Config.Memory.GardenProfiles;

                if (profiles) {
                    const activeGroup = profiles.activeGroup;
                    if (profiles.groups[activeGroup] && profiles.groups[activeGroup].slots) {
                         slotString = profiles.groups[activeGroup].slots[currentSlot];
                    }
                } else {
                    // Fallback (Safe Mode)
                    Logger.warn('System', 'GardenProfiles 未就緒，載入操作略過');
                    return;
                }

                try {
                    if (slotString && slotString !== '' && slotString !== '[]') {
                        const parsed = JSON.parse(slotString);
                        if (Array.isArray(parsed) && parsed.length === 6) {
                            Config.Memory.SavedGardenPlot = parsed;
                            Logger.log('花園保護', `已載入陣型 Slot ${currentSlot + 1}`);
                        } else {
                            throw new Error('Invalid Format');
                        }
                    } else {
                        Config.Memory.SavedGardenPlot = Array(6).fill().map(() => Array(6).fill(-1));
                        Logger.log('花園保護', `Slot ${currentSlot + 1} 為空，已清除目標陣型`);
                    }
                } catch(e) {
                    Config.Memory.SavedGardenPlot = Array(6).fill().map(() => Array(6).fill(-1));
                    Logger.warn('花園保護', `Slot ${currentSlot + 1} 數據異常，已重置`);
                }
            }
        },

        Stock: {
            checkSeedPriority: function() {
                if (!Config.Flags.Garden) return false;
                const Farm = Game.Objects['Farm'];
                if (!Farm.minigameLoaded || !Farm.minigame) return false;
                const M = Farm.minigame;
                for (let y = 0; y < 6; y++) {
                    for (let x = 0; x < 6; x++) {
                        if (M.isTileUnlocked(x, y)) {
                            const savedId = Config.Memory.SavedGardenPlot[y][x];
                            const currentTile = M.plot[y][x];
                            const normalizedId = (currentTile[0] === 0) ? -1 : currentTile[0] - 1;

                            if (savedId > -1 && normalizedId === -1) {
                                const seed = M.plantsById[savedId];
                                if (seed && seed.unlocked) return true;
                            }
                        }
                    }
                }
                return false;
            },

            liquidate: function() {
                const Bank = Game.Objects['Bank'];
                if (!Bank.minigameLoaded || !Bank.minigame) return;
                const M = Bank.minigame;

                let soldCount = 0;
                M.goodsById.forEach(g => {
                    if (g.stock > 0) {
                        M.sellGood(g.id, 10000); // 10000 代表全部賣出
                        soldCount++;
                    }
                });
                if (soldCount > 0) {
                    Logger.success('Stock', `📉 已執行清倉指令，賣出 ${soldCount} 類持股`);
                } else {
                    Logger.log('Stock', '無持倉可賣');
                }
            },

            update: function(now) {
                // 1. 戰鬥紀律 (Combat Discipline)
                if (Logic.isCombatState()) {
                    Runtime.Timers.NextStock = Date.now() + 5000;
                    return;
                }

                // 2. 基礎檢查
                if (!Config.Flags.GlobalMasterSwitch || !Config.Flags.Stock) return;
                if (now < Runtime.Timers.NextStock) return;

                const Bank = Game.Objects['Bank'];
                if (!Bank || !Bank.minigameLoaded || !Bank.minigame) return;
                const M = Bank.minigame;

                // [Level 0] 憲法級防護: 打寶模式下絕對禁止股市操作
                if (Runtime.SeasonState.isFarming) {
                    return;
                }

                // [Level 1] 緊急鎖定
                if (Config.Flags.SpendingLocked) {
                    Runtime.Timers.NextStock = now + 5000;
                    return;
                }

                // 優先級禮讓: 花園種子
                if (this.checkSeedPriority()) {
                    if (Math.random() < 0.05) Logger.log('Stock', '暫停交易：優先保留資金給花園種子');
                    Runtime.Timers.NextStock = now + 5000;
                    return;
                }

                // 3. 經紀人自動化 (Auto-Hire Broker)[Fix v9.0.1.2]
                if (Config.Flags.AutoBroker) {
                    // [Level 2] 存錢模式檢查
                    if (!Config.Flags.SavingMode) {
                         // 檢查數量與價格 (API讀取是正常的)
							if (M.brokers < M.getMaxBrokers() && Game.cookies >= M.getBrokerPrice()) {
                            Logger.log('Stock', `僱用經紀人 (目前: ${M.brokers}/${M.getMaxBrokers()})`);

                            // ✅[Final Fix] 使用 DOM 模擬點擊 (因為 M.buyBroker 不存在)
                            const btn = document.getElementById('bankBrokersBuy');
                            if (btn) btn.click();

                            // 購買後立即退出
                            Runtime.Timers.NextStock = now + 1000;
                            return;
                        }
                    }
                }

                // [v9.0.1.1] 動態門檻計算 (Dynamic Thresholds)
                // 1. 計算當前手續費率 (Overhead): 初始 20% (0.2)，每位經紀人乘 0.95
                const overhead = 0.2 * Math.pow(0.95, M.brokers);

                // 2. 計算買入係數 (buyMult): 手續費越低，門檻越寬 (0.5 -> 0.8)
                const buyMult = 0.5 + (0.3 * (1 - overhead / 0.2));

                // 3. 計算賣出係數 (sellMult): 手續費越低，獲利點越低 (1.5 -> 1.2) 以增加周轉
                const sellMult = 1.5 - (0.3 * (1 - overhead / 0.2));

                // 4. 股票交易迴圈
                for (let i = 0; i < M.goodsById.length; i++) {
                    const good = M.goodsById[i];
                    const price = M.getGoodPrice(good);
                    const rv = M.getRestingVal(good.id);
                    const goodName = UI.cleanName(good.name);

                    // 買入邏輯: 必須非存錢模式
                    if (price < rv * buyMult && !Config.Flags.SavingMode) {
                        const maxStock = M.getGoodMaxStock(good);
                        if (good.stock < maxStock && Game.cookies > price) M.buyGood(good.id, 10000);
                    }

                    // 賣出邏輯: 允許在存錢模式下執行 (獲利)
                    if (price > rv * sellMult) {
                        if (good.stock > 0) {
                            M.sellGood(good.id, 10000);
							Logger.log('股市', `獲利賣出 ${goodName} @ $${price.toFixed(2)} (RV: ${rv.toFixed(2)}, Mult: ${sellMult.toFixed(2)})`);
                        }
                    }
                }
                Runtime.Timers.NextStock = now + 3000;
            }
        },

        Season: {
            //[v8.8.6] Static Data Source of Truth
            Config: {
                'valentines':[169, 170, 171, 172, 173, 174, 645], // 6 Basic + 1 Prism Heart
                'christmas':[143, 144, 145, 146, 147, 148, 149], // 7 Reindeer Cookies (Drops only)
                'halloween':[134, 135, 136, 137, 138, 139, 140], // 7 Cookies (Drops)
                // [Fix] 改為靜態定義，防止動態生成失敗
                'easter':[210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229]
            },

            CurrentStage: 0,
            Roadmap:[
                { id: 'valentines', name: 'Valentines' },
                { id: 'christmas', name: 'Christmas' },
                { id: 'easter', name: 'Easter' },
                { id: 'halloween', name: 'Halloween' }
            ],
            // [v8.9.7 Safety] Logic isFarming moved to Runtime initialization to ensure secure default

            update: function(now) {
                // [v8.9.2] 戰鬥紀律
                if (Logic.isCombatState()) return;

                const SEASON_SWITCH_COOLDOWN = 20000;

                // [v8.9.6.2] Season ID Hardening: Add static blocklist
                const SEASON_SWITCH_IDS =[182, 183, 184, 185, 209];

                // 1. 暖機與邊界檢查
                if (now < Runtime.Timers.GardenWarmup) return;
                // 即使在 SeasonBusy 期間，也允許檢查完成狀態，但不執行切換
                const isBusy = Runtime.Timers.SeasonBusy && now < Runtime.Timers.SeasonBusy;

                if (!Config.Flags.GlobalMasterSwitch || !Config.Flags.Season) {
                    this.isFarming = false;
                    Runtime.SeasonState.isFarming = false;
                    return;
                }

                // 2. 目標鎖定
                if (this.CurrentStage >= this.Roadmap.length) {
                    // [v8.9.7 Safety] Explicitly release farming state when complete
                    if (this.isFarming) {
                        this.isFarming = false;
                        Runtime.SeasonState.isFarming = false;
                        Logger.success('Season', '全季節目標達成，自動化掛機中...');
                    }
                    return;
                }

                if (now < Runtime.Timers.NextSeasonCheck && !isBusy) return;

                const currentTask = this.Roadmap[this.CurrentStage];
                const targetSeasonId = currentTask.id;
                const targetIDs = this.Config[targetSeasonId];

                // 3. 完成度驗證 (Strict Count Check) - 抗 AHK 延遲核心
                let boughtCount = 0;
                let totalCount = 0;

                if (targetIDs && Array.isArray(targetIDs) && targetIDs.length > 0) {
                    totalCount = targetIDs.length;
                    // 嚴格檢查每個 ID 是否確實存在於 Game.UpgradesById 且 bought=1
                    boughtCount = targetIDs.filter(id => {
                        const u = Game.UpgradesById[id];
                        return u && u.bought;
                    }).length;
                } else {
                    // 若讀不到 ID 列表 (極端異常)，強制卡住，不讓它跳過
                    totalCount = 999;
                }

                // 判定標準：必須 實買數量 >= 應買數量
                // 若因 Lag 導致讀不到數據，boughtCount 會是 0， 0 < 7，判定為「未完成」，這就是我們要的安全網。
                let isComplete = (totalCount > 0) && (boughtCount >= totalCount);

                // [聖誕節特例] 必須同時滿足: 餅乾全滿 AND 聖誕老人等級 >= 14
                if (targetSeasonId === 'christmas') {
                    const santaReady = (Game.santaLevel >= 14);
                    if (isComplete && !santaReady) {
                        isComplete = false;
                        if (!isBusy && Math.random() < 0.05) {
                            Logger.log('Season', `等待聖誕老人升級 (Lv ${Game.santaLevel}/14)...`);
                        }
                    }
                }

                // 4. 狀態執行
                if (isComplete) {
                    // --- 畢業分支 ---
                    Logger.success('Season', `季節 ${currentTask.name} 畢業 (進度: ${boughtCount}/${totalCount})`);
                    this.CurrentStage++;
                    //[v8.9.7 Safety] Release state
                    this.isFarming = false;
                    Runtime.SeasonState.isFarming = false;
                    Runtime.Timers.NextSeasonCheck = now + 2000;
                } else {
                    // --- 打寶分支 ---
                    this.isFarming = true;
                    Runtime.SeasonState.isFarming = true;

                    if (isBusy) return; // 冷卻中，僅更新狀態，不執行切換

                    // A. 切換季節
                    if (Game.season !== targetSeasonId) {
                        const switcher = Object.values(Game.Upgrades).find(u => u.toggle && u.season === targetSeasonId);
                        if (switcher && switcher.canBuy()) {
                            Logger.log('Season', `切換季節至: ${currentTask.name} (進度: ${boughtCount}/${totalCount}) - 等待 20s...`);
                            switcher.buy();
                            Runtime.Timers.SeasonBusy = now + SEASON_SWITCH_COOLDOWN;
                            Runtime.Timers.NextSeasonCheck = now + SEASON_SWITCH_COOLDOWN;
                        } else {
                            // 可能還沒解鎖季節切換器，等待
                            Runtime.Timers.NextSeasonCheck = now + 5000;
                        }
                        return;
                    }

                    // B. 購買季節物品
                    // [v9.1.10] 調整過濾順序，將憲法級檢查前置
                    const seasonUpgradesInStore = Game.UpgradesInStore.filter(u =>
                        u.pool !== 'toggle' &&              // 🛡️ [Security] 第一位：防止誤買切換器
                        !SEASON_SWITCH_IDS.includes(u.id) &&// 🛡️[Security] 第二位：靜態黑名單
                        u.season === targetSeasonId &&
                        u.canBuy()
                    );

                    if (seasonUpgradesInStore.length > 0) {
                        seasonUpgradesInStore.forEach(u => {
                            u.buy();
                            Logger.log('Season', `購買季節物品: ${u.name}`);
                        });
                        Runtime.Timers.NextSeasonCheck = now + 500;
                    } else {
                        // 顯示進度 (減少頻率)
                        if (Math.random() < 0.02) {
                            Logger.log('Season', `打寶中 [${currentTask.name}]: ${boughtCount}/${totalCount} (缺 ${totalCount - boughtCount})`);
                        }
                        Runtime.Timers.NextSeasonCheck = now + 2000;
                    }
                }
            }
        },

        Santa: {
            update: function(now) {
                if (!Config.Flags.GlobalMasterSwitch) return;
                if (!Config.Flags.Santa || Game.season !== 'christmas') return;
                if (Game.Has('A festive hat') && !Game.Has('Santa Claus')) {}
                if (Game.santaLevel < 14) {
                    if (typeof Game.UpgradeSanta === 'function') Game.UpgradeSanta();
                }
            }
        },

        updateTitle: function() {
            if (typeof Game === 'undefined') return;

            // [v9.1.3] AHK 通訊協議：只讀取 Runtime 快取，不進行運算
            const isBusy = Runtime.SystemStatus.isBusy;
            const signalStatus = isBusy ? "⛔BUSY" : "✅SAFE";

            let totalMult = 1;
            let isWorthClicking = false;
            if (Game.buffs) {
                for (let i in Game.buffs) {
                    const buff = Game.buffs[i];
                    if (buff.multCpS > 0) totalMult *= buff.multCpS;
                    if (buff.multClick > 0) totalMult *= buff.multClick;
                    if (buff.multClick > 1 || buff.multCpS > 7) isWorthClicking = true;
                }
            }
            let coords = "0,0";
            const bigCookie = document.querySelector('#bigCookie');
            if (bigCookie) {
                const rect = bigCookie.getBoundingClientRect();
                coords = `${Math.round(rect.left + rect.width / 2)},${Math.round(rect.top + rect.height / 2)}`;
            }
            const signal = isWorthClicking ? "⚡ATTACK" : "💤IDLE";
            const displayMult = totalMult > 1000 ? (totalMult/1000).toFixed(1) + 'k' : Math.round(totalMult);

            // [v9.2.1] Sniper System 標題綴詞
            let sniperPrefix = '';
            if (Runtime.GardenState && Runtime.GardenState.sniperActiveCoord) {
                const coord = Runtime.GardenState.sniperActiveCoord;
                if (Runtime.GardenState.sniperModeColor === 'Gold') sniperPrefix = `[🎯${coord}]`;
                else if (Runtime.GardenState.sniperModeColor === 'Purple') sniperPrefix = `[🔮${coord}]`;
            }

            // 格式: [🎯B2][✅SAFE][⚡ATTACK|15.5k|100,200] OriginalTitle
            document.title = `${sniperPrefix}[${signalStatus}][${signal}|${displayMult}x|${coords}] ${Runtime.OriginalTitle}`;
        },

        // [v9.1.5 New] 強制解除熱鍵邏輯 (Visual Sync Fix)
        // [v9.1.10 Updated] Force Soil Linkage Logic
        EmergencyForceMutation: function() {
            // 1. Break the lock (Logic & Storage)
            Config.Flags.SpendingLocked = false;
            GM_setValue('spendingLocked', false);

            // 2. Clear Martial Law / Godzamok states
            if (Runtime.GodzamokState.mutationRestoreTimer) {
                clearTimeout(Runtime.GodzamokState.mutationRestoreTimer);
                Runtime.GodzamokState.mutationRestoreTimer = null;
            }
            Runtime.GodzamokState.isActive = false;
            GM_setValue('persist_isMartialLawActive', false);

            // 3. EXECUTE UNLOCK ROUTINE (UI.toggle handles the heavy lifting of restoring UI states)
            // 先解除鎖定，讓介面恢復「綠色」
            UI.GardenProtection.toggle(false);

            // 4. FORCE MUTATION ON (Logic & Storage)
            // 必須在 toggle 之後執行，因為 toggle 內部可能會根據記憶狀態重置變異開關
            Config.Flags.GardenMutation = true;
            GM_setValue('isGardenMutationEnabled', true);


            // 5. [v9.1.10] 泥土聯動邏輯優化
            if (Config.Flags.ForceSoilEnabled) {
                const Farm = Game.Objects['Farm'];
                if (Farm && Farm.minigameLoaded && Farm.minigame) {
                    const M = Farm.minigame;
                    const targetSoil = Config.Settings.ForceSoilID;

                    // 🛡️ 僅在泥土不同時切換，避免無效點擊
                    if (M.soil !== targetSoil) {
                        const soilBtn = document.getElementById('gardenSoil-' + targetSoil);
                        if (soilBtn) {
                            soilBtn.click();
                            Logger.log('Manual', `🌱 [F4] 已切換泥土至 ID: ${targetSoil}`);
                        }
                    }
                }
            }

            // 6. UI Synchronization (The Critical Part - Force Override)

            // 6.1 Sync Main Panel Checkboxes
            $('#chk-spending-lock').prop('checked', false);
            $('#chk-garden-mutation').prop('checked', true);

            // 6.2 Force Refresh specific UI Elements
            if (UI.GardenProtection.updateEmbeddedState) UI.GardenProtection.updateEmbeddedState(); // Sidebar (Sidebar Mutation btn to Purple)
            if (UI.updateEmbeddedState) UI.updateEmbeddedState(); // Top-Right HUD (Lock to Gray/Green)
            if (UI.GardenGrid.updateButtonState) UI.GardenGrid.updateButtonState(); // Grid Panel (Mutation btn to Green)

            Logger.critical('Manual', '☢️ 強制熱鍵執行：已解鎖資金、開啟變異，並嘗試切換泥土。');
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // 3. 系統核心 (System Core)
    // ═══════════════════════════════════════════════════════════════
    const Core = {
        heartbeatTimer: null,

        waitForGame: function(callback, maxRetries = 100) {
            if (typeof Game !== 'undefined' && Game.ready && document.readyState === 'complete') {
                callback();
            } else if (maxRetries > 0) {
                setTimeout(() => { this.waitForGame(callback, maxRetries - 1); }, 100);
            } else {
                Logger.error('Core', '遊戲初始化超時（10秒），部分功能可能無法使用');
            }
        },

        safeExecute: function(fn, moduleName) {
            try {
                fn();
            } catch(e) {
                Logger.error('Core', `${moduleName} 異常`, e);

                if (!Runtime.ModuleFailCount) Runtime.ModuleFailCount = {};
                Runtime.ModuleFailCount[moduleName] = (Runtime.ModuleFailCount[moduleName] || 0) + 1;

                if (Runtime.ModuleFailCount[moduleName] >= 10) {
                    Logger.critical('Core', `${moduleName} 連續失敗 10 次，已自動停用`);
                    // Safety Disable
                    switch(moduleName) {
                        case 'Buy':
                            Config.Flags.Buy = false;
                            GM_setValue('isBuyEnabled', false);
                            $('#chk-auto-buy').prop('checked', false);
                            break;
                        // ... (Other modules)
                    }
                    Runtime.ModuleFailCount[moduleName] = 0;
                }
            }
        },

        init: function() {
            Logger.success('Core', 'Cookie Clicker Ultimate v9.3.0 Loading...');

            Runtime.Timers.GardenWarmup = Date.now() + 10000;
            Logger.log('Core', '[花園保護] 暖機模式啟動：暫停操作 10 秒');

            const checkDataMigration = () => {
                // v8.8.9 Data Structure Migration
                const profiles = GM_getValue('gardenProfiles');
                if (!profiles) {
                    Logger.log('Migration', '偵測到 v8.8.9 數據結構升級，正在遷移花園存檔...');
                    // 讀取舊資料
                    const oldPlots = GM_getValue('gardenSavedPlots', ['', '', '', '', '']);
                    const oldNames = GM_getValue('gardenSlotNames',['Layout 1', 'Layout 2', 'Layout 3', 'Layout 4', 'Layout 5']);

                    // 建立新結構
                    const newProfiles = {
                        activeGroup: 0,
                        groups:[
                            {
                                name: "預設群組",
                                slots: [...oldPlots],
                                slotNames: [...oldNames]
                            },
                            {
                                name: "擴充群組",
                                slots: new Array(36).fill("[]"),
                                slotNames: new Array(36).fill("Empty")
                            }
                        ]
                    };

                    GM_setValue('gardenProfiles', newProfiles);
                    Config.Memory.GardenProfiles = newProfiles;
                    Logger.success('Migration', '數據結構重構完成 (v8.8.9)');
					} else {
                    Config.Memory.GardenProfiles = profiles;
                }
            };
            checkDataMigration();

            Logic.Garden.loadLayout();

            //[v9.1.5 New] 自癒邏輯 (冷啟動)
            const pActive = GM_getValue('persist_isMartialLawActive', false);
            if (pActive) {
                Logger.warn('System', '偵測到殘留戒嚴狀態，排程 60s 後自動恢復變異...');
                // 模擬計時器狀態
                Runtime.GodzamokState.wasMutationEnabled = true;
                Runtime.GodzamokState.mutationRestoreTimer = setTimeout(() => {
                    Logic.GodzamokCombo.scheduleRestoration(); // 複用現有恢復邏輯
                }, 60000);
            }

            const safeDelay = Math.max(10000, Config.Settings.BuyIntervalMs);
            Runtime.Timers.NextBuy = Date.now() + safeDelay;
            Logger.log('Core', `自動購買已延遲 ${UI.formatMs(safeDelay)} 啟動，請利用此時間調整設定`);

            const savedSpendingState = GM_getValue('spendingLocked', false);
            Config.Flags.SpendingLocked = savedSpendingState;

            if (savedSpendingState) {
                Logger.warn('Core', '偵測到支出鎖定狀態，已優先啟用保護');
                const savedStates = GM_getValue('savedSpendingStates', null);
                if (savedStates) {
                    UI.GardenProtection.SavedStates = savedStates;
                }
            }

            const scriptRestarted = localStorage.getItem('cookieScriptRestarted');
            if (scriptRestarted) {
                Logger.log('Core', '腳本已自動重啟');
                localStorage.removeItem('cookieScriptRestarted');
            }

            UI.initStyles();
            UI.createFloatingButton();
            UI.createControlPanel();
            UI.createCountdown();
            UI.createBuffMonitor();
            UI.ActionLog.create();
            UI.GardenGrid.create();
            UI.Tooltip.create();
            // [v9.3.0] Magic Monitor
            if (Config.Flags.ShowMagicMonitor) {
                UI.MagicMonitor.create();
            }

            // Initial UI Creation
            UI.createRightControls();
            UI.createTrafficLight();

            try {
                if (Game.setVolume) Game.setVolume(Config.Settings.Volume);
            } catch(e) {
                Logger.warn('Core', '音量設定失敗，遊戲可能未完全載入');
            }

            this.scheduleRestart();
            this.startHeartbeat();

            setTimeout(() => {
                UI.GardenProtection.create();
                const restoreLockState = () => {
                    if ($('#chk-auto-buy').length === 0) {
                        Logger.warn('花園保護', '主 UI 尚未就緒，延遲恢復狀態');
                        setTimeout(restoreLockState, 200);
                        return;
                    }
                    if (Config.Flags.SpendingLocked) {
                        $('#chk-spending-lock').prop('checked', true);
                        UI.GardenProtection.toggle(true, true);
                        UI.GardenProtection.updateEmbeddedState();
                        if (UI.updateEmbeddedState) UI.updateEmbeddedState();
                    }
                };
                restoreLockState();

                if (Config.Memory.GardenProtectionMinimized) {
                    setTimeout(() => {
                        UI.GardenProtection.minimize();
                        UI.GardenProtection.updateEmbeddedState();
                    }, 1000);
                }
            }, 2000);

            setTimeout(() => {
                Logic.Garden.clearOverlay();
                UI.updateButtonState();
                UI.ActionLog.toggle(true);
                Logger.log('Core', '初始化完成，所有模組已就緒');
            }, 3000);

            // Input Listener System (v8.8.8.1)
            let lastInputTime = 0;
            document.addEventListener('keydown', function(e) {
                // [Core] Input Frequency Limit
                if (Date.now() - lastInputTime < 100) return;
                lastInputTime = Date.now();

                // Toggle Master Switch
                if (e.key === 'F8') {
                    e.preventDefault();
                    UI.toggleMasterSwitch();
                    return;
                }

                // Helper for hotkey checking
                const checkHotkey = (setting) => {
                    if (!setting) return false;
                    const wantCtrl = setting.includes('^');
                    const wantShift = setting.includes('+');
                    const wantAlt = setting.includes('!');
                    if (e.ctrlKey === wantCtrl && e.shiftKey === wantShift && e.altKey === wantAlt) {
                        let mainKey = setting.replace(/[\^\+\!]/g, '').toUpperCase();
                        if (e.key.toUpperCase() === mainKey) return true;
                    }
                    return false;
                };

                // Godzamok Tactical Nuke (F9)
                if (checkHotkey(Config.Settings.GodzamokHotkey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    Logic.GodzamokTactical.fire();
                    return;
                }

                // Godzamok Buy Ammo (F10)
                if (checkHotkey(Config.Settings.GodzamokBuyHotkey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    Logic.GodzamokTactical.buyAmmo();
                    return;
                }

                //[v9.1.5 New] Force Mutation Hotkey
                if (checkHotkey(Config.Settings.ForceMutationHotkey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    Logic.EmergencyForceMutation();
                    return;
                }

                // [v9.1.8] Loan Ranger Manual (F2)
                if (checkHotkey(Config.Settings.LoanHotkey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    Logic.LoanRanger.manualCast();
                    return;
                }
            });

            window.CookieBot = { UI, Logic, Config, Core, Runtime };
        },

        startHeartbeat: function() {
            const self = this;

            const runClicker = () => {
                //[Fast Loop] 嚴禁 DOM 查詢，只點擊 Cache
                if (Config.Flags.GlobalMasterSwitch && Config.Flags.Click && Runtime.Cache.BigCookie) {
                    try {
                        Runtime.Cache.BigCookie.click();
                        Runtime.Stats.ClickCount++;
                    } catch(e) {}
                }
                setTimeout(runClicker, Config.Flags.Click ? Math.max(10, Config.Settings.ClickInterval) : 1000);
            };

            // [Loop 3] Heartbeat (慢速/DOM/維護)
            this.heartbeatTimer = setInterval(() => {
                const now = Date.now();

                // [v9.1.3] 狀態快取更新 (每秒一次)
                Runtime.SystemStatus.isBusy = Logic.checkBusyState();

                // [v9.1.8] Global Mult Calculation for Loan Ranger
                let currentMult = 1;
                if (Game.buffs) {
                    for (let i in Game.buffs) {
                        const b = Game.buffs[i];
                        if (typeof b.multCpS !== 'undefined') currentMult *= b.multCpS;
                        if (typeof b.multClick !== 'undefined') currentMult *= b.multClick;
                    }
                }

                // ✅ 正確順序（不可更改）：
                Logic.Season.update(now);   // 1. 設定 `isFarming` 狀態
                Logic.Wrinkler.update(now); // 2. 執行皺紋蟲策略
                Logic.Buy.update(now);      // 3. 執行購買邏輯（依賴 `isFarming`）
                Logic.Garden.update(now);   // 4. 其他模組...
                Logic.Magic.update(now);

                // 1. 維護 Cache (允許 DOM)
                const newCookie = document.querySelector('#bigCookie');
                Runtime.Cache.BigCookie = newCookie || null;

                // 2. 金餅乾點擊
                if (Config.Flags.Golden) {
                    document.querySelectorAll('#shimmers > div.shimmer').forEach(c => c.click());
                }

                if (!Config.Flags.GlobalMasterSwitch) return;

                // 3. 執行所有邏輯 (移入低速迴圈)
                self.safeExecute(() => Logic.Fortune.update(), 'Fortune');
                self.safeExecute(() => Logic.SugarLump.update(now), 'SugarLump');
                self.safeExecute(() => Logic.Stock.update(now), 'Stock');
                self.safeExecute(() => Logic.Santa.update(now), 'Santa');
                self.safeExecute(() => Logic.Dragon.update(now), 'Dragon');
                self.safeExecute(() => Logic.GodzamokCombo.update(now), 'GodzamokCombo');
                // [v9.1.8] Loan Ranger
                self.safeExecute(() => Logic.LoanRanger.update(now, currentMult), 'LoanRanger');

                try { Logic.Garden.updateOverlay(); } catch(e) {}

                // 4. UI 更新
                if ($('#chk-auto-pledge').length) {
                    const label = $('#chk-auto-pledge').parent().find('span');
                    if (Runtime.SeasonState.isFarming) {
                        label.html('🔄 自動誓約 <span style="color:#ff9800;font-weight:bold;">(打寶中:暫停購買)</span>');
                    } else {
                        label.text('🔄 自動購買長者誓約');
                    }
                }

                //[v9.3.0] Update Magic Monitor
                if (Config.Flags.ShowMagicMonitor && UI.MagicMonitor) {
                    try {
                        if (typeof UI.MagicMonitor.update === 'function') UI.MagicMonitor.update();
                    } catch(e) {}
                }

                try { Logic.updateTitle(); } catch(e) {}
                try { Logic.Click.handlePrompts(); } catch(e) {}
                try { UI.updateBuffDisplay(); } catch(e) { console.error(e); }
                try { UI.GardenProtection.updateVisibility(); } catch(e) {}

                // Grimoire & Tactical Button Injection (Dynamic)
                try { UI.createGrimoireControls(); } catch(e) {}
                try { UI.createTacticalButton(); } catch(e) {}
                try { UI.createStockControls(); } catch(e) {} // [v8.9.6] 股市按鈕自癒

                if (Config.Flags.ShowGardenGrid && $('#garden-grid-panel').is(':visible')) {
                    try { UI.GardenGrid.update(); } catch(e) {}
                }

                const gardenPanel = document.getElementById('gardenPanel');
                if (gardenPanel && gardenPanel.style.display !== 'none') {
                    const embedRight = document.getElementById('cc-embed-right');
                    if (Config.Memory.GardenProtectionMinimized && Config.Flags.ShowGardenProtection) {
                        if (!embedRight || embedRight.style.display === 'none') {
                            const gardenPlot = document.getElementById('gardenPlot');
                            if (gardenPlot && !embedRight) {
                                UI.GardenProtection.createEmbeddedControls(gardenPlot);
                                UI.GardenProtection.updateEmbeddedState();
                            } else if (embedRight && embedRight.style.display === 'none') {
                                embedRight.style.display = 'flex';
                            }
                        }
                    }
                }

                if ($('#cc-embedded-controls').length === 0) {
                    UI.createRightControls();
                }

                // [v9.3.0] 離線防呆重啟協議 (Pre-Restart Recovery)
                if (Config.Flags.PreRestartRecovery && Runtime.Timers.NextRestart > 0) {
                    let timeLeft = Runtime.Timers.NextRestart - now;
                    if (timeLeft <= Config.Settings.RecoveryTimeMs && !Runtime.Cache.hasRecovered) {

                        // 1. 恢復魔法掛機
                        Config.Flags.Spell = true;
                        Config.Flags.SE = true;
                        GM_setValue('isSpellEnabled', true);
                        GM_setValue('isSEEnabled', true);
                        $('#chk-spell, #chk-se').prop('checked', true);

                        // 2. 憲法級防護檢查 (Level 0 & 1)
                        const godzamokActive = Runtime.GodzamokState.isActive;
                        const martialLaw = Runtime.GodzamokState.mutationRestoreTimer !== null;

                        if (!Config.Flags.SpendingLocked && !godzamokActive && !martialLaw) {
                            Config.Flags.GardenMutation = true;
                            GM_setValue('isGardenMutationEnabled', true);
                            $('#chk-garden-mutation').prop('checked', true);
                            if (UI.GardenGrid.updateButtonState) UI.GardenGrid.updateButtonState();
                            if (UI.GardenProtection.updateEmbeddedState) UI.GardenProtection.updateEmbeddedState();
                        } else {
                            Logger.warn('Recovery', '觸發恢復協議，但因戒嚴/鎖定狀態，跳過變異開啟');
                        }

                        Runtime.Cache.hasRecovered = true; // 🚨 防 Spam 鎖定
                        Logger.success('Recovery', '防呆重啟協議已觸發：自動恢復掛機狀態');
                    }
                }

                // 自動重啟檢查 (受 AutoRestart 開關控制)
                if (Config.Flags.AutoRestart && now >= Runtime.Timers.NextRestart) {
                    // 檢查快取狀態
                    if (!Runtime.SystemStatus.isBusy) {
                        Core.performRestart();
                    } else {
                        // 忙碌中，推遲重啟
                        if (Math.random() < 0.1) Logger.warn('Core', `系統忙碌中 (Godzamok/Combat/Sniper)，推遲自動重啟 ${Config.Settings.RestartDelayOnBusy/1000}秒`);
                        Runtime.Timers.NextRestart = now + Config.Settings.RestartDelayOnBusy;
                    }
                }

                if (Config.Flags.ShowCountdown && Config.Flags.AutoRestart) {
                    $('#txt-rst').text(UI.formatMs(Math.max(0, Runtime.Timers.NextRestart - now)));
                } else if (Config.Flags.ShowCountdown) {
                    $('#txt-rst').text('已停用');
                }
                
                if (Config.Flags.ShowCountdown) {
                    $('#txt-buy').text(Config.Flags.Buy ? UI.formatMs(Math.max(0, Runtime.Timers.NextBuy - now)) : '--:--');
                }

            }, 1000);

            // 啟動分離的迴圈
            runClicker();
        },

        scheduleRestart: function() {
            if (Runtime.Timers.RestartInterval) clearInterval(Runtime.Timers.RestartInterval);
            let interval = Config.Settings.RestartIntervalMs;
            if (interval < 60000) interval = 60000;
            Runtime.Timers.NextRestart = Date.now() + interval;
            if(this.restartTimer) clearTimeout(this.restartTimer);
            Runtime.Cache.hasRecovered = false; // [v9.3.0] 重置防呆標記
        },

        performRestart: function(force = false) {
            // [QA 憲法防線] 底層安全鎖：防止外部呼叫繞過忙碌檢查
            if (!force && Runtime.SystemStatus.isBusy) {
                Logger.warn('Core', '⛔ 底層攔截：系統處於忙碌狀態，拒絕重啟指令。');
                return;
            }

            if (Game.WriteSave) Game.WriteSave();
            localStorage.setItem('cookieScriptRestarted', 'true');
            Runtime.Cache.hasRecovered = false; //[v9.3.0] 重置防呆標記

            GM_openInTab(window.location.href, { active: true, insert: true, setParent: false });

            if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);

            setTimeout(() => {
                window.close();
                document.body.innerHTML = `
                    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2147483647 !important;font-family:sans-serif;">
                        <h1 style="font-size:48px;color:#ef5350;">🔄 系統已重啟</h1>
                        <p style="font-size:24px;margin-top:20px;">新分頁已開啟，請手動關閉此分頁以節省資源。</p>
                        <p style="font-size:16px;color:#aaa;margin-top:10px;">(瀏覽器安全設定攔截了自動關閉功能)</p>
                    </div>
                `;
                document.title = "⛔ 請關閉此分頁";
            }, 100);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { Core.waitForGame(() => Core.init()); });
    } else {
        Core.waitForGame(() => Core.init());
    }

})();
