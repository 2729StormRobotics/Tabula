var testMessage = networktables.getNumber("t_testMessage", "NULL");

var header = document.creteElement("H1");
var text = document.createTextNode("textMessage");
header.appendChild(text);

document.body.appendChild(header);
