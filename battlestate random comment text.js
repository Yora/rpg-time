{
    "weapon_blood_sword": {
        "item_name": "Blood Sword",
        "rarity": "rare",
        "attack": 1,
        "min_attack": 10,
        "max_attack": 15,
        "mod_1": "STR_" + "+3",
        "mod_2": "VIT_" + "+5",
        "mod_3": "DEX_" + "+0",
        "mod_4": "INT_" + "+5",
        "mod_5": "VAMP_" + "+10%",
        "mod_6": "UNIQUE_" + "blood slash",

        //"uniqueText_6_1": "             If 3rd basic attack is charged, erupts a pillar of blood that deals 100(0) physical damage at the cost of (2) HP.",

        "uniqueText_6_1": "             If 3rd basic attack is charged, erupts a pillar of blood that deals 10 (+",
        "uniqueText_6_2": "_physical",
        "uniqueText_6_3": ") physical damage at the cost of 10% (",
        "uniqueText_6_4": "_hp",
        "uniqueText_6_5": ") HP.",

        //"mod_7": "UNIQUE_" + "blood slash",
        //"uniqueText_7_1": "             If 3rd basic attack is charged, erupts a pillar of blood that deals (",
        //"uniqueText_7_2": "Bonersexual2",
        //+ player_body.max_attack + ") physical damage at the cost of (" + 10 + ") HP.",
        "level_required": 1,
        "speed": 50,
        "knockback_mod": 200

    }
}


/*
  (function (cocoonjsphaser) {

      cocoonjsphaser.utils = {
          fixDOMParser: function () {
              window.DOMParser = DOMishParser;
          }
      };

      function DOMishParser() { }
      DOMishParser.prototype.parseFromString = function (data) {
          return new DOMishObject(JSON.parse(data));
      };

      function DOMishAttributes() { }
      DOMishAttributes.prototype.getNamedItem = function (name) {
          return {
              nodeValue: this[name] || null
          };
      };

      function makeDOMishObject(data) {
          return new DOMishObject(data);
      }

      function DOMishObject(data) {
          this.attributes = this.convertContent(data);
          this.length = Object.keys(this.attributes).length;
      }
      DOMishObject.prototype.documentElement = document;
      DOMishObject.prototype.convertContent = function (obj) {
          var attributes = new DOMishAttributes(),
              prop;

          for (prop in obj) {
              if (obj[prop] !== null && typeof obj[prop] === 'object') {
                  attributes[prop] = Array.isArray(obj[prop]) ?
                      obj[prop].map(makeDOMishObject) : new DOMishObject(obj[prop]);
              } else {
                  attributes[prop] = obj[prop];
              }
          }

          return attributes;
      };
      DOMishObject.prototype.getElementsByTagName = function (name) {
          return this.attributes[name] ?
              Array.isArray(this.attributes[name]) ?
              this.attributes[name] : [this.attributes[name]] : [];
      };

      DOMishObject.prototype.getAttribute = function (name) {
          return this.attributes.getNamedItem(name).nodeValue;
      };

  }(window.cocoonjsphaser = window.cocoonjsphaser || {}));
  */



/*
UPDATE: Indeed the case. I am looking at the code. The core game loop executes two separate functions, 
updateLogic and updateRender. These two, among other things, call state.update and state.render, respectively.
 If I understand this correctly, state.render is called once per requestAnimationFrame, while state.update is
  called game.time.desiredFps times per second (desiredFps is 60 by default).
*/


/*
this.world.bounds.x = -Infinity;
        this.world.bounds.y = -Infinity;
        this.world.bounds.width = Infinity;
        this.world.bounds.height = Infinity;
        this.camera.bounds.x = -Infinity;
        this.camera.bounds.y = -Infinity;
        this.camera.bounds.width = Infinity;
        this.camera.bounds.height = Infinity;
*/


/*
console.log("fuck")
const v8flags = require('v8flags');
console.log(v8flags)
        v8flags(function (err, results) {
          console.log(results);  // [ '--use_strict',
                                 //   '--es5_readonly',
                                 //   '--es52_globals',
                                 //   '--harmony_typeof',
                                 //   '--harmony_scoping',
                                 //   '--harmony_modules',
                                 //   '--harmony_proxies',
                                 //   '--harmony_collections',
                                 //   '--harmony',
                                 // ...
       });
*/

//console.log("%cUser %s has %d points", "color:orange; background:blue; font-size: 16pt", userName, userPoints);

/*
var stdout = require('stdout-stream');
function perf_sensitive() {
  // Do performance-sensitive work here
  console.log("lalaladkff");
}

try {
  perf_sensitive()
} catch (e) {
  // Handle exceptions here
}

stdout.write('hello\n'); // write should NEVER block 
stdout.write('non-blocking\n')
stdout.write('world\n');
*/


//if (navigator.isCocoonJS) {
//    cocoonjsphaser.utils.fixDOMParser();
//}

/*
*monomorphic operations are easiest to specialize, give optimizer most actionable information and enable further optimizations. Hulk-style summary ONE TYPE CLOSE TO METAL!
  moderately polymorphic operations which require a polymorphic type guard or in the worst case a decision tree are slower then monomorphic ones.

*******
Decision trees complicate control flow and make it harder for optimizer to propagate types and eliminate redundancies. Memory dependent conditional 
jumps that constitute those decision trees might be bad news if polymorphic operation is right in the middle of the tight number crunching loop;
*******


******
Operations are monomorphic if the hidden classes of inputs are always the same - otherwise they are polymorphic, meaning some of the arguments can change type across different calls to the operation. For example, the second add() call in this example causes polymorphism:

function add(x, y) {
  return x + y;
}

add(1, 2);      // + in add is monomorphic
add("a", "b");  // + in add becomes polymorphic
******



******
random: if you break a for loop, do it with a conditional at the beginning of the loop not at the end.
*/

//ᕕ( ᐛ )ᕗ

// WHAT THE FUCK JSONS?!?! CLOGGIN UP MY DATA WHEN YOUR DATAS NOT BEING USED IT SEEMS LIKE ?? !!

/*
This often happens (memory leak) when you’ve written your code in such a way that variables and event listeners 
you don’t require for long are still referenced by some code that no longer has a need to keep those 
references and thus they can’t be correctly cleaned up by GC.
*/


// BRAVE FRONTIER!!!!! multiple aspect ratios perhaps and etc!!!

// Maybe - Lv. 1, Lv. 2, Lv. 3 for skills, greatly increasing its strength each Lv.

// Choosing skills in combat - drag upward on a characters ui to reveal skill menu below it.


// ******************************************************
// Attacks can CHAIN X3! or HIT X3!.  perpetual hitstun is a chain, perpetual hits are hits.  rogue 3slash chain combo, warrior 3hit chain combo.  combine~~ 6xHIT! 6xCHAIN!
// hitstun is pretty quick to make chains more difficult.  high enough chain pop-up new option of attack temporarially.  SHABAM!

// choosing skills - press and hold for info on skill, press anywhere on screen to go back. press and release skill quick enough and select skill, close menu.
// ******************************************************


// this.change_camera("player zoom or whatever");


//TODO: instead of character class, maybe extend dragonbones.
//      maybe simplify ui menu useage, just draggable?

//     USE SPRITE.DELTA FOR MENU MOTION!! ITS THE PREV FRAMES X AND THE CURRENT FRAMES X DIFFERENCE!!!

/*
// use-strict-violator.js 
a = "I'm the trouble starter, punking instigator"
 
module.exports = a;


var flags = require('../v8-flags').flags;

console.log('inital use strict', flags.use_strict());
 
flags.use_strict(true);
console.log('set use strict to', flags.use_strict());
 
try {
//  require('./use-strict-violator');
} catch(err) {
  console.error('FAIL:', err);
}
 
flags.use_strict(false);
console.log('set use strict to', flags.use_strict());
*/

//var violator = require('./use-strict-violator');
//console.log(violator)

//Function that contains the pattern to be inspected (using with statement)

