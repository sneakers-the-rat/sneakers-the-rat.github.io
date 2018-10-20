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

    a {
        color: #F50000;
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

# Ingredients

| Object | Link |
| ------ | ---- |
| LED Strips | [get some leds](https://www.aliexpress.com/item/WS2811-IC-Strip-Vedio-show-addressable-individually-ip30-or-waterproof-ip67-5050-RGB-SMD-30/32624331128.html?spm=a2g0s.9042311.0.0.77624c4dozuwtS) |
| LED Stands (3d mesh) | [download an stl[(https://jon-e.net/blog/assets/hosted/fat_led_stand.stl) |
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

<pre><code class="c">
// Param for different pixel layouts
#define kMatrixSerpentineLayout  false

// https://learn.adafruit.com/photocells/arduino-code
int photocellPin = 0;     // the cell and 10K pulldown are connected to a0
int photocellReading;     // the analog reading from the sensor divider
#define DATA_PIN_1 2
#define DATA_PIN_2 3
#define DATA_PIN_3 4

long codetimes[3] = {10000, 10000, 10000};


#define NUM_STRIPS 3
#define NUM_PER_STRIP 22
#define NUM_LEDS NUM_STRIPS*NUM_PER_STRIP


</code></pre>



