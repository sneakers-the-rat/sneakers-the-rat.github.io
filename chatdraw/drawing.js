let positions = new Array(50);

const canvas = document.getElementById('canvas');

let letters = Array();
let last_letter = '';
let count = 0;
// let timeDiffs = new Array(10);
// let lastTime = 0;
let scale = 1;

let mousedown = false;

function angleDeg (p1, p2){
  return(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;



document.addEventListener('keydown', e => {
  console.log(e);
  letters.push(e.key);
  last_letter = e.key;
  // timeDiffs.unshift(e.timeStamp - lastTime);
  // timeDiffs.pop()
  scale += .2;
  // lastTime = e.timeStamp;
})

document.addEventListener('mousedown', e => {
  mousedown = true;
})

document.addEventListener('mouseup', e => {
  mousedown = false;
})


canvas.addEventListener('mousemove', e => {
  console.log(e);
  positions.unshift({x:e.pageX, y:e.pageY});
  positions.pop();

  angle = angleDeg(positions[0], positions[10]);
  console.log(angle, positions);
  if (count % scale < 1 && last_letter !== '' && mousedown === false){
    let el = document.createElement('span');
    // let scale = average(timeDiffs)
    // console.log('timediff', scale);
    // el.style.transform = "translate("+e.clientX+"px, "+e.clientY+"px) rotate("+angle+"deg) ";
    el.style.transform = "rotate("+angle+"deg) scale("+scale+")"
    el.style.left = e.pageX+"px"
    el.style.top = e.pageY+"px"
    el.textContent = letters;
    el.style.color = 'hsl(0, 0%, '+count%100+'%)';
    el.classList.add('letter')
    console.log(el);
    canvas.appendChild(el);
  }
  if (count % 20  === 0 && letters.length >= 1){
    letters.shift();

  }
  if (count % 10 === 0 && scale >1) {
    scale -= .1;
  }

  count += 1;
})

