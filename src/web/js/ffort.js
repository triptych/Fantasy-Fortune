YUI().use("node", "gallery-storage-lite", function(Y){
  ffort = {
    charData : {
      name: "",
      gender: "",
      chr_class: ""
    },
    init: function(){
      Y.log("ffort starting up!");
      ffort.bindings();
      ffort.getCharData();
      ffort.updateCharView();
    },
    updateCharView: function(){
      Y.log("update char view");
       
       
       //Y.log(Y.one(".chr_name"));
       //Y.one(".chr_name").set("value","foo");
      Y.one(".chr_name").set("value", ffort.charData.name);
      Y.one(".chr_gender").set("value",ffort.charData.gender);
      Y.one(".chr_class").set("value", ffort.charData.chr_class);
    },
    getCharData: function(){
      Y.log(ffort.charData);
      
      Y.StorageLite.on('storage-lite:ready', function () {
       Y.log("storage lite ready -- getchardata"); 
       if(Y.StorageLite.getItem("character") != null){
         ffort.charData = Y.StorageLite.getItem("character",true);
         //Y.log(Y.StorageLite.getItem("character",true))
       }
       
      });
    },
    setCharData: function(){
      //includes saving it
      ffort.charData.name = Y.one(".chr_name").get("value");
      ffort.charData.gender = Y.one(".chr_gender").get("value");
      ffort.charData.chr_class=Y.one(".chr_class").get("value");
      
      Y.log(ffort.charData);
      
      //now save it:
      Y.StorageLite.on('storage-lite:ready', function () {
       Y.log("storage lite ready -- saving data"); 
       Y.StorageLite.setItem("character", Y.JSON.stringify(ffort.charData));
      });
      
      
    },
    
    bindings: function(){
      Y.log("bindings called");
      
      Y.all(".ffort_save").on("click",function(e){
        e.preventDefault();
        Y.log("save clicked");
        ffort.setCharData();
        
      });
      
      Y.all(".ffort_clear").on("click",function(e){
        e.preventDefault();
        Y.log("clear clicked");
      })

    }

  }


  Y.on("domready",function(){
    ffort.init();
  })
  
    
})


