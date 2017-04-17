(function test(){
    var testMessage = NetworkTables.getValue("t_testMessage", "NULL");
    console.log(testMessage);
    NetworkTables.putValue("t_servertest", "ft");
    var header = document.createElement("h1");
    var text = document.createTextNode(testMessage);
    header.appendChild(text);

    document.body.appendChild(header);
})();
