const requests = [
  {
    ID: 1,
    bookID: 1,
    bookOwnerID: 1,
    bookStatus: "Available",
    dateCreated: "2020-11-25T19:13:58.000Z",
    dateModified: "2020-11-25T19:13:58.000Z",
    isArchivedByReceiver: 0,
    isArchivedByRequester: 0,
    requesterID: 2,
    status: "Open",
    title: `A request for "Book 1"`,
  },
  {
    ID: 2,
    bookID: 2,
    bookOwnerID: 1,
    bookStatus: "Available",
    dateCreated: "2020-11-25T19:13:58.000Z",
    dateModified: "2020-11-25T19:13:58.000Z",
    isArchivedByReceiver: 0,
    isArchivedByRequester: 0,
    requesterID: 2,
    status: "Completed",
    title: `A request for "Book 2"`,
  },
  {
    ID: 3,
    bookID: 2,
    bookOwnerID: 1,
    bookStatus: "Available",
    dateCreated: "2020-11-25T19:13:58.000Z",
    dateModified: "2020-11-25T19:13:58.000Z",
    isArchivedByReceiver: 1,
    isArchivedByRequester: 0,
    requesterID: 2,
    status: "Completed",
    title: `A request for "Book 2"`,
  },
  {
    ID: 4,
    bookID: 2,
    bookOwnerID: 2,
    bookStatus: "Available",
    dateCreated: "2020-11-25T19:13:58.000Z",
    dateModified: "2020-11-25T19:13:58.000Z",
    isArchivedByReceiver: 0,
    isArchivedByRequester: 1,
    requesterID: 1,
    status: "Completed",
    title: `A request for "Book 2"`,
  },
  {
    ID: 5,
    bookID: 2,
    bookOwnerID: 2,
    bookStatus: "Available",
    dateCreated: "2020-11-25T19:13:58.000Z",
    dateModified: "2020-11-25T19:13:58.000Z",
    isArchivedByReceiver: 0,
    isArchivedByRequester: 0,
    requesterID: 1,
    status: "Completed",
    title: `A request for "Book 2"`,
  },
];


export default requests