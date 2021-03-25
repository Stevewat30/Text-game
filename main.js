var story;
function getStory(name) {
  return {
    currentScene: "attack",
    attack: {
      title: "Chapter 1",
      story: `Once upon a time, not long ago, there was a beautiful place name Wiley's world. Wiley's world is a place of peace, and dreams UNTIL one day..... it was attacked by Ug-LEE,  the Angry Alien . The Premier alien of Mars, He's dangerous,and we need help  will you help us? ${name}.`,
      choices: [
        {
          choice: "Yes, I'm ready to battle!",
          destination: 'character'
        },
        {
          choice: "Umm Sike, think I'd rather just play video games instead.",
          destination: 'goHome'
        }
      ]
    }, 
    character:{
      title:'Pick your character',
      story:`Warriors of Wiley's world`,
      choices: [
        {
          choice: "Wiley ",
          destination:'character2'
        },
        {
          choice :"Xenia",
          destination:'character2'
        },
        {
          choice: "Prince T ",
          destination:'character2'
        }
      ]
    },
     character2: {
       title:"Design your player",
       story:`Pick attributes, and clothes`,
       choices: [
         {
           choice:"black-hair,curly,medium-length,leatherjacket, combat boots,armor shield, sunglasses",
           destination:'battle'
         },
         {
           choice:"blonde-hair,long,high-top converse, tracksuit,bandana,armor shield",
           destination:'battle'
         },
        {  choice: "brown-hair,short,gladiator sandles, kilt,armor shield ",
         destination:'battle'
       }
      ]
     },
    battle: {
      title: 'The epic battle of Ug-LEE!',
      story: `It's Ug-LEE the Angry  Alien, he looks pretty scary....and ....well...ugly!!!...Ug-LEe rushed towards you.. what do you do?`,
      choices: [
        {
        choice: "Attack him with a sword.",
        destination: 'theend'
        },
        {
        choice: "Attack him with karate.",
        destination: 'goHome'
        },
        {

        
        choice : "Run away screaming like a girl.",
        destination:'death'
        }
      ]
    },
      death:{ 
        title:'YOU DIED',
        story:` because you ran away, Ug-Lee spit a firezoid in your back , and you died!AWWW....so sad!`,
      choices:[
        { 
        choice : "just die",
        destination:'goHome',
        } 
      ]
    },
    theend:{ 
    title:'YOU WIN !!!!!',
    story:`You were fighting him well with the sword, until Ug-LEE snatched it and ate it!! you then fought him mortal combat style, until he got you in a headlock,and you bite his arm ... Ugl-ee yelled "ARRRGGGHHH!! and dissolved away. When an alien is bit by human teeth it makes them died, and dissolve.`, 
    choices:[
      {
        choice: "Accept victory!!, go get wasted,then go back home",
        destination:'goHome',
      },
    ] 
  }, 
    
     
    
   goHome:{ 
      title: "Back at home!",
      story: "Yes, you're back in comfort of your own home.If your here, you've either died,  a wuss!!!, or got beat up badly doing karate!!! Don't worry about it, someone else took care of the problem. No need to at all to feel guilty...!",
      image: "game_game.png",
      defaultDestination: 'attack',
      buttonText: "Let's try this again"
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('#start-button')
  var content = document.querySelector('#content')
  button.addEventListener('click', function() {
    var name = document.querySelector('#name-input')
    story = getStory(name.value)
    renderScene()
  })
})

function renderScene() {
  var text = "Next"
  var image = "";
  if (story[story.currentScene].image) {
    image = "<img></img>"
  }
  if (story[story.currentScene].buttonText) {
    text = story[story.currentScene].buttonText
  }
  content.innerHTML = `
  <h1>${story[story.currentScene].title}</h1>
  <p>${story[story.currentScene].story}</p>
  ${image}
  ${getInputs()}
  <button id = "submit-button">${text}</button>
  `
  if (story[story.currentScene].image) {
  // document.querySelector("img").src = ./img/${story[story.currentScene].image}`
  }
  var button = document.querySelector("#submit-button");
  button.addEventListener('click', function() {
    getInputValue()
  })
}

function getInputValue() {
  var inputs = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      story.currentScene = inputs[i].getAttribute('data-destination')
      renderScene();
      return;
    }
  }
  story.currentScene = story[story.currentScene].defaultDestination
  renderScene()
}

function getInputs() {
  var input = ""
  if (!story[story.currentScene].choices) {
    return ""
  }
  for(var i = 0; i < story[story.currentScene].choices.length; i++) {
    input += `
    <div>
      <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices" />
      <label for "radio${i}">${story[story.currentScene].choices[i].choice}</label>
    </div>`
  }
  return input;
}