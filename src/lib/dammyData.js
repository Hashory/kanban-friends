const dammyData = {
  id: 1,
  type: "user_board",
  value: "user_board",
  children: [
    {
      id:2,
      type: "board",
      value: "Friend info",
      children: [
        {
          id: 3,
          type: "note",
          value: "My friend's name is ...",
          children: [],
        },
        {
          id: 4,
          type: "discord",
          value: "friend#1234",
          children: [],
        },
      ]
    },
    {
      id:5,
      type: "board",
      value: "This is secondary board",
      children: [
        {
          id: 6,
          type: "note",
          value: "Super cool!",
          children: [],
        },
        {
          id: 7,
          type: "discord",
          value: "OOF#0003",
          children: [],
        },
        {
          id: 6,
          type: "note",
          value: "One more!!!",
          children: [],
        },
        {
          id: 7,
          type: "note",
          value: "One more Note!!!",
          children: [],
        },
      ]
    },
  ]
};

export default dammyData;