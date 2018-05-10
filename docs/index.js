let buttons = [];
let generated_buttons = [];
let user_score = 0;
let high_score = 0;

$('.simon_buttons').click(
  function() {
    buttons.push($(this)[0]);
    if (buttons.length == generated_buttons.length) {
      judge();
    }
  }
);

$('#start_stop').click(
    function() {
      generated_buttons = []
      generate_button();
    }
);

function judge() {
  for (let i = 0; i < generated_buttons.length; i++) {
    let b = buttons.shift();
    if (generated_buttons[i] != b) {
      alert("WRONG! Pay attention");
      if (user_score > high_score) {
        alert("You beat your high score.");
        high_score = user_score;
        $('#high_score').children(0).text(high_score);
      }
      user_score = 0;
      $('#current_score').children(0).text(user_score);
      generated_buttons = [];
      buttons = [];
      return false;
    }
  }
  console.log("Nice job!");
  user_score++;
  $('#current_score').children(0).text(user_score);
  generate_button();
  return true;
}

function generate_button() {
  let random_int = Math.floor(Math.random() * 4);
  generated_buttons.push($('.simon_buttons')[random_int]);
  read_buttons(0);
}

function read_buttons(i) {
  if (i == 0) {
    console.log("Here is the order.");
  }
  if (i == generated_buttons.length) {
    return;
  }
  o = generated_buttons[i];
  console.log(o);
  let orig = o.style.backgroundColor;
  let cs = document.defaultView.getComputedStyle(o, null);
  orig = cs.getPropertyValue('background-color');
  o.style.backgroundColor = "white";
  setTimeout(function() {
    o.style.backgroundColor = orig;
    read_buttons(i + 1);
  }, 600);
}
