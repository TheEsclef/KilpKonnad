window.onload = function(){
    var Eurod = 0; //Eurode arv
    var EuroLeid = 1; //Kogus Eurosid mida leitakse otsides
    
    // MAGNETI UUENDUS
    var MagnetCost = 10;
    var MagnetBoonus = 1;
    var MagnetLevel = 0;

    // PRILLIDE UUENDUS
    var PrillidCost = 250;
    var PrillidBoonus = 5;
    var PrillidLevel = 0;

    // TAARA UUENDUS
    var TaaraCost = 4000;
    var TaaraBoonus = 10;
    var TaaraLevel = 0;

    // RAHA OTSIMINE
    document.getElementById("increment").onclick = function(){
        Eurod = Eurod + EuroLeid;
        update();
    }

    // UPDATE
    function update(){
        document.getElementById("MagnetLevel").innerHTML = MagnetLevel;
        document.getElementById("MagnetCost").innerHTML = MagnetCost;
        document.getElementById("PrillidLevel").innerHTML = PrillidLevel;
        document.getElementById("PrillidCost").innerHTML = PrillidCost;
        document.getElementById("eurode_kogus").innerHTML = Math.floor(Eurod);
        document.getElementById("EuroLeid").innerHTML = Math.floor(EuroLeid);
        document.getElementById("TaaraLevel").innerHTML = TaaraLevel;
        document.getElementById("TaaraCost").innerHTML = TaaraCost;
    }

    // MAGNET OST
    document.getElementById("magnet_osta").onclick = function(){
        if (Eurod >= MagnetCost){
            Eurod -= MagnetCost;
            MagnetLevel += 1;
            EuroLeid += Math.floor(MagnetBoonus);
            MagnetCost = Math.floor(2.6 * MagnetCost);
            update();
        }
    }

    // PRILLID OST
    document.getElementById("prillid_osta").onclick = function(){
        if (Eurod >= PrillidCost){
            Eurod -= PrillidCost;
            PrillidLevel += 1;
            EuroLeid += Math.floor(PrillidBoonus);
            PrillidCost = Math.floor(2.6 * PrillidCost);
            update();
        }
    }

    // TAARA OST
    document.getElementById("taara_osta").onclick = function(){
        if (Eurod >= TaaraCost){
            Eurod -= TaaraCost;
            TaaraLevel += 1;
            EuroLeid += Math.floor(TaaraBoonus);
            TaaraCost = Math.floor(2.6 * TaaraCost);
            update();
        }
    }
    update();
}