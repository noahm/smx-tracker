# smx-tracker

smx-tracker is a [NodeCG](http://github.com/nodecg/nodecg) bundle that allows you to display a live-updating summary of a player's StepManiaX scores as a layer in your OBS layouts. It works with NodeCG versions >= `^2.0.0`

Setup a nodecg installation according to their instructions. Then run `nodecg install noahm/smx-tracker` to install this bundle.

## Demo

See a video demo:

[![Video demo of the bundle installation and usage](https://img.youtube.com/vi/FFOsqD5P1AI/0.jpg)](https://www.youtube.com/watch?v=FFOsqD5P1AI)

## Basic usage

1. Set your player ID
2. Add graphics as browser sources to your OBS layout
3. Multiple copies of `mode-count.html` can be added with query params:

   - `mode` can be set to any lower-cased SMX difficulty mode
   - `color` can be set to any 3 or 6 character hex color code

4. Update settings in the nodecg dashboard page to configure what stats are displayed

Data is refreshed from the SMX server once every 10s, so stat updates should be very close to live.

## Developing

Use the following commands:

- `npm run build`: Build the project once.
- `npm run watch`: Build the project and automatically rebuild on changes.
- `npm run dev`: Build the project, automatically rebuild on changes, launch the NodeCG server, and automatically restart the NodeCG server on changes.
  - Only restarts the NodeCG server when server-side (i.e. extension) code changes. Changes to client-side code (i.e. dashboard panels and graphics) will not cause the server to restart, nor will they cause browser tabs to automatically refresh.
