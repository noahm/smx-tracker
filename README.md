# nodecg-bundle-smx-tracker

smx-tracker is a [NodeCG](http://github.com/nodecg/nodecg) bundle. It works with NodeCG versions >= `^2.0.0`

Instructions on setting this up with a working copy of nodecg will come soon!

This bundle will allow you to display a live-updating summary of a player's SMX scores as a layer in your OBS layouts.

## Demo
The bottom right corner is displaying using a layer within OBS, which was also used to capture the desktop.

https://github.com/noahm/nodecg-bundle-smx-tracker/assets/319485/1d19dc50-7b20-4d04-849f-cdfd232c22b9

## Developing

Use the following commands:

-   `npm run build`: Build the project once.
-   `npm run watch`: Build the project and automatically rebuild on changes.
-   `npm run dev`: Build the project, automatically rebuild on changes, launch the NodeCG server, and automatically restart the NodeCG server on changes.
    -   Only restarts the NodeCG server when server-side (i.e. extension) code changes. Changes to client-side code (i.e. dashboard panels and graphics) will not cause the server to restart, nor will they cause browser tabs to automatically refresh.


