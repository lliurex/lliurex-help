

function createMenu(item, menuid){
    var ul=document.createElement("ul");
    ul.setAttribute("id", menuid);
    
    ul.visiblechild="none";
    ul.setAttribute("class", "list");
    
    for (i in item){
        var text=document.createTextNode(item[i].item.title);
        var li=document.createElement("li");
        if (menuid!=="mainMenu") li.style.display="none";
        li.setAttribute("parent", menuid);
        li.appendChild(text)
        
    
        if(item[i].item.hasOwnProperty("items")){
            // If has own property items, we have to create submenu
            var submenu=createMenu(item[i].item.items);
            li.setAttribute("class", "link");
            li.appendChild(submenu);
        } else {
            // adding link to menu entry
            li.setAttribute("target", item[i].item.filename);
            li.setAttribute("class", "mdDoc");
        }
        //console.log(item[i].item.items);
        console.log(text);
        ul.appendChild(li);
        // console.log(default_locale[i].item.title);
    }
    return ul;
};

function main(){
    var showdown  = require('showdown');
    var converter = new showdown.Converter();
    var fs=require('fs');

    var dir=nw.App.argv[0];

    if (typeof(dir)===typeof undefined)
        document.location="http://wiki.lliurex.net/Inicio%20llx16";
    else 
        {
            document.querySelector("#localHelp").style.display="block";
            document.querySelector("#loadWindow").style.display="none";
        }

    var path='documents/'+dir;
    var files;
    var indexpath='documents/'+dir+"/index.json";
    var lang=navigator.language;

    var index=fs.readFileSync(indexpath);
    var indexContent=JSON.parse(index);

    // Getting locales

    var default_locale=indexContent[lang];    
    if (typeof (default_locale) === typeof (undefined)) default_locale=indexContent[keys(intexContent)[0]];

    // Getting menu

    var menu=createMenu(default_locale, "mainMenu");
    (document.querySelector("#sections")).appendChild(menu);


    // Manage events
    document.body.addEventListener('click', function (e) {
        if (e.target.matches(".mdDoc")) {
          
            var path='documents/'+dir+'/'+e.target.getAttribute("target");
            var html=converter.makeHtml("<h1>Not available</h1>");
            if (fs.existsSync(path))
            {
                var content=fs.readFileSync(path, 'utf8');
                console.log(content);
                html=converter.makeHtml(content);
            }

            //document.querySelector("#content").remove();
            document.querySelector("#content").innerHTML=html;
        }



      });
      
      
      document.querySelector(".mdDoc").click();


      // TO-DO: Posar açò dalt...

      var listitems=document.querySelectorAll("li");
      for (li=0; li<listitems.length;li++){
          listitems[li].addEventListener("click",function(e) {
              e.stopPropagation();
              //console.log(e.target.parentNode);
               console.log(e.target);
               var className = " link ";
               var haslink=( (" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf(" link ") > -1 );
               console.log(haslink);
               if (haslink){

                   // Setting children visibility
                   console.log("***"+e.target.children[0].visiblechild);
                   console.log(e.target.children[0]);
                   if (e.target.children[0].visiblechild==="none")
                        e.target.children[0].visiblechild="block";
                    else e.target.children[0].visiblechild="none"

                   for (i=0; i<e.target.children[0].children.length; i++){
                    console.log(i);
                       console.log(e.target.children[0].children[i]);
                       
                       e.target.children[0].children[i].style.display=e.target.children[0].visiblechild;
                   }
               }

              
          });
          //li.addeventlistener("");
      }




    /*if (fs.existsSync(path)){
        files=fs.readdirSync(path);
        for (i in files){
            document.write(files[i]);

        }
        
    }*/

    


};





 if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
