export const graph = {
  "user1": ["item1", "item2", "item3"],
  "user2": ["item2", "item3", "item4"],
  "user3": ["item1", "item4"],
  "user4": ["item2", "item5"],
  "item1": ["user1", "user3"],
  "item2": ["user1", "user2", "user4"],
  "item3": ["user1", "user2"],
  "item4": ["user2", "user3"],
  "item5": ["user4"]
  // "user1": ["item2"],
  // "user2": ["item2"],
  // "user3": ["item1", "item3"],
  // "user4": ["item4"],
  // "user5": ["item3"],
  // "item1": ["user3"],
  // "item2": ["user1","user2"],
  // "item3": ["user3", "user5"],
  // "item4": ["user4"],
};

export const itemValues = {
  "item1": 10,
  "item2": 20,
  "item3": 30,
  "item4": 40,
  // "item5": 50
};
