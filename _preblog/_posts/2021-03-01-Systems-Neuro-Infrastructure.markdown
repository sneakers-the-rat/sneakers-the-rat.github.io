---
layout: post
title: "Building the Basic Infrastructure That a Layperson Would Expect Systems Neuroscientists to Have Would Revolutionize the Discipline: A Vision for ONICE"
date: 2021-03-01
description: This could be us but u playin
image: /blog/assets/images/onice_logo.png
toc: 
  - max_level: 2
author: Jonny Saunders
tags:
  - science
  - infrastructure
---

# We Would Run A Factory Into The Ground

## "Neuroscientists Probably Have Servers, Right?"

Say, to a crude approximation, scientists are workers who produce "knowledge." Backing hastily away from the scare quotes, seeing the seething oceans of quote tweets which it may spawn, we might say instead, at least for systems neuroscientists, that we are workers who produce and interpret data. Taking one step into the countryside for the purpose of metaphor, we might further say we shepherd data from its wily naked unobservedness in the Real onto scihub.

As a layperson with a probably cartoonish image of the infrastructure I would expect a worker in a factory would have for managing their product, I imagine they would have some system of indexing it so that none of it is lost, it's stored in a standardized warehousing system with standardized packaging, and they provide some access point for workers at other factories to query and request what they have so that they can... you know sell their product... at the risk of thinning the metaphor beyond recognition. If they need to figure out how to do something new, they likely have some manual they can turn to.

Literally where is your data? What format is it in? How did you collect it? What would you have to do to share it with someone?

I imagine a nonscientist (if prompted to consider such an arcane question) would expect scientists to have something similar: their data is collected by some standardized set of tools, is stored in some standardized format, on some server accessible to them and their other labmates and perhaps able to be made available to other collaborators who may want to use their data. They might suspect that there is some standard design for T-mazes or otherwise some way to look up how to build something, program something, etc.

## "Wait What? They Don't?" and the Dereliction of Scientific Stewardship

Anyone familiar with the reality of systems neuroscience knows what dissapointment they should prepare their nonscientist friend for. The problems with this reality are much greater than a sort of embarassed chuckle and "we'll get a grad student to clean the data" would suggest. Instead they are reflective of

* A prodigious duplication and dead-weight loss of labor as each lab, and sometimes each person within each lab, will reinvent basic code, tools, and practices from scratch
* A profoundly leaky knowledge acquisition system where entire PhDs worth of data can be lost and rendered useless when a student leaves a lab and no one remembers how to access the data or how it's formatted. 
* The need to constantly peer at the brain through the pinprickiest peephole of just the most recent data you or your lab have collected rather than being able to index across all relevant data from not only your lab, but all other labs that have measured the same phenomena
* The dearth of data transparency where it is still in the year of our lord 2021 rare for systems neuro papers to publish the full, raw data along with all the analysis code because the data *and* analysis code are both completely homebrew and often omitted just due to the labor of cleaning it or the embarassment of sharing it (not kidding).
* The inevitability of a replication crisis because it is often literally impossible to replicate an experiment that is done on a rig that was built one time, used entirely in-lab code, and was never documented
* An insular system where the inaccessibility of all the "meso" level knowledge that is beneath the level of publication but necessary to perform experiments, like "how to build this apparatus," "what kind of motor would work here," etc. is a force that favors established and well-funded labs who can rely on local knowledege and hiring engineers/etc. and excludes new, lesser-funded labs at non-ivy institutions.

Considered separately, these are problems, but together they are a damning indictment of our role as stewards of our corner of the human knowledge project.

We arrive at this situation not because systems neuroscientists are lazy and stupid, but because the appropriate tools that fit the requirements of their discipline don't exist. If your reaction to reading the above section was to start listing in your head all the reasons why overcoming these problems is hard: that's because it is, but it doesn't have to be. 

Imagine for a moment the utopia of having solved all of these problems: you have some new research question, and so you turn to the standard Python (or whatever) library that allows you to query data from yours and all other labs who share their data with this system. You're immediately able to filter through to find all the recordings from a particular subtype of cell in a particular region being exposed to some particular set of stimuli across some particular manipulation. Since you have access to decades of labor by thousands of scientists, even with that complex filter you still find, say for the sake of drama, a million recordings. Because they're all in some standardized format, over the years a common analysis pipeline has been developed, so you're also immediately able to perform the analyses to confirm the hunch for your new question, so it's time to implement it. You don't need to implement the whole thing from scratch because you can check out a similar experiment from the centralized library of task code, make the minor tweaks you need for your experiment, read the communally maintained build documentation, and you're off and running. After your experiment, the data you produce is also in this same standardized format, so you plug it back into the global knowledge pool, do a pull request for the improvements you've made to the experimental software, and the loop is complete: a closed knowledge system.

Sorta like scientific permaculture I guess.

The way forward is, yes, a technical problem, but the equally important problem is that of *design.* In order for movement to be made, it needs to be *easier than not to do good science.* So the tools that need to be made are those that conform to the needs of systems neuroscientists, and using them needs to provide some substantial benefit over the system they are using already. 

I think that the problems are less insurmountable than they appear, and with a combination of software, protocol, and infrastructure development, ONICE could make ION a test case in how the next generation of neuroscience should work. We can and should aim higher than informally sharing methods and resources, and instead should attempt to build that infrastructure and develop an experimental framework for labs that lets us all contribute to and share in the benefit of each other's labor.


# The Peculiar Habits of Systems Neuroscientists...

Every discipline has its own particular technical needs, and is subject to its own peculiar history and culture. Why has systems neuroscience failed to produce the kind of shared infrastructure present in immediately adjacent disciplines? I won't attempt a complete explanation, but instead will offer a few patterns I have noticed in my own limited exposure to the field. 

**Diversity of Preps** --- Though there are certain well-limbered experimental backbones like the two-alternative forced choice task, even within them there seems to be a comparatively broad diversity of experimental preparations in systems neuro relative to adjacent fields. Even a visual two-alternative forced choice task is substantially different than an auditory one, but there is almost nothing shared between those and, for example, [measuring the representation of 3d space in a free-flying echolocating bat](https://doi.org/10.7554/eLife.29053). So unlike cognitive neuroscience and psychophysics that has tools like [pavlovia](https://pavlovia.org/) where the basic requirements and structure of experiments are more standardized, BioRXiv is replete with technical papers documenting "high throughput systems for this one very specific experiment" and there [isn't](https://docs.auto-pi-lot.com) a true experimental framework that satisfies the need for flexibility.

**Diversity of Measurements** --- Molecular biology and geneticists are perhaps the subdisciplines with the best data analytical structure, spawning and occupying the near totality of a new subdiscipline of Bioinformatics. Though the experiments are of course just as complex as those in systems neuroscience, most rely on a small number of stereotyped sequencing methods that result in the same one-dimensional, four character sequence data structure of base pairs. Systems neuroscience experiments increasingly incorporate dozens of measurements, electrophysiology, calcium imaging, multiple video streams, motion, infrared, and other sensors, and so on. Even the seemingly "common" electrophysiological or multiphoton imaging data can have multiple forms -- raw voltage traces? spike times? spike templates and times? single or multiunit? The [Neurodata Without Borders](https://www.nwb.org/) project has made a valiant effort to unify these multiple formats, but has suffered from a relatively difficult to use API and few incentives to adopt it. Contrast this with the [BIDS](https://bids.neuroimaging.io/) data structure for fMRI data, where by converting your data to the structure you unlock a huge library of analysis pipelines for free. (Of course this is a chicken and egg problem where the analysis pipelines needs to exist for people to adopt it, but people need to adopt it to build the analyis pipelines... but I haven't seen much movement to build pipelines on top of NWB in general). 

**The Hacker Spirit and Celebration of Heroism** --- Many people are attracted to systems neuroscience because of the... playful... attitude we take towards our rigs. If you want to do something, don't ask questions just break out the hot glue, vaseline, and aluminum foil and hack at it until it does what you want. Wrapped like ouroboros around the hacker spirit is the veneration of heroism: it is a *good thing* to have done an experiment that only you are capable of doing because that means you're the best hacker. Not unrelated is the strong incentive to make something new rather than build on existing tools --- you don't get publications from pull requests, and you don't get a job without publications. I dont' want to treat this ethic as causative of any outcome, just to make the speculative nature of these claims clear, but perhaps the reason why systems neuroscientists don't contribute to a communal base of tools is that once they have started the boulder rolling down the hill of heroic idiosyncracy, it becomes difficult to then eg. return your experimental code to some shared library, or convert your data to some shared format (how do you convert some labview workflow to a Python package again???).   


# ... and the Tools Therefore

These special habits of systems neuroscience have implications for the types of tools that we need. I'll try to explicate some of the tools and practices that we need to adopt along with the requirements they have to be compatible with systems neuro, and give a basic sketch of the ways we could implement them. I will phrase this as it applies to ION and ONICE, but these are general principles.

## Shared Data

All data should be archived and publicly available

**Common Format**

* All data should be in a common format, complete with metadata that makes it possible for other researchers to reuse it without additional documentation. Failing that, labs should write a conversion script for turning their lab-specific format to this common format. Failing that, labs should write formal documentation that describes their data that allows someone else to write such a conversion function. 
* I propose that we adopt the NWB standard and invest in improving the tools used for interacting with NWB files. Should that prove inadequate for some reason, we should work to extend their format rather than reinventing a new one. We should participate in its communal development by raising issues and publicly describing the ways that our perhaps idiosyncratic data does not work with the format rather than adopting chimeric data storage formats.

**Server Directory**

* All labs should store all their data on a single server (or single cluster of servers) that can be made available to other labs through a common access protocol. 
* Ideally it would be possible to browse a lab's data by metadata without explicit access, and ideally this data sharing system would not require detailed knowledge of shell commands or other programming skills, so some frontend system should be preferred. 
* There are several tools that are possible here, [DataJoint](https://datajoint.io/) is a natural contender, as is a tool like the IBL's [alyx](https://github.com/cortex-lab/alyx).
* In addition to the tool itself we need to establish a *protocol* that all labs can follow to use it. Rather than requiring opting in and manually curating data, we should develop tools to make the conversion and storage of data in centralized servers *automatic*.

## Shared Tools

We should always work in such a way that our labor is preserved, made available to others, and makes use of others. We should use the same tools.

**Experimental Framework**

* We should adopt and develop an experimental framework that is flexible enough to perform our experiments, but standardized enough that we can share development between experiments. Though transition costs are high, this piece is central to making an integrated system that makes the rest of these steps more powerful. 
* The experimental framework should provide a clear means of extending particular components, as well as a clear means of documentation
* The experimental framework should provide a clear means of replicating experiments, as well as sharing code between experiments with the same logical structure
* I propose we investigate developing and adopting [autopilot](https://docs.auto-pi-lot.com) [preprint](https://www.biorxiv.org/content/10.1101/807693v1), noting that i'm more than a bit biased as it's my bouncing baby, though I developed it because nothing comparable existed/exists (that I'm aware of). As a framework, it is built modularly (you can pick and choose its parts and use them however you want and flexibly (no limits on task structure, trivial to implement controllers for new hardware, easy to integrate external tools like I did with [DeepLabCut-Live](https://elifesciences.org/articles/61909), etc.). It is also designed for replicability, where it attempts to preserve records for everything an experimental subject ever experiences and every time a system changes, facilitating exact replication even on different hardware. It is also extensively documented, and makes additional documentation trivial as it is generated from the docstrings within the code itself. An extension of its data manipulation [Subject](https://docs.auto-pi-lot.com/en/dev/autopilot.core.subject.html) class to use NWB would accomplish the adoption of a shared data standard, making conversion unnecessary.

**Analysis Framework**

* We should contribute to and develop a shared analysis framework built on top of the shared data format. 
* We should build such a framework using basic "building blocks" of data transformations that can be composed together
* We should make the analysis pipelines capable of being deployed on computing clusters by encapsulating requirements and install procedures in virtual environments or containers like Docker.
* I have less of a clear picture for how this should be accomplished, but DataJoint again provides a framework for this that we should investigate.

## Shared Knowledge

We should commit to documenting and sharing the technical knowledge necessary for doing experiments but that doesn't fit in traditional papers.

**Methods Wiki**

* We should create a wiki for documenting methodological information from hardware descriptions and experiences to design considerations for behavioral experiments. A wiki is the appropriate level of durability and fungibility --- extremely low barrier to contribution, but contribution is permanent rather than in some forum, slack, etc.
* We should use [Semantic MediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) to create structured, computable descriptions. Semantic wikis allow you to describe schemas for particular types of information --- eg see this template for a hardware [Part](https://wiki.auto-pi-lot.com/index.php/Template:Part) on the prototype autopilot wiki, where in addition to the rest of the human-written documentation, each part is described by a manufacturer, datasheet, etc. The Part template can then be extended for particular types of parts, eg. a "Resistor" part might add a field for the particular value of the resistor. These schemas can then be exposed to users as forms, structuring submission such that each person can easily submit new information without needing to learn any markup. Critically, structure information can be computed upon, so for example a build guide can automatically create a parts list table complete with all the details for each of the parts it mentions by pulling them from the structured description of the part. 
* Additionally, using Semantic MediaWiki + Autopilot will let us create a more powerful system by bidirectionally combining the high-level descriptions of the wiki with their implementation in code. For example, if browsing the wiki one was able to find a particular motion sensor to use for their experiment, one could then be linked to the Autopilot documentation page for the object that controls that motion sensor. If they started using that motion sensor, and upon using it ran the calibration routine, they could be prompted to submit their calibration to the wiki, which could then index them and provide automatically generated reliability statistics. By many people submitting calibration results, it could then be possible to provide data-driven defaults for future calibrations... and so on. Though this is one trivial example, the benefits of an integrated knowledge system and experimental framework are innumerable --- another would be the ability to link detailed descriptions about different considerations about designing a particular task (how long should i have a timeout delay between incorrect answers in a 2afc task???) to the methods that implement them in code, and then those claims could use anonymously collected data to substantiate/refute them (across 1000 sessions, tasks that used x timeout had the highest y value).


# We Need a Map

Though the future painted here may be bright (perhaps blindingly, gratingly so in its optimism) it won't spring into the world fully formed. Instead we should work as a consortium to plot a course together to see what makes sense to do when. We should start the process of abandoning the heroic, private model of development by working with each other to collaborate on the structure and realization of this vision. We shouldn't retreat to our own fears of difficulty, or lean back on the inertia of history, and instead trust each other that collectively we have the will and expertise to set goals and meet them --- don't worry if *you* can't write a line of code, the goal is to design a system where we can all contribute what we can and reap the collected benefits. We should take lessons where we can learn them from other groups working on similar efforts, and avoid reinventing the wheel as much as we can, but also acknowledge that creation de novo can itself be an act of learning from others. We shouldn't think of this work as something we do in isolation, but as something we do as active contributors to the scientific endeavor at large --- *someone* should do something about scientific infrastructure! and that *someone* should be *us.*

The feared word on the tip of my tongue is **governance**. This project will be hopeless if we never reach the level of organization beyond having made a slack. If we are serious about making concrete progress on collaborative infrastructure, we need to have structured mechanisms for reaching decisions that help everyone feel valued in their contribution and prevent us from feeling like we're just floating. I will propose we adopt a system of consensus decisionmaking that I have learned from years of organizing in co-ops, activist groups, and other communal spaces. I think that we can bring this model to the broader movement towards "big science" as a non-hierarchical alternative to traditional governance structures that inevitably concentrate decisionmaking power in one or a few highly-connected people. 

In sum, it's about time to build the basic infrastructure of systems neuroscience, and we should start in our own backyard.


