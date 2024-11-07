export type PostEmbed = {
  type: string; // "rich";
  version: string; // "1.0";
  author_name: string; // "RustTrending (@rusttrending.bsky.social)";
  author_url: string; // "https://bsky.app/profile/rusttrending.bsky.social";
  provider_url: string; // "Bluesky Social";
  cache_age: number; // 86400;
  width: number; // 600;
  height: number; // null;
  html: string; // '\u003cblockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:lontmsdex36tfjyxjlznnea7/app.bsky.feed.post/3la7bdr7ywg2p" data-bluesky-cid="bafyreidllavabtt7w4qjlmmyboksp7omk3qpvke6umpyqjwpsdngqw4qre"\u003e\u003cp\u003epola-rs / polars: string; // Dataframes powered by a multithreaded, vectorized query engine, written in Rust ★30149 https://github.com/pola-rs/polars\u003c/p\u003e\u0026mdash; \u003ca href="https://bsky.app/profile/did:plc:lontmsdex36tfjyxjlznnea7?ref_src=embed"\u003eRustTrending (@rusttrending.bsky.social)\u003c/a\u003e \u003ca href="https://bsky.app/profile/did:plc:lontmsdex36tfjyxjlznnea7/post/3la7bdr7ywg2p?ref_src=embed"\u003e2024-11-05T12:49:03.225097252Z\u003c/a\u003e\u003c/blockquote\u003e\u003cscript async src="https://embed.bsky.app/static/embed.js" charset="utf-8"\u003e\u003c/script\u003e';
};

// resulting html
// <blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:lontmsdex36tfjyxjlznnea7/app.bsky.feed.post/3la7bdr7ywg2p" data-bluesky-cid="bafyreidllavabtt7w4qjlmmyboksp7omk3qpvke6umpyqjwpsdngqw4qre">
// <p lang="">
// pola-rs / polars: Dataframes powered by a multithreaded, vectorized query engine, written in Rust ★30149 https://github.com/pola-rs/polars<br>
// <br>
// <a href="https://bsky.app/profile/did:plc:lontmsdex36tfjyxjlznnea7/post/3la7bdr7ywg2p?ref_src=embed">
// [image or embed]</a>
// </p>
// &mdash; RustTrending (
// <a href="https://bsky.app/profile/did:plc:lontmsdex36tfjyxjlznnea7?ref_src=embed">
// @rusttrending.bsky.social
// </a>)
// <a href="https://bsky.app/profile/did:plc:lontmsdex36tfjyxjlznnea7/post/3la7bdr7ywg2p?ref_src=embed">Nov 5, 2024 at 20:49
// </a>
// </blockquote>
// <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8">
// </script>
