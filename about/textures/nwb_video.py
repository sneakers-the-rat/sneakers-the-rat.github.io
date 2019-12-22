#http://data.cortexlab.net/singlePhase3/data/

import numpy as np
from scipy import signal
from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib import animation
from tqdm import tqdm
import subprocess

bin_file = "/Users/jonny/Downloads/rawDataSample.bin"

min_range=115
range_size=10
window_size = 1500
n_frames = 300
skip_frames = 10

global waves
with open(bin_file, 'r') as bf:
    waves = np.fromfile(bf, dtype=np.int16, count=385*(window_size+(n_frames*skip_frames))*10)

waves = waves.reshape((385,-1), order='F')
waves = signal.decimate(waves, q=10,axis=1)

filt = signal.butter(10, 250, btype='low', fs=3000, output='sos')
waves = signal.sosfilt(filt, waves, axis=1)


Writer = animation.writers['ffmpeg']
writer = Writer(fps=30, bitrate=2**14)

adpi = 128

plt.rcParams['axes.facecolor'] = 'black'
plt.rcParams['figure.facecolor'] = 'black'

fig, ax = plt.subplots(figsize=(564/adpi, 536/adpi), dpi=adpi)
# 110
plt.axis('off')
fig.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
#fig.axes[0].get_xaxis().set_visible(False)
#fig.axes[0].get_yaxis().set_visible(False)
ax.set_facecolor('black')
#ax.set_axis_bgcolor('black')




global pbar
pbar = tqdm(total=n_frames)

global lines
global xrange
x_range = np.arange(window_size)
lines = []
for i in range(min_range, min_range+range_size):
    awav = waves[i,0:window_size]
    awav = (awav/np.max(np.abs(awav)))*0.5
    lines.extend(ax.plot(x_range, awav+(i*2), 'w', linewidth=0.5))


def update_plot(t):
    global lines
    global waves
    global x_range
    global pbar
    for i, idx in enumerate(range(min_range, min_range+range_size)):

        awav = waves[idx,t:t+window_size]
        awav = (awav/np.max(np.abs(awav)))*0.5
        lines[i].set_data(x_range, awav+(idx*2))
    pbar.update()
    #plt.pause(0.01)
    return lines

ani = FuncAnimation(plt.gcf(), update_plot, frames=range(0,n_frames*skip_frames, skip_frames), blit=True)
ani.save('neuropix.mp4', writer=writer, savefig_kwargs={'pad_inches':0, 'facecolor':'black'})

subprocess.call(['ffmpeg', '-y', '-i', 'neuropix.mp4', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-filter:v', 'crop=512:512:26:12', 'neuropix_enc.mp4'])

subprocess.call(['ffmpeg', '-y', '-i', 'neuropix.mp4', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-filter:v', 'crop=512:512:12:12,negate', 'neuropix_inv.mp4'])
