---
layout: post
title: "Correlation Isn't Connectivity"
date: 2019-03-12
description: Not even functional connectivity, whatever that is
image: /blog/assets/images/corr/mats.png
author: Jonny Saunders
tags:
  - functional connectivity
  - c elegans
  - network science
  - network analysis
  - science
---

In a network analysis class this fall, I was unsurprised but more than a little annoyed to learn that the widespread practice of measuring "functional connectivity" by correlating voxelwise fMRI timeseries was essentially unvalidated.

Of course, there's no reason to believe that taking a linear measurement like the pearson correlation would reflect the highly nonlinear dynamics of the brain (even if you ignore the problems with taking simple correlations of timeseries), but at the time I thought it was worth simulating.

The simulations are for another post, but this morning it occurred to me that we actually do have ground truth data to assess the relationship between connectivity and activity correlation -- we have the C. Elegans connectome (well at least we have *one*) and recently folks have been doing whole-brain GCaMP imaging.

Borrowing data from [this lovely paper](https://doi.org/10.1016/j.cell.2015.09.034) and the connectome, helpfully stored in [this squirrely little repo](https://github.com/theideasmith/network)... Well I won't hold you in suspense.

# hashtag no resemblance.

Comparing the correlation and connectivity matrices

![comparing matrices](/blog/assets/images/corr/mats.png)

And ROC curve relating binary connectedness to absolute value of correlation

![auc](/blog/assets/images/corr/roc.png)

**Let me be clear** I do indeed believe there is statistical dependency between voxels, and I don't believe the people who do "functional connectivity" with simple correlation are bad or stupid people. I just think we get so busy with the dogma that we don't take the time to learn math or validate our analyses.

{% jupyter_notebook "../../../../assets/notebooks/correlation_aint_connectivity.ipynb" %}




