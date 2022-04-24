export const dummyHeroHeading = {
  type: 'h1',
  children: [
    { text: 'My Website ' },
    {
      text: 'UI Styleguide',
      underline: true
    }
  ]
};

export const dummyHeading = {
  type: 'h1',
  children: [
    { text: 'Lorem ipsum\'s dolor ' },
    {
      text: 'sit amet',
      underline: true
    },
    { text: ' consectetur.' }
  ]
};

export const dummyH4 = {
  type: 'h4',
  children: [
    { text: 'Lorem ipsum dolor ' },
    {
      text: 'sit amet',
      underline: true
    },
    { text: ' consectetur.' }
  ]
};

export const dummyVimeoID = '456585947';

export const dummyVimeoEmbed = {
  embed: true,
  platform: 'vimeo',
  videoID: dummyVimeoID,
  // poster: dummyImageDark,
  // aspectRatio: '75',
}

export const dummyYoutubeID = "OEFAgWQ_Gvg";

export const dummyYoutubeEmbed = {
  embed: true,
  platform: 'youtube',
  videoID: dummyYoutubeID
  // poster: dummyImageDark
}

export const dummyRichTextVimeo = {
  type: "video",
  id: "367107968",
  source: "vimeo",
}

export const dummyRichTextYouTube = {
  type: "video",
  id: "OEFAgWQ_Gvg",
  source: "youtube",
}

export const dummyBody = {
  type: 'p',
  children: [
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque, ' },
    {
      type: "link",
      url: "https://google.com",
      newTab: false,
      children: [
        {
          "text": "Here is a quick introduction to the following list of services. Ut lacinia lacus at elementum ornare."
        }
      ]
    },
    { text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },
    {
      type: "link",
      url: "https://google.com",
      newTab: true,
      children: [
        {
          "text": "This will open in a new tab ut lacinia lacus at elementum ornare."
        }
      ]
    }
  ]
};
