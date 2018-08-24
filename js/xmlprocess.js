window.addEventListener("load", initialize);

var qNumber;
var answers;

function initialize(){
    qNumber=-1;
    answers = new Array();
    document.getElementById("prevBtn").style.display="none";
    writeQuestion(1);
}

function loadXMLDoc(dname){
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
} 

function writeQuestion(n){

    xmlDoc=loadXMLDoc("finalquiz.xml");
    x=xmlDoc.getElementsByTagName("question");
    qNumber += n;

    //verify that a radio button is checked
    if(!writeAnswer(qNumber, n)){
        alert("please select an answer!");
        qNumber -= n;
    }
    else{
        if(qNumber==0){
            document.getElementById("prevBtn").style.display="none";
        }
        else{
            document.getElementById("prevBtn").style.display="inline";
        }
    
        if(qNumber==x.length-1){
            document.getElementById("nextBtn").innerHTML = "Submit"
        }
        else{
            document.getElementById("nextBtn").innerHTML = "Next"
        }
    
        if(qNumber==x.length){
            gradeQuiz();
            console.log("Quiz finished!"); 
            document.getElementById("result").style.display = "block";           
        }
        else{
            document.getElementById("title").innerHTML=xmlDoc.getElementsByTagName("qtitle")[qNumber].childNodes[0].nodeValue;
            document.getElementById("a").innerHTML=xmlDoc.getElementsByTagName("a")[qNumber].childNodes[0].nodeValue;
            document.getElementById("b").innerHTML=xmlDoc.getElementsByTagName("b")[qNumber].childNodes[0].nodeValue;
            document.getElementById("c").innerHTML=xmlDoc.getElementsByTagName("c")[qNumber].childNodes[0].nodeValue;
            document.getElementById("d").innerHTML=xmlDoc.getElementsByTagName("d")[qNumber].childNodes[0].nodeValue;
        }

        //to check the radio button of the previous question
        if(n==-1){
            var elements = document.getElementsByName("answer");
            if(answers[qNumber]=="a"){
                elements[0].checked=true;
            }
            else if(answers[qNumber]=="b"){
                elements[1].checked=true;
            }
            else if(answers[qNumber]=="c"){
                elements[2].checked=true;
            }
            else if(answers[qNumber]=="d"){
                elements[3].checked=true;
            }
        }
    }
    
    
}

function writeAnswer(n, type){
    
    //if the button previous was called
    if(type==-1){
        return true;
    }
    
    q = n-1;

    if(q>=0){
        var elements = document.getElementsByName("answer");
        var ans="";
        for (var i = 0, l = elements.length; i < l; i++)
        {
            if (elements[i].checked)
            {
                ans = elements[i].value;
                elements[i].checked = false;
            }
        }
        if(ans==""){
            return false;
        }
        answers[q] = ans;
    }

    return true;

}

function gradeQuiz(){
    var correctAnswerCount=0;
    xmlDoc=loadXMLDoc("finalquiz.xml");
    x=xmlDoc.getElementsByTagName("question");
    rightAns=String(xmlDoc.getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue);

    var rightAnswers = rightAns.split(",");
    
    for(i=0;i<rightAnswers.length;i++){
        if(rightAnswers[i]==answers[i]){
            correctAnswerCount++;
        }
    }
    document.getElementById("result").innerHTML = "Grade "+ correctAnswerCount + "/" + rightAnswers.length;
    document.getElementById("questionsDiv").style.display = "none";
}