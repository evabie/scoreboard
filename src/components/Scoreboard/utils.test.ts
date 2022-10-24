import {
  filterMatchDataIsValid,
  getSortOrderByDate,
  sortMatchScoreAndDate,
} from "components/Scoreboard/utils";

test("match with valid status code & team data is filtered as true", () => {
  expect(
    filterMatchDataIsValid({
      home_team: { name: "Manchester United" },
      away_team: { name: "Liverpool FC" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    })
  ).toBe(true);
});

test("match with invalid status code is filtered as false", () => {
  expect(
    filterMatchDataIsValid({
      home_team: { name: "Manchester United" },
      away_team: { name: "Liverpool FC" },
      status_code: 20,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    })
  ).toBe(false);
});

test("match with no team data is filtered as false", () => {
  expect(
    filterMatchDataIsValid({
      home_team: null,
      away_team: { name: "Liverpool FC" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    })
  ).toBe(false);
});

const sortByDate = (array: string[]): string[] =>
  array.sort((a, b) => getSortOrderByDate(a, b));

test("sort matches with different dates from most recently started", () => {
  expect(sortByDate(["2022-10-20 22:30:00", "2022-10-21 20:30:00"])).toEqual([
    "2022-10-21 20:30:00",
    "2022-10-20 22:30:00",
  ]);
});

test("sort matches on the same day with different hours from most recently started", () => {
  expect(sortByDate(["2022-10-20 20:30:00", "2022-10-20 08:30:00"])).toEqual([
    "2022-10-20 20:30:00",
    "2022-10-20 08:30:00",
  ]);
});

test("keep original sorting order for matches with invalid dates", () => {
  expect(sortByDate(["nnn", "2022-10-21 20:30:00"])).toEqual([
    "nnn",
    "2022-10-21 20:30:00",
  ]);
});

test("sort matches by highest score and match start date properly", () => {
  expect(
    sortMatchScoreAndDate([
      {
        home_team: { name: "Manchester United" },
        away_team: { name: "Liverpool FC" },
        status_code: 1,
        match_start: "2022-10-20 20:30:00",
        stats: {
          home_score: 2,
          away_score: 1,
        },
      },
      {
        home_team: { name: "Chelsea FC" },
        away_team: { name: "Leeds Utd" },
        status_code: 1,
        match_start: "2022-10-20 20:30:00",
        stats: {
          home_score: 0,
          away_score: 1,
        },
      },
      {
        home_team: { name: "Arsenal FC" },
        away_team: { name: "Aston Villa" },
        status_code: 1,
        match_start: "2022-10-20 19:30:00",
        stats: {
          home_score: 2,
          away_score: 1,
        },
      },
    ])
  ).toEqual([
    {
      home_team: { name: "Manchester United" },
      away_team: { name: "Liverpool FC" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    },
    {
      home_team: { name: "Arsenal FC" },
      away_team: { name: "Aston Villa" },
      status_code: 1,
      match_start: "2022-10-20 19:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    },
    {
      home_team: { name: "Chelsea FC" },
      away_team: { name: "Leeds Utd" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 0,
        away_score: 1,
      },
    },
  ]);
});

test("sort matches with no score data as the last ones", () => {
  expect(
    sortMatchScoreAndDate([
      {
        home_team: { name: "Manchester United" },
        away_team: { name: "Liverpool FC" },
        status_code: 1,
        match_start: "2022-10-20 20:30:00",
        stats: {
          home_score: 2,
          away_score: 1,
        },
      },
      {
        home_team: { name: "Chelsea FC" },
        away_team: { name: "Leeds Utd" },
        status_code: 1,
        match_start: "2022-10-20 20:30:00",
        stats: {
          home_score: null,
          away_score: 1,
        },
      },
      {
        home_team: { name: "Arsenal FC" },
        away_team: { name: "Aston Villa" },
        status_code: 1,
        match_start: "2022-10-20 19:30:00",
        stats: {
          home_score: 0,
          away_score: 0,
        },
      },
    ])
  ).toEqual([
    {
      home_team: { name: "Manchester United" },
      away_team: { name: "Liverpool FC" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    },
    {
      home_team: { name: "Arsenal FC" },
      away_team: { name: "Aston Villa" },
      status_code: 1,
      match_start: "2022-10-20 19:30:00",
      stats: {
        home_score: 0,
        away_score: 0,
      },
    },
    {
      home_team: { name: "Chelsea FC" },
      away_team: { name: "Leeds Utd" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: null,
        away_score: 1,
      },
    },
  ]);
});

test("sort matches with invalid score number (NaN) as the last ones", () => {
  expect(
    sortMatchScoreAndDate([
      {
        home_team: { name: "Manchester United" },
        away_team: { name: "Liverpool FC" },
        status_code: 1,
        match_start: "2022-10-20 20:30:00",
        stats: {
          home_score: 2,
          away_score: 1,
        },
      },
      {
        home_team: { name: "Chelsea FC" },
        away_team: { name: "Leeds Utd" },
        status_code: 1,
        match_start: "2022-10-20 20:30:00",
        stats: {
          home_score: NaN,
          away_score: 1,
        },
      },
      {
        home_team: { name: "Arsenal FC" },
        away_team: { name: "Aston Villa" },
        status_code: 1,
        match_start: "2022-10-20 19:30:00",
        stats: {
          home_score: 0,
          away_score: 0,
        },
      },
    ])
  ).toEqual([
    {
      home_team: { name: "Manchester United" },
      away_team: { name: "Liverpool FC" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: 2,
        away_score: 1,
      },
    },
    {
      home_team: { name: "Arsenal FC" },
      away_team: { name: "Aston Villa" },
      status_code: 1,
      match_start: "2022-10-20 19:30:00",
      stats: {
        home_score: 0,
        away_score: 0,
      },
    },
    {
      home_team: { name: "Chelsea FC" },
      away_team: { name: "Leeds Utd" },
      status_code: 1,
      match_start: "2022-10-20 20:30:00",
      stats: {
        home_score: NaN,
        away_score: 1,
      },
    },
  ]);
});
