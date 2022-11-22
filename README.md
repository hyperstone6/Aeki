# Aeki

Aeki furniture store demo site.

https://adrian-aeki.vercel.app/

![alt text](https://github.com/hyperstone6/Aeki/blob/main/mobile-screenshot.png?raw=true) ![alt text](https://github.com/hyperstone6/Aeki/blob/main/desktop-screenshot.png?raw=true)


The following features are implemented:

## Name and responsiveness
-The name is a wordplay on Ikea spelled backwards. I tried my best to avoid using absolute units in CSS to improve responsiveness, however CSS media queries were added for the following break-points: 900px 730px (works all the way down to mobile devices. At this breakpoint navigation menu shrinks inside a "hamburger" button). JavaScript media query is also used whenever I deemed necessary.

## Saving user selection
-Browser's localStorage and sessionStorage are used to simulate a backend (remembering user's choice).

## Carousel
-Clicking on the carousel buttons or the carousel indicator dots navigates to different images within the carousel (total of 4 images).

## Navigation and dropdown menu
-The items in the dropdown menu as well as any entered keyword in the searchbar make an axios API call to Unsplash.com server and populate the resulting images in the "gallery.html" page. The total of returned images from Unsplash API is 10. To keep the bandwith uasge to a minimum while maintaining quality, only the 1080p images returned from the JSON are used.

## French/English toggle
-The language-toggle button "French/British flag" toggles the main page text between English and French without refreshing the page. I have not yet implemented this functionality in the "gallery.html" page, but the markup is ready. The language selection adds a string in the sessionStorage to remember user's language choice throughout the session.

## Shopping cart
-Shopping cart icon is clickable and serves to keep track of the number of items the user has clicked on "Add to cart". You can click on an item more than once, which results in incrementing the item in the cart by 1. You can also increase, decrease, remove the item or clear the entire cart from inside the shopping cart. The "shopped" items are stored in the localStorage so as to remember them until the user removes them manually. "Checkout" button implementation is planned but at this point doesn't do anything.

## Hero
-The hero box can be closed. Once the user closes it, a sessionStorage string is added which serves to remember the close click and upon refresh doesn't stay rendered until another session is initiated.

## Main gallery
-In the gallery, upon hover, "Add to cart" and "zoom in" buttons were added. The "zoom in" triggers a full page overlay with the image in the center and a close button on the top-right corner of the viewport. The "Add to cart" increases item count in the cart by 1.

## Next page
-In the "gallery.html" a translucent video background was used to enhance UX. Images returned from Unsplash API are populated with "zoom in" feature. Clicking on the AEKI logo triggers history.back() (returns to previous page).

## Technologies used
I used the following technologies and resources in the making of the website:

-HTML -CSS -SASS -JavaScript -NPM -Axios -VS Code (my favorite IDE) -Unsplash API -Coverr.com -Fontspace -Google -CLI (bash & PowerShell) -Git -GitHub -Netlify -Chrome -Firefox Developer Edition

## Copyright
-All the media used are from free sources and no copyrights were violated to the best of my knowledge.

## Thanks!
Thank you for taking the time and going through my code. Any feedback from you is cherished and considered highly valuable!
