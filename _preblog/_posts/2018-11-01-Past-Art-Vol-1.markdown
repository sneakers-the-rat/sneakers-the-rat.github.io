---
layout: post
title: "Past Art, Vol. 1: Insomia"
date: 2018-11-01
description: selected insomnia art from the past few years
image: /assets/images/artvol1/audioedit.png
author: Jonny Saunders
tags:
  - art
  - bad_art
  - collections
  - glitch
  - design
  - video
  - audio
---

I can't sleep most nights, but some rare nights are useful. Sometimes I spend more time finishing things, but other times I spend a dozen unblinking hours baking something halfway. A few selected one-shot art pieces from the past few years.

This is the first of my attempts to remember what I do by cataloguing my art. I can roughly divide the rest of it into brain-related art, large-scale art worthy of more description, and smaller-scale art worthy of nothing. Those will be other posts.

Ordered by chronology, not quality. Actually the older stuff is worse because I didn't really have control over my life through most of it. They all speak tender nothings to me though.

# Feb 13, 2015 - Audio Glitches

I know this was a product of insomina. I think the insomnia was a product of some angst over my then partner. I'm not sure why they're related.

I had taken a pretty unremarkable picture out riding my bike in the farmland surrounding Salem OR.

![nothing to see here](/blog/assets/images/artvol1/audioedit_orig.jpg)
> *nothing to see here*

I had just read [Rosa Menkman](http://rosa-menkman.blogspot.com)'s excellent ["Vernacular of File Formats"](https://beyondresolution.info/A-Vernacular-of-File-Formats) which will put you in touch with the numerical reality of photos. This was the blessed time before I knew anything about programming. I knew audio tools. I wanted to use audio tools.

The process is completely lost, but it involved opening the image in a text editor and using reverb. It is one of my favorites.

If you use it as a background, people worry about your screen.

![audio edit](/blog/assets/images/artvol1/audioedit.png)

# April 4th, 2016 - Stichky Slug

**this video has bright flashing colors and might be unsuitable for people with epilepsy**

My garden was only flowers this spring, and the slugs were eating my violas. I didn't mind. I loved catching them at it in the dark.

I'd like to find the code for this. From what I recall I propagated pixel values across frames if they were getting brighter, but I had just started programming and the result is more likely from some deep secret in the convolutions of hundreds of lines of bad python. Mix in a few compression artifacts...

<video controls preload="none">
  <source src="/blog/assets/images/artvol1/stichky_slug.mp4" type="video/mp4">
</video>


# Jan 21, 2017 - The Last Wild Forest Bambi

I get sad about the way people write about climate change on the internet. I was drinking a lot. This was a hard winter. I had just downloaded a pirated copy of photoshop and this sentence seemed like just as good music as any.

![bambino](/blog/assets/images/artvol1/bambino.png)

# Feb 23, 2017 - yll shoot yr eye out

This isn't so much my art as it is being depressed and watching movies rendered as ASCII.

<video controls preload="none">
  <source src="/blog/assets/images/artvol1/yllshootyreye.mp4" type="video/mp4">
</video>

# Feb 27, 2017 - no

Created under similar circumstances, I was watching a lot of educational films from the 1940's. The audio is important.

<video controls preload="none">
  <source src="/blog/assets/images/artvol1/nooo.mp4" type="video/mp4">
</video>

There's a big gap in time here as I started to make more brain-focused art and put myself back together. More of that to come.

# April 28, 2018 - Coop Logos

**these videos have bright flashing colors and might be unsuitable for people with epilepsy**

I maintain the website for my coop, and it needed a background. Pictures are boring. Cellular automata and the belousov-zhabotinsky reaction are beautiful. A few videos generated using this basic code structure (sorry for the um utter unreadability... writing unsustainable and cryptic code is sort of in the nature of insomia art):

<pre><code class="python">
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from skimage import morphology
from tqdm import trange, tqdm
from scipy.signal import convolve2d
import matplotlib.pyplot as plt
from matplotlib import animation, cm, colors


img = Image.open('/some/image.png')
img = np.array(img)

# remove alpha channel
if img.shape[2] == 4:
    img = img[:,:,0:3]

# compress
img_comp  = morphology.label(img, return_num=True)


#flatten colors
img_flat = np.sum(img, axis=2)
imcolors, counts = np.unique(img_flat.flatten(), return_counts=True)
imcolors = imcolors[np.argsort(counts)[-3:-1]]

img_flat[~np.isin(img_flat, imcolors)] = 0

# the two next-to-most-frequent are the lighter greens
rgbcolors_1, rgbcounts = np.unique(img.reshape(-1,3), return_counts=True, axis=0)
rgbcolors = rgbcolors_1[np.argsort(rgbcounts)[-3:-1]]
back_color = rgbcolors_1[np.argsort(rgbcounts)[-1]]

# make masks
mask1 = np.zeros_like(img_flat, dtype = np.bool)
mask2 = np.zeros_like(img_flat, dtype = np.bool)

mask1[np.where(img_flat==imcolors[1])] = True
mask2[np.where(img_flat==imcolors[0])] = True

##################
# Initialize the array with random amounts of A, B and C.
img_bz = np.zeros_like(img, dtype=np.float)
img_bz[:,:,0] = 0.50
img_bz[mask1,0] = 0.55
img_bz[mask2,0] = 0.6
img_bz[:,:,1] = 0.50-np.random.rand(img_bz.shape[0], img_bz.shape[1])/10.
img_bz[mask1,1] = 0.55-np.random.rand(img_bz[mask1,1].shape[0])/10.
img_bz[mask2,1] = 0.6-np.random.rand(img_bz[mask2,1].shape[0])/10.
img_bz[:,:,2] = 0.50+np.random.rand(img_bz.shape[0], img_bz.shape[1])/10.
img_bz[mask1,2] = 0.55+np.random.rand(img_bz[mask1,1].shape[0])/10.
img_bz[mask2,2] = 0.6+np.random.rand(img_bz[mask2,1].shape[0])/10.
img_bz = np.clip(img_bz, 0, 1)

img_bz = np.rollaxis(img_bz,2)
arr = np.stack([img_bz, img_bz])

ny, nx = arr.shape[2], arr.shape[3]

# Reaction parameters.
alpha, beta, gamma = .2, .1, .1

def update(p,arr):
    """Update arr[p] to arr[q] by evolving in time."""

    # Count the average amount of each species in the 9 cells around each cell
    # by convolution with the 3x3 array m.
    q = (p+1) % 2
    s = np.zeros((3, ny,nx))
    m = np.ones((3,3)) / 9
    for k in range(3):
        s[k] = convolve2d(arr[p,k], m, mode='same', boundary='wrap')
    # Apply the reaction equations
    arr[q,0] = s[0] + s[0]*(alpha*s[1] - gamma*s[2])
    arr[q,1] = s[1] + s[1]*(beta*s[2] - alpha*s[0])
    arr[q,2] = s[2] + s[2]*(gamma*s[0] - beta*s[1])
    # Ensure the species concentrations are kept within [0,1].
    np.clip(arr[q], 0, 1, arr[q])
    #arr = arr % 1.
    return arr


# Set up the image
fig, ax = plt.subplots()
im = ax.imshow(arr[0,0], norm=colors.NoNorm())
ax.axis('off')
n_frames = 2000

pbar = tqdm(total = n_frames)

def animate(i, arr):
    """Update the image for iteration i of the Matplotlib animation."""

    if i == 100:
        alpha, beta, gamma = 1.2, 1., 1.
        print('changed')
    arr = update(i % 2, arr)
    im.set_array(arr[i % 2, 0])
    #im.set_array(arr[0, 0])
    pbar.update()
    return [im]

Writer = animation.writers['ffmpeg']
writer = Writer(fps=30, metadata=dict(artist='Me'), bitrate=1800,
                extra_args=['-vcodec', 'libx264'])

anim = animation.FuncAnimation(fig, animate, frames=2000, interval=5,
                               blit=True, fargs=(arr,))
plt.show()
anim.save('/some/video.mp4', writer=writer)


</code></pre>

<video controls preload="none">
  <source src="/blog/assets/images/artvol1/logo1.mp4" type="video/mp4">
</video>

I think this second one evolved to the left faster for pixels with larger brightness values. The only thing I know for sure is that it starts to look like melted plastic.

<video controls preload="none">
  <source src="/blog/assets/images/artvol1/logo2.mp4" type="video/mp4">
</video>

This video enters my void.

<video controls preload="none">
  <source src="/blog/assets/images/artvol1/logo3.mp4" type="video/mp4">
</video>












