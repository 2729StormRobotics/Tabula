function test(){
    //var testMessage = networktables.getNumber("t_testMessage", "NULL");

    var header = document.createElement("h1");
    var text = document.createTextNode("textMessage");
    header.appendChild(text);
    console.log("daf");
    document.getElementsByTagName('body')[0].appendChild(header);
}
test();
