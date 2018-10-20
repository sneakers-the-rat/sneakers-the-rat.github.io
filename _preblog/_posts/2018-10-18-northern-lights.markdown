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
        color: hotpink;
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

Like this

![yeah like this i said](https://jon-e.net/blog/assets/images/led_build_circuit.png)

Do not do as I do, and behold this as a warning. This style of circuit is built to cause fires and generate solder fumes. I epoxied over the exposed solder and wire to avoid dust combustion. Disregard the capacitor, it proved to explode.

![disregard this](https://jon-e.net/blog/assets/images/led_build_wired.jpg)






