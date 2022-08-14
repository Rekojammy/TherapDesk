function iOSversion() {

  if (isiOSDevice()) {
    return 'iOS Device';
  }

  return 'none';
}
window.isAndroid = false;
function isAndroidDevice() {
  return window.isAndroid;
}
function isiOSDevice() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }
/*var mainPrompt = window.prompt;
window.prompt = function(title,msg){
    if(console.log)
    {
        console.log(title + " : " + msg);
    }
    if(window.location.href.indexOf("file:///android_asset")==0)
      return mainPrompt(title,msg);
    throw title;
};*/

var cordova_script_file = $("<script/>");
cordova_script_file.attr("type", "text/javascript");
var current_cordova_script_file = $('script').last();
var current_cordova_script_file_path = current_cordova_script_file.attr('src');
console.log(navigator.userAgent);
if(navigator.userAgent.indexOf('Desktop App')==-1)
    {
        if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1))
        {
                if(iOSversion()!="none")
                    cordovaIOSfn();
                else
                {
                    //if(navigator.userAgent.indexOf('Android App')!=-1)
                    if(window.location.href.indexOf("file:///android_asset")==0) {
                        window.isAndroid = true;
                        cordova_script_file.attr("src", current_cordova_script_file_path.replace("cordova","cordova-android"));
                  }
                }


            if(current_cordova_script_file_path!=cordova_script_file.attr("src"))
                current_cordova_script_file.after(cordova_script_file);
        }
    }
