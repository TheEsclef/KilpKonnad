window.onload = function(){
    // Mängija Omandid
    var GP = 0;

    // XP Seotud
    var XP = 0;
    var XPleft = 100;

    // Upgradid
    var SwordLvlBonus = 1;
    var SwordLvlCost = 10;
    var ShieldLvlBonus = 5;
    var ShieldLvlCost = 10;
    var BandageCost = 20;
    var BandageLvlBonus = 1;

    // Mängija statid
    var PlayerDMG = PlayerLVL * SwordLvlBonus;
    var PlayerMaxHP = (PlayerLVL * ShieldLvlBonus) + 15;
    var PlayerHP = PlayerMaxHP;
    var PlayerLVL = 1;
    var SwordLvl = 1;
    var ShieldLvl = 1;
    var BandageLvl = 1;
    var KillCount = 0;

    // Tsoon
    var ZoneLvl = 1;
    var MinZoneLvl = (ZoneLvl + 1); 
    var MaxZoneLvl = (ZoneLvl + 3);

    // Vastasega Seotud
    var EnemyNimi = "Vastast Pole";
    var EnemyLvl = Math.floor(Math.random() * (MaxZoneLvl - MinZoneLvl + 1)) + MinZoneLvl;
    var EnemyHP = 0;
    var EnemyMaxHP = 0;
    var EnemyDMG = 0;

    // Vastase Loot
    var EnemyGP = Math.floor(Math.random() * (ZoneLvl * EnemyLvl)) + 1;
    var EnemyXP = Math.floor(Math.random() * ((ZoneLvl * EnemyLvl)) * 4) + 1;


    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    // SALVESTAB JA LAEB
    const load = JSON.parse(localStorage.getItem("save"));
    if (load) {
        PlayerHP = load.PlayerHP;
        PlayerMaxHP = load.PlayerMaxHP;
        PlayerDMG = load.PlayerDMG;
        GP = load.GP;
        XP = load.XP;
        XPleft = load.XPleft;
        ZoneLvl = load.ZoneLvl;
    
        SwordLvlBonus = load.SwordLvlBonus;
        SwordLvlCost = load.SwordLvlCost;
        SwordLvl = load.SwordLvl;
    
        ShieldLvlCost = load.ShieldLvlCost;
        ShieldLvlBonus = load.ShieldLvlBonus;
        ShieldLvl = load.ShieldLvl;
    
        BandageLvl = load.BandageLvl;
        BandageLvlBonus = load.BandageLvlBonus;
        BandageCost = load.BandageCost;
        KillCount = load.KillCount;
    
        EnemyNimi = load.EnemyNimi;
        EnemyMaxHP = load.EnemyMaxHP;
        EnemyXP = load.EnemyXP;
        EnemyGP = load.EnemyGP;
        EnemyDMG = load.EnemyDMG;
        EnemyHP = load.EnemyHP;
        EnemyLvl = load.EnemyLvl;
    }

    function SaveGame() {
        const saveData = {PlayerHP, PlayerMaxHP, PlayerDMG, GP, XP, XPleft, ZoneLvl,
            EnemyNimi, EnemyMaxHP, EnemyXP, EnemyGP, EnemyDMG, EnemyHP, EnemyLvl,
            SwordLvl, ShieldLvl, SwordLvlBonus, SwordLvlCost, ShieldLvlBonus, ShieldLvlCost,
            BandageLvl, BandageLvlBonus, BandageCost, KillCount}
        localStorage.setItem("save", JSON.stringify(saveData)); 
    }
    
    // KUSTUTAB SAVEI
    this.document.getElementById("erasesave").onclick = function(){
        localStorage.clear();
        location.reload();
    }

    function UpdatePlayer(){
        document.getElementById("PlayerDMG").innerHTML = PlayerDMG;
        document.getElementById("PlayerHP").innerHTML = PlayerHP;
        document.getElementById("PlayerMaxHP").innerHTML = PlayerMaxHP;
        document.getElementById("PlayerLvl").innerHTML = PlayerLVL;
        document.getElementById("GP").innerHTML = GP;
        document.getElementById("XP").innerHTML = XP;
        document.getElementById("XPleft").innerHTML = XPleft;
        document.getElementById("SwordLvl").innerHTML = SwordLvl;
        document.getElementById("ShieldLvl").innerHTML = ShieldLvl;
        document.getElementById("BandageLvl").innerHTML = BandageLvl;
        document.getElementById("BandageCost").innerHTML = BandageCost;
        document.getElementById("BandageBonus").innerHTML = BandageLvlBonus;
        document.getElementById("HealAmount").innerHTML = BandageLvl * PlayerLVL;
        document.getElementById("KillCount").innerHTML = KillCount;
    }

    function UpdateEnemy(){
        document.getElementById("EnemyNimi").innerHTML = EnemyNimi;
        document.getElementById("EnemyLvl").innerHTML = EnemyLvl;
        document.getElementById("EnemyHP").innerHTML = EnemyHP;
        document.getElementById("EnemyMaxHP").innerHTML = EnemyMaxHP;
        document.getElementById("EnemyDMG").innerHTML = EnemyDMG;
        document.getElementById("EnemyGP").innerHTML = EnemyGP;
        document.getElementById("EnemyXP").innerHTML = EnemyXP;
    }

    function UpdateStore(){
        document.getElementById("SwordCost").innerHTML = SwordLvlCost;
        document.getElementById("SwordBonus").innerHTML = SwordLvlBonus;
        document.getElementById("ShieldCost").innerHTML = ShieldLvlCost;
        document.getElementById("ShieldBonus").innerHTML = ShieldLvlBonus;
        document.getElementById("BandageLvl").innerHTML = BandageLvl;
        document.getElementById("BandageCost").innerHTML = BandageCost;
        document.getElementById("BandageBonus").innerHTML = BandageLvlBonus;
    }

    async function Combat(){
        if (EnemyNimi === "Täielik Tühjus"){
            return;
        }
        EnemyHP = (EnemyHP - PlayerDMG);
        PlayerHP = (PlayerHP - EnemyDMG);
        UpdateEnemy();
        UpdatePlayer();
        if ((EnemyNimi === "Rott") && (EnemyHP > 0)){
            document.getElementById("enemyimg").src = "./image/RatHurt.png";
            await sleep(150);
            document.getElementById("enemyimg").src = "./image/Rat.png";
        }
    }

    // Põgenemine hetkesest kaklusest
    async function Flee(){
        EnemyNimi = "Täielik Tühjus";
        EnemyLvl = 0;
        EnemyMaxHP = 0;
        EnemyHP = 0;
        EnemyDMG = 0;
        EnemyGP = 0;
        EnemyXP = 0;

        PlayerHP = PlayerMaxHP;
        await sleep(200);
        document.getElementById("enemyimg").src = "";
    }

    // Rotti sisse spawnimine
    function SpawnRat(){
        document.getElementById("enemyimg").src = "./image/Rat.png";
        EnemyLvl = Math.floor(Math.random() * (MaxZoneLvl - MinZoneLvl + 1)) + MinZoneLvl;
        EnemyNimi = "Rott";
        EnemyMaxHP = ((EnemyLvl + ZoneLvl) * 8);
        EnemyHP = EnemyMaxHP;
        EnemyDMG = ((EnemyLvl + ZoneLvl) - 1);
        EnemyGP = Math.floor(Math.random() * (ZoneLvl * EnemyLvl)) + 1;
        EnemyXP = Math.floor(Math.random() * ((ZoneLvl * EnemyLvl)) * 4) + 1;
    }
    document.getElementById("attack").onclick = function(){
        PlayerDMG = PlayerLVL * SwordLvlBonus;
        PlayerMaxHP = (PlayerLVL * ShieldLvlBonus) + 15;
        Combat();
        // Vastane sureb
        if ((EnemyHP <= 0) && !(EnemyNimi === "Täielik Tühjus")){
            GP = EnemyGP + GP;
            XP = EnemyXP + XP;
            KillCount = KillCount + 1;
            Flee();
            if (XP >= XPleft){
                XP = 0;
                PlayerLVL = PlayerLVL + 1;
                XPleft = PlayerLVL * 115;
            }
        }

        // Mängija sureb
        if (PlayerHP <= 0){
            Flee();
        }
        UpdateEnemy();
        UpdatePlayer();
        SaveGame();
    }
    this.document.getElementById("flee").onclick = function(){
        if (EnemyNimi === "Täielik Tühjus"){
            return;
            SaveGame();
        }
        Flee();
        UpdateEnemy();
        UpdatePlayer();
        SaveGame();
    }
    this.document.getElementById("Heal").onclick =function(){
        if (PlayerHP < PlayerMaxHP){
            PlayerHP = PlayerHP + (BandageLvlBonus * PlayerLVL);
            UpdatePlayer();
        }
    }
    this.document.getElementById("Spawn").onclick = function(){
        SpawnRat();
        UpdateEnemy();
        UpdatePlayer();
    }
    this.document.getElementById("SwordUpgrade").onclick = function(){
        if (GP >= SwordLvlCost){
            GP = GP - SwordLvlCost;
            SwordLvlCost = Math.ceil(SwordLvlCost * 1.6);
            SwordLvl = SwordLvl + 1;
            SwordLvlBonus = 1 * PlayerLVL;
        }
        PlayerDMG = (PlayerLVL * SwordLvlBonus);
        UpdatePlayer();
        UpdateStore();
        SaveGame(); 
    }
    this.document.getElementById("ShieldUpgrade").onclick = function (){
        if (GP >= ShieldLvlCost){
            GP = GP - ShieldLvlCost;
            ShieldLvlCost = Math.ceil(ShieldLvlCost * 1.6);
            ShieldLvl = ShieldLvl + 1;
            ShieldLvlBonus = 5 * PlayerLVL;
        } 
        UpdatePlayer();
        UpdateStore();
        SaveGame();
        PlayerMaxHP = (PlayerLVL * ShieldLvlBonus) + 15;
        PlayerHP = PlayerMaxHP;
    }

    this.document.getElementById("BandageUpgrade").onclick = function () {
    if (GP >= BandageLvlCost) {
            GP = GP - BandageLvlCost;
            BandageLvlCost = Math.ceil(BandageLvlCost * 1.6);
            BandageLvl = BandageLvl + 1;
            BandageLvlBonus = 1 * PlayerLVL;
        }
        UpdatePlayer();
        UpdateStore();
        SaveGame(); 
    }


    PlayerDMG = (PlayerLVL * SwordLvlBonus);
    PlayerMaxHP = (PlayerLVL * ShieldLvlBonus) + 15;
    PlayerHP = PlayerMaxHP;
    if (!load) {
        SpawnRat();
    }
    UpdatePlayer();
    UpdateEnemy();
    UpdateStore();
    SaveGame();
    if (EnemyNimi === "Rott"){document.getElementById("enemyimg").src = "./image/Rat.png";}
}
