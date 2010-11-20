YUI().use("node", function(Y){
  ffort = {
    init: function(){
      Y.log("ffort starting up!");
      ffort.bindings();
    },
    bindings: function(){
      Y.log("bindings called");
      
      Y.delegate("click",function(){
        Y.log("clicked");
        var tgtid = this.get("id");
        
        switch(tgtid){
          case "home_link":
            ffort.showPanel("home")   
            break;
          case "about_link":
            ffort.showPanel("about")   
            break;
          case "character_link":
            ffort.showPanel("character")   
            break;
          case "fortune_link":
            ffort.showPanel("fortune")   
            break;
          default:
            Y.log("something else clicked?");
          
        }
      },"#fantfort .dash .toolbar", "li");
    },
    showPanel: function(pnl){
      Y.log("showpanel " + pnl);
      Y.all(".panel").addClass("hidden");
      
      Y.one("."+pnl).removeClass("hidden");
    }
  }



  ffort.init();
    
})


