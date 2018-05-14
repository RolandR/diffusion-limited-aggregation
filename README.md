# Diffusion-Limited Aggregation

Particles undergoing random motion adhere to a seed when they touch.

![Screenshot](https://draemm.li/various/diffusion-limited-aggregation/image-wide.png)

[Live demo](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=center&realtime=false)

There's a number of settings which can be changed in the url:

* **particles**  
Sets the number of particles in the simulation. Default is 16000.

* **scale**  
Ratio of window size to canvas size. The default of 0.5 means that 1 pixel of the canvas is 2x2 pixels on-screen.

* **seed**  
Sets the initial seed to which particles will attach. Possible values are:
  * [center](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=center&realtime=false) (default)  
One pixel in the center of the screen
  * [box](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=box&realtime=false)  
A seed surrounding the entire screen
  * [ground](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=ground&realtime=false)  
A seed running along the bottom
  * [sky](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=sky&realtime=false)  
A seed running along the bottom
  * [random](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=random&randomSeeds=10&realtime=false)  
Seeds are randomly placed. The ´randomSeeds´ parameter sets the amount of seeds.
* **realtime**  
When set to [true](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=center&realtime=true), each particle will move by only one pixel per simulation frame. When set to [false](https://draemm.li/various/diffusion-limited-aggregation/?particles=10000&scale=0.5&seed=center&realtime=false), as many steps will be calculated as possible.
