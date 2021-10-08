let submitButton = document.getElementById('submit');
let inp = document.getElementById('input');
submitButton.addEventListener('click', submitData);
showNotes()
operations()

function submitData(){
    notesArray = [];
    
        if (localStorage.getItem('notes')==null){
            if(inp.value != ""){
                notesArray.push(inp.value);
                localStorage.setItem('notes', JSON.stringify(notesArray));
            }
        }
        else {
            notesArrStr = localStorage.getItem('notes')
            notesArray = JSON.parse(notesArrStr);
            if(inp.value != ""){
                notesArray.push(inp.value);
                localStorage.setItem('notes', JSON.stringify(notesArray));
            }       
        }
    showNotes()
    operations()
    inp.value = "";    
}

function showNotes(){
    document.getElementById('notes').innerHTML = "";
    var notesArrStr = localStorage.getItem('notes')
    notesArr = JSON.parse(notesArrStr);
    //list elements
    for (let pos = notesArr.length - 1; pos >= 0; pos--) {
        var li = document.createElement("LI")
        var textNode = document.createTextNode(notesArr[pos]);
        li.appendChild(textNode);
        document.getElementById('notes').appendChild(li);
    }
    var myNodelist = document.getElementsByTagName("LI");
    //clear
    for (let pos = notesArr.length - 1; pos >= 0; pos--) {
        var span = document.createElement("SPAN");
        span.className = "close";
        myNodelist[pos].appendChild(span);
    }
    //copy
    for (let pos = notesArr.length - 1; pos >= 0; pos--) {
        var span = document.createElement("SPAN");
        span.className = "copy";      
        myNodelist[pos].appendChild(span);
    }
    operations()
}

function operations(){
    
    var close = document.getElementsByClassName("close");
    var copy = document.getElementsByClassName("copy")
    for (let pos = 0; pos<close.length; pos++){
        close[pos].onclick = function() { //clear
        console.log("clicked on "+ pos)
        notesArrStr = localStorage.getItem('notes')
        notesArray = JSON.parse(notesArrStr);
        notesArray.splice(notesArr.length-pos-1, 1);
        localStorage.setItem('notes', JSON.stringify(notesArray)); 
        
        showNotes()
        }
        //copy
        copy[pos].onclick = function(){
            notesArrStr = localStorage.getItem('notes');
            notesArray = JSON.parse(notesArrStr);
            copyToClipboard(notesArr[notesArr.length-pos-1]);
        }
    }
}

async function copyToClipboard(val) {
    try {
      await navigator.clipboard.writeText(val);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }


