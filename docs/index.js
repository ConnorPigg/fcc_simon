let buttons = []
let generated_buttons = []
let user_score = 1
let high_score = 0
let strict_mode_flag = true
jQuery('#strict_mode_icon_on').show()
jQuery('#strict_mode_icon_off').hide()

jQuery('.simon_buttons').click(
  function () {
    buttons.push(jQuery(this)[0])
    let o = jQuery(this)[0]
    let orig = o.style.backgroundColor
    let cs = document.defaultView.getComputedStyle(o, null)
    orig = cs.getPropertyValue('background-color')
    o.style.backgroundColor = 'black'
    setTimeout(function () {
      o.style.backgroundColor = orig
      play_button(o)
      if (buttons.length === generated_buttons.length) {
        judge()
      }
    }, 300)
  }
)

jQuery('#start_stop').click(
  function () {
    buttons = []
    generated_buttons = []
    generate_button()
  }
)

jQuery('#strict_mode_selector').click(
  function () {
    strict_mode_flag = !strict_mode_flag
    if (strict_mode_flag) {
      jQuery('#strict_mode_icon_on').show()
      jQuery('#strict_mode_icon_off').hide()
    } else {
      jQuery('#strict_mode_icon_on').hide()
      jQuery('#strict_mode_icon_off').show()
    }
  }
)

function judge () {
  for (let i = 0; i < generated_buttons.length; i++) {
    let b = buttons.shift()
    if (generated_buttons[i] !== b) {
      alert('WRONG! Pay attention')
      if (!strict_mode_flag) {
        alert('You can try again')
        buttons = []
        read_buttons(0)
        return
      }
      if (user_score - 1 > high_score) {
        alert('You beat your high score.')
        high_score = user_score - 1
        jQuery('#high_score').children(0).text(high_score)
      }
      user_score = 1
      jQuery('#current_score').children(0).text(user_score)
      generated_buttons = []
      buttons = []
      return false
    }
  }
  if (user_score === 20) {
    alert('You won! Congrats.')
    high_score = user_score
    jQuery('#high_score').children(0).text(high_score)
    buttons = []
    generated_buttons = []
    return
  }
  console.log('Nice job!')
  user_score++
  jQuery('#current_score').children(0).text(user_score)
  generate_button()
  return true
}

function generate_button () {
  let random_int = Math.floor(Math.random() * 4)
  generated_buttons.push(jQuery('.simon_buttons')[random_int])
  read_buttons(0)
}

function read_buttons (i) {
  if (i === 0) {
    console.log('Here is the order.')
  }
  if (i === generated_buttons.length) {
    return
  }
  let o = generated_buttons[i]
  console.log(o)
  let orig = o.style.backgroundColor
  let cs = document.defaultView.getComputedStyle(o, null)
  orig = cs.getPropertyValue('background-color')
  o.style.backgroundColor = 'white'
  setTimeout(function () {
    o.style.backgroundColor = orig
    play_button(o)
    read_buttons(i + 1)
  }, 600)
}

function play_button (some_button) {
  let audio_e = some_button.children[1]
  audio_e.load()
  audio_e.play()
}
