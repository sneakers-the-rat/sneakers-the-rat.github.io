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




# Links

* [notebook](../../../../assets/notebooks/nwb_convert.ipynb)
* [data](../../../../assets/data/nwb.zip)
* [bugfixed OE loading script](../../../../assets/notebooks/OpenEphys.py)
* [generated .nwb file](../../../../assets/notebooks/convert_example.nwb)

# The Outcome...

Before we wade into some code, let us fortify ourselves with the satisfaction of our endpoint.

```
/root
├── acquisition
│   ├── CH5
│   │   ├── data
│   │   └── starting_time
│   ├── CH6
│   │   ├── data
│   │   └── starting_time
│   ├── CH7
│   │   ├── data
│   │   └── starting_time
│   └── CH8
│       ├── data
│       └── starting_time
├── analysis
├── file_create_date
├── general
│   ├── experimenter
│   ├── institution
│   ├── lab
│   ├── pharmacology
│   └── subject
│       ├── date_of_birth
│       ├── genotype
│       ├── sex
│       ├── species
│       └── subject_id
├── identifier
├── intervals
│   └── trials
│       ├── LaserOnOff
│       ├── amplitude
│       ├── duration
│       ├── gapdelay
│       ├── gapdur
│       ├── id
│       ├── laser
│       ├── loop_flg
│       ├── next
│       ├── pulseamp
│       ├── pulsedur
│       ├── ramp
│       ├── seamless
│       ├── soa
│       ├── soaflag
│       ├── start_time
│       ├── stop_time
│       └── type
├── processing
├── session_description
├── session_start_time
├── stimulus
│   ├── presentation
│   └── templates
├── timestamps_reference_time
└── units
    ├── channel
    ├── cluster
    ├── id
    ├── spike_times
    ├── spike_times_index
    └── tetrode

11 directories, 50 files
```

ooo aaaaahhhh...

so without further ado.

# The Code...

{% jupyter_notebook "../../../../assets/notebooks/nwb_convert.ipynb" %}

