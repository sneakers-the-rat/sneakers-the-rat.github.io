---
layout: post
title: "Crudely converting OpenEphys to Neurodata Without Borders"
date: 2019-03-12
description: coercing our lab's idiosyncratic data structure to Neurodata Without Borders
image: /blog/assets/images/neurodata_header.png
author: Jonny Saunders
tags:
  - neurodata without borders
  - data
  - python
  - science
---

Our lab is toying with the idea of moving our data to [Neurodata Without Borders](https://www.nwb.org/). Turns out it won't be such a monumental task after all. I figured someone would have written a guide for converting the old OpenEphys `.continuous` style of data, but I couldn't find any. Behold, converting my lab's cryptic metadata and OE data to NWB.

## Links

* [notebook](../../../../assets/notebooks/nwb_convert.ipynb)
* [data](../../../../assets/data/nwb.zip)
* [bugfixed OE loading script](../../../../assets/notebooks/OpenEphys.py)
* [generated .nwb file](../../../../assets/notebooks/convert_example.nwb)

{% jupyter_notebook "../../../../assets/notebooks/nwb_convert.ipynb" %}
