var showdown  = require('showdown');
var converter = new showdown.Converter();
var fs=require('fs');


function LliureXHelp(){
    this.dir="";
    this.indexContent=null;
    this.eventsAssigned=false;

}



LliureXHelp.prototype.createMenu=function createMenu(item, menuid){
    var self=this;

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
            var submenu=self.createMenu(item[i].item.items);
            li.setAttribute("class", "link");
            li.appendChild(submenu);
        } else {
            // adding link to menu entry
            li.setAttribute("target", item[i].item.filename);
            li.setAttribute("class", "mdDoc");
        }
        //console.log(item[i].item.items);
        //console.log(text);
        ul.appendChild(li);
        // console.log(default_locale[i].item.title);
    }
    return ul;
};



LliureXHelp.prototype.bindEvents=function bindEvents(){
    var self=this;

    console.log("bond, james bond events");

    document.getElementsByClassName('mdDoc').addEventListener('click', function(e) {
        var path='documents/'+self.dir+'/'+e.target.getAttribute("target");
        var html=converter.makeHtml("<h1>Not available</h1>");
        if (fs.existsSync(path))
        {
            var content=fs.readFileSync(path, 'utf8');
            //console.log(content);
            html=converter.makeHtml(content);
        }

        //document.querySelector("#content").remove();
        document.querySelector("#content").innerHTML=html;
    });

    document.getElementsByTagName('li').addEventListener('click', function(e){
        // Matches with an li item, without mdDoc class.

        //e.stopPropagation();
        //console.log(e.target.parentNode);
        console.log(e.target);
        var className = " link ";
        var haslink=( (" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf(" link ") > -1 );
        //console.log(haslink);
        if (haslink){

            // Setting children visibility
            //console.log("***"+e.target.children[0].visiblechild);
            //console.log(e.target.children[0]);
            if (e.target.children[0].visiblechild==="none")
                e.target.children[0].visiblechild="block";
            else e.target.children[0].visiblechild="none"

            for (i=0; i<e.target.children[0].children.length; i++){
            //console.log(i);
                //console.log(e.target.children[0].children[i]);
                
                e.target.children[0].children[i].style.display=e.target.children[0].visiblechild;
            }
        }
    });

    document.getElementsByClassName('langItem').addEventListener('click', function(e){
        //alert(e.target.getAttribute("localeCode"));
        
        var newContent=self.indexContent[e.target.getAttribute("localeCode")];
        var menu=self.createMenu(newContent, "mainMenu");
        (document.querySelector("#menu")).innerHTML="";
        (document.querySelector("#menu")).appendChild(menu);
    })

    
    /*console.log(self.eventsAssigned);
    if (self.eventsAssigned)
        document.body.removeEventListener('click', clickOnDocument, true);
    self.eventsAssigned=true;
    document.body.addEventListener('click', clickOnDocument, true);
    */

    document.querySelector(".mdDoc").click();


}


LliureXHelp.prototype.bindEvents=function bindEventsOrig(){
    var self=this;

    console.log("bond, james bond events");

    function clickOnDocument(e){
        e.stopPropagation();
        if (e.target.matches(".mdDoc")) {  
            var path='documents/'+self.dir+'/'+e.target.getAttribute("target");
            var html=converter.makeHtml("<h1>Not available</h1>");
            if (fs.existsSync(path))
            {
                var content=fs.readFileSync(path, 'utf8');
                //console.log(content);
                html=converter.makeHtml(content);
            }

            //document.querySelector("#content").remove();
            document.querySelector("#content").innerHTML=html;
        }
        else if (e.target.matches("li")){
            console.log("222222222222");       
            // Matches with an li item, without mdDoc class.

            //e.stopPropagation();
            //console.log(e.target.parentNode);
            console.log(e.target);
            var className = " link ";
            var haslink=( (" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf(" link ") > -1 );
            //console.log(haslink);
            if (haslink){

                // Setting children visibility
                //console.log("***"+e.target.children[0].visiblechild);
                //console.log(e.target.children[0]);
                if (e.target.children[0].visiblechild==="none")
                    e.target.children[0].visiblechild="block";
                else e.target.children[0].visiblechild="none"

                for (i=0; i<e.target.children[0].children.length; i++){
                //console.log(i);
                    //console.log(e.target.children[0].children[i]);
                    
                    e.target.children[0].children[i].style.display=e.target.children[0].visiblechild;
                }
            }
        } else if (e.target.matches(".langItem")){
            //alert(e.target.getAttribute("localeCode"));
            var newContent=self.indexContent[e.target.getAttribute("localeCode")];
            var menu=self.createMenu(newContent, "mainMenu");
            (document.querySelector("#menu")).innerHTML="";
            (document.querySelector("#menu")).appendChild(menu);
            
            // And finally rebind events 
            //self.bindEvents();
            
            
        }




    }

    console.log(self.eventsAssigned);
    if (self.eventsAssigned)
        document.body.removeEventListener('click', clickOnDocument, true);
    self.eventsAssigned=true;
    document.body.addEventListener('click', clickOnDocument, true);

    document.querySelector(".mdDoc").click();


}

LliureXHelp.prototype.getIconPath=function getIconPath(desktopIcon){

    var icon="/usr/share/pixmaps/virtualbox.png";

    var USR_PIXMAPS_PATH = '/usr/share/pixmaps',
        USR_APPS_PATH = '/usr/share/applications',
        USR_DOCKAPPS_PATH = '/usr/share/dock/applications',
        USR_64x64ICON_PATH = '/usr/share/icons/hicolor/64x64/apps',
        USR_OTHERICON_PATH = '/usr/share/icons/hicolor';

    try { (fs.lstatSync(USR_PIXMAPS_PATH+'/'+desktopIcon+'.png')) && (icon=USR_PIXMAPS_PATH+'/'+desktopIcon+'.png');    } catch(e) {}
    try { (fs.lstatSync(USR_OTHERICON_PATH+'/'+desktopIcon+'.svg')) && (icon=USR_OTHERICON_PATH+'/'+desktopIcon+'.svg');    } catch(e) {}
    try { (fs.lstatSync(USR_64x64ICON_PATH+'/'+desktopIcon+'.png')) && (icon=USR_64x64ICON_PATH+'/'+desktopIcon+'.png');    } catch(e) {}
    try { (fs.lstatSync(desktopIcon)) && (icon=desktopIcon); } catch(e) {  }

    return icon;

}



LliureXHelp.prototype.getDesktopInfo=function getDesktopInfo(file, lang){
    var self=this;
    
    var fs=require("fs");
    var desktopPath="/usr/share/applications/";
    var desktopFile=desktopPath+file+".desktop";
    
    var name="";
    var desc="";
    var icon="";

    if (lang==="ca") lang="ca@valencia";

    if (fs.existsSync(desktopFile)){
        var fileContent=fs.readFileSync(desktopFile, "utf8");
        var v=fileContent.toString().split("\n");
        for (i in v){
            // Check name
            if (v[i].indexOf("Name")!=-1) {
                var components=v[i].split("=");
                if (components[0]==="Name["+lang+"]")
                    name=components[1];
                else if (components[0]==="Name" && name==="")
                    name=components[1]; 
            }

            // Check description
            if (v[i].indexOf("Comment")!=-1) {
                var components=v[i].split("=");
                if (components[0]==="Comment["+lang+"]")
                    desc=components[1];
                else if (components[0]==="Comment" && desc==="")
                    desc=components[1]; 
            }

            // Check name
            if (v[i].indexOf("Icon")!=-1) {
                var components=v[i].split("=");
                icon=self.getIconPath(components[1]); 
            }
            
        }

        


    } 
    if (name==="") name=file;
    return {"name":name, "desc":desc, "icon": icon};

}

LliureXHelp.prototype.main=function main(){
    var self=this;
    self.dir=nw.App.argv[0];

    if (typeof(self.dir)===typeof undefined)
        document.location="http://wiki.lliurex.net/Inicio%20llx16";
    else 
        {
            document.querySelector("#localHelp").style.display="block";
            document.querySelector("#loadWindow").style.display="none";
        }

    var path='documents/'+self.dir;
    var files;
    var indexpath='documents/'+self.dir+"/index.json";
    var lang=navigator.language;

    

     // Getting info from desktop
    var desktopInfo=self.getDesktopInfo(self.dir, lang);
    
    document.querySelector("#titleName").innerHTML=desktopInfo.name;
    document.querySelector("#titleDesc").innerHTML=desktopInfo.desc;
    document.querySelector("#appIcon").style["background-image"]="url(file://"+desktopInfo.icon+")";
    
    // Check for errors
    if (fs.existsSync("documents") && fs.existsSync("documents/"+self.dir) && fs.existsSync(indexpath))
    {

        //console.log(desktopInfo);

        var index=fs.readFileSync(indexpath);
        self.indexContent=JSON.parse(index);
        // Getting locales from index file
        var languages=(Object.keys(self.indexContent));
        
        // Setting up locale selector ui
        for (i=0; i<languages.length; i++){
            var newlang=document.createElement("div");
            newlang.setAttribute("class", "langItem");
            //console.log(languages[i]);
            newlang.innerHTML="["+languages[i]+"]";
            newlang.setAttribute("localeCode", languages[i]);
            document.querySelector("#locales").appendChild(newlang);
        }

        // Getting current locale

        lang="es";
        var default_locale=self.indexContent[lang];
        //console.log(default_locale);
        //console.log(self.indexContent);

        if (typeof (default_locale) === typeof (undefined)){
            var first_index=Object.keys(self.indexContent)[0];
            default_locale=self.indexContent[first_index];
        }

        


        // Getting menu

        var menu=self.createMenu(default_locale, "mainMenu");
        (document.querySelector("#menu")).appendChild(menu);


        self.bindEvents();

    } else {
        document.querySelector("#content").innerHTML="<h2>No entries help documents for this application</h2>";
    }
    

    


};



var llxHelp=new LliureXHelp();

 if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    llxHelp.main();
} else {
  document.addEventListener("DOMContentLoaded", function(){


    llxHelp.main();
  });
}
