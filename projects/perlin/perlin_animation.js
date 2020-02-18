import {
    noise
} from './perlin.js';
// debugger;

var n_points = 1000;

var TAU = 2 * Math.PI;
var tau_movement = 0;
var period = 1/200;
var period_movement = 0;

var speed = 0.2;
var momentum = 0;
var momentum_decay = 0.95;

var saturation = 80;
var luminance = 50;
var alpha = 0.4;

var p_new_seed = 0;
var p_period = 0;

var seq_n = 1;

// "borrowed" from https://josephg.com/perlin/3/
var slider_n_points        = document.getElementById("s_n_points");

var slider_tau             = document.getElementById("s_tau");
var slider_tau_movement    = document.getElementById("s_tau_movement");
var slider_period          = document.getElementById("s_period");
var slider_period_movement = document.getElementById("s_period_movement");

var slider_speed           = document.getElementById("s_speed");
var slider_momentum        = document.getElementById("s_momentum");
var slider_momentum_decay  = document.getElementById("s_momentum_decay");

var slider_saturation      = document.getElementById("s_saturation");
var slider_luminance       = document.getElementById("s_luminance");
var slider_alpha           = document.getElementById("s_alpha");
var slider_p_new_seed      = document.getElementById("s_p_new_seed");
var slider_p_period        = document.getElementById("s_p_period");
// var output              = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value



// Update the current slider value (each time you drag the slider handle)
slider_n_points.oninput = function() {
  n_points = this.value;
} 
slider_tau.oninput = function() {
  TAU = this.value;
  
} 
slider_period.oninput = function() {
  period = this.value;
  
} 
slider_period_movement.oninput = function() {
  period_movement = this.value;
  
} 
slider_speed.oninput = function() {
  speed = this.value;
  
} 
slider_momentum.oninput = function() {
  momentum = this.value;
  
} 
slider_momentum_decay.oninput = function() {
  momentum_decay = this.value;
  
} 
slider_saturation.oninput = function() {
  saturation = this.value;
  
} 
slider_luminance.oninput = function() {
  luminance = this.value;
  
} 
slider_alpha.oninput = function() {
  alpha = this.value;
  
} 
slider_p_new_seed.oninput = function() {
  p_new_seed = this.value;
  
} 
slider_p_period.oninput = function() {
  p_period = this.value;
  
} 




    /////////////////////

function gaussianRand() {
    let rand = 0;

    for (var i = 0; i < 4; i += 1) {
        rand += Math.random();
    }

    return rand / 4;
}

// https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
function resize(canvas, w, h) {
    // // Lookup the size the browser is displaying the canvas.
    // const displayWidth = canvas.clientWidth;
    // const displayHeight = canvas.clientHeight;
    const displayWidth = $(canvas).parent().width();
    const displayHeight = $(canvas).parent().height();

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        w = displayWidth;
        h =  displayHeight;

        let ctx = canvas.getContext('2d');



        ctx.fillStyle = "#0B0B0B";

        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(1,1,1,0.3)';
    }

    return(w, h)

    // cgl. viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function() {
        return Math.round(Math.random() * max);
    });
}

function generateThumb(canvas_id, time) {
    var button, canvas, ctx, draw, f, fpselem, h, particles, raf, w;
    // var ncalls = 0;
    // var total_calls = 10;


    canvas = document.getElementById(canvas_id);
    let class_list = $(canvas)[0].classList;
    // debugger;
    fpselem = document.getElementById('fps');

    w = canvas.width = $(canvas).parent().width();

    h = canvas.height = $(canvas).parent().height();


    ctx = canvas.getContext('2d');



    ctx.fillStyle = "#0B0B0B";

    ctx.fillRect(0, 0, w, h);

    // ctx.fillStyle = 'rgba(1,1,1,0.3)';
    // debugger;
    var seed = noise.seed(Math.random());

    // debugger;

    // var mode = "offset";
    let x_generator, y_generator;

    // x, y type of randomness to use
    let randomness;
    randomness = Math.random;

    // 
     x_generator = function() {
        return (randomness() * $(canvas).parent().width());
    };
    y_generator = function() {
        return (randomness() * $(canvas).parent().height());
    };
    

    var gen_mode = "seq";






    function generate_points(x_generator, y_generator, n_points, particles = []) {
        for (let _i = 1; _i <= n_points; _i++) {

            let p1 = {
                x: x_generator(),
                // y: h / 2 + Math.random() * 50,
                y: y_generator(),
                xv: 0, // x velocity
                yv: 0, // y velocity
                // x: Math.random()*w,
                // y: Math.random()*h,
                a: 0,
                size: 1,
                intspeed: (Math.random() + 1) ** 1.5
            };
            particles.push(p1);
            particles.push({
                x: p1.x,
                y: p1.y, // x velocity
                xv: 0,
                yv: 0, // y velocity
                a: TAU / 2,
                size: 1,
                intspeed: (Math.random() + 1) ** 2
            });
        }
        return (particles);
    }


        particles = generate_points(x_generator, y_generator, 1);
    

    let x_scene_momentum = 0,
        y_scene_momentum = 0,
        x_shift = 0,
        y_shift = 0,
        scene_angle = 0;

    var frame = 0;

    let max_speed = 0;
    let current_speed = 0;
    var seq_n = 1;


    draw = function() {
        frame++;
        var a, p, v, _j, _len, _results;
        _results = [];
        w, h = resize(canvas, w, h);
        // ctx.fillStyle = "#0B0B0B01";
        if (frame % 20 == 0) {
            ctx.fillStyle = "rgba(0,0,0,.04)";
            ctx.fillRect(0, 0, w, h);
        }

        // ctx.fillRect(0, 0, w, h);

        // scene_angle += (Math.random()-0.5);
        if (Math.random() < 0.05) {
            x_scene_momentum += (Math.random() - 0.5) * momentum;
            y_scene_momentum += (Math.random() - 0.5) * momentum;
        }
        if (frame % 30 == 0) {
            x_scene_momentum = x_scene_momentum * momentum_decay;
            y_scene_momentum = y_scene_momentum * momentum_decay;
        }
        // x_shift += Math.cos(scene_angle);
        y_shift += y_scene_momentum;

        x_shift += x_scene_momentum;

        if (Math.random() < p_new_seed) {
            // debugger;
            seed = noise.seed(Math.random());
        }

        if (Math.random() < p_period) {
            period += (Math.random() - 0.5) * period_movement;
        }
        TAU += (Math.random() - 0.5) * tau_movement;

        if (gen_mode === "seq") {
            if (particles.length < n_points) {
                particles = generate_points(x_generator, y_generator, seq_n, particles);
            }
        }

        let off_course = (Math.random() - 0.5) * 30;
        let p_wayward = 0.005;

        max_speed = 0;
        current_speed = 0;


        for (_j = 0, _len = particles.length; _j < _len; _j++) {
            p = particles[_j];

            current_speed = (Math.abs(p.xv) + Math.abs(p.yv)) / 2;
            max_speed = Math.max(current_speed, max_speed);
            // p.size = Math.ceil(((1-(current_speed/max_speed))**5)*40+(p.intspeed));

            v = noise.perlin2((p.x + x_shift) * period, (p.y + y_shift) * period, seed.perm, seed.gradP);
            ctx.fillStyle = "hsla(" + (Math.floor(v * 360)) + ", "+saturation+"%, "+luminance+"%, "+alpha+")";
            ctx.fillRect(p.x, p.y, 1, 1);


            // ctx.fillStyle = "hsla(" + (Math.floor(v * 360)) + ", "+(Math.floor((_j/particles.length)*100))+"%, 50%, 0." +(40-p.size)+")";
            // p.shape.moveTo(p.x, p.y);


            // console.log((p.x+p.x)/2);
            // p.shape.arc(p.x, p.y,1+Math.ceil(5*(current_speed/max_speed)), 0, 2 * Math.PI);
            // ctx.beginPath();
            // ctx.arc(p.x, p.y,p.size, 0, 2 * Math.PI);
            // circle.arc(p.x, p.y, 1/((p.xv+p.xy)/2), 0, 2 * Math.PI);
            // ctx.fill();
            // debugger;
            // ctx.fillRect(p.x, p.y, 2, 2);

            if (Math.random() < p_wayward) {
                v += off_course;
            }
            p.h++;

            p.xv = p.xv * 0.8;
            p.yv = p.yv * 0.8;

            a = v * 2 * Math.PI + p.a;
            if (Math.random() < p_wayward) {
                p.xv += Math.cos(a) * 1;
                p.yv += Math.sin(a) * 1;
                p.x += p.xv * speed;
                p.y += p.yv * speed;
            } else {
                p.xv += Math.cos(a) * 0.3 * p.intspeed;
                p.yv += Math.sin(a) * 0.3 * p.intspeed;
                p.x += p.xv * speed * p.intspeed;
                p.y += p.yv * speed * p.intspeed;
            }

            if (gen_mode == "seq") {
                if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
                    particles.splice(_j, 1);
                }
            } else {
                if (p.x < 0) {
                    p.x = w;
                } else if (p.x > w) {
                    p.x = 0;
                };

                if (p.y < 0) {
                    p.y = h;
                } else if (p.y > h) {
                    p.y = 0;
                }
            }

            _results.push(p.y);
        }
        return _results;
    };

    raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        // if (ncalls < total_calls){
        return window.setTimeout(callback, 1000 / 30);
        // }
        // ncalls += 1;
    };

    // button = document.getElementsByTagName('input')[0];

    // button.onclick = function() {
    //   return window.open(canvas.toDataURL('image/png'));
    // };

    f = function() {
        // if (ncalls < total_calls){
        raf(f);

        return draw();
        // } 
        // ncalls += 1
    };

    setTimeout(function() {
        raf(f);
    }, time);
    // console.log(time);
};



$(function() {
    let time = 0;
    const time_delta = 200;
    $('.generative').each(function() {
        // var this_div = $(this)[0].id;
        // var parentname = this_div[0].id;
        // debugger;
        generateThumb($(this)[0].id, time);
        time += time_delta;
        // $(this).resize(function(){
        //  $(this).width($(this).parent().width());
        //  $(this).height($(this).parent().height());
        // })

    });

    // $('.generative').width($('.generative').parent().width());
    // $('.generative').height($('.generative').parent().height());

    $(window).resize(function() {
        $('.generative').width($('.generative').parent().width());
        $('.generative').height($('.generative').parent().height());
    });

});