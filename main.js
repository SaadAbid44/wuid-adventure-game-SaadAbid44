// Concept ideation from a friend.

var scenarios = [ 
  {
 
     "required": [],
     "bypass": ["OneItem"],
     "text": "Collect the items."
  },
  {
   
     "required": ["Sword"],
     "bypass": ["TwoItems"],
     "text": "Nice you found the Sword!"
  },
  {
    
     "required": ["OneItem"],
     "bypass": ["TwoItems"],
     "text": "Keep Searching...",
  },
  {
    
     "required": ["TwoItems"],
     "bypass": ["Gold", "ThreeItems"],
     "text": "A Helmet Nice!",
  },
  {
 
     "required": ["TwoItems"],
     "bypass": ["ThreeItems"],
     "text": "Almost There!",
  },
  {

     "required": ["ThreeItems"],
     "bypass": ["FourItems"],
     "text": "Onemore to go",
  },
  {

     "required": ["FourItems"],
     "bypass": [],
     "text": "You found the gold!",
  
  },  
]



var computedStoryPoints = {
  "requires": [ "Sword", "Shield", "Helmet", "Gold" ],
  "quantities": [
     [1, "OneItem"],
     [2, "TwoItems"],
     [3, "ThreeItems"],
     [4, "FourItems"]
  ]
}



document.getElementById("coin").innerHTML =
Math.floor(Math.random()*10);
alert("You have found" + Math.random());

//Functionality
var items = document.querySelectorAll(".item");
items.forEach(item => {
  item.addEventListener("click", () => {
     item.classList.toggle("collected");
     toggleStoryPoint( item.getAttribute("story-point") )
   //   refreshScenario();
  })
});


// Story Points 

//Story point 
var storyPoints = {};

function toggleStoryPoint(incomingStoryPoint) {
  //Remove if we had it
  if (storyPoints[incomingStoryPoint]) {
     delete storyPoints[incomingStoryPoint]
  } else {
     //Otherwise, add it
     storyPoints[incomingStoryPoint] = true;
  }
}

function getAllKnownStoryPoints() { 
  
  var acquiredCount = computedStoryPoints.requires.filter(sp => {
     return storyPoints[sp]
  }).length; 
  
  var computed = {};
  computedStoryPoints.quantities.forEach(q => {
     if (acquiredCount >= q[0]) {
        computed[q[1]] = true;
     }
  })
  
  
  return {
     ...storyPoints,
     ...computed
  }
}


function refreshScenario() {
  var known = getAllKnownStoryPoints();
  var scenario = scenarios.find(s => {
  
    
     for (var i=0; i<=s.bypass.length; i++) {
        if ( known[s.bypass[i]] ) {
           return false;
        }
     }
     
    
     return s.required.every(entry => known[entry])
  })
  
  document.querySelector(".text").textContent = scenario.text;
}
