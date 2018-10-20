---
layout: post
title: "Northern Lights"
date: 2018-10-18
description:
image: https://jon-e.net/blog/assets/images/nlight.png
author: Jonny Saunders
tags:
  - art
---

<style>
    body {
        background-color: black;
        color: #F5F5F5;
    }

    .header {
        background-color: #00000090;
        color: #F0F0F0;
    }
    .header__title {
        color: #F0F0F0;
    }

    .header__list a,
    .header__list span{
        color: #F0F0F0;
    }

    .post__content a:link,
    .post__content a:hover,
    .post__content a:active,{
        color: #F50000;
    }

    .post__content a:visited{
        color: #0000FF;
    }
</style>


I needed to build the northern lights in my kitchen. (localized entirely within my kitchen).

They look like this:
<video controls>
  <source src="/blog/assets/images/nlights.mp4" type="video/mp4">
</video>

And they also twinkle:

<video controls>
  <source src="/blog/assets/images/twinkle.mp4" type="video/mp4">
</video>

They only turn on rarely because they are magic, but if you need them on to feel the close glow of the north pole you can enter the secret code...

<video controls>
  <source src="/blog/assets/images/onoff.mp4" type="video/mp4">
</video>

# Ingredients

| Object | Link |
| ------ | ---- |
| LED Strips | [get some leds](https://www.aliexpress.com/item/WS2811-IC-Strip-Vedio-show-addressable-individually-ip30-or-waterproof-ip67-5050-RGB-SMD-30/32624331128.html?spm=a2g0s.9042311.0.0.77624c4dozuwtS) |
| LED Stands (3d mesh) | [download an stl](https://jon-e.net/blog/assets/hosted/fat_led_stand.stl) |
| Arduino Uno | [arduinos here](https://store.arduino.cc/usa/arduino-uno-rev3) |
| Photodiode | [idk found in the lab try digikey](https://www.digikey.com/products/en/sensors-transducers/optical-sensors-photodiodes/543) |
| 12V 3A DC Power Supply | |
| 200 Ohm Resistor | |

# Makin it

is simple.

## Step 1: Board of LEDs

*Print a bunch of these [little stands](https://jon-e.net/blog/assets/hosted/fat_led_stand.stl)*

![led stand](https://jon-e.net/blog/assets/images/led_stand.png)
> *moody as your mahogany past*

and glue them onto a board thusly

![glued to board](https://jon-e.net/blog/assets/images/led_build_1.jpg)

## Step 2: Wire it up

Like this. You need to 1) Power the LEDs, in my case with 12V and 3A split between 3 banks of 66 lights. 2) wire the DMX input lines to the arduino through some resistors and 3) attach a photodiode to sense when it gets dark. I used a 4.7kOhm resistor to get the photodiode in the luminance range of my kitchen, this will vary depending on your diode and ambient lighting conditions.

![yeah like this i said](https://jon-e.net/blog/assets/images/led_build_circuit.png)

Do not do as I do, and behold this as a warning. This style of circuit is built to cause fires and generate solder fumes. I epoxied over the exposed solder and wire to avoid dust combustion. Disregard the capacitor, it proved to explode.

![disregard this](https://jon-e.net/blog/assets/images/led_build_wired.jpg)

## Step 3: Code

I stole a lot of this, hopefully I attributed as I went because I do not remember where it came from now. You will need the [FastLED library](http://fastled.io).

The idea is that we want to turn the lights on when the ambient light gets below a certain level. Except we don't want to just turn on, that would be too plain. Instead, we pick a random delay up to an hour and wait to turn on. We want to catch the northern lights by chance.

But if you can't wait for luck, you make your own. Flicking the light on and off three times will trigger the light.

Right now there are two modes, the northern lights, and twinkling. One picks a max value/saturation color in HSV space and fades its neighbors towards it. The other twinkles white lights. Who knows which is which. Each time the light turns on it picks a program at random.

<pre><code class="c">
#include <FastLED.h>

#define NUM_STRIPS 3
#define NUM_PER_STRIP 22
#define NUM_LEDS NUM_STRIPS*NUM_PER_STRIP

// led array
CRGB leds[NUM_LEDS];

// https://learn.adafruit.com/photocells/arduino-code
int photocellPin = 0;     // the cell and 10K pulldown are connected to a0
int photocellReading;     // the analog reading from the sensor divider
#define DATA_PIN_1 2
#define DATA_PIN_2 3
#define DATA_PIN_3 4

// array to hold times since last light flick
// initialize to above threshold so we don't autostart the first time
long codetimes[3] = {10000, 10000, 10000};

// some logic variables to tell what state we're in.
// it's crude but it works damn it
bool ison;                // are the LEDs on?
bool isdark;              // did it go dark?
int program=1;            // which program are we running?
unsigned long wentdark=0; // did we just go dark?
long waittime;            // how long should we wait to turn the lights on?
unsigned long ontime;     // how long should the lights stay on?
long darktime;            // how long was it dark?

// idiosyncratic lighting variables
int lightthresh=200;
int flicklength=5000;
int framedelay=30;


void loop() {
  photocellReading = analogRead(photocellPin);
  //Serial.print("Analog reading = ");
  //Serial.println(photocellReading);     // the raw analog reading

  if (photocellReading > lightthresh){
    // if we're just getting light, turn the lights off.
    if (isdark == true){
      for(int i=0; i<NUM_LEDS; i++){
        leds[i] = CRGB(0, 0, 0);

      }
      LEDS.setBrightness(0);
      LEDS.show();
      isdark = false;
      ison = false;

      // stash the code
      // record the length of time that the light was off
      codetimes[0] = codetimes[1];
      codetimes[1] = codetimes[2];

      darktime = millis()-wentdark;
      codetimes[2] = darktime;
    }
    return;
  } else {
    if (isdark == false){
      // when it first gets dark...
      // pick a program
      if (random8()<128){
        program = 1;
      } else {
        program = 2;
      }

      // get time off
      wentdark = millis();

      // if we are getting manually turned on, the wait time is zero
      if (codetimes[2] < flicklength && codetimes[1] < flicklength){
        waittime = 0;
      } else {
        // otherwise get delay between now and an hour
        waittime = random(0, 3600000);
      }

      // turn the lights on
      isdark = true;
      ison = false;
    }

    if (millis()<wentdark || millis()<ontime){
      // arduino clock flipped back to zero
      wentdark = 0;
      ontime = 0;
    }


    if (ison == false && (millis()-wentdark)>waittime){
      // we're just turning on of our own accord
      // pick a program
      if (random8()<128){
        program = 1;
      } else {
        program = 2;
      }

      // when did we go on? how long will we go?
      ontime = millis();
      waittime = random(600000, 3600000);

      // if we have waited long enough...
      LEDS.setBrightness(255);
      ison = true;

    }


    // if the light turns back on turn off.
    if (ison == true && (millis()-ontime)>waittime){
      for(int i=0; i<NUM_LEDS; i++){
        leds[i] = CRGB(0, 0, 0);

      }
      LEDS.setBrightness(0);
      LEDS.show();
      wentdark = millis();
      waittime = random(600000, 3600000);
      //waittime = 5000;
      LEDS.setBrightness(0);
      ison = false;
    }


    // finally if we're on, do the thing.
    if (ison == true){
      if (program == 1){
        northernLights(leds);
      } else {
        twinkle(leds);
      }
    }


    LEDS.show();
  }


  delay(framedelay);


}


void setup() {
  // init values
  ison = false;
  isdark = false;

  random16_set_seed(8934);
  random16_add_entropy(analogRead(3));

  // start up serial if ya want it
  //Serial.begin(9600);
  //Serial.println("resetting!");

  // setup leds
  delay(1000);
  LEDS.addLeds<WS2811,DATA_PIN_1,BRG>(leds,0, NUM_PER_STRIP);
  LEDS.addLeds<WS2811,DATA_PIN_2,BRG>(leds,NUM_PER_STRIP, NUM_PER_STRIP);
  LEDS.addLeds<WS2811,DATA_PIN_3,BRG>(leds,NUM_PER_STRIP*2,NUM_PER_STRIP);
  LEDS.setBrightness(255);

  for(int i=0; i<NUM_LEDS; i++){
        leds[i] = CRGB(0, 0, 0);

  }
  LEDS.setBrightness(0);
  LEDS.show();
}



void northernLights(CRGB* leds){
  for(int i=0; i<NUM_LEDS; i++){

    if (i == NUM_LEDS-1) {
      fadeTowardColor(leds[i],leds[i-1],5);
    }
    else if (i==0){
      fadeTowardColor(leds[i],leds[i+1],5);
    }
    else{
      fadeTowardColor(leds[i],(leds[i+1]+leds[i-1])/2,5);
    }

    if(random16()<40){
        CRGB color = CHSV( random8(), 255, 255);
        fadeTowardColor(leds[i], color, 255);
  }
  //leds[i] %= 225;
  }
  //delay(30);
}

void twinkle(CRGB* leds){
  for(int i=0; i<NUM_LEDS; i++){

    fadeTowardColor(leds[i],CRGB(0,0,0),16);

    if(random16()<50){
        fadeTowardColor(leds[i], CRGB(255,255,255), 255);
    }
  }
}

void nblendU8TowardU8( uint8_t& cur, const uint8_t target, uint8_t amount)
{
  if( cur == target) return;

  if( cur < target ) {
    uint8_t delta = target - cur;
    delta = scale8_video( delta, amount);
    cur += delta;
  } else {
    uint8_t delta = cur - target;
    delta = scale8_video( delta, amount);
    cur -= delta;
  }
}

// Blend one CRGB color toward another CRGB color by a given amount.
// Blending is linear, and done in the RGB color space.
// This function modifies 'cur' in place.
CRGB fadeTowardColor( CRGB& cur, const CRGB& target, uint8_t amount)
{
  nblendU8TowardU8( cur.red,   target.red,   amount);
  nblendU8TowardU8( cur.green, target.green, amount);
  nblendU8TowardU8( cur.blue,  target.blue,  amount);
  return cur;
}
</code></pre>



