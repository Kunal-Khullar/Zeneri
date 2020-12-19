
  




var firebaseConfig = {
    apiKey: "AIzaSyANc8RwR1HN9DK7LpX_n1tE1RRcEzpjvn8",
    authDomain: "zeneri.firebaseapp.com",
    projectId: "zeneri",
    storageBucket: "zeneri.appspot.com",
    messagingSenderId: "818151313786",
    appId: "1:818151313786:web:e824877e99ce8598d486c3",
    measurementId: "G-136WM49SYK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
const auth = firebase.auth();

/// INITIALIZING VARIABLES
var Name = document.getElementById("Fullname");
var email = document.getElementById("exampleInputEmail1");
var password = document.getElementById("exampleInputPassword1");

var signPhone = document.getElementById("phoneNo")


const register = async() => {
    
    if (Name.value != "" && email.value != "" && password.value != "" && signPhone.value != "") {

        if (password.value.length > 7 && email.value.includes("@") && email.value.includes(".com") && signPhone.value.length == 10) {
            try {
                if (await auth.createUserWithEmailAndPassword(email.value, password.value)) {
                    db.collection(email.value).doc("profile").set({
                        "name": Name.value,
                        "email": email.value,
                        "phone": signPhone.value
                    })
                }

                alert("registered successfully");
            } catch (err) {
                alert(err);
            }
        }
    } 

    else
    {
        alert("Please enter all the fields")
    }
}
const show = function() {
    document.querySelector('#webdes').classList.add("hide");
    document.querySelector('#webdes').classList.add("animate__animated");
    document.querySelector('#webdes').classList.add("animate__fadeOut");
    document.querySelector('#mydiv').classList.remove("hide");
    document.querySelector('#op').classList.add("hide")
    document.querySelector('#mydiv2').classList.add("animate__animated");
    document.querySelector('#mydiv2').classList.remove("hide")
    document.querySelector('#mydiv2').classList.add("animate__fadeIn");
    document.querySelector('#mydiv').classList.add("animate__animated");
    document.querySelector('#mydiv').classList.add("animate__fadeIn");
}
const login = async function(){
    
    var logemail = document.getElementById("exampleInputEmail2");
    var logpassword = document.getElementById("exampleInputPassword2");
    if(logemail.value!=""&&logpassword.value!="")
    {
        try {
            if (await auth.signInWithEmailAndPassword(logemail.value, logpassword.value)) {
                var user = firebase.auth().currentUser;
                if (user != null) {
                    uid = user.email;
                    localStorage.setItem("currentUser", uid);
                    await db.collection(uid).doc("profile").get().then(function(doc) {
                        userName = doc.data().name,
                            userPhone = doc.data().phone
                    })
                    localStorage.setItem("currUserName",userName); 
                    location.href = "home.html"
                    console.log(userName,userPhone,localStorage.getItem("currentUser"))
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    else
    {
        alert("Please enter all the fields")
    }
}
let j;
const wheelf = function () {
    document.querySelector("#ptanhi").classList.remove("hide")
    document.querySelector('#wheelDiv').classList.remove("hide")
    var i=0;
    var wheel = new wheelnav("wheelDiv");
    document.querySelector('#menudiv').classList.add('hide')
    
    //This is the place for code snippets from the documentation -> http://wheelnavjs.softwaretailoring.net/documentation.html
    var colorString= ["#3acbd9","#e1e228","#ee665e","#3bb273"];
wheel = new wheelnav('wheelDiv');

wheel.spreaderTitleFont = '100 8px Roboto';
wheel.colors = colorpalette.gamebookers;

wheel.slicePathFunction = slicePath().PieSlice;
wheel.clickModeRotate = true;
wheel.createWheel(['Meditation','Your Journal','Articles','Talk to an Expert']);
wheel.navItems[0].navigateFunction = function(){
    location.href = 'meditation.html';
}
wheel.navItems[1].navigateFunction = function(){
    location.href = 'journal.html';
}
wheel.navItems[2].navigateFunction = function(){
    location.href = 'article.html';
}
wheel.navItems[3].navigateFunction = function(){
    location.href = '#experts';
}
    //alert($( this ).css( "transform" ));
  document.querySelector('#wheelDiv').classList.add("animate__animated");
  document.querySelector('#wheelDiv').classList.add("animate__rotateIn");


}
const entrydo = function(){
    var aaj = new Date();
    var mv = document.querySelector('#entry').value;
    var ab = "";
    var ti = 0;
    var m = aaj.getMonth()+1;
    if(aaj.getHours()>=12)
    {
        ti=aaj.getHours()-12;
        ab="PM"
    }
    else
    {
        ti=aaj.getHours();
        ab="AM"
    }
    db.collection(localStorage.getItem("currentUser")).add({
        content: mv,
        date: `${aaj.getDate()+"/"+m+"/"+aaj.getFullYear()}`,
        time: `${ti+":"+aaj.getMinutes()+" "+ ab}`
    })
}
const read = async function(){
    console.log("OP")
    document.querySelector("#carouselExampleIndicators").classList.remove('hide')
    document.querySelector("#car").classList.add('animate__animated')
    document.querySelector("#car").classList.add('animate__fadeIn')
    await db.collection(localStorage.getItem("currentUser")).orderBy("date","asc").onSnapshot(function(querySnapshot){
        querySnapshot.docChanges().forEach(function(change){
            if(change.type=="added"){
                document.querySelector('.carousel-inner').innerHTML += `<div class='carousel-item'><div class='paper'><div class='pattern'><div class='content'>${change.doc.data().content}</div></div></div></div>`
                $('.carousel-item').first().addClass('active')
            }
        })
    })
   document.getElementById("bt1").classList.add("hide");
}

$('#calendar').evoCalendar({
    theme: "Royal Navy",
    todayHighlight: true,

})
    const addevent = function() {
 
    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    db.collection(localStorage.getItem("currentUser")).add({
        ref:'calendar',
        id: `a${(Math.random()*1000)}`, // Event's ID (required)
            name: "You meditated", // Event name (required)
            date: `${months[today.getMonth()]}/${today.getDate()}/${today.getFullYear()}`, // Event date (required)
            type: "holiday", // Event type (required)
            everyYear: false // Same event every year (optional)
    })
console.log("Harman noob");
    }


    db.collection(localStorage.getItem("currentUser")).where('ref','==','calendar').onSnapshot(function(querySnapshot){
        querySnapshot.docChanges().forEach(function(change){
            if(change.type=="added")
            {
                $('#calendar').evoCalendar(
                    'addCalendarEvent', {
                        id: change.doc.data().id, // Event's ID (required)
                        name: change.doc.data().name, // Event name (required)
                         date: change.doc.data().date, // Event date (required)
                        type: change.doc.data().type, // Event type (required)
                         everyYear: false // Same event every year (optional)
                    }
            
                );
            }
        })
    })
    document.getElementById("username").innerHTML = localStorage.getItem("currUserName");
   