export async function getDid(atProtoHandle: string) {
  throw "not implemented";
}

export async function getCid(atUri: string) {
  throw "not implemented";
}

export async function sendMessage(atUri: string, cid: void): Promise<string> {
  throw "not implemented";
}

export async function deleteMessageForSelf(messageId: string) {
  throw "not implemented";
}

// // todo: export
// async function getConvoId() {
//   try {
//     let response = await fetch(Url.getConvoForMembers(), {
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw `response: ${response.status}`;
//     }
//     const json = await response.json();
//     return json["convo"]["id"] as string;
//   } catch (error: any) {
//     throw `getConvoId: ${error.message}`;
//   }
// }

//todo: export

// //todo: export
// async function getCid(did: string, postId: string) {
//   try {
//     // GET
//     let request = async () =>
//       await fetch(Url.getPosts(did, postId), {
//         method: "GET",
//         credentials: "include",
//       });
//     let response: Response;

//     try {
//       response = await request();
//     } catch (e) {
//       response = await request();
//     }

//     if (!response.ok) {
//       throw `response: ${response.status}`;
//     }
//     const json = await response.json();
//     return json[0]["cid"] as string;
//   } catch (error: any) {
//     throw `getCid: ${error.message}`;
//   }
// }

// //todo: export
// async function sendMessage(
//   convoId: string,
//   did: string,
//   postId: string,
//   cid: string,
// ) {
//   try {
//     let responseBody = JSON.stringify({
//       convoId: convoId,
//       message: {
//         text: "",
//         embed: {
//           $type: "app.bsky.embed.record",
//           record: {
//             uri: `at://${did}/app.bsky.feed.post/${postId}`,
//             cid: cid,
//           },
//         },
//       },
//     });

//     let request = async () =>
//       await fetch(Url.sendMessage(), {
//         body: responseBody,
//         method: "POST",
//         credentials: "include",
//       });

//     let response = await request();

//     if (!response.ok) {
//       throw `response: ${response.status}`;
//     }
//   } catch (error: any) {
//     throw `addBookmark: ${error.message}`;
//   }
// }

// //todo: export
// async function deleteMessageForSelf(convoId: string, messageId: string) {
//   try {
//     let request = async () =>
//       await fetch(Url.deleteMessageForSelf(), {
//         body: `{"convoId":"${convoId}","messageId":"${messageId}"}`,
//         method: "POST",
//       });

//     let response = await request();

//     if (!response.ok) {
//       throw `response: ${response.status}`;
//     }
//   } catch (error: any) {
//     throw `addBookmark: ${error.message}`;
//   }
// }
