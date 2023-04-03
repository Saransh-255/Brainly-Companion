Tools to supercharge your Brainly experience.

---
- [Installation Guide](https://github.com/Saransh-255/Brainly-Companion#installation-guide)
- [Getting Started](https://github.com/Saransh-255/Brainly-Companion#getting-started)
-  [Features](https://github.com/Saransh-255/Brainly-Companion#features)
	-  ["For You" Feed](https://github.com/Saransh-255/Brainly-Companion#for-you-feed)
	- [Question Preview](https://github.com/Saransh-255/Brainly-Companion#question-preview)
	- [Answering Dashboard](https://github.com/Saransh-255/Brainly-Companion#answering-dashboard)
	- [Custom Theme](https://github.com/Saransh-255/Brainly-Companion#custom-theme)
	- [Answer Input Box Features](https://github.com/Saransh-255/Brainly-Companion#answer-input-box-features)
- [Contributing](https://github.com/Saransh-255/Brainly-Companion#contributing)
---

## Installation Guide
This extension is exclusively available on chromium-based browsers. 

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" width="64" height="64">  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png?20220301074026" width="64" height="64">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Brave_lion_icon.svg/640px-Brave_lion_icon.svg.png" width="64" height="64"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/640px-Opera_2015_icon.svg.png" width="64" height="64">

Just go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/brainly-companion/cplddgdncahafjjpimjjbghigkeabiod) page and click install!

## Features

### "For You" Feed
A list of questions picked specially for YOU to answer. Stop spending hours finding the perfect question to answer because the extension will do that for you!

<img src="https://i.gyazo.com/5f98c115f2d21e00f983f0ed8e5f8dff.gif" height="300">

### Question Preview
View what's in the question without loading the whole page. You can do everything you can do on the question page but with less bloat and more speed.

<img src = "https://i.gyazo.com/0097dcccbbcc3632cd63dd3e1f9a9b34.png" height=300 />

### Answering Dashboard
One page with all the data you could ever need! 
Follow [this](https://brainly.com/companion/answering) link or use the "Answering Dashboard" link in the header to access it!

<img src="https://contattafiles.s3.us-west-1.amazonaws.com/tnt29846/mbrw1fxg7W6sTtg/Screen%20Shot%202023-03-14%20at%206.24.41%20AM.png" height="300">

#### All Comment Notifications
A list of all comments posted on your answers recently, so you never miss a user asking for clarification!

#### Weekly Quota Progress
Donut graph showing your quota progress, turns yellow when you complete it.

#### Rate of Answering
Calculated based on the last 7 days

#### Useful Links
Why keep bookmarks when you have them integrated right where you need them

#### Daily Answer Count Graph
Not a lot of philosophy behind this one, just looks cool.

### Custom Themes
<img src="https://gyazo.com/8e0add741cee7ed08d6e2ec6cf1ac0d1.png" height=300/>

### Answer Input Box Features

#### Banned Word Detection
While answering, if you write a word that Brainly has banned for some reason, the whole line will turn red so you can fix that right away.

#### Answer Character Gauge
Measures the characters used so you never have to worry about passing the word limit.

<img src="https://i.gyazo.com/7bf6474bc9f303ddf3470a39dff166d0.png" height=300/>

#### Graphing Calculator
Click on the rightmost button on the action menu to open a Graphing Calculator.

<img src="https://i.gyazo.com/77a7f6152b29fb6de98d0f4b68767797.png" height=300 />

## Contributing
1. Clone the repository to your device. 
```sh
git clone https://github.com/Saransh-255/Brainly-Companion
```

2. Install all dependencies.
```sh
npm i
```

3. Install the [ESlint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

4. run `npm run dev` to run the compiler in development mode, all changes will be compiled automatically
```sh
npm run dev
```

5. Open your browser and load the extension from `/dist`

6. run `npm run prod` to run the compiler in production mode, a distributable build of the extension will be compiled.
```sh
npm run prod
```
