exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("group")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("group").insert([
        {
          userId: 1,
          groupName: "Sleepy",
          buyInAmt: 5,
          startDate: "Jan 20, 2019",
          endDate: "Feb 20, 2019",
          groupMessage: "Yo join me"
        },
        {
          userId: 1,
          groupName: "Nappy",
          buyInAmt: 10,
          startDate: "Jan 7, 2019",
          endDate: "March 7, 2019",
          groupMessage: "Join the Nappy group"
        },
        {
          userId: 2,
          groupName: "Sleeping beauties",
          buyInAmt: 20,
          startDate: "Jan 8, 2018",
          endDate: "March 8, 2018",
          groupMessage: "Join the sleeping beauties"
        },
        {
          userId: 3,
          groupName: "No screen time",
          buyInAmt: 10,
          startDate: "Sep 8, 2019",
          endDate: "Nov 8, 2019",
          groupMessage: "Join the No screen time group"
        }
      ]);
    });
};

