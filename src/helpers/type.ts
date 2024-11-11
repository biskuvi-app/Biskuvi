export type EmbedData = {
  user: {
    href: string;
    name: string; // todo i18n "pfp"
    handle: string;
    img: string;
  };
  post: {
    date: string;
    formattedDate: string;
    duration: string;
    content: string;
    embed: string;
  };
  buttons: {
    replies: string;
    reposts: string;
    likes: string;
  };
};
